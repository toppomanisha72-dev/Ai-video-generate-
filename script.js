const promptInput = document.getElementById("storyPrompt");
const styleInput = document.getElementById("style");
const voiceInput = document.getElementById("voice");
const durationInput = document.getElementById("duration");
const generateBtn = document.getElementById("generateBtn");
const result = document.getElementById("result");


// Character ko identify karna
function getCharacter(text) {
  const t = text.toLowerCase();

  if (
    t.includes("kutta") ||
    t.includes("dog") ||
    t.includes("puppy") ||
    t.includes("कुत्ता")
  ) {
    return "cute brown and white puppy";
  }

  if (
    t.includes("ladka") ||
    t.includes("boy") ||
    t.includes("bachcha") ||
    t.includes("child") ||
    t.includes("बच्चा") ||
    t.includes("लड़का")
  ) {
    return "cute 8-year-old Indian boy";
  }

  if (
    t.includes("ladki") ||
    t.includes("girl") ||
    t.includes("लड़की")
  ) {
    return "cute young Indian girl";
  }

  return "cute young story character";
}


// Background identify karna
function getBackground(text) {
  const t = text.toLowerCase();

  if (
    t.includes("jungle") ||
    t.includes("forest") ||
    t.includes("जंगल")
  ) {
    return "beautiful green forest with trees, flowers and a small walking path";
  }

  if (
    t.includes("gaon") ||
    t.includes("village") ||
    t.includes("गांव")
  ) {
    return "beautiful colorful Indian village with small houses and green fields";
  }

  if (
    t.includes("ghar") ||
    t.includes("home") ||
    t.includes("घर")
  ) {
    return "beautiful cozy village house with garden";
  }

  if (
    t.includes("park") ||
    t.includes("पार्क")
  ) {
    return "beautiful green children's park";
  }

  return "beautiful colorful storybook environment";
}


// AI image prompt
function createImagePrompt(text) {

  let character = getCharacter(text);
  let background = getBackground(text);

  // Agar scene mein puppy hai to boy + puppy dono rakho
  if (
    text.toLowerCase().includes("puppy") ||
    text.toLowerCase().includes("kutta") ||
    text.toLowerCase().includes("dog") ||
    text.includes("कुत्ता")
  ) {
    character =
      "the same cute 8-year-old Indian boy and the same cute brown-and-white puppy";
  }

  return `
A beautiful children's 3D animated movie scene.

CHARACTERS:
The same cute 8-year-old Indian boy.
Short black hair.
Big expressive brown eyes.
Yellow T-shirt with a small sun symbol.
Blue shorts.
Blue backpack.
White shoes.

The same cute brown-and-white puppy.
Floppy ears.
Red collar.
Friendly happy face.

IMPORTANT CHARACTER CONSISTENCY:
Keep exactly the same boy and puppy appearance,
same clothes, same colors, same hairstyle,
same proportions and same cartoon design in every scene.

SCENE ACTION:
${text}

BACKGROUND:
${background}

VISUAL STYLE:
High quality 3D children's animation.
Colorful Indian cartoon movie.
Warm sunlight.
Beautiful cinematic lighting.
Detailed environment.
Cute expressive faces.
Full body characters.
Wide camera shot.
Storytelling composition.
Bright cheerful colors.
Professional animated movie frame.

The image must look like a frame from a
children's animated movie.

NO photorealism.
NO realistic photograph.
NO live action.
NO portrait.
NO close-up.
NO horror.
NO dark realistic style.
`;
}


// Generate story
generateBtn.addEventListener("click", function () {

  const prompt = promptInput.value.trim();

  if (prompt === "") {
    result.innerHTML =
      "<p>⚠️ Pehle story ka idea likho.</p>";
    return;
  }

  const style = styleInput.value;
  const voice = voiceInput.value;
  const duration = durationInput.value;

  const scenes = prompt
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


  scenes.forEach(function (text, index) {

    const card = document.createElement("div");

    card.className = "scene-card";


    const sceneTitle = document.createElement("h3");

    sceneTitle.textContent =
      `🎞️ Scene ${index + 1}`;

    card.appendChild(sceneTitle);


    const story = document.createElement("p");

    story.textContent =
      `📖 Story: ${text}`;

    card.appendChild(story);


    const imageButton =
      document.createElement("button");

    imageButton.textContent =
      "🖼️ Generate Scene Image";

    card.appendChild(imageButton);


    const imagePrompt =
      createImagePrompt(text);


    imageButton.addEventListener(
      "click",
      function () {

        imageButton.disabled = true;

        imageButton.textContent =
          "⏳ Generating...";


        const encodedPrompt =
          encodeURIComponent(imagePrompt);
const imageUrl =
  `https://image.pollinations.ai/prompt/${encodedPrompt}?model=flux&width=1024&height=576`;


        const image =
          document.createElement("img");


        image.src = imageUrl;

        image.alt =
          "AI animated story scene";


        image.style.width = "100%";

        image.style.marginTop = "15px";

        image.style.borderRadius = "15px";

        image.style.display = "block";


        image.onload = function () {

          imageButton.textContent =
            "✅ Scene Image Ready";

        };


        image.onerror = function () {

          imageButton.disabled = false;

          imageButton.textContent =
            "🔄 Try Again";

          alert(
            "Image generate nahi ho paayi. Dobara try karo."
          );

        };


        card.appendChild(image);

      }
    );


    result.appendChild(card);

  });

});
