calculator using html css js

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .calculator {
            background: #1e1e2f;
            padding: 20px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            width: 320px;
        }

        .display {
            background: #0f0f1a;
            color: white;
            font-size: 2.5rem;
            text-align: right;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 20px;
            min-height: 80px;
            overflow: hidden;
            box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.5);
            word-break: break-all;
        }

        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
        }

        button {
            border: none;
            border-radius: 15px;
            padding: 20px;
            font-size: 1.3rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        button:active {
            transform: scale(0.95);
        }

        .number, .decimal {
            background: #33334d;
            color: white;
        }

        .operator {
            background: #ff9500;
            color: white;
        }

        .equals {
            background: #00d26a;
            color: white;
            grid-column: span 2;
        }

        .clear, .delete {
            background: #ff4757;
            color: white;
        }

        button:hover {
            filter: brightness(1.1);
        }

        .zero {
            grid-column: span 2;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <div class="display" id="display">0</div>
        
        <div class="buttons">
            <!-- Row 1 -->
            <button class="clear" onclick="clearDisplay()">AC</button>
            <button class="delete" onclick="deleteLast()">⌫</button>
            <button class="operator" onclick="appendOperator('%')">%</button>
            <button class="operator" onclick="appendOperator('/')">÷</button>
            
            <!-- Row 2 -->
            <button class="number" onclick="appendNumber('7')">7</button>
            <button class="number" onclick="appendNumber('8')">8</button>
            <button class="number" onclick="appendNumber('9')">9</button>
            <button class="operator" onclick="appendOperator('*')">×</button>
            
            <!-- Row 3 -->
            <button class="number" onclick="appendNumber('4')">4</button>
            <button class="number" onclick="appendNumber('5')">5</button>
            <button class="number" onclick="appendNumber('6')">6</button>
            <button class="operator" onclick="appendOperator('-')">−</button>
            
            <!-- Row 4 -->
            <button class="number" onclick="appendNumber('1')">1</button>
            <button class="number" onclick="appendNumber('2')">2</button>
            <button class="number" onclick="appendNumber('3')">3</button>
            <button class="operator" onclick="appendOperator('+')">+</button>
            
            <!-- Row 5 -->
            <button class="number zero" onclick="appendNumber('0')">0</button>
            <button class="decimal" onclick="appendNumber('.')">.</button>
            <button class="equals" onclick="calculate()">=</button>
        </div>
    </div>

    <div class="footer">
        Simple Calculator
    </div>

    <script>
        let display = document.getElementById('display');
        let currentInput = '0';
        let previousInput = '';
        let operator = null;
        let shouldResetScreen = false;

        function updateDisplay() {
            display.textContent = currentInput;
        }

        function appendNumber(number) {
            if (shouldResetScreen) {
                currentInput = '';
                shouldResetScreen = false;
            }
            
            if (currentInput === '0' && number !== '.') {
                currentInput = number;
            } else {
                currentInput = currentInput + number;
            }
            updateDisplay();
        }

        function appendOperator(op) {
            if (operator !== null && !shouldResetScreen) {
                calculate();
            }
            
            previousInput = currentInput;
            operator = op;
            shouldResetScreen = true;
        }

        function calculate() {
            if (operator === null || shouldResetScreen) return;
            
            let computation;
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch (operator) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    computation = current === 0 ? 'Error' : prev / current;
                    break;
                case '%':
                    computation = prev % current;
                    break;
                default:
                    return;
            }
            
            currentInput = computation.toString();
            operator = null;
            shouldResetScreen = true;
            updateDisplay();
        }

        function clearDisplay() {
            currentInput = '0';
            previousInput = '';
            operator = null;
            shouldResetScreen = false;
            updateDisplay();
        }

        function deleteLast() {
            if (shouldResetScreen) return;
            
            if (currentInput.length === 1) {
                currentInput = '0';
            } else {
                currentInput = currentInput.slice(0, -1);
            }
            updateDisplay();
        }

        // Keyboard support
        document.addEventListener('keydown', function(e) {
            if (e.key >= '0' && e.key <= '9') {
                appendNumber(e.key);
            } else if (e.key === '.') {
                appendNumber('.');
            } else if (e.key === '+') {
                appendOperator('+');
            } else if (e.key === '-') {
                appendOperator('-');
            } else if (e.key === '*') {
                appendOperator('*');
            } else if (e.key === '/') {
                appendOperator('/');
            } else if (e.key === 'Enter' || e.key === '=') {
                calculate();
            } else if (e.key === 'Backspace') {
                deleteLast();
            } else if (e.key === 'Escape') {
                clearDisplay();
            }
        });

        // Initialize
        updateDisplay();
    </script>
</body>
</html>

Copy the entire code above into a new file called index.html, then open it in your browser.

Features:

    Beautiful modern design with smooth animations
    Supports keyboard input
    Basic operations (+, −, ×, ÷, %)
    Clear (AC) and Delete (⌫) buttons
    Responsive display

Enjoy your calculator! 🚀

a good readme file in english

Here's a clean, professional, and well-structured README.md file for your calculator project:

# Calculator

A modern, responsive, and elegant calculator built with **HTML, CSS, and JavaScript**.

![Calculator Preview](preview.png)
## ✨ Features

- ✅ Clean and modern dark UI design
- ✅ Basic arithmetic operations (`+`, `−`, `×`, `÷`, `%`)
- ✅ Responsive design (works great on mobile & desktop)
- ✅ Keyboard support (numbers, operators, Enter, Backspace, Escape)
- ✅ Delete last digit (⌫) and Clear All (AC)
- ✅ Smooth animations and hover effects
- ✅ Error handling (e.g., division by zero)

## 🖥️ Demo

You can try the live demo by opening `index.html` in any modern web browser.

## 📁 Project Structure


## ✨ Features

- ✅ Clean and modern dark UI design
- ✅ Basic arithmetic operations (`+`, `−`, `×`, `÷`, `%`)
- ✅ Responsive design (works great on mobile & desktop)
- ✅ Keyboard support (numbers, operators, Enter, Backspace, Escape)
- ✅ Delete last digit (⌫) and Clear All (AC)
- ✅ Smooth animations and hover effects
- ✅ Error handling (e.g., division by zero)

## 🖥️ Demo

You can try the live demo by opening `index.html` in any modern web browser.
