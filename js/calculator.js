function appendToCalc(value) {
    const calcInput = document.getElementById('calcInput');
    if (calcInput.mode === 'result') {
        if (calcInput.value.includes('=')) {
            calcInput.value = calcInput.value.split('=')[1];
        } else {
            calcInput.value = '';
        }
    }
    calcInput.mode = 'input';
    calcInput.value += value;
}

function clearCalc() {
    const calcInput = document.getElementById('calcInput');
    calcInput.mode = 'input';
    calcInput.value = '';
    document.getElementById('calcResult').innerText = '';
}

function calculateResult() {
    const calcInput = document.getElementById('calcInput');
    calcInput.mode = 'result';
    try {
        const result = eval(calcInput.value.replace('x', '*').replace('÷', '/'));
        document.getElementById('calcInput').value = `${calcInput.value}=${result}`;
    } catch (error) {
        document.getElementById('calcInput').value = 'Error: Invalid expression';
    }
}

function backspaceCalc() {
    const calcInput = document.getElementById('calcInput');
    calcInput.mode = 'input';
    calcInput.value = calcInput.value.slice(0, -1);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calcInput').addEventListener('keydown', function(event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            calculateResult();
        } else if (event.key === 'Backspace') {
            backspaceCalc();
        } else if (event.key.length === 1 && /[0-9+\-*/().]/.test(event.key)) {
            appendToCalc(event.key);
        }
    });
});
