const promptInput = document.getElementById("storyPrompt");
const videoPlayer = document.getElementById("videoPlayer");
const styleInput = document.getElementById("style");
const voiceInput = document.getElementById("voice");
const durationInput = document.getElementById("duration");
const generateBtn = document.getElementById("generateBtn");
const result = document.getElementById("result");

// Yahan apni Pollinations App Key डालना
const CLIENT_ID = "pk_f5MMvw8OryFvEdRa";

// Same page callback
const REDIRECT_URI = 

// Random security value
function randomString(length = 32) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return result;
}

// SHA-256 PKCE challenge
async function createChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);

  const hash = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  return btoa(
    String.fromCharCode(...new Uint8Array(hash))
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// AI connect
async function connectAI() {

  if (CLIENT_ID === "pk_YOUR_APP_KEY") {
    result.innerHTML =
      "<p>⚠️ Pehle Pollinations App Key डालो.</p>";
    return;
  }

  const verifier = randomString(64);

  const challenge =
    await createChallenge(verifier);

  sessionStorage.setItem(
    "pkce_verifier",
    verifier
  );

  const state = randomString(32);

  sessionStorage.setItem(
    "oauth_state",
    state
  );

  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "usage",
    state: state,
    code_challenge: challenge,
    code_challenge_method: "S256"
  });

  window.location.href =
    "https://enter.pollinations.ai/authorize?" +
    params.toString();
}

// Generate image
async function generateImage(promptText) {

  const accessToken =
    sessionStorage.getItem("pollinations_token");

  if (!accessToken) {
    result.innerHTML =
      "<p>⚠️ Pehle Connect AI दबाओ.</p>";
    return;
  }

  const imagePrompt = `
Create a beautiful children's 3D animated movie frame.

Keep the characters consistent.

Main character:
cute 8-year-old Indian boy,
short black hair,
big expressive brown eyes,
yellow T-shirt,
blue shorts,
blue backpack,
white shoes.

Animal:
cute brown-and-white puppy,
floppy ears,
red collar,
friendly face.

Scene:
${promptText}

Style:
high quality 3D children's animation,
colorful Indian environment,
warm sunlight,
cinematic lighting,
wide landscape shot,
full body characters,
cute expressive faces,
professional animated movie frame.

Do not make it photorealistic.
Do not make it a photograph.
`;

  result.innerHTML =
    "<p>⏳ AI image generate ho rahi hai...</p>";

  try {

    const response = await fetch(
      "https://gen.pollinations.ai/v1/images/generations",
      {
        method: "POST",

        headers: {
          "Authorization":
            "Bearer " + accessToken,

          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          model: "flux",
          prompt: imagePrompt,
          size: "1024x576"
        })
      }
    );

    if (!response.ok) {
      throw new Error(
        "Image API error: " +
        response.status
      );
    }

    const data = await response.json();

    const imageData =
      data.data &&
      data.data[0];

    if (!imageData) {
      throw new Error(
        "Image data nahi mila."
      );
    }

    const image =
      document.createElement("img");

    if (imageData.b64_json) {

      image.src =
        "data:image/png;base64," +
        imageData.b64_json;

    } else if (imageData.url) {

      image.src =
        imageData.url;

    } else {

      throw new Error(
        "Image URL nahi mila."
      );
    }

    image.style.width = "100%";
    image.style.borderRadius = "15px";
    image.style.marginTop = "15px";

    result.innerHTML =
      "<h2>🎬 Scene Ready</h2>";

    result.appendChild(image);

  } catch (error) {

    console.error(error);

    result.innerHTML =
      "<p>❌ Image generate nahi ho paayi.</p>" +
      "<p>AI connection check karo.</p>";
  }
}


// Generate button
generateBtn.addEventListener(
  "click",
  function () {

    const prompt =
      promptInput.value.trim();

    if (!prompt) {

      result.innerHTML =
        "<p>⚠️ Pehle story likho.</p>";

      return;
    }

    generateImage(prompt);
  }
);


// OAuth callback
async function handleCallback() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const code =
    params.get("code");

  const returnedState =
    params.get("state");

  if (!code) return;

  const savedState =
    sessionStorage.getItem(
      "oauth_state"
    );

  if (
    !savedState ||
    returnedState !== savedState
  ) {

    result.innerHTML =
      "<p>❌ Security check failed.</p>";

    return;
  }

  const verifier =
    sessionStorage.getItem(
      "pkce_verifier"
    );

  try {

    const response = await fetch(
      "https://enter.pollinations.ai/api/oauth/token",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body: new URLSearchParams({
          grant_type:
            "authorization_code",

          code: code,

          client_id:
            CLIENT_ID,

          redirect_uri:
            REDIRECT_URI,

          code_verifier:
            verifier
        })
      }
    );

    const data =
      await response.json();

    if (!data.access_token) {
      throw new Error(
        "Access token nahi mila."
      );
    }

    sessionStorage.setItem(
      "pollinations_token",
      data.access_token
    );

    window.history.replaceState(
      {},
      document.title,
      REDIRECT_URI
    );

    result.innerHTML =
      "<p>✅ AI connected! Ab Generate Story dabao.</p>";

  } catch (error) {

    console.error(error);

    result.innerHTML =
      "<p>❌ AI connect nahi ho paaya.</p>";
  }
}


// Page load
handleCallback();
async function generateAIVideo(promptText) {
  const token = sessionStorage.getItem("pollinations_token");

  if (!token) {
    result.innerHTML = "<p>⚠️ पहले AI Connect करना होगा.</p>";
    return;
  }

  result.innerHTML = "<p>🎬 AI video बन रही है... थोड़ा समय लग सकता है.</p>";

  const videoPrompt = `
Create a colorful 3D animated children's story video.

Story:
${promptText}

Keep the same characters throughout the video.
Use smooth character movement and natural actions.
Bright cinematic lighting.
Colorful environment.
Family-friendly children's animation.
`;

  try {
    const url =
      "https://gen.pollinations.ai/video/" +
      encodeURIComponent(videoPrompt) +
      "?model=veo&duration=4";

    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    if (!response.ok) {
      throw new Error("Video generation failed: " + response.status);
    }

    const blob = await response.blob();

    const videoURL = URL.createObjectURL(blob);

    result.innerHTML = "";

    const video = document.createElement("video");

    video.src = videoURL;
    video.controls = true;
    video.autoplay = false;
    video.style.width = "100%";
    video.style.borderRadius = "15px";

    result.appendChild(video);

  } catch (error) {
    console.error(error);

    result.innerHTML =
      "<p>❌ Video generate नहीं हो पाई.</p>";
  }
}
generateBtn.addEventListener("click", function () {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    result.innerHTML = "<p>⚠️ पहले story लिखो.</p>";
    return;
  }

  generateAIVideo(prompt);
});
const connectBtn = document.getElementById("connectBtn");

connectBtn.addEventListener("click", function () {
  connectAI();
});
