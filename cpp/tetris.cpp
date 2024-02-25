#pragma once

#include "rand.cpp"
#include <algorithm>
#include <array>
#include <expected>
#include <memory>
#include <optional>
#include <queue>
#include <ranges>

using std::ranges::any_of, std::ranges::find;

constexpr int FIELD_WIDTH = 11 + 2 + 2;
constexpr int FIELD_HEIGHT = 20 + 1 + 1;

constexpr int NEXT_BLOCK_LENGTH = 3;

class Tetris {
  public:
    using Field = std::array<std::array<int, FIELD_WIDTH>, FIELD_HEIGHT>;

    // JavaScript側に返す構造体
    struct ReturnType {
        Field field;
        std::shared_ptr<std::deque<MinoShape>> next_blocks;
        std::optional<MinoShape> hold;
        int score;
        int erased_cnt;
    };

  private:
    struct Position {
        int x;
        int y;
    };

    enum Result { Err, Ok };

    enum class Direction { Right, Left };

    Field field;
    Position pos;
    MinoShape block;
    bool is_finished;
    std::optional<MinoShape> hold;
    bool is_holded;
    std::shared_ptr<std::deque<MinoShape>> next_blocks;
    int score;
    std::queue<MinoShape> block_queue;
    int erased_cnt;
    unsigned long last_operated_time;
    // 自由落下固定キャンセルが発生したらスーパーローテーションさせない（登ることができるので）
    bool canceled;

  public:
    explicit Tetris()
        : field{{
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
              {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
              {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
          }},
          pos{5, 0}, block{}, is_finished{false}, hold{}, is_holded{false},
          next_blocks{}, score{0}, block_queue{}, erased_cnt{0},
          last_operated_time{0}, canceled{false} {
        rand_gen::init_block_queue(this->block_queue);

        this->block = this->block_queue.front();
        this->block_queue.pop();

        for (int i = 0; i < NEXT_BLOCK_LENGTH; ++i) {
            this->advance_block_queue();
        }
    }

  private:
    // ↓ static function

    static inline bool is_err(const Result result) { return !result; }

    static int to_score(const int line_cnt) {
        switch (line_cnt) {
        case 0:
            return 0;
        case 1:
            return 40;
        case 2:
            return 100;
        case 3:
            return 300;
        default:
            return 1200;
        }
    }

    static void write_block(Field &field, const Position &pos,
                            const MinoShape &block,
                            const bool is_view = false) {
        auto ghost_pos_y = pos.y;

        while (!Tetris::is_collision(field, {pos.x, ghost_pos_y + 1}, block)) {
            ghost_pos_y += 1;
        };

        for (int y = 0; y < 4; ++y) {
            for (int x = 0; x < 4; ++x) {
                if (block[y][x] == MinoKind::None)
                    continue;
                const auto sum_x = x + pos.x;
                if (is_view)
                    field[y + ghost_pos_y][sum_x] = MinoKind::Ghost;
                field[y + pos.y][sum_x] = block[y][x];
            }
        }
    }

    static bool is_collision(const Field &field, const Position &pos,
                             const MinoShape &block) {
        for (int y = 0; y < std::min(FIELD_HEIGHT - pos.y, 4); ++y) {
            for (int x = 0; x < std::min(FIELD_WIDTH - pos.x, 4); ++x) {
                if (field[y + pos.y][x + pos.x] && block[y][x])
                    return true;
            }
        }
        return false;
    }

    // ↑ static function

    bool is_collision(const MinoShape &new_shape) const {
        return this->is_collision(this->field, this->pos, new_shape);
    }

    bool is_collision(const Position &new_pos) const {
        return this->is_collision(this->field, new_pos, this->block);
    }

    Field get_current_state() const {
        auto copied_field = this->field;

        this->write_block(copied_field, this->pos, this->block, true);

        return copied_field;
    }

    Position new_pos(const int x, const int y) const {
        return {this->pos.x + x, this->pos.y + y};
    }

    // ↑ read-only
    // ↓ destructive

    void advance_block_queue() {
        if (this->block_queue.empty())
            rand_gen::init_block_queue(this->block_queue);
        this->next_blocks->push_back(this->block_queue.front());
        this->block_queue.pop();
    }

    Result move(const Position &new_pos) {
        if (!this->is_collision(new_pos)) {
            this->pos = new_pos;
            return Result::Ok;
        }
        return Result::Err;
    }

    void lock_block() {
        this->write_block(this->field, this->pos, this->block);
    }

    Result spawn_block() {
        const Position new_pos{5, 0};
        this->pos = new_pos;
        this->block = next_blocks->front();
        this->next_blocks->pop_front();
        this->advance_block_queue();
        return static_cast<Result>(!this->is_collision(new_pos));
    }

    void erase_line() {
        auto &field = this->field;
        const int cnt = this->erased_cnt;

        for (const auto y : std::views::iota(1, FIELD_HEIGHT - 2)) {
            for (const auto x : std::views::iota(1, FIELD_WIDTH - 2)) {
                if (!field[y][x])
                    goto CONTINUE_OUTER;
            }

            for (const auto y2 :
                 std::views::iota(2, y + 1) | std::views::reverse) {
                field[y2] = field[y2 - 1];
            }

            this->erased_cnt++;

        CONTINUE_OUTER:
        }

        this->score += this->to_score(this->erased_cnt - cnt);
    }

    void rotate(const Direction direction) {
        MinoShape new_shape;

        for (int y = 0; y < 4; ++y) {
            for (int x = 0; x < 4; ++x) {
                switch (direction) {
                case Direction::Right:
                    new_shape[y][x] = this->block[4 - 1 - x][y];
                    break;
                case Direction::Left:
                    new_shape[4 - 1 - x][y] = this->block[y][x];
                }
            }
        }

        if (!this->is_collision(new_shape)) {
            this->block = new_shape;
        } else if (!this->canceled) { // スーパーローテーションを試みる
            const auto super_rotate = [&](const int diff) {
                const std::array<Position, 4> super_rotation_pos = {
                    {{pos.x, pos.y + diff},
                     {pos.x, pos.y - diff},
                     {pos.x + diff, pos.y},
                     {pos.x - diff, pos.y}}};

                for (const auto &pos_ : super_rotation_pos) {
                    if (!this->is_collision(this->field, pos_, new_shape)) {
                        this->pos = pos_;
                        this->block = new_shape;
                        return Ok;
                    }
                }
                return Err;
            };

            const bool is_I = any_of(this->block, [](const auto &row) {
                return find(row, MinoKind::I) != row.end();
            });

            for (int i = 1; i <= (is_I ? 2 : 1); ++i) {
                if (super_rotate(i) == Ok)
                    return;
            }
        }
    }

    std::expected<Result, std::unique_ptr<Tetris>>
    drop(const bool is_moving = false) {
        if (is_err(this->move(this->new_pos(0, 1)))) {
            if (is_moving) {
                this->canceled = true;
                return Ok;
            }

            auto backup = std::make_unique<Tetris>(*this);

            this->lock_block();
            this->erase_line();

            this->is_holded = false;
            this->canceled = false;

            if (is_err(this->spawn_block())) {
                this->is_finished = true;
                return std::unexpected(std::move(backup));
            }

            return Err;
        }
        return Ok;
    }

    void hold_mino() {
        if (this->is_holded)
            return;

        if (this->hold.has_value()) {
            auto &hold = this->hold.value();
            if (this->is_collision(hold)) // 壁の中に埋まってしまう場合がある
                return;
            hold.swap(this->block);
        } else {
            this->hold = this->block;
            this->spawn_block();
        }

        this->is_holded = true;
    }

  public:
    // JavaScriptから呼ぶ
    std::optional<ReturnType> exec(const int type,
                                   const std::optional<unsigned long> time) {
        if (this->is_finished)
            return std::nullopt;

        const bool is_moving =
            time.transform([this](const auto &time) {
                    const auto is_moving =
                        time - this->last_operated_time < 150;
                    this->last_operated_time = time; // effect
                    return is_moving;
                })
                .value_or(false);

        enum ExecType {
            Init,
            FreeFall,
            RotateRight,
            RotateLeft,
            MoveRight,
            MoveLeft,
            HardDrop,
            SoftDrop,
            Hold,
        };

        switch (type) {
        case SoftDrop:
        case FreeFall: {
            const auto result = this->drop(is_moving);
            if (!result.has_value())
                return ReturnType{result.error()->get_current_state(),
                                  this->next_blocks, this->hold, this->score,
                                  this->erased_cnt};
            break;
        }

        case RotateRight:
            this->rotate(Direction::Right);
            break;

        case RotateLeft:
            this->rotate(Direction::Left);
            break;

        case MoveRight:
            this->move(this->new_pos(1, 0));
            break;

        case MoveLeft:
            this->move(this->new_pos(-1, 0));
            break;

        case HardDrop:
            for (;;) {
                const auto result = this->drop();
                if (!result.has_value())
                    return ReturnType{result.error()->get_current_state(),
                                      this->next_blocks, this->hold,
                                      this->score, this->erased_cnt};
                if (result == Err)
                    break;
            }
            break;
        case Hold:
            this->hold_mino();
            break;
        }

        return ReturnType{this->get_current_state(), this->next_blocks,
                          this->hold, this->score, this->erased_cnt};
    }
};