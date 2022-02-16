import {groupColor,windowsIdArray,currentWindowsId,variable1,variable2,variable3,sourseTime,hour,minute,second,time} from './background.js';
function Variable() {
    this.clock = 0; //0:Does not exist group 1:Exist group
    this.tabsIdList = []; //Tab's id where in the browser.
    this.matherWebId = 0; //Mather wed's id
    this.intoGroupTabsNumbers = 0; //Tab's number that enterd group  
    this.groupId = undefined; //Exist group's id
    this.motherWebExist = false; //Is mother web exist?
    this.isMomWeb = false; //Is Mother web?
    this.intoGroupTabId = undefined; //Will enter group what tabid
    this.currentId = undefined;
    this.groupTabsList = [];
  }
/*
  @brief:Reset Add windowsId into windowsIdArray
  @parameter:
  @return:
*/
function addWindowsIdIntoArray(id) {
    if (id != -1 && !windowsIdArray.includes(id)) {
        if(windowsIdArray[0]==0){
          windowsIdArray[0]=id;
        }else if(windowsIdArray[1]==0){
          windowsIdArray[1]=id;
        }else if(windowsIdArray[2]==0){
          windowsIdArray[2]=id;
        }
    }
  }
  /*
  @brief:Reset variable when windows be closed
  @parameter:
  @return:
  */
  function variableReset(object) {
    object.clock = 0;
    object.tabsIdList = [];
    object.intoGroupTabsNumbers = 0;
    object.motherWebExist = false;
    object.isMomWeb = false;
    object.groupTabsList = [];
  }
  
  
  function tabFlow(object, tabid) {
    object.currentId = tabid; //2.得到当前的标签的id 
    console.log("当前标签的ID:", object.currentId, time);
    if (addIdToList(object.currentId, object)) { //5.如果标签id列表的长度大于5 并且确实新建了标签
        console.log("满足生成组的条件", time);
        groupAbout(object.intoGroupTabsNumbers, object);
    }
  }
  
  /*
  @brief:Add non-repeating id to list
  @parameter:id
  @return:if list's length increase and list's length >5 return true else return false
  */
  function addIdToList(id, object) {
    //3.把当前的标签的id加入标签id列表 
    var startList;
    var endList;
  
    startList = object.tabsIdList.length;
    if (!object.tabsIdList.includes(id) && !object.groupTabsList.includes(id)) {
        object.tabsIdList.push(id);
        console.log("实时标签页ID列表:", object.tabsIdList, time);
    }
    endList = object.tabsIdList.length;
    if (object.tabsIdList.length >= 6 && endList > startList) {
        return true;
    } else {
        return false;
    }
  }
  /*
  @brief:Manage that creat group and put tabs into group.
  @parameter:Will enter group's tab's id
  @return:
  */
  function groupManagement(id, object) {
    //5-a.如果锁是开的: 
    if (object.clock == 0) {
        
        //5-a-i.创建一个组 
        createNewGroup(object,id);
        console.log("创建并进入组 组id:",object.groupId,time);
        //5-a-ii.关闭锁 
        object.clock = 1;
        foldGroup(object);
        setTimeout(function(){
          openAndCloseGroup(object.groupId);
        },200);
  
        //5-b.如果锁是关的: 
    } else {
        console.log("进入已创建的组", "组id:", object.groupId, time);
        createNewGroup(object,id,object.groupId);
        //以迅雷不及掩耳之势打开关闭组
        setTimeout(function(){
          openAndCloseGroup(object.groupId);
        },200);
        
    }
  }
  /*
    @brief:Create a new group and put the into the group
    @parameter:into group's tab's id,group's id
    @return:
  */
  function createNewGroup(object,tabId, groups) {
    var windowInfo = {
        windowId: currentWindowsId
    }
    var info;
    var state=1;
    //if group is does not exist create new group
    if (groups == undefined) {
        info = {
            createProperties: windowInfo,
            tabIds: tabId
        }
    } else {
        info = {
            tabIds: tabId,
            groupId: groups
        }
        state=0;
    }
  
    chrome.tabs.group(info,(value)=>{
      if(state){
        object.groupId=value;
      }
      chrome.storage.sync.get(['groupLocation','color'], function(result){
        changeGroupColor(result.color,object);
        moveGroup(object.groupId,result.groupLocation);
      })
    });
  }
  
  function foldGroup(object) {
    var updateProperties = {
        collapsed: true
    }
    var group = getGroupInfo();
    group.then(function (value) {
        chrome.tabGroups.update(object.groupId, updateProperties);
    }, function () {
        console.log("foldGroup is Failed", time);
    })
  }
  
  function getGroupID() {
    var group1;
    var groupID;
    group1 = getGroupInfo();
    group1.then(function (value) {
        console.log("2组id:", value.id);
        groupID = value.id
    }, function () {
        console.log("Failed");
    })
    return groupID;
  }
  
  /*
  @brief:Gat a group object
  @parameter:
  @return:
  */
  async function getGroupInfo() {
    var groupInfo;
    groupInfo = {
        windowId: currentWindowsId
    }
    var [TabGroup] = await chrome.tabGroups.query(groupInfo);
    return TabGroup;
  }
  /*
  @brief:Select that will into group's tab's id
  @parameter:
  @return:
  */
  function selectIntoGroupTab(index, object) {
    var intoGroupTabId;
    //是母网页
    console.log("是不是母网页:", object.isMomWeb);
    if (object.isMomWeb) {
        //存在其他母网页
        if (object.motherWebExist) {
            //让旧的母网页入组
            intoGroupTabId = object.matherWebId;
            object.matherWebId = object.tabsIdList[index];
            //不存在其他母网页
        } else {
            //把除母网页之外最旧的标签放入组内
            intoGroupTabId = object.tabsIdList[index + 1];
            object.matherWebId = object.tabsIdList[index];
            object.motherWebExist = true;
            object.intoGroupTabsNumbers++;
        }
        //最旧的网页不属于母网页
    } else {
        //最旧的网页入组
        console.log("已经入组的标签个数:", index.time);
        intoGroupTabId = object.tabsIdList[index];
    }
    return intoGroupTabId;
  }
  /*
  @brief:Judge whether or not a motherweb
  @parameter:
  @return:
  */
  function groupAbout(index, object) {
    var tabId;
    var url;
    tabId = object.tabsIdList[index];
    console.log("最旧的标签页id:", tabId, time);
    //google.com/search?q="||"baidu&wd="||"search.naver?"||"https://www.baidu.com/s?ie=UTF-8&wd=
    chrome.tabs.get(tabId, function (tab) {
        console.log(isSuccessSearch(tab.url), tab.url);
        if (isSuccessSearch(tab.url)) {
            object.isMomWeb = true;
            console.log("检测到母网页", time);
        } else {
            object.isMomWeb = false;
        }
        object.intoGroupTabId = selectIntoGroupTab(object.intoGroupTabsNumbers, object);
        console.log("将要进组的标签的id", object.intoGroupTabId, time);
        //object.intoGroupTabsNumbers++;
        groupManagement(object.intoGroupTabId, object);
        object.tabsIdList.remove(object.intoGroupTabId);
        object.groupTabsList.push(object.intoGroupTabId);
        console.log("剩余所有标签的id:", object.tabsIdList, time);
    });
  }
  /*
    @brief:Get the recently opened tab's info.
    @parameter:None
    @return:A tab promise object.
  */
  async function getTabInfo(tabIndex) {
  
    var queryInfo;
    //console.log("getTabInfo被调用");
    if (tabIndex != undefined) {
        queryInfo = {
            index: tabIndex
        }
        //console.log("索引未指定");
  
    } else {
        queryInfo = {
            active: true,
            windowId: currentWindowsId
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
  function isSuccessSearch(url) {
    var result1 = url.indexOf("search?q=");
    var result2 = url.indexOf("baidu&wd=");
    var result3 = url.indexOf("search.naver?");
    var result4 = url.indexOf("www.baidu.com/s?ie=UTF-8&wd=");
    //console.log(result1,result2,result3,result4,url);
    if (result1 == -1 && result2 && -1 && result3 == -1 && result4 == -1) {
        return false;
    } else {
        return true;
    }
  }
  /*
  @brief:Move group to the beginning of the window
  @parameter:the id of the group that will be moved
  @return:
  */
  function moveGroup(id,moveGroup_index) {
    var moveProperties;
    moveProperties = {
        index: moveGroup_index,
        windowId: currentWindowsId
    }
    chrome.tabGroups.move(id, moveProperties);
  }
  function preventBublle(event) {
    var e = arguments.callee.caller.arguments[0] || event;
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else if (window.event) {
        window.event.cancelBubble = true;
    }
  }
/* 
@brief:change group color
@parameter:
@return:
*/
function changeGroupColor(groupcolor,object) {
  var updateProperties = {
    color: groupcolor
  }
  /* var group = getGroupInfo();
  group.then(function (value) {
    object.groupId = value.id; */
    chrome.tabGroups.update(object.groupId, updateProperties);
 /*  }, function () {
    console.log("changeGroupColor is Failed", time);
  }) */
}
/* 
@brief:openAndCloseGroup for insist group iron display bug 
@parameter:
@return:
*/
function openAndCloseGroup(group_id){
  var updateProperties = {
    collapsed: false
  }
  chrome.tabGroups.update(group_id,updateProperties);
  updateProperties.collapsed=true;
  chrome.tabGroups.update(group_id,updateProperties);

  
}

function tabHighlight(tab_index){
  var highlightInfo={
    tabs:tab_index
  }
  chrome.tabs.highlight(highlightInfo,()=>{});
}

export {Variable,addWindowsIdIntoArray,variableReset,tabFlow,addIdToList,groupManagement,createNewGroup,foldGroup,getGroupID,getGroupInfo,selectIntoGroupTab,groupAbout,getTabInfo,isSuccessSearch,moveGroup,preventBublle,changeGroupColor,tabHighlight};