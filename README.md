<img src="icon.png" width="300" height="300" alt="Alt Text">

# 🌟 Synapse Summarizer : Chrome Extension powered by Gemini

**AI-Powered Page Summarization**

A simple Chrome extension built on **Manifest V3** that uses the **Google Gemini API** to provide summaries of webpage content.

## ✨ Features

* **🌐 Page Summarizer:** Get a summary of the current active webpage content with a click.
* **🔑 Secure API Key Storage:** Your Gemini API Key is stored locally using Chrome's built-in storage API.
* **⚡ Manifest V3 Compliant:** Built using the modern Service Worker architecture.

## 🚀 Installation

Follow these steps to set up and run the extension in your Chrome browser.

### Step 1: Get Your Gemini API Key

This extension requires API key to communicate with the Gemini models.

1.  **Visit Google AI Studio:** Go to the [Google AI Studio API Keys page](https://ai.google.dev/gemini-api/docs/api-key).
2.  **Create Key:** Sign in with your Google account and click **"Create API Key"**.
3.  **Copy Key:** Copy the generated key. **DO NOT share this key or upload in repository.**

### Step 2: Clone the Repository

Clone this GitHub repository to your local machine:

```bash
git clone https://github.com/PrajwalKarande/Synapse-Summarizer.git

```


### Step 3: Load the Extension in Chrome

1.  **Open Extensions Page:** Open `chrome://extensions/` in your Chrome browser.
2.  **Enable Developer Mode:** Toggle the "Developer mode" switch located in the top-right corner.
3.  **Load Unpacked:** Click the "Load unpacked" button.
4.  **Select Folder:** Select the directory where you cloned the repository (the root folder containing `manifest.json`).

The extension should now appear in your list of extensions.

### Step 4: Configure the API Key

1.  **Open Extension:** Click the extension icon in your toolbar.
2.  **Enter Key:** Paste the Gemini API key you copied.
3.  **Save:** Click the "Save Key" button.

The extension is now ready to use!

## 📖 Usage

### How to Summarize a Webpage

1.  **Navigate:** Go to any webpage with substantial text content (e.g., a news article, blog post, or long documentation page).
2.  **Activate:** Click the Synapse Summarizer Extension icon in your browser toolbar.
3.  **Summarize:** Click the "Summarize Page" button in the extension's popup.
