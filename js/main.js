var synth = window.speechSynthesis;
var utterThis = new SpeechSynthesisUtterance('Click on the word. I.');
var sentence1 = new SpeechSynthesisUtterance('The sentence is. I eat Apples');


$("#play").click(function(){
      synth.speak(sentence1);      
      synth.speak(utterThis);
    });
