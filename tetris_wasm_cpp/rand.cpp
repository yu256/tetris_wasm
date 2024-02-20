#pragma once

#include "tetris.cpp"
#include <algorithm>
#include <array>
#include <queue>
#include <random>

using MinoShape = std::array<std::array<int, 4>, 4>;

enum MinoKind {
    None,
    Wall,
    Ghost,
    I,
    O,
    S,
    Z,
    J,
    L,
    T,
};

static constexpr std::array<MinoShape, 7> TETRIMINOS = {{
    {{{0, 0, 0, 0}, {0, 0, 0, 0}, {I, I, I, I}, {0, 0, 0, 0}}},
    {{{0, 0, 0, 0}, {0, O, O, 0}, {0, O, O, 0}, {0, 0, 0, 0}}},
    {{{0, 0, 0, 0}, {0, S, S, 0}, {S, S, 0, 0}, {0, 0, 0, 0}}},
    {{{0, 0, 0, 0}, {Z, Z, 0, 0}, {0, Z, Z, 0}, {0, 0, 0, 0}}},
    {{{0, 0, 0, 0}, {J, 0, 0, 0}, {J, J, J, 0}, {0, 0, 0, 0}}},
    {{{0, 0, 0, 0}, {0, 0, L, 0}, {L, L, L, 0}, {0, 0, 0, 0}}},
    {{{0, 0, 0, 0}, {0, T, 0, 0}, {T, T, T, 0}, {0, 0, 0, 0}}},
}};

namespace rand_gen {

std::mt19937 &get_random_generator() {
    static std::random_device rd;
    static std::mt19937 gen(rd());
    return gen;
}

const auto &randomize_order() {
    static std::array<int, 7> order{0, 1, 2, 3, 4, 5, 6};
    std::ranges::shuffle(order, get_random_generator());
    return order;
}

inline void init_block_queue(std::queue<MinoShape> &queue) {
    for (const auto num : randomize_order()) {
        queue.push(TETRIMINOS[num]);
    }
}

} // namespace rand_gen