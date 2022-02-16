//@Used API: chrome.tabs,chrome.tabgroups,chrome.windows
function Variable(){
  this.clock=0;//0:Does not exist group 1:Exist group
  this.tabsIdList=[];//Tab's id where in the browser.
  this.matherWebId=0;//Mather wed's id
  this.intoGroupTabsNumbers=0;//Tab's number that enterd group  
  this.groupId=undefined;//Exist group's id
  this.motherWebExist=false;//Is mother web exist?
  this.isMomWeb=false;//Is Mother web?
  this.intoGroupTabId=undefined; //Will enter group what tabid
  this.currentId=undefined;
  }
/* var windowsFilters={
  windowTypes:"normal"
} */
var windowsIdArray=[];
var currentWindowsId;
var variable1 = new Variable(0,[],0,0,undefined,false,false,undefined,undefined);
var variable2 = new Variable(0,[],0,0,undefined,false,false,undefined,undefined);
var variable3 = new Variable(0,[],0,0,undefined,false,false,undefined,undefined);

/* chrome.windows.onFocusChanged.addListener((value)=>{
  console.log("监听到：windows.onFocusChanged");
  currentWindowsId=value;
  addWindowsIdIntoArray(value);
  //console.log("当前窗口id",currentWindowsId,"窗口id列表:",windowsIdArray);
  }
) */
//@brief: Get information of different windows
chrome.windows.onCreated.addListener((value)=>{
  console.log("监听到：windows.onCreated");
  currentWindowsId=value.id;
  addWindowsIdIntoArray(currentWindowsId);
  console.log("当前窗口id",currentWindowsId,"窗口id列表:",windowsIdArray);
  }
)

//@brief:Great group
chrome.tabs.onActivated.addListener(()=>{
  console.log("监听到：tabs.onActivated");
  console.log("启动");
  if(currentWindowsId==windowsIdArray[0]){
    console.log("启动2");
    console.log("当前窗口id:",currentWindowsId,"进入变量1");
    tabFlow(variable1);
  }
  else if(currentWindowsId==windowsIdArray[1]){
    console.log("当前窗口id:",currentWindowsId,"进入变量2");
    tabFlow(variable2);
  }
  else if(currentWindowsId==windowsIdArray[2]){
    console.log("当前窗口id:",currentWindowsId,"进入变量3");
    tabFlow(variable3);
  }
  
})
/* chrome.tabs.onCreated.addListener(()=>{
  if(currentWindowsId==windowsIdArray[0]){
    console.log("当前窗口id:",currentWindowsId,"进入变量1");
    tabFlow(variable1);
  }
  else if(currentWindowsId==windowsIdArray[1]){
    console.log("当前窗口id:",currentWindowsId,"进入变量2");
    tabFlow(variable2);
  }
  else if(currentWindowsId==windowsIdArray[2]){
    console.log("当前窗口id:",currentWindowsId,"进入变量3");
    tabFlow(variable3);
  }
}) */
//@brief:Reset needs dates when windows be closed
chrome.windows.onRemoved.addListener((value)=>{
  console.log("监听到：windows.onRemoved");
  console.log("触发窗口关闭事件","id:",value);
  
  if(value==windowsIdArray[0]){
    variableReset(variable1);
    windowsIdArray.remove(value);
    console.log("id为:",value,"的窗口已被关闭","现存窗口:",windowsIdArray);
  }
  else if(value==windowsIdArray[1]){
    variableReset(variable2);
    windowsIdArray.remove(value);
    console.log("id为:",value,"的窗口已被关闭","现存窗口:",windowsIdArray);
  }
  else if(value==windowsIdArray[2]){
    variableReset(variable3);
    windowsIdArray.remove(value);
    console.log("id为:",value,"的窗口已被关闭","现存窗口:",windowsIdArray);
  }
})
//@brief:Synchronize remove tab's id in the tabidlist when tab be removed
chrome.tabs.onRemoved.addListener((closedTabId,removeInfo)=>{
    
  console.log("监听到：tabs.onRemoved");
  if(removeInfo.windowId==windowsIdArray[0]){
      variable1.tabsIdList.remove(closedTabId);
    }
    else if(removeInfo.windowId==windowsIdArray[1]){
      variable2.tabsIdList.remove(closedTabId);
    }
    else if(removeInfo.windowId==windowsIdArray[2]){
      variable3.tabsIdList.remove(closedTabId);
    }
})
//@brief:Reset needs dates when group be closed
chrome.tabGroups.onRemoved.addListener((value)=>{
  console.log("监听到：tabGroups.onRemoved");
  if(value.windowId==windowsIdArray[0]){
    variable1.clock=0;
    variable1.intoGroupTabsNumbers=0;
    variable1.groupId=undefined;
  }
  else if(value.windowId==windowsIdArray[1]){
    variable2.clock=0;
    variable2.intoGroupTabsNumbers=0;
    variable2.groupId=undefined;
  }
  else if(value.windowId==windowsIdArray[2]){
    variable3.clock=0;
    variable3.intoGroupTabsNumbers=0;
    variable3.groupId=undefined;
  }}
)

/*
  @brief:Reset Add windowsId into windowsIdArray
  @parameter:
  @return:
*/
function addWindowsIdIntoArray(id){
  if(id!=-1){
    if(!windowsIdArray.includes(id)){
      windowsIdArray.push(id);
    }
  }
}
/*
  @brief:Reset variable when windows be closed
  @parameter:
  @return:
*/
function variableReset(object){
  object.clock = 0;
  object.tabsIdList=[];
  object.intoGroupTabsNumbers=0;
  object.motherWebExist=false;
  object.isMomWeb=false;
}


function tabFlow(object){
  var tab;

  tab = getTabInfo();
  tab.then(function(value){
    object.currentId=value.id;  //2.得到当前的标签的id 
    console.log("当前界面的ID:",object.currentId);
    if(addIdToList(object.currentId,object)){  //5.如果标签id列表的长度大于5 并且确实新建了标签
      console.log("所有标签的id:",object.tabsIdList);
      console.log("满足生成组的条件");
      groupAbout(object.intoGroupTabsNumbers,object);  
    }
  },function(){console.log("Filed!");});
}

/*
  @brief:Add non-repeating id to list
  @parameter:id
  @return:if list's length increase and list's length >5 return true else return false
*/
function addIdToList(id,object){
  //3.把当前的标签的id加入标签id列表 
  var startList;
  var endList;

  startList = object.tabsIdList.length;
  if(!object.tabsIdList.includes(id)){
    object.tabsIdList.push(id);
    console.log("实时标签ID列表:",object.tabsIdList);
  }
  endList=object.tabsIdList.length;
  if(object.tabsIdList.length>=6 && endList>startList){
    return true;
  }else{
    return false;
  }
}
/*
  @brief:Manage that creat group and put tabs into group.
  @parameter:Will enter group's tab's id
  @return:
*/
function groupManagement(id,object){
  //5-a.如果锁是开的: 
  if(object.clock==0){
    console.log("创建并进入组");
    //5-a-i.创建一个组 
    createNewGroup(id);
    //5-a-ii.关闭锁 
    object.clock = 1;
    foldAndMoveGroup(object);
    
    //5-b.如果锁是关的: 
  }else{
    console.log("进入已创建的组","组id:",object.groupId);
    createNewGroup(id,object.groupId);
  }
}
/*
    @brief:Create a new group and put the into the group
    @parameter:into group's tab's id,group's id
    @return:
  */
function createNewGroup(tabId,groups){
  var windowInfo={
    windowId:currentWindowsId
  }
  var info;
  if(groups==undefined){
    info = {
      createProperties:windowInfo,
      tabIds:tabId
    }
  }else{
    info = {
      tabIds:tabId,
      groupId:groups
    }
  }
  
  chrome.tabs.group(info);
}

function foldAndMoveGroup(object){
  var updateProperties={
    collapsed:true
  }
  group = getGroupInfo();
  group.then(function(value){
    object.groupId = value.id;
    chrome.tabGroups.update(object.groupId,updateProperties);
    moveGroup(object.groupId);
  },function(){
    console.log("foldGroup is Failed");
  })
}

function getGroupID(){
  var group1;
  var groupID;
  group1 = getGroupInfo();
  group1.then(function(value){
    console.log("2组id:",value.id);
    groupID = value.id
  },function(){
    console.log("Failed");
  })
  return groupID;
}

/*
  @brief:Gat a group object
  @parameter:
  @return:
*/
async function getGroupInfo(){
  var groupInfo;
  groupInfo = {
    windowId:currentWindowsId
  }
  var [TabGroup] = await chrome.tabGroups.query(groupInfo);
  return TabGroup;
}
/*
  @brief:Select that will into group's tab's id
  @parameter:
  @return:
*/
function selectIntoGroupTab(index,object){
  var intoGroupTabId;
  //是母网页
  console.log("是不是母网页:",object.isMomWeb);
  if(object.isMomWeb){
    //存在其他母网页
    if(object.motherWebExist){
      //让旧的母网页入组
      intoGroupTabId=object.matherWebId;
      object.matherWebId=object.tabsIdList[index];
      //不存在其他母网页
    }else{
      //把除母网页之外最旧的标签放入组内
      intoGroupTabId=object.tabsIdList[index+1];
      object.matherWebId=object.tabsIdList[index];
      object.motherWebExist=true;
      object.intoGroupTabsNumbers++;
    }
    //最旧的网页不属于母网页
  }else{
    //最旧的网页入组
    intoGroupTabId=object.tabsIdList[index];
  }
  return intoGroupTabId;
}
/*
  @brief:Judge whether or not a motherweb
  @parameter:
  @return:
*/
function groupAbout(index,object){
  var tabId;
  var url

  tabId = object.tabsIdList[index];
  //google.com/search?q="||"baidu&wd="||"search.naver?"||"https://www.baidu.com/s?ie=UTF-8&wd=
  chrome.tabs.get(tabId,function(tab){
    console.log(isSuccessSearch(tab.url),tab.url);
    if(isSuccessSearch(tab.url)){
      object.isMomWeb=true;
      console.log("检测到母网页");
    }else{
      object.isMomWeb=false;
    }
    object.intoGroupTabId = selectIntoGroupTab(object.intoGroupTabsNumbers,object);
    console.log("将要进组的标签的id",object.intoGroupTabId);
    object.intoGroupTabsNumbers++;
    groupManagement(object.intoGroupTabId,object);
    object.tabsIdList.remove(object.intoGroupTabId);
  });
}
/*
    @brief:Get the recently opened tab's info.
    @parameter:None
    @return:A tab promise object.
*/ 
async function getTabInfo(tabIndex){
  
  var queryInfo;
  //console.log("getTabInfo被调用");
  if(tabIndex!=undefined){
      queryInfo = {
      index:tabIndex
    }
    //console.log("索引未指定");

  }else{
    queryInfo = {
      active:true,
      windowId:currentWindowsId
    }
    //console.log("入组");
  }
  
  var [tabs] = await chrome.tabs.query(queryInfo);
  return tabs;
}

/* async function getTabInfoById(tabId){
  var tabUrl;
  chrome.tabs.get(tabId,function(tab){
    tabUrl =  tab.url;
  });
} */
/*
  @brief:Judge is mothertab by input url
  @parameter:
  @return:
*/
function isSuccessSearch(url){
  var result1 = url.indexOf("search?q=");
  var result2 = url.indexOf("baidu&wd=");
  var result3 = url.indexOf("search.naver?");
  var result4 = url.indexOf("www.baidu.com/s?ie=UTF-8&wd=");
  //console.log(result1,result2,result3,result4,url);
  if(result1== -1&&result2&& -1&&result3== -1&&result4== -1){
    return false;
  }else{
    return true;
  }
}
/*
  @brief:Move group to the beginning of the window
  @parameter:the id of the group that will be moved
  @return:
*/
function moveGroup(id){
  var moveProperties;
  moveProperties={
    index:0,
    windowId:currentWindowsId
  }
  chrome.tabGroups.move(id,moveProperties);
}
/*
  @brief:Get val's index of array
  @parameter:val
  @return:val's index of array
*/
Array.prototype.indexOf = function(val) { 
  for (var i = 0; i < this.length; i++) { 
  if (this[i] == val) return i; 
  } 
  return -1; 
  };
/*
  @brief:Remove val of array
  @parameter:val
  @return:
*/
Array.prototype.remove = function(val) { 
    var index = this.indexOf(val); 
    if (index > -1) { 
    this.splice(index, 1); 
    } 
    };