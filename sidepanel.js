const apiKeySection = document.getElementById("apiKeySection");
const mainSection = document.getElementById("mainSection");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveKeyBtn = document.getElementById("saveKeyBtn");

const summarizeBtn = document.getElementById("summarizeBtn");
const summaryDiv = document.getElementById("summary");

const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatOutput = document.getElementById("chatOutput");

// Load API key, if found hide key input panel else show input for key
chrome.storage.local.get("GEMINI_API_KEY", (data) => {
  if (data.GEMINI_API_KEY) {
    apiKeySection.style.display = "none";
    mainSection.style.display = "block";
  }
});

// Save key in local storage
saveKeyBtn.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (!key) return alert("Please enter a valid API key.");
  chrome.storage.local.set({ GEMINI_API_KEY: key }, () => {
    apiKeySection.style.display = "none";
    mainSection.style.display = "block";
  });
});

// Call Gemini API
async function callGemini(prompt) {
  const { GEMINI_API_KEY } = await chrome.storage.local.get("GEMINI_API_KEY");

  const data = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  ).then(response=>response.json());

  if (data.error) throw new Error(data.error.message);
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
}

// Summarizing Page
summarizeBtn.addEventListener("click", async () => {
  summaryDiv.innerHTML = "⏳ Summarizing...";
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const [{ result: pageText }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.body.innerText.slice(0, 5000),
    });

    const summaryPrompt = `Summarize the following text into clean, bullet points. Remove intros like "Here's a summary":\n${pageText}`;
    const summary = await callGemini(summaryPrompt);
    const formatted = formatSummaryText(summary);

    summaryDiv.innerHTML = formatted.replace(/\n/g, "<br>");
  } catch (err) {
    summaryDiv.innerHTML = `<p style="color:red;">❌ ${err.message}</p>`;
  }
});

// Chatting with Gemini 
sendBtn.addEventListener("click", async () => {
  const question = userInput.value.trim();
  if (!question) return;

  chatOutput.innerHTML += `<div class="chat"><b>You:</b> ${question}</div>`;
  userInput.value = "";

  chatOutput.innerHTML += `<div class="chat">⏳ Synapse is typing...</div>`;

  try {
    const reply = await callGemini(question);
    const formattedReply = formatSummaryText(reply);
    chatOutput.lastElementChild.innerHTML = `<b>Synapse:</b> ${formattedReply}`;
  } catch (err) {
    chatOutput.lastElementChild.innerHTML = `<b>Error:</b> ${err.message}</b>`;
  }
});


//format text with bullets and line breaks
function formatSummaryText(text) {
  if (!text) return "";

  // Remove introductory sentences like "Here's a concise summary..."
  text = text.replace(/Here'?s a concise summary.*?\n/i, "");

  // Convert **text** to <b>text</b>
  text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // Convert bullet points to <li>
  let formatted = text
    .replace(/^\s*[-*]\s+/gm, "<li>")           // lines starting with * or -
    .replace(/\n<li>/g, "</li>\n<li>");         // close previous list item
  if (formatted.includes("<li>")) {
    formatted = "<ul>" + formatted + "</li></ul>";
  }

 //handle brakes 
  formatted = formatted.replace(/\n\s*\n/g, "<br><br>");
  formatted = formatted.replace(/\n/g, "<br>");

  return formatted;
}

