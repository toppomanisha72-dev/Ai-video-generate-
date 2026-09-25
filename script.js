const promptInput = document.getElementById("storyPrompt");
const styleInput = document.getElementById("style");
const voiceInput = document.getElementById("voice");
const durationInput = document.getElementById("duration");
const generateBtn = document.getElementById("generateBtn");
const result = document.getElementById("result");

function getCharacter(text) {
  const t = text.toLowerCase();

  if (t.includes("kutta") || t.includes("dog") || t.includes("कुत्ता")) {
    return "🐕 Ek chhota kutta";
  }

  if (t.includes("bachcha") || t.includes("child") || t.includes("बच्चा")) {
    return "🧒 Ek bachcha";
  }

  if (t.includes("ladki") || t.includes("girl") || t.includes("लड़की")) {
    return "👧 Ek ladki";
  }

  if (t.includes("ladka") || t.includes("boy") || t.includes("लड़का")) {
    return "👦 Ek ladka";
  }

  return "🧍 Main character";
}

function getBackground(text) {
  const t = text.toLowerCase();

  if (t.includes("jungle") || t.includes("forest") || t.includes("जंगल")) {
    return "🌳 Jungle";
  }

  if (t.includes("ghar") || t.includes("home") || t.includes("घर")) {
    return "🏠 Ghar";
  }

  if (t.includes("school") || t.includes("स्कूल")) {
    return "🏫 School";
  }

  if (t.includes("park") || t.includes("पार्क")) {
    return "🌲 Park";
  }

  if (t.includes("gaon") || t.includes("village") || t.includes("गांव")) {
    return "🏡 Village";
  }

  return "🌎 Story location";
}

function getAction(text) {
  const t = text.toLowerCase();

  if (
    t.includes("ghumta") ||
    t.includes("ghoomta") ||
    t.includes("walk") ||
    t.includes("jata") ||
    t.includes("jaata") ||
    t.includes("जाता") ||
    t.includes("घूम")
  ) {
    return "🚶 Character is walking / moving";
  }

  if (
    t.includes("milta") ||
    t.includes("milta") ||
    t.includes("meets") ||
    t.includes("मिलता")
  ) {
    return "🤝 Character meets someone";
  }

  if (
    t.includes("daud") ||
    t.includes("run") ||
    t.includes("दौड़")
  ) {
    return "🏃 Character is running";
  }

  if (
    t.includes("baith") ||
    t.includes("sit") ||
    t.includes("बैठ")
  ) {
    return "🪑 Character is sitting";
  }

  if (
    t.includes("so") ||
    t.includes("sleep") ||
    t.includes("सो")
  ) {
    return "😴 Character is sleeping";
  }

  if (
    t.includes("khel") ||
    t.includes("play") ||
    t.includes("खेल")
  ) {
    return "⚽ Character is playing";
  }

  if (
    t.includes("laut") ||
    t.includes("return") ||
    t.includes("लौट")
  ) {
    return "🏠 Character is returning home";
  }

  return "🎭 Character is performing the story action";
}

generateBtn.addEventListener("click", function () {

  const prompt = promptInput.value.trim();

  if (prompt === "") {
    result.innerHTML = "<p>⚠️ Pehle story ka idea likho.</p>";
    return;
  }

  const style = styleInput.value;
  const voice = voiceInput.value;
  const duration = durationInput.value;

  const sentences = prompt
    .split(/[.!?।]+/)
    .map(text => text.trim())
    .filter(text => text.length > 0)
    .slice(0, 8);

  result.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "🎬 Storyboard Ready";
  result.appendChild(title);

  const info = document.createElement("p");
  info.textContent =
    `🎨 ${style} • 🗣️ ${voice} • ⏱️ ${duration}`;
  result.appendChild(info);

  const heading = document.createElement("h3");
  heading.textContent = "🎞️ Your Scenes";
  result.appendChild(heading);

  sentences.forEach(function (text, index) {

    const card = document.createElement("div");
    card.className = "scene-card";

    const sceneTitle = document.createElement("h4");
    sceneTitle.textContent = `Scene ${index + 1}`;

    const storyText = document.createElement("p");
    storyText.textContent = `📖 Story: ${text}`;

    const character = document.createElement("p");
    character.textContent =
      `🧍 Character: ${getCharacter(text)}`;

    const background = document.createElement("p");
    background.textContent =
      `🌳 Background: ${getBackground(text)}`;

    const action = document.createElement("p");
    action.textContent =
      `🎭 Action: ${getAction(text)}`;

    const voiceText = document.createElement("p");
    voiceText.textContent =
      `🗣️ Narration: ${text}`;

    card.appendChild(sceneTitle);
    card.appendChild(storyText);
    card.appendChild(character);
    card.appendChild(background);
    card.appendChild(action);
    card.appendChild(voiceText);

    result.appendChild(card);
  });

  const voiceBtn = document.createElement("button");
  voiceBtn.textContent = "🗣️ Play Narration";
  result.appendChild(voiceBtn);

  voiceBtn.addEventListener("click", function () {

    if (!("speechSynthesis" in window)) {
      alert("Voice supported nahi hai.");
      return;
    }

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(prompt);

    speech.lang = voice === "Hindi"
      ? "hi-IN"
      : "en-US";

    speech.rate = 0.9;
    speech.pitch = 1;

    speechSynthesis.speak(speech);
  });

});
