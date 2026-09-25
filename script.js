const promptInput = document.getElementById("storyPrompt");
const styleInput = document.getElementById("style");
const voiceInput = document.getElementById("voice");
const durationInput = document.getElementById("duration");
const generateBtn = document.getElementById("generateBtn");
const result = document.getElementById("result");

generateBtn.addEventListener("click", function () {

  const prompt = promptInput.value.trim();

  if (prompt === "") {
    result.innerHTML = "<p>⚠️ Pehle story ka idea likho.</p>";
    return;
  }

  const style = styleInput.value;
  const voice = voiceInput.value;
  const duration = durationInput.value;

  // Story ko sentences mein divide karna
  const sentences = prompt
    .split(/[.!?।]+/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0);

  // Kam se kam 3 scenes
  let scenes = sentences.slice(0, 6);

  if (scenes.length === 1) {
    scenes = [
      scenes[0],
      "Character story mein aage badhta hai.",
      "Story ka ending scene."
    ];
  }

  result.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "🎬 Story Generated";
  result.appendChild(title);

  const info = document.createElement("p");
  info.textContent =
    `🎨 ${style}  •  🗣️ ${voice}  •  ⏱️ ${duration}`;
  result.appendChild(info);

  const heading = document.createElement("h3");
  heading.textContent = "🎞️ Scenes";
  result.appendChild(heading);

  scenes.forEach(function (sceneText, index) {

    const card = document.createElement("div");
    card.className = "scene-card";

    const sceneTitle = document.createElement("h4");
    sceneTitle.textContent = `Scene ${index + 1}`;

    const sceneTextElement = document.createElement("p");
    sceneTextElement.textContent = sceneText;

    card.appendChild(sceneTitle);
    card.appendChild(sceneTextElement);

    result.appendChild(card);
  });

  const voiceBtn = document.createElement("button");
  voiceBtn.textContent = "🗣️ Play Narration";
  voiceBtn.id = "voiceBtn";

  result.appendChild(voiceBtn);

  voiceBtn.addEventListener("click", function () {

    if (!("speechSynthesis" in window)) {
      alert("Voice is not supported in this browser.");
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
