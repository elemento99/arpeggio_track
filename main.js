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

console.log(cyclicScaleSubset)































let allSelected = false;

// Event listeners para las casillas de la cabecera
document.getElementById('toggle-normal-triad').addEventListener('change', (event) => {
  document.querySelectorAll('.normal-triad').forEach((checkbox) => {
    checkbox.checked = event.target.checked;
    const row = checkbox.dataset.row;
    toggleInversions(row);
  });
});

document.getElementById('toggle-seven-note').addEventListener('change', (event) => {
  document.querySelectorAll('.seven-note').forEach((checkbox) => {
    checkbox.checked = event.target.checked;
    const row = checkbox.dataset.row;
    toggleInversions(row);
    toggleThirdInversion(row, event.target.checked);
  });
});

document.getElementById('toggle-first-inversion').addEventListener('change', (event) => {
  document.querySelectorAll('.first-inversion').forEach((checkbox) => {
    checkbox.checked = event.target.checked;
  });
});

document.getElementById('toggle-second-inversion').addEventListener('change', (event) => {
  document.querySelectorAll('.second-inversion').forEach((checkbox) => {
    checkbox.checked = event.target.checked;
  });
});

document.getElementById('toggle-third-inversion').addEventListener('change', (event) => {
  document.querySelectorAll('.third-inversion').forEach((checkbox) => {
    checkbox.checked = event.target.checked;
  });
});

// Cambiar el estado de las inversiones dependiendo de las casillas
function toggleInversions(row) {
  const normalTriad = document.querySelector(`#normal-triad-${row}`).checked;
  const sevenNote = document.querySelector(`#seven-note-${row}`).checked;

  const enable = normalTriad || sevenNote;

  document.querySelector(`#first-inversion-${row}`).disabled = !enable;
  document.querySelector(`#second-inversion-${row}`).disabled = !enable;

  if (!enable) {
    document.querySelector(`#first-inversion-${row}`).checked = false;
    document.querySelector(`#second-inversion-${row}`).checked = false;
  }
}

function toggleThirdInversion(row, isEnabled) {
  const thirdInversionCheckbox = document.querySelector(`#third-inversion-${row}`);
  if (isEnabled) {
    thirdInversionCheckbox.disabled = false;
  } else {
    thirdInversionCheckbox.disabled = true;
    thirdInversionCheckbox.checked = false;
  }
}

document.getElementById('selectAllBtn').addEventListener('click', () => {
  allSelected = !allSelected;
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = allSelected;

    const row = checkbox.dataset.row;

    if (checkbox.classList.contains('seven-note')) {
      toggleThirdInversion(row, allSelected);
    }
    if (checkbox.classList.contains('normal-triad') || checkbox.classList.contains('seven-note')) {
      toggleInversions(row);
    }
  });
  document.getElementById('selectAllBtn').textContent = allSelected ? 'Desmarcar Todas' : 'Marcar Todas';
  console.log(allSelected ? "Todas las casillas marcadas." : "Todas las casillas desmarcadas.");
});



let chunks = [];
let chunksAuxiliar = [];
















// desde aquí en adelante solo recibo el chunks y el cyclicScaleSubset
console.log("este es el chunk auxiliar q me está llegando desde el front end", chunksAuxiliar)
console.log("este es la escala q me llega del front", cyclicScaleSubset)


let selectedTriads = [];

const triadPatterns = [
    { name: "normal-triad-1", pattern: [0, 2, 4] },
    { name: "normal-triad-first-inversion-1", pattern: [2, 4, 0] },
    { name: "normal-triad-second-inversion-1", pattern: [4, 0, 2] },
    { name: "normal-triad-third-inversion-1", pattern: [6, 1, 3] },

    { name: "normal-triad-2", pattern: [1, 3, 5] },
    { name: "normal-triad-first-inversion-2", pattern: [3, 5, 1] },
    { name: "normal-triad-second-inversion-2", pattern: [5, 1, 3] },
    { name: "normal-triad-third-inversion-2", pattern: [0, 2, 4] },

    { name: "normal-triad-3", pattern: [2, 4, 6] },
    { name: "normal-triad-first-inversion-3", pattern: [4, 6, 2] },
    { name: "normal-triad-second-inversion-3", pattern: [6, 2, 4] },
    { name: "normal-triad-third-inversion-3", pattern: [1, 3, 5] },

    { name: "normal-triad-4", pattern: [3, 5, 0] },
    { name: "normal-triad-first-inversion-4", pattern: [5, 0, 3] },
    { name: "normal-triad-second-inversion-4", pattern: [0, 3, 5] },
    { name: "normal-triad-third-inversion-4", pattern: [2, 4, 6] },

    { name: "normal-triad-5", pattern: [4, 6, 1] },
    { name: "normal-triad-first-inversion-5", pattern: [6, 1, 4] },
    { name: "normal-triad-second-inversion-5", pattern: [1, 4, 6] },
    { name: "normal-triad-third-inversion-5", pattern: [3, 5, 0] },

    { name: "normal-triad-6", pattern: [5, 0, 2] },
    { name: "normal-triad-first-inversion-6", pattern: [0, 2, 5] },
    { name: "normal-triad-second-inversion-6", pattern: [2, 5, 0] },
    { name: "normal-triad-third-inversion-6", pattern: [4, 6, 1] },

    { name: "normal-triad-7", pattern: [6, 1, 3] },
    { name: "normal-triad-first-inversion-7", pattern: [1, 3, 6] },
    { name: "normal-triad-second-inversion-7", pattern: [3, 6, 1] },
    { name: "normal-triad-third-inversion-7", pattern: [6, 1, 3] },
];
const sevenNotePatterns = [
{ name: "seven-note-1", pattern: [0, 2, 4, 6] },
{ name: "seven-note-first-inversion-1", pattern: [2, 4, 6, 0] },
{ name: "seven-note-second-inversion-1", pattern: [4, 6, 0, 2] },
{ name: "seven-note-third-inversion-1", pattern: [6, 0, 2, 4] },

{ name: "seven-note-2", pattern: [1, 3, 5, 7] },
{ name: "seven-note-first-inversion-2", pattern: [3, 5, 7, 1] },
{ name: "seven-note-second-inversion-2", pattern: [5, 7, 1, 3] },
{ name: "seven-note-third-inversion-2", pattern: [7, 1, 3, 5] },

{ name: "seven-note-3", pattern: [2, 4, 6, 8] },
{ name: "seven-note-first-inversion-3", pattern: [4, 6, 8, 2] },
{ name: "seven-note-second-inversion-3", pattern: [6, 8, 2, 4] },
{ name: "seven-note-third-inversion-3", pattern: [8, 2, 4, 6] },

{ name: "seven-note-4", pattern: [3, 5, 7, 9] },
{ name: "seven-note-first-inversion-4", pattern: [5, 7, 9, 3] },
{ name: "seven-note-second-inversion-4", pattern: [7, 9, 3, 5] },
{ name: "seven-note-third-inversion-4", pattern: [9, 3, 5, 7] },

{ name: "seven-note-5", pattern: [4, 6, 8, 10] },
{ name: "seven-note-first-inversion-5", pattern: [6, 8, 10, 4] },
{ name: "seven-note-second-inversion-5", pattern: [8, 10, 4, 6] },
{ name: "seven-note-third-inversion-5", pattern: [10, 4, 6, 8] },

{ name: "seven-note-6", pattern: [5, 7, 9, 11] },
{ name: "seven-note-first-inversion-6", pattern: [7, 9, 11, 5] },
{ name: "seven-note-second-inversion-6", pattern: [9, 11, 5, 7] },
{ name: "seven-note-third-inversion-6", pattern: [11, 5, 7, 9] },

{ name: "seven-note-7", pattern: [6, 8, 10, 12] },
{ name: "seven-note-first-inversion-7", pattern: [8, 10, 12, 6] },
{ name: "seven-note-second-inversion-7", pattern: [10, 12, 6, 8] },
{ name: "seven-note-third-inversion-7", pattern: [12, 6, 8, 10] }
];

function generateSelectedTriads(cyclicScales, chunks) {
    triadPatterns.forEach(pattern => {
        if (chunks.includes(pattern.name)) {
            const triad = pattern.pattern.map(index => cyclicScales.get(index));
            selectedTriads.push(triad);
            
        }
    });
    sevenNotePatterns.forEach(pattern => {
        if (chunks.includes(pattern.name)) {
            const triad = pattern.pattern.map(index => cyclicScales.get(index));
            selectedTriads.push(triad);
            
        }
    });
}


document.getElementById('triadas').addEventListener('click', () => {
    chunks = [];
    // Iterar sobre las filas
    for (let i = 1; i <= rows; i++) {
      const normalTriad = document.querySelector(`#normal-triad-${i}`).checked;
      const sevenNote = document.querySelector(`#seven-note-${i}`).checked;
  
      const firstInversion = document.querySelector(`#first-inversion-${i}`).checked;
      const secondInversion = document.querySelector(`#second-inversion-${i}`).checked;
      const thirdInversion = document.querySelector(`#third-inversion-${i}`).checked;
  
      // Combinaciones solo para normal-triad y seven-note
      if (normalTriad || sevenNote) {
        // Combinaciones para normal-triad con inversiones
        if (normalTriad) {
          chunks.push(`"normal-triad-${i}"`);
          if (firstInversion) chunks.push(`"normal-triad-first-inversion-${i}"`);
          if (secondInversion) chunks.push(`"normal-triad-second-inversion-${i}"`);
          if (thirdInversion) chunks.push(`"normal-triad-third-inversion-${i}"`);
        }
  
        // Combinaciones para seven-note con inversiones
        if (sevenNote) {
          chunks.push(`"seven-note-${i}"`);
          if (firstInversion) chunks.push(`"seven-note-first-inversion-${i}"`);
          if (secondInversion) chunks.push(`"seven-note-second-inversion-${i}"`);
          if (thirdInversion) chunks.push(`"seven-note-third-inversion-${i}"`);
        }
      }
    }
  
    // Guardar una copia en chunksAuxiliar
    chunksAuxiliar = chunks;
  
    // Mostrar las combinaciones seleccionadas en la consola
    console.log("este es el chunks que produce el submit ", chunks);
  });
  
  // Evento para "triadas", atento a cambios en chunks
  document.getElementById('triadas').addEventListener('click', () => {
    // Llamamos a la función que necesita el valor actualizado de chunks
    generateSelectedTriads(cyclicScaleSubset, chunks);
  
    // Muestra las triadas actuales en consola
    console.log("estas son las triadas actuales", selectedTriads);

    selectedTriads = [];

    chunksAuxiliar = chunksAuxiliar.map(chunk => chunk.replace(/['"]+/g, ''));

    console.log("este es el chunk auxiliar q me está llegando desde el front end a triadas", chunksAuxiliar)
console.log("este es la escala q me llega del front", cyclicScaleSubset)


    generateSelectedTriads(cyclicScaleSubset, chunksAuxiliar)
    console.log("estas son las triadas generadas por el boton triadas",selectedTriads)

})

console.log("triadas finales", selectedTriads)
















generateSelectedTriads(cyclicScaleSubset, chunks);
console.log(selectedTriads)
