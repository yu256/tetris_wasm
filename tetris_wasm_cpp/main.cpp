#include "tetris.cpp"
#include <emscripten/bind.h>

// emcc main.cpp -std=c++23 --bind -o tetris.mjs -Oz -s ALLOW_MEMORY_GROWTH=1 --closure 1

using std::deque;

// struct DequeAccess {
//     static std::optional<deque<MinoShape>::value_type>
//     get(const deque<MinoShape> &d, const deque<MinoShape>::size_type index) {
//         if (index < d.size()) {
//             return d[index];
//         } else {
//             return std::nullopt;
//         }
//     }
//     static deque<MinoShape>::value_type
//     get_unchecked(const deque<MinoShape> &d,
//                   const deque<MinoShape>::size_type index) {
//         return d[index];
//     }
// };

struct SharedPtrAccess {
    static deque<MinoShape>::value_type
    get_unchecked(const std::shared_ptr<std::deque<MinoShape>> &ptr,
                  const deque<MinoShape>::size_type index) {
        return ptr->at(index);
    }
};

EMSCRIPTEN_BINDINGS(tetris) {
    emscripten::class_<Tetris>("Tetris").constructor().function("exec",
                                                                &Tetris::exec);

    emscripten::register_optional<unsigned long>();

    // バグ防止用の0の外壁はいらないので無視している
    emscripten::value_array<std::array<int, 15>>("TetrisX")
        .element(emscripten::index<1>())
        .element(emscripten::index<2>())
        .element(emscripten::index<3>())
        .element(emscripten::index<4>())
        .element(emscripten::index<5>())
        .element(emscripten::index<6>())
        .element(emscripten::index<7>())
        .element(emscripten::index<8>())
        .element(emscripten::index<9>())
        .element(emscripten::index<10>())
        .element(emscripten::index<11>())
        .element(emscripten::index<12>())
        .element(emscripten::index<13>());

    emscripten::value_array<Tetris::Field>("TetrisArr")
        .element(emscripten::index<0>())
        .element(emscripten::index<1>())
        .element(emscripten::index<2>())
        .element(emscripten::index<3>())
        .element(emscripten::index<4>())
        .element(emscripten::index<5>())
        .element(emscripten::index<6>())
        .element(emscripten::index<7>())
        .element(emscripten::index<8>())
        .element(emscripten::index<9>())
        .element(emscripten::index<10>())
        .element(emscripten::index<11>())
        .element(emscripten::index<12>())
        .element(emscripten::index<13>())
        .element(emscripten::index<14>())
        .element(emscripten::index<15>())
        .element(emscripten::index<16>())
        .element(emscripten::index<17>())
        .element(emscripten::index<18>())
        .element(emscripten::index<19>())
        .element(emscripten::index<20>());

    emscripten::register_optional<MinoShape>();

    // emscripten::class_<std::deque<MinoShape>>("NextBlocks")
    //     .function("get", &DequeAccess::get)
    //     .function("get_unchecked", &DequeAccess::get_unchecked);

    emscripten::class_<std::shared_ptr<std::deque<MinoShape>>>("NextBlocksPtr")
        .function("get_unchecked", &SharedPtrAccess::get_unchecked);

    emscripten::value_array<std::array<int, 4>>("MinoShape_X")
        .element(emscripten::index<0>())
        .element(emscripten::index<1>())
        .element(emscripten::index<2>())
        .element(emscripten::index<3>());
    emscripten::value_array<MinoShape>("MinoShape")
        .element(emscripten::index<0>())
        .element(emscripten::index<1>())
        .element(emscripten::index<2>())
        .element(emscripten::index<3>());

    emscripten::value_array<Tetris::ReturnType>("tetrisData")
        .element(&Tetris::ReturnType::field)
        .element(&Tetris::ReturnType::hold)
        .element(&Tetris::ReturnType::next_blocks)
        .element(&Tetris::ReturnType::score)
        .element(&Tetris::ReturnType::erased_cnt);

    emscripten::register_optional<Tetris::ReturnType>();
}