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
    var textInput=allINputs.item.type="text";
    for(let i=0;i<allINputs.length;i++){
      let obj=allINputs[i];
      switch(obj.type){
        //输入框
        case "text":
        case "password":
        obj.value=obj.id;
        
          // obj.value=RandomStr();
          break;
        case "radio":
          obj.checked=Math.random()>0.5;
        break;
        case "checkbox":
        case "radio":
          //obj.name
          obj.checked=Math.random()>0.5;
        //根据分组,保证每个分组最少选一个
        break;
        case "color":
          obj.value="#"+RandomStr(true).substr(-6);
        break;
        case "date":
          obj.value=GetDate();
        break;
        case "datetime":
        break;
        case "datetime-local":
        break;
        case "email":
          obj.value=RandomStr()+'@'+RandomMailDomainName();
        break;
        case "file":
        break;
        case "hidden":
        break;
        case "image":
        break;
        // case "month":
        // //FIXME
        //   obj.value=GetMonth();
        // break;
        case "number":
          if(obj.max==""){
            let count=Math.random()*10%10;
            let max=1;
            for(;count>0;count--){
              max*=10;
            }
            obj.value=Math.floor(Math.random()*(max));
          }
          else{
            obj.value=Math.floor(Math.random()*(obj.max));
          }
          // obj.maxLength
        break;
        case "range":
          if(obj.max==""){
            obj.value=Math.floor(Math.random()*(100));
          }
          else{
            obj.value=Math.floor(Math.random()*(obj.max));
          }
        break;
        case "search":
        break;
        case "url":
          obj.value=RandomShechme()+"://"+RandomHost()+'.'+RandomStr()+
                    '.'+RandomDoaminName();
        break;
        case "week":

        break;
      }
    }
    //多行文本框
    let allTextareas=document.getElementsByTagName("textarea");

  }
  //随机主机头
  function RandomHost(){
    let names=["www","mail","translate","image","map"];
    return RandomRange(names);
  }
  //随机协议名称
  function RandomShechme(){
    let names=["http","https"];
    return RandomRange(names);
  }
  function RandomDoaminName(){
    let names=["com","org","cn","edu","gov","xyz"];
    return RandomRange(names);
  }
  //随机邮箱域名
  function RandomMailDomainName(){
    let names=["163.com","126.com","qq.com","gmail.com"];
    return RandomRange(names);
  }
  function RandomRange(range){
    return range[Math.floor(Math.random()*(range.length ))];
  }
  function RandomStr(isHex=false){
    return Math.random().toString(isHex?16:36).substr(2);
  }
  function GetTime(){
    var d=new Date();
    return d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds();
  }
  function GetYear(){
    var d=new Date();
    return Random(2000,d.getFullYear());
  }
  function GetMonth(){
    let m=Random(1,12);
    m=m<10?'0'+m:m;
    return GetYear()+'-'+m;
  }
  function GetDate(){
    let day=Random(1,31);
    day=day<10?'0'+day:day;
    //判断此月份是否包含指定的day
    //FIXME
    return GetMonth()+'-'+day;
  }
  function GetDateTime(){
    return GetDate()+' '+GetTime();
  }
  function removeExistingBeasts() {
    let allINputs=document.getElementsByTagName("input");
    for(let i=0;i<allINputs.length;i++){
      if(allINputs[i].type=="text"){
        allINputs[i].value="";
      }
    }
  }
  function Random(min,max){
    return Math.floor(Math.random()*(max-min)+min);
  }
  browser.runtime.onMessage.addListener((message) => {
    if(message.command ==="random"){
      random();
    }else if (message.command === "reset") {
      removeExistingBeasts();
    }
  });
})();
