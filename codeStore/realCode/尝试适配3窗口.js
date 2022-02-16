//@Used API: chrome.tabs,chrome.tabgroups,chrome.windows

/* var windowsFilters={
  windowTypes:"normal"
} */
var windowsIdArray=[];
var windowsId;

chrome.windows.onFocusChanged.addListener((value)=>{
  windowsId=value;
  addWindowsIdIntoArray(value);
  console.log("当前窗口id",windowsId,"窗口id列表:",windowsIdArray);
  }
)

  var clock = 0;//0:Does not exist group 1:Exist group
  var tabsIdList=[];//Tab's id where in the browser.
  var matherWebId=0;//Mather wed's id
  var intoGroupTabsNumbers=0;//Tab's number that enterd group  
  var groupId;//Exist group's id
  var motherWebExist=false;//Is mother web exist?
  var isMomWeb=false;//Is Mother web?
  var intoGroupTabId; //Will enter group what tabid

  chrome.tabs.onActivated.addListener(()=>{

    tabFlow();
  });
  chrome.windows.onRemoved.addListener(()=>{
    variableReset();
    windowsIdArray.remove(windowsIdArray[0]);
  })
  chrome.tabs.onRemoved.addListener(
    function(closedTabId,removeInfo){
      tabsIdList.remove(closedTabId);
    }
  )
  chrome.tabGroups.onRemoved.addListener(()=>{
    clock=0;
    intoGroupTabsNumbers=0;
    groupId=undefined;
    }
  )

  var clock = 0;//0:Does not exist group 1:Exist group
  var tabsIdList=[];//Tab's id where in the browser.
  var matherWebId=0;//Mather wed's id
  var intoGroupTabsNumbers=0;//Tab's number that enterd group  
  var groupId;//Exist group's id
  var motherWebExist=false;//Is mother web exist?
  var isMomWeb=false;//Is Mother web?
  var intoGroupTabId; //Will enter group what tabid

  chrome.tabs.onActivated.addListener(()=>{
    console.log("进入switch case 2");
  //console.log(clock);
    console.log("三个需要重置的值:",clock,tabsIdList,intoGroupTabsNumbers);
    tabFlow();
    
  });
  chrome.windows.onRemoved.addListener(()=>{
    windowsIdArray.remove(windowsIdArray[1]);
    variableReset();
  })
  chrome.tabs.onRemoved.addListener(
    function(closedTabId,removeInfo){
      tabsIdList.remove(closedTabId);
    }
  )
  chrome.tabGroups.onRemoved.addListener(()=>{
    clock=0;
    intoGroupTabsNumbers=0;
    groupId=undefined;
    }
  )

  var clock = 0;//0:Does not exist group 1:Exist group
  var tabsIdList=[];//Tab's id where in the browser.
  var matherWebId=0;//Mather wed's id
  var intoGroupTabsNumbers=0;//Tab's number that enterd group  
  var groupId;//Exist group's id
  var motherWebExist=false;//Is mother web exist?
  var isMomWeb=false;//Is Mother web?
  var intoGroupTabId; //Will enter group what tabid

  chrome.tabs.onActivated.addListener(()=>{
    console.log("进入switch case 3");
  //console.log(clock);
    console.log("三个需要重置的值:",clock,tabsIdList,intoGroupTabsNumbers);
    tabFlow();
    
  });
  chrome.windows.onRemoved.addListener(()=>{
    variableReset();
    windowsIdArray.remove(windowsIdArray[2]);
  })
  chrome.tabs.onRemoved.addListener(
    function(closedTabId,removeInfo){
      tabsIdList.remove(closedTabId);
    }
  )
  chrome.tabGroups.onRemoved.addListener(()=>{
    clock=0;
    intoGroupTabsNumbers=0;
    groupId=undefined;
    }
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
function variableReset(){
  clock = 0;
  tabsIdList=[];
  intoGroupTabsNumbers=0;
  motherWebExist=false;
  isMomWeb=false;
}


function tabFlow(){
  var currentId;
  var tab;
  var currentIndex;

  tab = getTabInfo();
  tab.then(function(value){
    currentIndex=value.index;
    currentId=value.id;  //2.得到当前的标签的id 
    if(addIdToList(currentId)){  //5.如果标签id列表的长度大于5 并且确实新建了标签
      console.log("所有标签的id:",tabsIdList);
      console.log("满足生成组的条件");
      groupAbout(intoGroupTabsNumbers);  
    }
  },function(){console.log("Filed!");});
}

/*
  @brief:Add non-repeating id to list
  @parameter:id
  @return:if list's length increase and list's length >5 return true else return false
*/
function addIdToList(id){
  //3.把当前的标签的id加入标签id列表 
  var startList;
  var endList;

  startList = tabsIdList.length;
  if(!tabsIdList.includes(id)){
    tabsIdList.push(id);
  }
  endList=tabsIdList.length;
  if(tabsIdList.length>=5 && endList>startList){
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
function groupManagement(id){
  //5-a.如果锁是开的: 
  if(clock==0){
    console.log("创建并进入组");
    //5-a-i.创建一个组 
    createNewGroup(id);
    //5-a-ii.关闭锁 
    clock = 1;
    foldAndMoveGroup();
    
    //5-b.如果锁是关的: 
  }else{
    console.log("进入已创建的组","组id:",groupId);
    createNewGroup(id,groupId);
  }
}
/*
    @brief:Create a new group and put the into the group
    @parameter:into group's tab's id,group's id
    @return:
  */
function createNewGroup(tabId,groups){
   
  var info = {
    tabIds:tabId,
    groupId:groups
  }
  chrome.tabs.group(info);
}

function foldAndMoveGroup(){
  var updateProperties={
    collapsed:true
  }
  group = getGroupInfo();
  group.then(function(value){
    groupId = value.id;
    chrome.tabGroups.update(groupId,updateProperties);
    moveGroup(groupId);
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
  groupInfo = {}
  var [TabGroup] = await chrome.tabGroups.query(groupInfo);
  return TabGroup;
}
/*
  @brief:Select that will into group's tab's id
  @parameter:
  @return:
*/
function selectIntoGroupTab(index){
  var intoGroupTabId;
  //是母网页
  console.log("是不是母网页:",isMomWeb);
  if(isMomWeb){
    //存在其他母网页
    if(motherWebExist){
      //让旧的母网页入组
      intoGroupTabId=matherWebId;
      matherWebId=tabsIdList[index];
      //不存在其他母网页
    }else{
      //把除母网页之外最旧的标签放入组内
      intoGroupTabId=tabsIdList[index+1];
      matherWebId=tabsIdList[index];
      motherWebExist=true;
      intoGroupTabsNumbers++;
    }
    //最旧的网页不属于母网页
  }else{
    //最旧的网页入组
    intoGroupTabId=tabsIdList[index];
  }
  return intoGroupTabId;
}
/*
  @brief:Judge whether or not a motherweb
  @parameter:
  @return:
*/
function groupAbout(index){
  var tabId;
  var url

  tabId = tabsIdList[index];
  //google.com/search?q="||"baidu&wd="||"search.naver?"||"https://www.baidu.com/s?ie=UTF-8&wd=
  chrome.tabs.get(tabId,function(tab){
    console.log(isSuccessSearch(tab.url),tab.url);
    if(isSuccessSearch(tab.url)){
      isMomWeb=true;
      console.log("检测到母网页");
    }else{
      isMomWeb=false;
    }
    intoGroupTabId = selectIntoGroupTab(intoGroupTabsNumbers);
    intoGroupTabsNumbers++;
    groupManagement(intoGroupTabId);
    tabsIdList.remove(intoGroupTabId);
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
      active:true 
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
    index:0
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