let math = require("./math");  
let a = 20;
let b = -5;
let operation = "mul";

function calculate(a, b, operation) {
    switch (operation) {
        case "add":
            console.log(`Addition: ${math.add(a, b)}`);
            break;
        case "sub":
            console.log(`Subtraction: ${math.sub(a, b)}`);
            break;
        case "mul":
            console.log(`Multiplication: ${math.mul(a, b)}`);
            break;
        case "div":
            console.log(`Division: ${math.div(a, b)}`);
            break;
        default:
            console.log("This Type of operation is Invalid.");
    }
}

calculate(a, b, operation);