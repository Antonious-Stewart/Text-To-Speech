const speech = window.speechSynthesis; // web speech api

// DOM elements
const form = document.querySelector('form');
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const button = document.querySelector("button");

// voices arr
let voices = [];

const getVoices = () =>{
  voices = speech.getVoices();
  console.log(voices);
  // loop through voices and create option for each one
  voices.forEach(voice =>{
    const option = document.createElement('option');
    //fill option with voice lang and name
    option.textContent = voice.name + '('+ voice.lang +')';
    option.setAttribute('data-lang',voice.lang);
    option.setAttribute('data-name',voice.name);
    voiceSelect.appendChild(option);
  })
};
getVoices();
// web speech api is async and loads onvoiceschanged
if(speech.onvoiceschanged !== undefined){
  speech.onvoiceschanged = getVoices;
}

// speak functionality
const speak = () =>{
  if(speech.speaking){
    console.log('speaking');
    return;
  }
  if(textInput.value !== ''){
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    // speak end
    speakText.onend = e =>{
      console.log('done');
    }
    // speak error
    speakText.onerror = err =>{
      console.error(err)
    }
    // selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    // loop through voices
    voices.forEach( voice =>{
      if(voice.name === selectedVoice){
        speakText.voice = voice;
      }
    })
    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // speak
    speech.speak(speakText);
  }
}


// evt listeners

form.addEventListener("submit",evt=>{
  evt.preventDefault();
  speak();
  textInput.blur();
})


rate.addEventListener('change' ,(evt)=>{
   rateValue.textContent = rate.value 
    speak();
  })
pitch.addEventListener('change' ,(evt)=>{ 
  pitchValue.textContent = pitch.value 
  speak();  
})
voiceSelect.addEventListener('change',evt => speak());