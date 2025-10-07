//get the page content for API

(function() {
  function getPageContent() {
    let text = document.body.innerText;
    // clean the text
    text = text.replace(/(\s{2,}|\n\s*\n)/g, '\n').trim(); 
    return text.substring(0, 50000);
  }

  chrome.runtime.sendMessage({
    action: "PAGE_CONTENT",
    content: getPageContent()
  });
})();
