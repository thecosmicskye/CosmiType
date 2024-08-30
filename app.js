// Load words from LocalStorage
let wordArray = ["able", "about", "above", "add", "after", "again", "air", "all", "almost", "along", "also", "always", "an", "and", "animal", "another", "answer", "any", "are", "around", "as", "ask", "at", "away", "back", "be", "because", "become", "been", "before", "began", "begin", "below", "between", "big", "book", "both", "boy", "bring", "build", "but", "button", "buy", "by", "cable", "call", "came", "can", "car", "carry", "change", "CharaChorder", "child", "children", "city", "close", "code", "come", "computer", "con", "consider", "could", "country", "course", "cut", "day", "develop", "did", "difference", "different", "do", "does", "don't", "down", "download", "each", "early", "earth", "eat", "EMG", "end", "engineer", "enough", "even", "ever", "every", "example", "eye", "face", "fact", "family", "far", "fast", "father", "feel", "feet", "few", "fill", "find", "fine", "fire", "first", "follow", "food", "for", "form", "found", "four", "from", "general", "get", "girl", "give", "go", "gone", "good", "got", "govern", "great", "group", "grow", "had", "hand", "happen", "hard", "has", "have", "Hazel", "he", "head", "hear", "hello", "help", "her", "here", "hi", "high", "him", "his", "hit", "hold", "home", "hope", "house", "how", "however", "Hulet", "I'll", "I'm", "idea", "if", "important", "in", "increase", "interest", "into", "is", "isn't", "issue", "it", "it's", "just", "keep", "kind", "know", "land", "large", "last", "late", "later", "lead", "learn", "leave", "left", "let", "letter", "life", "light", "like", "line", "list", "little", "live", "load", "long", "look", "lose", "lot", "made", "make", "man", "many", "may", "me", "mean", "men", "menu", "might", "mile", "mind", "miss", "more", "most", "mother", "mountain", "move", "much", "must", "my", "name", "nation", "near", "need", "never", "new", "next", "nice", "night", "no", "Nostrand", "not", "note", "nothing", "now", "number", "of", "off", "often", "oil", "old", "on", "once", "one", "only", "open", "or", "order", "other", "our", "out", "over", "own", "page", "paper", "part", "past", "people", "person", "picture", "place", "plan", "plant", "play", "point", "possible", "present", "print", "problem", "probably", "program", "public", "put", "question", "quick", "quickly", "quite", "read", "real", "really", "review", "right", "river", "run", "said", "same", "saw", "say", "school", "screen", "sea", "second", "see", "seem", "seen", "sentence", "set", "she", "should", "show", "side", "sin", "since", "site", "small", "so", "some", "something", "sometime", "song", "soon", "sound", "spell", "stand", "start", "state", "still", "stop", "store", "story", "study", "such", "super", "sure", "system", "take", "talk", "team", "tell", "than", "thank", "that", "the", "their", "them", "then", "there", "these", "they", "thing", "think", "this", "those", "though", "thought", "three", "through", "time", "tip", "to", "together", "too", "took", "top", "tree", "try", "turn", "two", "type", "under", "until", "up", "us", "use", "used", "very", "walk", "want", "was", "watch", "water", "way", "we", "week", "well", "went", "were", "what", "when", "where", "which", "while", "white", "who", "why", "wide", "will", "with", "without", "won't", "word", "work", "world", "would", "write", "year", "you", "young", "your"];

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
    if (nextWords.length === 0) {
        nextWords = getRandomWords(slowWords, 10);
    }
    currentWords = nextWords;
    nextWords = getRandomWords(slowWords, 10);

    let wordLine = document.createElement('p');
    for (let i = 0; i < currentWords.length; i++) {
        let wordSpan = document.createElement('span');
        wordSpan.textContent = currentWords[i];
        wordSpan.id = 'word' + i;
        wordLine.appendChild(wordSpan);
    }
    wordsContainer.appendChild(wordLine);

    let wordLine2 = document.createElement('p');
    for (let i = 0; i < nextWords.length; i++) {
        let wordSpan = document.createElement('span');
        wordSpan.textContent = nextWords[i];
        wordSpan.id = 'nextword' + i;
        wordLine2.appendChild(wordSpan);
    }
    wordsContainer.appendChild(wordLine2);

    wordStart = Date.now();
}

let lastWord = '';

function getRandomWords(wordsArray, count) {
    try {
        let randomWords = [];
        while (randomWords.length < count) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * wordsArray.length);
            } while (wordsArray[randomIndex] === lastWord);
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
    if (value.endsWith(' ')) {
        let typedWord = value.trim();
        let correctWord = currentWords[0];

        let wordEnd = Date.now();
        let wordTime = wordEnd - wordStart;

        words[correctWord].times.push(wordTime);
        words[correctWord].total++;

        let isCorrect = typedWord === correctWord;
        if (isCorrect) {
            words[correctWord].correct++;
            document.getElementById('word0').classList.add('correct');
        } else {
            document.getElementById('word0').classList.add('incorrect');
        }

        if (!words[correctWord].lastTenCorrect) {
            words[correctWord].lastTenCorrect = [];
        }
        if (words[correctWord].lastTenCorrect.length >= 10) {
            words[correctWord].lastTenCorrect.shift();
        }
        words[correctWord].lastTenCorrect.push(isCorrect ? 1 : 0);

        localStorage.setItem('words', JSON.stringify(words));
        wordStart = wordEnd;

        currentWords.shift();

        let typedWordElement = document.getElementById('word0');
        if (typedWordElement) {
            typedWordElement.id = 'typed';
        }

        for (let i = 0; i < currentWords.length; i++) {
            let wordElement = document.getElementById('word' + (i + 1));
            if (wordElement) {
                wordElement.id = 'word' + i;
            }
        }

        if (currentWords.length === 0) {
            displayWords();
        }

        document.getElementById('wordInput').value = '';
        displayStats();
    }
}

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

function getSlowestWords(count) {
    let wordStats = calculateWordStats();
    wordStats.sort((a, b) => a.averageWPM - b.averageWPM);

    let slowestWords = [];
    let untypedWords = wordStats.filter(w => w.averageWPM === Infinity).map(w => w.word);
    while (slowestWords.length < count && untypedWords.length > 0) {
        let randomIndex = Math.floor(Math.random() * untypedWords.length);
        slowestWords.push(untypedWords[randomIndex]);
        untypedWords.splice(randomIndex, 1);
    }

    let typedWords = wordStats.filter(w => w.averageWPM !== Infinity);
    typedWords.reverse();
    while (slowestWords.length < count && typedWords.length > 0) {
        slowestWords.push(typedWords.pop().word);
    }

    return slowestWords;
}

function displayStats() {
    let stats = calculateWordStats();
    stats.sort((a, b) => a.averageWPM - b.averageWPM);

    let slowWords = getSlowestWords(slowWordsNum);

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

    let tableHeader = document.createElement('thead');
    let headerRow = document.createElement('tr');
    ['Word', 'Total', 'aWPM'].forEach(text => {
        let th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);
    statsTable.appendChild(tableHeader);

    let overallRow = document.createElement('tr');
    ['Overall', '--', overallAverageWPM.toFixed(2)].forEach(text => {
        let td = document.createElement('td');
        td.textContent = text;
        overallRow.appendChild(td);
    });
    statsTable.appendChild(overallRow);

    let tableBody = document.createElement('tbody');

    stats.forEach(({ word, total, averageWPM }) => {
        let row = document.createElement('tr');
        if (slowWords.includes(word)) {
            row.classList.add('slow');
        }
        [word, total, averageWPM === Infinity ? 'Never typed' : averageWPM.toFixed(2)].forEach(text => {
            let td = document.createElement('td');
            td.textContent = text;
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });

    statsTable.appendChild(tableBody);

    let wordStatsContainer = document.getElementById('wordStats');
    wordStatsContainer.innerHTML = '';
    wordStatsContainer.appendChild(statsTable);
}

window.onload = function() {
    document.getElementById('wordInput').focus();
    document.getElementById('wordInput').addEventListener('input', function() {
        checkInput(this.value);
    });
    displayWords();
    displayStats();
};

displayWords();
displayStats();
