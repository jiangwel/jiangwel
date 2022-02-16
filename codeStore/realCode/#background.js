
chrome.runtime.onInstalled.addListener(()=>{
  function MakeTabList(tabIdList,num){
    this.tabIdList = tabIdList;
  }
  var buff;
  var obj1 =new MakeTabList([0]);
  chrome.storage.local.set(obj1.tabIdList);//上传
  chrome.storage.local.get(obj1,(value)=>{//增加值
    console.log('原列表',value.tabIdList);
    obj1.tabIdList=value.tabIdList;
    console.log('原列表',obj1.tabIdList);
    obj1.tabIdList.push(1);
    console.log('增加值后的列表',value.tabIdList);
    chrome.storage.local.set(obj1,()=>{
      obj1.tabIdList.remove(1);
      chrome.storage.local.set(obj1,()=>{
        console.log('删除值后的列表:',obj1.tabIdList);
      })
  });
  })
})
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
      this.splice(index, 1);
  }
}
