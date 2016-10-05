var synth = window.speechSynthesis;
var sentences = [
    ["SEE", "SPOT", "RUN"],
    ["I", "EAT", "APPLES"],
    ["MARY", "PLAYS", "BALL"]
];
var currentSentenceNumber = 0;
var currentWordNumber = 0;
var wordsInPosition = ["", "", "", "", "", "", "", "", ""];

var shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var shuffleWords = function() {
    var newOrder = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    var wordIndex = 0;
    for (var i in sentences) {
        for (var j in sentences[i]) {
            $("#grid-" + newOrder[wordIndex]).html(sentences[i][j]);
            wordsInPosition[newOrder[wordIndex]] = sentences[i][j];
            wordIndex++;
        }
    }
}

var play = function(textToPlay) {
    var playThis = new SpeechSynthesisUtterance(textToPlay);
    playThis.rate = 1.5;
    synth.speak(playThis);
    console.log("SPOKE: " + textToPlay);
}

var playCurrentSentence = function() {
    play("The sentence is... " + sentences[currentSentenceNumber].join(" "));
}

var playCurrentWord = function() {
    play(sentences[currentSentenceNumber][currentWordNumber]);
}

var checkWord = function(gridPosition) {
    play(wordsInPosition[gridPosition]);
    if (wordsInPosition[gridPosition] == sentences[currentSentenceNumber][currentWordNumber]) {
        sentenceTextArray = sentences[currentSentenceNumber].slice(0, currentWordNumber + 1);
        $("#sentence-text").html(sentenceTextArray.join(" "));
        play("You found the right word!");
        currentWordNumber++;
        runWord();
    } else {
        play(wordsInPosition[gridPosition] + "... is not the right word. Let's try again.");
        play("Find the word... " + sentences[currentSentenceNumber][currentWordNumber]);
    }
}

var runWord = function() {
    if (currentWordNumber < sentences[currentSentenceNumber].length) {
        play("Find the word... " + sentences[currentSentenceNumber][currentWordNumber]);
    } else {
        $("#good-job").fadeIn("slow");
        play("You found all the right words!");
    }
}

var runSentence = function(sentenceNumber) {
    $("#game-board").show()
    $("#get-started").hide();
    $("#good-job").hide();
    $("#image-banner").hide("slow");
    $("#sentence-text").html("&nbsp;");
    currentSentenceNumber = sentenceNumber;
    currentWordNumber = 0;
    for (var i in sentences) {
        $("#button-sentence-" + i).removeClass("active");
    }
    $("#button-sentence-" + currentSentenceNumber).addClass("active");
    shuffleWords();
    play("I'm going to read a sentence to you. Then I will read each word. Click on the word after I say it. Let's get going!");
    playCurrentSentence();
    runWord();
}

$(".grid-word").click(function() {
    checkWord(this.id.split("-")[1]);
});

$(".button-sentence").click(function() {
    runSentence(this.id.split("-")[2]);
});

$("#button-play-word").on("click", playCurrentWord);
$("#button-play-sentence").on("click", playCurrentSentence);

$(document).ready(function() {
    $("#game-board").hide();
    $("#good-job").hide();
    play("Welcome to the reading game.");
    play("Choose a sentence to get started.");
});
