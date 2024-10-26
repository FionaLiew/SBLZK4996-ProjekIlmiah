const prefixList = document.getElementById('prefixList');
const rootWordList = document.getElementById('rootWordList');
const endMessage = document.getElementById('endMessage');
const resultTable = document.getElementById('resultTable');

// Store the sets of questions (Latihan) and their corresponding correct matches
const latihanSets = {
    latihan1: [
        { prefix: 'ter', root: 'nampak', idPrefix: 'i1', idRoot: 'd1' },
        { prefix: 'pem', root: 'buru', idPrefix: 'i2', idRoot: 'd2' },
        { prefix: 'mem', root: 'bakar', idPrefix: 'i3', idRoot: 'd3' },
        { prefix: 'pen', root: 'terbit', idPrefix: 'i4', idRoot: 'd4' },
        { prefix: 'menge', root: 'pos', idPrefix: 'i5', idRoot: 'd5' },
        { prefix: 'ber', root: 'kawan', idPrefix: 'i6', idRoot: 'd6' },
    ],
    latihan2: [
        { prefix: 'men', root: 'skru', idPrefix: 'i7', idRoot: 'd7' },
        { prefix: 'pen', root: 'terjemah', idPrefix: 'i8', idRoot: 'd8' },
        { prefix: 'meng', root: 'ejar', idPrefix: 'i9', idRoot: 'd9' },
        { prefix: 'be', root: 'kerja', idPrefix: 'i10', idRoot: 'd10' },
        { prefix: 'ter', root: 'makan', idPrefix: 'i11', idRoot: 'd11' },
        { prefix: 'pe', root: 'tinju', idPrefix: 'i12', idRoot: 'd12' },
    ]
};

// Select which Latihan set to use
let currentLatihan = [];

// Current prefix being dragged
let selectedId;

// Counter for current matches
let matchingCounter = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function populateExercise() {
    // Clear existing lists and counters
    prefixList.innerHTML = '';
    rootWordList.innerHTML = '';
    matchingCounter = 0;

    // Shuffle prefixes and root words separately
    const shuffledPrefixes = shuffleArray([...currentLatihan]); // Shuffle prefixes
    const shuffledRoots = shuffleArray([...currentLatihan]); // Shuffle roots

    // Populate prefix list
    shuffledPrefixes.forEach((pair) => {
        const prefixItem = document.createElement('li');
        prefixItem.textContent = pair.prefix;
        prefixItem.id = pair.idPrefix;
        prefixItem.draggable = true;
        prefixList.appendChild(prefixItem);
    });

    // Populate root word list
    shuffledRoots.forEach((pair) => {
        const rootItem = document.createElement('li');
        rootItem.textContent = pair.root;
        rootItem.id = pair.idRoot;
        rootItem.draggable = true;
        rootWordList.appendChild(rootItem);
    });

    addDragAndDropListeners();
}

function dragStart() {
    selectedId = this.id;
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(event) {
    event.preventDefault(); // Allow dropping
}

function dragDrop(event) {
    event.preventDefault();
    const dropTargetId = this.id;

    if (checkForMatch(selectedId, dropTargetId)) {
        document.getElementById(selectedId).style.display = 'none';
        document.getElementById(dropTargetId).style.display = 'none';
        matchingCounter++;

        // Check if all matches for the current Latihan are found
        if (matchingCounter === currentLatihan.length) {
            endMessage.style.display = 'block'; // Show only the "Tahniah!" message
        }
    }

    this.classList.remove('over');
}

function checkForMatch(selected, dropTarget) {
    // Check if the selected and drop target match any pair in the current Latihan set
    return currentLatihan.some(pair => pair.idPrefix === selected && pair.idRoot === dropTarget);
}

function addDragAndDropListeners() {
    const draggablePrefixes = document.querySelectorAll('#prefixList li');
    const dropTargets = document.querySelectorAll('#rootWordList li');

    draggablePrefixes.forEach(item => {
        item.addEventListener('dragstart', dragStart);
    });

    dropTargets.forEach(target => {
        target.addEventListener('dragenter', dragEnter);
        target.addEventListener('dragover', dragOver);
        target.addEventListener('drop', dragDrop);
        target.addEventListener('dragleave', dragLeave);
    });
}

// Function to switch between latihan sets
function switchLatihan(latihanName) {
    if (latihanSets[latihanName]) {
        currentLatihan = latihanSets[latihanName];
        endMessage.style.display = 'none';
        populateExercise(); // Populate the exercise with the selected Latihan set
    } else {
        console.error('Latihan not found:', latihanName);
    }
}

// Initialize the first exercise set as default
switchLatihan('latihan1');