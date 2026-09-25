const promptInput = document.getElementById("storyPrompt");
const styleInput = document.getElementById("style");
const voiceInput = document.getElementById("voice");
const durationInput = document.getElementById("duration");
const generateBtn = document.getElementById("generateBtn");
const result = document.getElementById("result");

function getCharacter(text) {
  const t = text.toLowerCase();

  if (t.includes("कुत्ता") || t.includes("kutta") || t.includes("dog"))
    return "a cute small puppy";

  if (t.includes("बच्चा") || t.includes("bachcha") || t.includes("child"))
    return "a young child";

  if (t.includes("लड़की") || t.includes("ladki") || t.includes("girl"))
    return "a young girl";

  if (t.includes("लड़का") || t.includes("ladka") || t.includes("boy"))
    return "a young boy";

  return "the main story character";
}

function getBackground(text) {
  const t = text.toLowerCase();

  if (t.includes("जंगल") || t.includes("jungle") || t.includes("forest"))
    return "a beautiful green forest";

  if (t.includes("घर") || t.includes("ghar") || t.includes("home"))
    return "a cozy village house";

  if (t.includes("स्कूल") || t.includes("school"))
    return "a colorful school";

  if (t.includes("पार्क") || t.includes("park"))
    return "a beautiful green park";

  return "a beautiful story environment";
}

function createImagePrompt(text) {
  const character = getCharacter(text);
  const background = getBackground(text);

  return `${character} in ${background}, performing this story action: ${text}. 
Cute 3D cartoon animation style, colorful, cinematic lighting, 
detailed environment, expressive character, consistent character design, 
high quality animated movie scene.`;
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
  title.textContent = "🎬 Story Ready";
  result.appendChild(title);

  const info = document.createElement("p");
  info.textContent =
    `🎨 ${style} • 🗣️ ${voice} • ⏱️ ${duration}`;
  result.appendChild(info);

  sentences.forEach(function (text, index) {

    const card = document.createElement("div");
    card.className = "scene-card";

    const sceneTitle = document.createElement("h3");
    sceneTitle.textContent = `🎞️ Scene ${index + 1}`;

    const story = document.createElement("p");
    story.textContent = `📖 ${text}`;

    const character = document.createElement("p");
    character.textContent =
      `🧍 Character: ${getCharacter(text)}`;

    const background = document.createElement("p");
    background.textContent =
      `🌳 Background: ${getBackground(text)}`;

    const imagePrompt = document.createElement("p");
    imagePrompt.textContent =
      `🖼️ AI Image Prompt: ${createImagePrompt(text)}`;

    const imageButton = document.createElement("button");
    imageButton.textContent = "🖼️ Generate Scene Image";

    imageButton.addEventListener("click", function () {

      const encodedPrompt =
        encodeURIComponent(createImagePrompt(text));

      const imageUrl =
        `https://image.pollinations.ai/prompt/${encodedPrompt}`;

      const image = document.createElement("img");

      image.src = imageUrl;
      image.alt = "AI generated story scene";
      image.style.width = "100%";
      image.style.marginTop = "15px";
      image.style.borderRadius = "12px";

      card.appendChild(image);

      imageButton.disabled = true;
      imageButton.textContent = "✅ Image Generated";
    });

    card.appendChild(sceneTitle);
    card.appendChild(story);
    card.appendChild(character);
    card.appendChild(background);
    card.appendChild(imagePrompt);
    card.appendChild(imageButton);

    result.appendChild(card);
  });

});
