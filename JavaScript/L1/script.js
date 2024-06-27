document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const addButton = document.getElementById('add-field');
    const calculateButton = document.getElementById('calculate');

    addButton.addEventListener('click', function () {
        addTextField();
    });

    calculateButton.addEventListener('click', function () {
        calculate();
    });

    function addTextField() {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'input-field';
        container.insertBefore(input, calculateButton);
    }

    function calculate() {
        const inputFields = document.querySelectorAll('.input-field');
        let sum = 0;
        let min = Infinity;
        let max = -Infinity;

        inputFields.forEach(function (input) {
            const value = parseFloat(input.value);
            if (!isNaN(value)) {
                sum += value;
                if (value < min) min = value;
                if (value > max) max = value;
            }
        });

        const average = sum / inputFields.length;

        // Pokazanie wyników
        const resultContainer = document.createElement('div');
        resultContainer.innerHTML = `
            <p>Suma: ${sum}</p>
            <p>Średnia: ${average.toFixed(2)}</p>
            <p>Min: ${min}</p>
            <p>Max: ${max}</p>
        `;
        
        // Usuń poprzednie wyniki (jeśli istnieją)
        const previousResult = container.querySelector('.result-container');
        if (previousResult) {
            container.removeChild(previousResult);
        }

        // Dodaj nowe wyniki
        resultContainer.className = 'result-container';
        container.appendChild(resultContainer);
    }
});

