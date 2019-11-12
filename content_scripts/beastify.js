(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
//生成随机字符串
  function random(){
    let allINputs=document.getElementsByTagName("input");
    for(let i=0;i<allINputs.length;i++){
      if(allINputs[i].type=="text"){
        allINputs[i].value=Math.random().toString(36).substr(2);
      }
    }
  }
  function removeExistingBeasts() {
    let allINputs=document.getElementsByTagName("input");
    for(let i=0;i<allINputs.length;i++){
      if(allINputs[i].type=="text"){
        allINputs[i].value="";
      }
    }
  }
  browser.runtime.onMessage.addListener((message) => {
    if(message.command ==="random"){
      random();
    }else if (message.command === "reset") {
      removeExistingBeasts();
    }
  });
})();
