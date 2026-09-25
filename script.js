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

  result.innerHTML = `
    <div class="story-result">

      <h2>🎬 Your Story</h2>

      <p><strong>Story:</strong> ${prompt}</p>

      <p><strong>Style:</strong> ${style}</p>
      <p><strong>Voice:</strong> ${voice}</p>
      <p><strong>Duration:</strong> ${duration}</p>

      <h3>🎞️ Scenes</h3>

      <div class="scene-card">
        <h4>Scene 1</h4>
        <p>🌳 Story ka beginning scene...</p>
      </div>

      <div class="scene-card">
        <h4>Scene 2</h4>
        <p>🧍 Character story mein action karega...</p>
      </div>

      <div class="scene-card">
        <h4>Scene 3</h4>
        <p>🎬 Story ka next important moment...</p>
      </div>

      <button id="voiceBtn">
        🗣️ Play Narration
      </button>

    </div>
  `;

  const voiceBtn = document.getElementById("voiceBtn");

  voiceBtn.addEventListener("click", function () {

    if ("speechSynthesis" in window) {

      speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(prompt);

      if (voice === "Hindi") {
        speech.lang = "hi-IN";
      } else {
        speech.lang = "en-US";
      }

      speech.rate = 0.9;
      speech.pitch = 1;

      speechSynthesis.speak(speech);
    }

  });

});
