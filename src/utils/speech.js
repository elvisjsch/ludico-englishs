let voicesLoaded = false;

const initVoices = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      voicesLoaded = true;
    };
  }
};

initVoices();

export function speak(text) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  const preferredVoice = voices.find(voice => 
    voice.name.includes('Zira') || 
    voice.name.includes('Samantha') ||
    voice.name.includes('English')
  ) || voices[0];

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.lang = 'en-US';
  utterance.rate = 0.8;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
