let selectedValues = [];
let cyclicScaleSubset = [];
const keyInput = document.getElementById('key');
const displayElement = document.getElementById('selected-values');
const selectors = document.querySelectorAll('.selector');

class CyclicArray {
    constructor(array) {
        this.array = array;
    }

    get(index) {
        const length = this.array.length;
        const cyclicIndex = ((index % length) + length) % length;
        return this.array[cyclicIndex];
    }

    set(index, value) {
        const length = this.array.length;
        const cyclicIndex = ((index % length) + length) % length;
        this.array[cyclicIndex] = value;
    }

    size() {
        return this.array.length;
    }
}

const notas = [
    "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"
];

const cyclicNotas = new CyclicArray(notas);

function initSelectors() {
    selectors.forEach((selector) => {
        for (let i = 1; i <= 4; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selector.appendChild(option);
        }
    });

    selectors.forEach((selector) => {
        selector.value = 1;
    });

    updateOptions();
}

function calculateSum() {
    return Array.from(selectors).reduce((sum, selector) => sum + parseInt(selector.value), 0);
}

function updateOptions() {
    const sum = calculateSum();

    selectors.forEach((selector) => {
        const selectedValue = parseInt(selector.value);
        const maxValue = Math.min(4, 11 - sum + selectedValue);
        const options = selector.querySelectorAll('option');

        options.forEach((option) => {
            const optionValue = parseInt(option.value);
            option.disabled = optionValue > maxValue;
        });
    });
}

selectors.forEach((selector) => {
    selector.addEventListener('change', updateOptions);
});

initSelectors();

function displaySelectedValues() {
    selectedValues = Array.from(selectors).map(selector => parseInt(selector.value));
    displayElement.textContent = `Valores seleccionados: ${selectedValues.join(', ')}`;
}

function displayCyclicScaleSubset() {
    displayElement.textContent = `Cyclic Scale Subset: ${cyclicScaleSubset.array.join(', ')}`;
}

selectors.forEach((selector) => {
    selector.addEventListener('change', displaySelectedValues);
});

displaySelectedValues();

function generateSubset(key, selectedValues) {
    const keyIndex = cyclicNotas.array.indexOf(key);
    let subset = [];
    let currentIndex = keyIndex;

    subset.push(cyclicNotas.get(currentIndex));

    for (let i = 0; i < 6; i++) {
        const selectorValue = selectedValues[i % selectedValues.length];
        currentIndex = (currentIndex + selectorValue) % cyclicNotas.size();
        subset.push(cyclicNotas.get(currentIndex));
    }

    return subset;
}

function updateSubset() {
    const key = keyInput.value;
    cyclicScaleSubset = new CyclicArray(generateSubset(key, selectedValues));
    displayCyclicScaleSubset();
}

keyInput.addEventListener('change', updateSubset);

selectors.forEach((selector) => {
    selector.addEventListener('change', () => {
        selectedValues = Array.from(selectors).map(selector => parseInt(selector.value));
        updateSubset();
    });
});

updateSubset();
