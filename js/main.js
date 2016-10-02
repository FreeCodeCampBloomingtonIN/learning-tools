var synth = window.speechSynthesis;
//var utterThis = new SpeechSynthesisUtterance('This is a test.');
//synth.speak(utterThis);

sentence = "I eat apples"
sentenceArr = sentence.split(' ')
intro = 'The sentence is'
find = 'Find the word'


var intro = new SpeechSynthesisUtterance(intro);
var utterThis = new SpeechSynthesisUtterance(sentence);
synth.speak(intro);
synth.speak(utterThis);
var findWord = new SpeechSynthesisUtterance(find);


// for(var i = 0; i < sentenceArr.length; i++);{
//     synth.speak(findWord);
//     var word = new SpeechSynthesisUtterance(sentenceArr[i]);
//     synth.speak(word);
// }

for(var i=0; i<sentenceArr.length; i++){
    synth.speak(findWord);
    var word = new SpeechSynthesisUtterance(sentenceArr[i]);
    synth.speak(word);
}