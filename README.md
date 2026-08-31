# Calculator

A JavaScript calculator built as part of [The Odin Project](https://www.theodinproject.com/) Foundations curriculum.

# 🔗 https://farhanjawed1222.github.io/Calculator/

## Features

- Basic operations: addition, subtraction, multiplication, division
- Decimal number support with duplicate-decimal-point protection
- Operator chaining (e.g. `12 + 7 − 1 =` evaluates left to right)
- Negative number entry
- Backspace to undo the last input
- Clear to reset the calculator
- Divide-by-zero handled gracefully with an error message instead of crashing
- Long decimal results are rounded to avoid overflowing the display
- Pressing a digit right after a result starts a new calculation; pressing an operator keeps chaining off the result
- Full keyboard support (digits, `+ - * /`, `Enter`/`=`, `Escape`, `Backspace`)

## Built with

- HTML
- CSS
- Vanilla JavaScript (no libraries or frameworks)

## Notes

This project deliberately went beyond the base spec to add negative number support and full keyboard input, both used as opportunities to practice tracing state and debugging edge cases.