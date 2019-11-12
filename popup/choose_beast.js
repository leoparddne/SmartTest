function listenForClicks() {  
  document.addEventListener("click", (e) => {
    function random(tabs){
      browser.tabs.sendMessage(tabs[0].id, {
        command: "random",
      });
    }
    function reset(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "reset",
      });
    }
    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }
    
    if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }else if(e.target.classList.contains("random")){
      browser.tabs.query({active: true, currentWindow: true})
      .then(random)
      .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/beastify.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
