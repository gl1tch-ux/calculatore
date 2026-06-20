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

        updateDisplay();
