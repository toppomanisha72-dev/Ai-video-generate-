const playBtn = document.getElementById("playBtn");
const character = document.getElementById("character");
const narration = document.getElementById("narration");
const sceneTitle = document.getElementById("sceneTitle");

playBtn.addEventListener("click", function () {

  // Character animation restart
  character.style.animation = "none";

  setTimeout(function () {
    character.style.animation = "characterWalk 5s linear";
  }, 50);

  // Scene text
  sceneTitle.textContent = "Scene 1";

  narration.textContent =
    "Ek baar ek chhota sa bachcha jungle mein gaya.";

  // Voice
  if ("speechSynthesis" in window) {

    speechSynthesis.cancel();

    const voice = new SpeechSynthesisUtterance(
      "Ek baar ek chhota sa bachcha jungle mein gaya."
    );

    voice.lang = "hi-IN";
    voice.rate = 0.9;
    voice.pitch = 1;

    speechSynthesis.speak(voice);
  }

});
