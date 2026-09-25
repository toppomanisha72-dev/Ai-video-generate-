const playBtn = document.getElementById("playBtn");
const nextSceneBtn = document.getElementById("nextSceneBtn");

const walkBtn = document.getElementById("walkBtn");
const jumpBtn = document.getElementById("jumpBtn");
const stopBtn = document.getElementById("stopBtn");

const character = document.getElementById("character");
const narration = document.getElementById("narration");
const sceneTitle = document.getElementById("sceneTitle");
const scene = document.querySelector(".scene");

let currentScene = 0;

const scenes = [
  {
    title: "Scene 1",
    character: "🧍",
    text: "Ek baar ek chhota sa bachcha jungle mein gaya.",
    background:
      "linear-gradient(to bottom, #87ceeb 0%, #bde9ff 65%, #79b84a 65%, #4f8f32 100%)"
  },

  {
    title: "Scene 2",
    character: "🧍 🐕",
    text: "Jungle mein uski mulaqat ek pyare kutte se hui.",
    background:
      "linear-gradient(to bottom, #9bdcff 0%, #d7f3ff 65%, #6fa34b 65%, #477b32 100%)"
  },

  {
    title: "Scene 3",
    character: "🧍 🐕",
    text: "Dono dost ban gaye aur saath mein jungle ke raste par chalne lage.",
    background:
      "linear-gradient(to bottom, #ffd98a 0%, #ffecc7 65%, #72a84b 65%, #426f2f 100%)"
  }
];

function showScene() {
  const current = scenes[currentScene];

  sceneTitle.textContent = current.title;
  character.textContent = current.character;
  narration.textContent = current.text;
  scene.style.background = current.background;

  character.style.animation = "none";
}

function speak(text) {
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();

    const voice = new SpeechSynthesisUtterance(text);

    voice.lang = "hi-IN";
    voice.rate = 0.9;
    voice.pitch = 1;

    speechSynthesis.speak(voice);
  }
}

playBtn.addEventListener("click", function () {
  showScene();

  character.style.animation =
    "characterWalk 5s linear";

  speak(scenes[currentScene].text);
});

nextSceneBtn.addEventListener("click", function () {
  currentScene++;

  if (currentScene >= scenes.length) {
    currentScene = 0;
  }

  showScene();
  speak(scenes[currentScene].text);
});

walkBtn.addEventListener("click", function () {
  character.style.animation =
    "characterWalk 5s linear infinite";
});

jumpBtn.addEventListener("click", function () {
  character.style.animation =
    "characterJump 1s ease-in-out";
});

stopBtn.addEventListener("click", function () {
  character.style.animation = "none";
});
