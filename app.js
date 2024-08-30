/**
 * Typing Practice Application
 * 
 * This application is designed to help users improve their typing speed and accuracy.
 * It focuses on practicing with commonly used English words and tracks user performance.
 * The app dynamically adjusts to user performance, presenting more challenging words
 * as the user improves.
 * 
 * Key Features:
 * - Presents words for typing practice
 * - Tracks typing speed and accuracy for each word
 * - Focuses on slower words to improve overall typing performance
 * - Displays statistics on typing performance
 * - Stores user progress locally
 * 
 * The application uses localStorage to persist user data between sessions.
 */

// Load words from LocalStorage or initialize with default word list
// This array contains a list of common English words
let wordArray = ["able", "about", "above", "add", "after", "again", "air", "all", "almost", "along", "also", "always", "an", "and", "animal", "another", "answer", "any", "are", "around", "at", "away", "back", "be", "because", "become", "been", "before", "began", "begin", "below", "between", "big", "book", "both", "boy", "bring", "build", "but", "button", "buy", "by", "cable", "call", "came", "can", "car", "carry", "change", "CharaChorder", "child", "children", "city", "close", "code", "come", "computer", "con", "consider", "could", "country", "course", "cut", "day", "develop", "did", "difference", "different", "do", "does", "don't", "down", "download", "each", "early", "earth", "eat", "EMG", "end", "engineer", "enough", "even", "ever", "every", "example", "eye", "face", "fact", "family", "far", "fast", "father", "feel", "feet", "few", "fill", "find", "fine", "fire", "first", "follow", "food", "for", "form", "found", "four", "from", "general", "get", "girl", "give", "go", "gone", "good", "got", "govern", "great", "group", "grow", "had", "hand", "happen", "hard", "has", "have", "Hazel", "he", "head", "hear", "hello", "help", "her", "here", "hi", "high", "him", "his", "hit", "hold", "home", "hope", "house", "how", "however", "Hulet", "I'll", "I'm", "idea", "if", "important", "in", "increase", "interest", "into", "is", "isn't", "issue", "it", "it's", "just", "keep", "kind", "know", "land", "large", "last", "late", "later", "lead", "learn", "leave", "left", "let", "letter", "life", "light", "like", "line", "list", "little", "live", "load", "long", "look", "lose", "lot", "made", "make", "man", "many", "may", "me", "mean", "men", "menu", "might", "mile", "mind", "miss", "more", "most", "mother", "mountain", "move", "much", "must", "my", "name", "nation", "near", "need", "never", "new", "next", "nice", "night", "no", "Nostrand", "not", "note", "nothing", "now", "number", "of", "off", "often", "oil", "old", "on", "once", "one", "only", "open", "or", "order", "other", "our", "out", "over", "own", "page", "paper", "part", "past", "people", "person", "picture", "place", "plan", "plant", "play", "point", "possible", "present", "print", "problem", "probably", "program", "public", "put", "question", "quick", "quickly", "quite", "read", "real", "really", "review", "right", "river", "run", "said", "same", "saw", "say", "school", "screen", "sea", "second", "see", "seem", "seen", "sentence", "set", "she", "should", "show", "side", "sin", "since", "site", "small", "so", "some", "something", "sometime", "song", "soon", "sound", "spell", "stand", "start", "state", "still", "stop", "store", "story", "study", "such", "super", "sure", "system", "take", "talk", "team", "tell", "than", "thank", "that", "the", "their", "them", "then", "there", "these", "they", "thing", "think", "this", "those", "though", "thought", "three", "through", "time", "tip", "to", "together", "too", "took", "top", "tree", "try", "turn", "two", "type", "under", "until", "up", "us", "use", "used", "very", "walk", "want", "was", "watch", "water", "way", "we", "week", "well", "went", "were", "what", "when", "where", "which", "while", "white", "who", "why", "wide", "will", "with", "without", "won't", "word", "work", "world", "would", "write", "year", "you", "young", "your"];

// Initialize an object to store word statistics
let words = {};
wordArray.forEach(word => {
    words[word] = {times: [], correct: 0, total: 0};
});

// Retrieve stored word data from localStorage, if available
let storedWords = localStorage.getItem('words');
words = storedWords ? JSON.parse(storedWords) : words;

// Constants for application settings
const slowWordsNum = 5;  // Number of slow words to focus on
const weightedWords = false;  // Flag to determine if word length should affect WPM calculation
const wordsPerLine = 8;

// Global variables
let slowestWords = [];  // Array to store the slowest words
let previousWord = "";  // Variable to store the previously typed word
let wordStart;  // Timestamp for when the current word started
let currentWords = [];  // Array of words currently displayed
let nextWords = [];  // Array of words to be displayed next
let futureWords = [];  // Array of words to be displayed after nextWords
let lineIndex = 0; // Keep track of which line we're on
let wordIndex = 0; // Keep track of which word we're on in the current line
let selectedSlowWords = []; // New global variable to store the selected slow words

/**
 * Function to display words on the screen
 * This function generates and displays three lines of words,
 * with each line containing a mix of slow words and random words.
 */
function displayWords() {
    let wordsContainer = document.getElementById('wordsContainer');
    wordsContainer.innerHTML = ''; // Clear the words container
    
    // Get the slowest words
    selectedSlowWords = getSlowestWords(slowWordsNum);
    
    // Generate three lines of words, each containing 8 words chosen from the 5 slow words
    let lines = [
        getRandomWords(selectedSlowWords, wordsPerLine),
        getRandomWords(selectedSlowWords, wordsPerLine),
        getRandomWords(selectedSlowWords, wordsPerLine)
    ];
    
    // Set the current, next, and future words
    currentWords = lines[0];
    nextWords = lines[1];
    futureWords = lines[2];

    // Create and display the three lines
    lines.forEach((lineWords, index) => {
        let wordLine = document.createElement('p');
        lineWords.forEach((word, wordIndex) => {
            let wordSpan = document.createElement('span');
            wordSpan.textContent = word;
            wordSpan.id = `line${index}word${wordIndex}`;
            wordSpan.className = ''; // Reset the class
            wordLine.appendChild(wordSpan);
        });
        wordsContainer.appendChild(wordLine);
    });

    // Set the start time for the first word
    wordStart = Date.now();
    lineIndex = 0;
    wordIndex = 0;
}

let lastWord = '';

/**
 * Function to get random words from an array
 * @param {Array} wordsArray - The array of words to choose from
 * @param {number} count - The number of words to return
 * @returns {Array} An array of randomly selected words
 */
function getRandomWords(wordsArray, count) {
    let randomWords = [];
    let lastWord = '';
    for (let i = 0; i < count; i++) {
        let randomIndex;
        let selectedWord;
        do {
            randomIndex = Math.floor(Math.random() * wordsArray.length);
            selectedWord = wordsArray[randomIndex];
        } while (selectedWord === lastWord && wordsArray.length > 1);
        randomWords.push(selectedWord);
        lastWord = selectedWord;
    }
    return randomWords;
}

/**
 * Function to check user input and update statistics
 * This function is called every time the user types in the input field.
 * It checks if the typed word is correct, updates statistics, and manages the display of words.
 * @param {string} value - The current value of the input field
 */
function checkInput(value) {
    if (value.endsWith(' ')) {
        let typedWord = value.trim();
        let correctWord = currentWords[wordIndex];

        let wordEnd = Date.now();
        let wordTime = wordEnd - wordStart;

        // Update word statistics
        words[correctWord].times.push(wordTime);
        words[correctWord].total++;

        // Check if the typed word is correct and apply appropriate highlighting
        let isCorrect = typedWord === correctWord;
        if (isCorrect) {
            words[correctWord].correct++;
            document.getElementById(`line${lineIndex}word${wordIndex}`).classList.add('correct');
        } else {
            document.getElementById(`line${lineIndex}word${wordIndex}`).classList.add('incorrect');
        }

        // Update last ten correct attempts
        if (!words[correctWord].lastTenCorrect) {
            words[correctWord].lastTenCorrect = [];
        }
        if (words[correctWord].lastTenCorrect.length >= 10) {
            words[correctWord].lastTenCorrect.shift();
        }
        words[correctWord].lastTenCorrect.push(isCorrect ? 1 : 0);

        // Save updated word data to localStorage
        localStorage.setItem('words', JSON.stringify(words));
        
        // Reset word start time for the next word
        wordStart = wordEnd;

        // Move to the next word
        wordIndex++;

        // Check if we've reached the end of a line
        if (wordIndex === wordsPerLine) {
            wordIndex = 0;  // Reset word index for the new line
            lineIndex++;    // Move to the next line

            // Update currentWords when moving to the second line
            if (lineIndex === 1) {
                currentWords = nextWords;
            }

            // Check if we've completed the second line
            if (lineIndex === 2) {
                shiftWords();         // Update word arrays
                updateWordDisplay();  // Update the display
                lineIndex = 1;        // Set to the middle line
                currentWords = nextWords; // Update currentWords to the new middle line
                wordStart = Date.now(); // Reset timing for the new line
            }
        }

        // Clear input field and update statistics display
        document.getElementById('wordInput').value = '';
        displayStats();
    }
}

/**
 * Function to calculate word statistics
 * This function processes the stored word data and calculates various statistics,
 * including average WPM for each word.
 * @returns {Array} An array of objects containing statistics for each word
 */
function calculateWordStats() {
    return Object.keys(words).map((word) => {
        let wordWeight = weightedWords ? word.length / 5 : 1;
        let {times, correct, total, lastTenCorrect} = words[word];
        let lastTenTimes = times.slice(-10);
        let totalLastTenTimeInMinutes = lastTenTimes.reduce((a, b) => a + b, 0) / 60000;

        let lastTenCorrectAttempts = lastTenCorrect ? lastTenCorrect.reduce((a, b) => a + b, 0) : 0;
        let attemptsLastTen = lastTenTimes.length;
        let errorsInLastTenAttempts = attemptsLastTen - lastTenCorrectAttempts;
        let averageWPM = totalLastTenTimeInMinutes > 0
            ? Math.max(0, ((wordWeight * attemptsLastTen) / totalLastTenTimeInMinutes) - (errorsInLastTenAttempts / totalLastTenTimeInMinutes))
            : Infinity;

        return { word, count: lastTenTimes.length, correct, total, averageWPM };
    });
}

/**
 * Function to get the slowest words
 * This function identifies the slowest words based on average WPM and typing frequency.
 * It ensures a mix of untyped and slow typed words.
 * Words in selectedSlowWords are not replaced until they have been typed at least once.
 * @param {number} count - The number of slow words to return
 * @returns {Array} An array of the slowest words
 */
function getSlowestWords(count) {
    console.log(`Starting getSlowestWords function with count: ${count}`);
    
    // Calculate and sort word statistics
    let wordStats = calculateWordStats();
    wordStats.sort((a, b) => a.averageWPM - b.averageWPM);
    console.log('Word stats calculated and sorted:', wordStats);

    let slowestWords = [];
    // Separate untyped words (Infinity WPM) from typed words
    let untypedWords = wordStats.filter(w => w.averageWPM === Infinity).map(w => w.word);
    let typedWords = wordStats.filter(w => w.averageWPM !== Infinity).map(w => w.word);
    console.log('Untyped words:', untypedWords);
    console.log('Typed words:', typedWords);

    // Step 1: Include words from selectedSlowWords that haven't been typed yet
    selectedSlowWords.forEach(word => {
        if (untypedWords.includes(word) && slowestWords.length < count) {
            slowestWords.push(word);
            untypedWords = untypedWords.filter(w => w !== word);
            console.log(`Added untyped selectedSlowWord: ${word}`);
        }
    });

    // Step 2: Fill with other untyped words
    while (slowestWords.length < count && untypedWords.length > 0) {
        let randomIndex = Math.floor(Math.random() * untypedWords.length);
        let selectedWord = untypedWords[randomIndex];
        slowestWords.push(selectedWord);
        untypedWords.splice(randomIndex, 1);
        console.log(`Added random untyped word: ${selectedWord}`);
    }

    // Step 3: Fill with the slowest typed words
    while (slowestWords.length < count && typedWords.length > 0) {
        let nextWord = typedWords.shift();
        // Include the word if it's not in selectedSlowWords or if it has been typed at least once
        if (!selectedSlowWords.includes(nextWord) || wordStats.find(w => w.word === nextWord).count > 0) {
            slowestWords.push(nextWord);
            console.log(`Added slow typed word: ${nextWord}`);
        } else {
            console.log(`Skipped selectedSlowWord that hasn't been typed: ${nextWord}`);
        }
    }

    // Step 4: If we still don't have enough words, add random words from the original wordArray
    while (slowestWords.length < count) {
        let randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
        // Include the word if it's not already in slowestWords and
        // if it's not in selectedSlowWords or if it has been typed at least once
        if (!slowestWords.includes(randomWord) && 
            (!selectedSlowWords.includes(randomWord) || wordStats.find(w => w.word === randomWord).count > 0)) {
            slowestWords.push(randomWord);
            console.log(`Added random word from wordArray: ${randomWord}`);
        } else {
            console.log(`Skipped random word: ${randomWord}`);
        }
    }

    console.log('Final list of slowest words:', slowestWords);
    return slowestWords;
}

/**
 * Function to display statistics
 * This function creates and updates the statistics table shown to the user.
 * It displays overall typing speed and individual word statistics.
 */
function displayStats() {
    let stats = calculateWordStats();
    
    // Separate current slow words from other words
    let slowWordStats = stats.filter(stat => selectedSlowWords.includes(stat.word));
    let otherWordStats = stats.filter(stat => !selectedSlowWords.includes(stat.word));
    
    // Sort slow words: never-typed first, then by averageWPM
    slowWordStats.sort((a, b) => {
        if (a.averageWPM === Infinity && b.averageWPM === Infinity) {
            return a.word.localeCompare(b.word);
        }
        if (a.averageWPM === Infinity) return -1;
        if (b.averageWPM === Infinity) return 1;
        return a.averageWPM - b.averageWPM;
    });
    
    // Sort other words: never-typed first, then by averageWPM
    otherWordStats.sort((a, b) => {
        if (a.averageWPM === Infinity && b.averageWPM === Infinity) {
            return a.word.localeCompare(b.word);
        }
        if (a.averageWPM === Infinity) return -1;
        if (b.averageWPM === Infinity) return 1;
        return a.averageWPM - b.averageWPM;
    });
    
    // Combine sorted arrays: slow words first, then other words
    stats = [...slowWordStats, ...otherWordStats];

    // Calculate overall average WPM
    let overallAverageWPM = 0;
    let validWPMCount = 0;
    stats.forEach(({averageWPM}) => {
        if (averageWPM !== Infinity) {
            overallAverageWPM += averageWPM;
            validWPMCount++;
        }
    });
    overallAverageWPM /= validWPMCount;

    // Create statistics table
    let statsTable = document.createElement('table');
    statsTable.className = 'statsTable';

    // Create table header
    let tableHeader = document.createElement('thead');
    let headerRow = document.createElement('tr');
    ['Word', 'Total', 'aWPM'].forEach(text => {
        let th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);
    statsTable.appendChild(tableHeader);

    // Create overall statistics row
    let overallRow = document.createElement('tr');
    ['Overall', '--', overallAverageWPM.toFixed(2)].forEach(text => {
        let td = document.createElement('td');
        td.textContent = text;
        overallRow.appendChild(td);
    });
    statsTable.appendChild(overallRow);

    // Create table body with individual word statistics
    let tableBody = document.createElement('tbody');

    stats.forEach(({ word, total, averageWPM }) => {
        let row = document.createElement('tr');
        if (selectedSlowWords.includes(word)) {
            row.classList.add('slow');
        }
        [
            word, 
            total, 
            averageWPM === Infinity ? '-' : averageWPM.toFixed(2)
        ].forEach(text => {
            let td = document.createElement('td');
            td.textContent = text;
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });

    statsTable.appendChild(tableBody);

    // Update the DOM with the new statistics table
    let wordStatsContainer = document.getElementById('wordStats');
    wordStatsContainer.innerHTML = '';
    wordStatsContainer.appendChild(statsTable);
}

function shiftWords() {
    // Update the current slow words
    selectedSlowWords = getSlowestWords(slowWordsNum);

    // Shift word arrays: current becomes next
    currentWords = nextWords;
    
    // Move future words to next
    nextWords = futureWords;
    // Generate new future words from the updated slow words
    futureWords = getRandomWords(selectedSlowWords, wordsPerLine);
}

function updateWordDisplay() {
    let wordsContainer = document.getElementById('wordsContainer');
    
    // Remove the first (top) line
    wordsContainer.removeChild(wordsContainer.firstChild);
    
    // Update IDs and content of remaining lines
    for (let i = 0; i < 2; i++) {
        let words = wordsContainer.children[i].children;
        let wordArray = i === 0 ? currentWords : nextWords;
        for (let j = 0; j < words.length; j++) {
            // Update the ID to reflect the new line position
            words[j].id = `line${i}word${j}`;
            // Update the word text
            words[j].textContent = wordArray[j];
            // No class clearing here
        }
    }
    
    // Add new line at the bottom
    let newLine = document.createElement('p');
    futureWords.forEach((word, index) => {
        let wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        wordSpan.id = `line2word${index}`;
        newLine.appendChild(wordSpan);
    });
    wordsContainer.appendChild(newLine);
}

// Initialize the application when the window loads
window.onload = function() {
    document.getElementById('wordInput').focus();
    document.getElementById('wordInput').addEventListener('input', function() {
        checkInput(this.value);
    });
    displayWords();
    displayStats();
};

// Initial display of words and statistics
displayWords();
displayStats();