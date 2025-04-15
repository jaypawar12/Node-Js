module.exports = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => (b !== 0 ? a / b : "Can't Divide By '0'.")
};