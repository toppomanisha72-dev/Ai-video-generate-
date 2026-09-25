const promptInput = document.getElementById("storyPrompt");
const styleInput = document.getElementById("style");
const voiceInput = document.getElementById("voice");
const durationInput = document.getElementById("duration");
const generateBtn = document.getElementById("generateBtn");
const result = document.getElementById("result");

generateBtn.addEventListener("click", function () {

  const prompt = promptInput.value.trim();

  if (prompt === "") {
    result.textContent = "⚠️ Pehle story ka idea likho.";
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

  if (sentences.length === 0) {
    result.textContent = "⚠️ Story thodi aur detail mein likho.";
    return;
  }

  result.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "🎬 Storyboard Ready";
  result.appendChild(title);

  const info = document.createElement("p");
  info.textContent =
    `🎨 ${style}  •  🗣️ ${voice}  •  ⏱️ ${duration}`;
  result.appendChild(info);

  const heading = document.createElement("h3");
  heading.textContent = "🎞️ Your Scenes";
  result.appendChild(heading);

  sentences.forEach(function (text, index) {

    const card = document.createElement("div");
    card.className = "scene-card";

    const title = document.createElement("h4");
    title.textContent = `Scene ${index + 1}`;

    const storyText = document.createElement("p");
    storyText.textContent = `📖 ${text}`;

    const character = document.createElement("p");
    character.textContent =
      "🧍 Character: Story ke according character";

    const background = document.createElement("p");
    background.textContent =
      "🌳 Background: Scene ke according location";

    const action = document.createElement("p");
    action.textContent =
      "🎭 Action: Character scene mein action karega";

    const voiceText = document.createElement("p");
    voiceText.textContent =
      `🗣️ Voice: ${text}`;

    card.appendChild(title);
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
