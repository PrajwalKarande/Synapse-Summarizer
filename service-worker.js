chrome.runtime.onInstalled.addListener(() => {
  console.log("Synapse Extension Installed");
});

chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.sidePanel.open({ tabId: tab.id });
    await chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: "sidepanel.html",
      enabled: true,
    });
    console.log("Side panel opened successfully");
  } catch (error) {
    console.error("Failed to open side panel:", error);
  }
});
