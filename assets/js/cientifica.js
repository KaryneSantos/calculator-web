const numeros =  document.querySelectorAll('.numero');
const operadores = document.querySelectorAll('.operador');
const display = document.getElementById('display');
const limpar = document.getElementById('limpar');
const limparUltimo = document.getElementById('limparUltimo');
const igual = document.getElementById('igual');
const ponto = document.getElementById('ponto');

let primeiroNumero = '';
let segundoNumero = '';
let operador = '';
let resetDisplay = false;

numeros.forEach(btn => {
    btn.addEventListener('click', () => {
        if (resetDisplay) {
            display.value = '';
            resetDisplay = false;
        }
        display.value += btn.innerHTML;
    });
});

operadores.forEach(btn => {
    btn.addEventListener('click', () => {
        const operadorSelecionado = btn.innerHTML;

        if (operadorSelecionado === 'CE' || operadorSelecionado === 'C' || operadorSelecionado === '=') {
            return;
        }

        if (operadorSelecionado === '.' && !display.value.includes('.')) {
            display.value += '.';
            return;
        }

        if (primeiroNumero && operador && !resetDisplay) {
            calcular();
        }

        operador = operadorSelecionado;
        primeiroNumero = display.value;
        resetDisplay = true;
    });
});

ponto.addEventListener('click', () => {
    if(!display.value.includes('.')) {
        display.value += '.';
    }
});

limpar.addEventListener('click', () => {
    display.value = '';
    primeiroNumero = '';
    segundoNumero = '';
    operador = '';
    resetDisplay = false;
});

limparUltimo.addEventListener('click', () => {
    display.value = display.value.slice(0, -1);
});

igual.addEventListener('click', () => {
    if (primeiroNumero && operador) {
        calcular();
        operador = '';
    }
});

function calcular() {
    segundoNumero = display.value;
    let resultado;
    
    switch (operador) {
        case '+':
            resultado = parseFloat(primeiroNumero) + parseFloat(segundoNumero);
            break;
        case '-':
            resultado = parseFloat(primeiroNumero) - parseFloat(segundoNumero);
            break;
        case '*':
            resultado = parseFloat(primeiroNumero) * parseFloat(segundoNumero);
            break;
        case '/':
            if (parseFloat(segundoNumero) === 0) {
                alert('Erro: Divisão por zero!');
                return;
            }
            resultado = parseFloat(primeiroNumero) / parseFloat(segundoNumero);
            break;
        case '%':
            resultado = parseFloat(primeiroNumero) - (parseFloat(primeiroNumero) * (parseFloat(segundoNumero) / 100));
            break;
        case 'sen':
            resultado = Math.sin(parseFloat(primeiroNumero) * (Math.PI / 180));
            break;
        case 'cos':
            resultado = Math.cos(parseFloat(primeiroNumero) * (Math.PI / 180));
            break;
        case 'tan':
            resultado = Math.tan(parseFloat(primeiroNumero) * (Math.PI / 180));
            break;            
        case 'x^2':
            resultado = Math.pow(parseFloat(primeiroNumero), 2);
            break;
        case 'x^3':
            resultado = Math.pow(parseFloat(primeiroNumero), 3);
            break;
        case '√':
            resultado = Math.sqrt(parseFloat(primeiroNumero));
            break;
        case '3√':
            resultado = Math.pow(parseFloat(primeiroNumero), 1/3);
            break;
        default:
            return;
    }
    
    display.value = resultado;
    primeiroNumero = resultado;
    resetDisplay = true;
}