chrome.runtime.onInstalled.addListener(()=>{
  var tabidlist = [1,2,3]
  chrome.storage.local.set(tabidlist);
  chrome.storage.local.get('obj',(value)=>{
    console.log(value);
  })
  chrome.storage.local.remove(tabidlist[0])
  chrome.storage.local.get('obj',(value)=>{
    console.log(value);
  })
})