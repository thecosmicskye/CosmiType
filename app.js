// Load words from LocalStorage
let wordArray = [
    "able",
    "about",
    "above",
    "add",
    "after",
    "again",
    "air",
    "all",
    "almost",
    "along",
    "also",
    "always",
    "an",
    "and",
    "animal",
    "another",
    "answer",
    "any",
    "are",
    "around",
    "as",
    "ask",
    "at",
    "away",
    "back",
    "be",
    "because",
    "become",
    "been",
    "before",
    "began",
    "begin",
    "below",
    "between",
    "big",
    "book",
    "both",
    "boy",
    "bring",
    "build",
    "but",
    "button",
    "buy",
    "by",
    "cable",
    "call",
    "came",
    "can",
    "car",
    "carry",
    "change",
    "CharaChorder",
    "child",
    "children",
    "city",
    "close",
    "code",
    "come",
    "computer",
    "con",
    "consider",
    "could",
    "country",
    "course",
    "cut",
    "day",
    "develop",
    "did",
    "difference",
    "different",
    "do",
    "does",
    "don't",
    "down",
    "download",
    "each",
    "early",
    "earth",
    "eat",
    "EMG",
    "end",
    "engineer",
    "enough",
    "even",
    "ever",
    "every",
    "example",
    "eye",
    "face",
    "fact",
    "family",
    "far",
    "fast",
    "father",
    "feel",
    "feet",
    "few",
    "fill",
    "find",
    "fine",
    "fire",
    "first",
    "follow",
    "food",
    "for",
    "form",
    "found",
    "four",
    "from",
    "general",
    "get",
    "girl",
    "give",
    "go",
    "gone",
    "good",
    "got",
    "govern",
    "great",
    "group",
    "grow",
    "had",
    "hand",
    "happen",
    "hard",
    "has",
    "have",
    "Hazel",
    "he",
    "head",
    "hear",
    "hello",
    "help",
    "her",
    "here",
    "hi",
    "high",
    "him",
    "his",
    "hit",
    "hold",
    "home",
    "hope",
    "house",
    "how",
    "however",
    "Hulet",
    "I'll",
    "I'm",
    "idea",
    "if",
    "important",
    "in",
    "increase",
    "interest",
    "into",
    "is",
    "isn't",
    "issue",
    "it",
    "it's",
    "just",
    "keep",
    "kind",
    "know",
    "land",
    "large",
    "last",
    "late",
    "later",
    "lead",
    "learn",
    "leave",
    "left",
    "let",
    "letter",
    "life",
    "light",
    "like",
    "line",
    "list",
    "little",
    "live",
    "load",
    "long",
    "look",
    "lose",
    "lot",
    "made",
    "make",
    "man",
    "many",
    "may",
    "me",
    "mean",
    "men",
    "menu",
    "might",
    "mile",
    "mind",
    "miss",
    "more",
    "most",
    "mother",
    "mountain",
    "move",
    "much",
    "must",
    "my",
    "name",
    "nation",
    "near",
    "need",
    "never",
    "new",
    "next",
    "nice",
    "night",
    "no",
    "Nostrand",
    "not",
    "note",
    "nothing",
    "now",
    "number",
    "of",
    "off",
    "often",
    "oil",
    "old",
    "on",
    "once",
    "one",
    "only",
    "open",
    "or",
    "order",
    "other",
    "our",
    "out",
    "over",
    "own",
    "page",
    "paper",
    "part",
    "past",
    "people",
    "person",
    "picture",
    "place",
    "plan",
    "plant",
    "play",
    "point",
    "possible",
    "present",
    "print",
    "problem",
    "probably",
    "program",
    "public",
    "put",
    "question",
    "quick",
    "quickly",
    "quite",
    "read",
    "real",
    "really",
    "review",
    "right",
    "river",
    "run",
    "said",
    "same",
    "saw",
    "say",
    "school",
    "screen",
    "sea",
    "second",
    "see",
    "seem",
    "seen",
    "sentence",
    "set",
    "she",
    "should",
    "show",
    "side",
    "sin",
    "since",
    "site",
    "small",
    "so",
    "some",
    "something",
    "sometime",
    "song",
    "soon",
    "sound",
    "spell",
    "stand",
    "start",
    "state",
    "still",
    "stop",
    "store",
    "story",
    "study",
    "such",
    "super",
    "sure",
    "system",
    "take",
    "talk",
    "team",
    "tell",
    "than",
    "thank",
    "that",
    "the",
    "their",
    "them",
    "then",
    "there",
    "these",
    "they",
    "thing",
    "think",
    "this",
    "those",
    "though",
    "thought",
    "three",
    "through",
    "time",
    "tip",
    "to",
    "together",
    "too",
    "took",
    "top",
    "tree",
    "try",
    "turn",
    "two",
    "type",
    "under",
    "until",
    "up",
    "us",
    "use",
    "used",
    "very",
    "walk",
    "want",
    "was",
    "watch",
    "water",
    "way",
    "we",
    "week",
    "well",
    "went",
    "were",
    "what",
    "when",
    "where",
    "which",
    "while",
    "white",
    "who",
    "why",
    "wide",
    "will",
    "with",
    "without",
    "won't",
    "word",
    "work",
    "world",
    "would",
    "write",
    "year",
    "you",
    "young",
    "your"
];

let words = {};
wordArray.forEach(word => {
    words[word] = {times: [], correct: 0, total: 0};
});

let storedWords = localStorage.getItem('words');
words = storedWords ? JSON.parse(storedWords) : words;

const slowWordsNum = 5;
const weightedWords = false;

let slowestWords = [];
let previousWord = "";
let wordStart;
let currentWords = [];
let nextWords = [];

function displayWords() {
    let wordsContainer = document.getElementById('wordsContainer');
    wordsContainer.innerHTML = ''; // Clear the words container
    let slowWords = getSlowestWords(slowWordsNum);
    console.log("slow words: " + slowWords);
    if (nextWords.length === 0) {
        nextWords = getRandomWords(slowWords, 10);
    }
    currentWords = nextWords;
    console.log("current words: " + nextWords);
    nextWords = getRandomWords(slowWords, 10);
    console.log("next words: " + nextWords);

    let wordLine = document.createElement('p');
    for (let i = 0; i < currentWords.length; i++) {
        let wordSpan = document.createElement('span');
        wordSpan.textContent = currentWords[i];
        wordSpan.id = 'word' + i; // Each word span gets a unique id based on its position
        wordLine.appendChild(wordSpan);
    }
    wordsContainer.appendChild(wordLine);

    let wordLine2 = document.createElement('p');
    for (let i = 0; i < nextWords.length; i++) {
        let wordSpan = document.createElement('span');
        wordSpan.textContent = nextWords[i];
        wordSpan.id = 'word' + i; // Each word span gets a unique id based on its position
        wordLine2.appendChild(wordSpan);
    }
    wordsContainer.appendChild(wordLine2);

    wordStart = Date.now(); // Start the timer for the first word
}

let lastWord = '';

function getRandomWords(wordsArray, count) {
    try {
        let randomWords = [];

        while (randomWords.length < count) {
            let randomIndex;

            do {
                randomIndex = Math.floor(Math.random() * wordsArray.length);
            } while (wordsArray[randomIndex] === lastWord); // Prevent consecutive duplicates

            randomWords.push(wordsArray[randomIndex]);
            lastWord = wordsArray[randomIndex];
        }

        return randomWords;
    } catch (error) {
        console.error("An error occurred while getting random words:", error);
        return [];
    }
}


function checkInput(value) {
    if (value.endsWith(' ')) { // User pressed space bar
        let typedWord = value.trim();
        let correctWord = currentWords[0];

        let wordEnd = Date.now();
        let wordTime = wordEnd - wordStart;

        // Store the time for the attempt
        words[correctWord].times.push(wordTime);
        words[correctWord].total++; // Increase the total attempts for the word

        // Check if the typed word is correct
        let isCorrect = typedWord === correctWord;
        if (isCorrect) {
            words[correctWord].correct++; // Increase the number of correct attempts for the word
            document.getElementById('word0').classList.add('correct'); // Highlight the word in green
        } else {
            document.getElementById('word0').classList.add('incorrect'); // Highlight the word in red
        }

        // Store if the attempt was correct in the lastTenCorrect array
        if (!words[correctWord].lastTenCorrect) {
            words[correctWord].lastTenCorrect = [];
        }
        if (words[correctWord].lastTenCorrect.length >= 10) {
            words[correctWord].lastTenCorrect.shift(); // Remove the oldest attempt if there are already 10
        }
        words[correctWord].lastTenCorrect.push(isCorrect ? 1 : 0);

        localStorage.setItem('words', JSON.stringify(words));
        wordStart = wordEnd;

        currentWords.shift(); // Remove the first word from the list

        let typedWordElement = document.getElementById('word0');
        if (typedWordElement) {
            typedWordElement.id = 'typed'; // Change id so it won't be affected later
        }

        // Adjust ids of remaining words
        for (let i = 0; i < currentWords.length; i++) {
            let wordElement = document.getElementById('word' + (i + 1));
            if (wordElement) {
                wordElement.id = 'word' + i;
            }
        }

        if (currentWords.length === 0) { // All words in the line were typed
            displayWords(nextWords); // Generate a new line of words
        }

        document.getElementById('wordInput').value = ''; // Clear the input box

        // Re-render the words
        displayStats(); // Update statistics immediately after each word is typed
    }
}


function calculateWordStats() {
    return Object.keys(words).map((word) => {
        let wordWeight = 1;
        if (weightedWords === true) {
            wordWeight = word.length / 5; // 5 characters per word
        }
        let {times, correct, total, lastTenCorrect} = words[word];
        let lastTenTimes = times.slice(-10); // Get the last 10 attempts
        let totalLastTenTimeInMinutes = lastTenTimes.reduce((a, b) => a + b, 0) / 60000;

        // Calculate the number of correct attempts in the last 10 attempts
        let lastTenCorrectAttempts = lastTenCorrect ? lastTenCorrect.reduce((a, b) => a + b, 0) : 0;
        let attemptsLastTen = lastTenTimes.length; // Number of attempts in last 10 attempts
        let errorsInLastTenAttempts = attemptsLastTen - lastTenCorrectAttempts;
        let averageWPM =
        totalLastTenTimeInMinutes > 0
            ? Math.max(0, ((wordWeight * attemptsLastTen) / totalLastTenTimeInMinutes) - (errorsInLastTenAttempts / totalLastTenTimeInMinutes))
            : Infinity;

        return { word, count: lastTenTimes.length, correct, total, averageWPM };
    });
}

function getSlowestWords(count) {
    let wordStats = calculateWordStats();
    wordStats.sort((a, b) => a.averageWPM - b.averageWPM);

    let slowestWords = [];

    // Get words that haven't been typed yet
    let untypedWords = wordStats.filter(w => w.averageWPM === Infinity).map(w => w.word);
    while (slowestWords.length < count && untypedWords.length > 0) {
        let randomIndex = Math.floor(Math.random() * untypedWords.length);
        slowestWords.push(untypedWords[randomIndex]);
        untypedWords.splice(randomIndex, 1);  // Remove the word from the untypedWords list
    }

    // If there aren't enough untyped words, fill in with the slowest words
    let typedWords = wordStats.filter(w => w.averageWPM !== Infinity);
    typedWords.reverse(); // Reverse the order to get slowest words first
    while (slowestWords.length < count && typedWords.length > 0) {
        slowestWords.push(typedWords.pop().word);  // Add the slowest remaining typed word
    }

    return slowestWords;
}

function displayStats() {
    let stats = calculateWordStats();
    stats.sort((a, b) => a.averageWPM - b.averageWPM); // Sort from lowest to highest WPM


    // Identify the slow words
    let slowWords = getSlowestWords(slowWordsNum);

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

    let statsTable = document.createElement('table');
    statsTable.className = 'statsTable';

    // Table header
    let tableHeader = document.createElement('thead');
    let headerRow = document.createElement('tr');
    let headerWord = document.createElement('th');
    headerWord.textContent = 'Word';
    let headerTotal = document.createElement('th');
    headerTotal.textContent = 'Total';
    let headerAverageWPM = document.createElement('th');
    headerAverageWPM.textContent = 'aWPM';

    headerRow.appendChild(headerWord);
    headerRow.appendChild(headerTotal);
    headerRow.appendChild(headerAverageWPM);
    tableHeader.appendChild(headerRow);
    statsTable.appendChild(tableHeader);

    // Overall average row
    let overallRow = document.createElement('tr');
    let overallWord = document.createElement('td');
    overallWord.textContent = 'Overall';
    let overallTotal = document.createElement('td');
    overallTotal.textContent = '--';
    let overallAverageWPMCell = document.createElement('td');
    overallAverageWPMCell.textContent = overallAverageWPM.toFixed(2);

    overallRow.appendChild(overallWord);
    overallRow.appendChild(overallTotal);
    overallRow.appendChild(overallAverageWPMCell);
    statsTable.appendChild(overallRow);


    // Table body
    let tableBody = document.createElement('tbody');

    stats.forEach(({ word, total, averageWPM }) => {
        let row = document.createElement('tr');
        let wordCell = document.createElement('td');
        wordCell.textContent = word;
        // Check if the current word is a slow word and add 'slow' class if true
        if (slowWords.includes(word)) {
            row.classList.add('slow');
        }
        let totalCell = document.createElement('td');
        totalCell.textContent = total;
        let averageWPMCell = document.createElement('td');
        averageWPMCell.textContent = averageWPM === Infinity ? 'Never typed' : averageWPM.toFixed(2);

        row.appendChild(wordCell);
        row.appendChild(totalCell);
        row.appendChild(averageWPMCell);
        tableBody.appendChild(row);
    });

    statsTable.appendChild(tableBody);

    let wordStatsContainer = document.getElementById('wordStats');
    wordStatsContainer.innerHTML = ''; // Clear previous content
    wordStatsContainer.appendChild(statsTable);
}


window.onload = function() {
    document.getElementById('wordInput').focus();
};

displayWords();
displayStats();
