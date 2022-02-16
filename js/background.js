//@Used API: chrome.tabs,chrome.tabgroups,chrome.windows,chrome.stroge/
//
import {
  Variable,
  addWindowsIdIntoArray,
  variableReset,
  tabFlow,
  addIdToList,
  groupManagement,
  createNewGroup,
  foldGroup,
  getGroupID,
  getGroupInfo,
  selectIntoGroupTab,
  groupAbout,
  getTabInfo,
  isSuccessSearch,
  moveGroup,
  preventBublle,
  changeGroupColor,
  tabHighlight
} from "./declear.js";

var groupColor;
var windowsIdArray = [0, 0, 0];
var currentWindowsId = 0;
var variable1 = new Variable(0, [], 0, 0, undefined, false, false, undefined, undefined, []);
var variable2 = new Variable(0, [], 0, 0, undefined, false, false, undefined, undefined, []);
var variable3 = new Variable(0, [], 0, 0, undefined, false, false, undefined, undefined, []);
chrome.storage.local.set(variable1);
chrome.storage.local.set(variable2);
chrome.storage.local.set(variable3);
var sourseTime = new Date();
var hour = sourseTime.getHours();
var minute = sourseTime.getMinutes();
var second = sourseTime.getSeconds();
var time = ' ' + hour + ':' + minute + ':' + second

//@brief:initialization
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    color: 'grey'
  }, function () {});
  chrome.storage.sync.set({
    maxTabs: '5 (笔记本推荐设置)'
  }, function () {});
  chrome.storage.sync.set({
    groupLocation: 0
  }, function () {});
})
//@brief:Great group
chrome.tabs.onActivated.addListener((value) => {
  currentWindowsId = value.windowId;
  addWindowsIdIntoArray(currentWindowsId);
  console.log("当前窗口id", currentWindowsId, "现存所有窗口id:", windowsIdArray, time);
  var tabid = value.tabId;

  if (currentWindowsId == windowsIdArray[0]) {
    //console.log("当前窗口id:",currentWindowsId,"进入变量1");
    chrome.storage.local.get(variable1, (variable1) => {
      console.log(variable1.tabsIdList);
      console.log(variable1.clock);
      tabFlow(variable1, tabid);
      
      setTimeout(function(){
        console.log("tabflow运行结束");
        chrome.storage.local.set(variable1);
      },50);
      
    })
  } else if (currentWindowsId == windowsIdArray[1]) {
    console.log("当前窗口id:", currentWindowsId, "进入二号窗口");
    chrome.storage.local.get(variable2, (variable2) => {
      tabFlow(variable2, tabid);
      chrome.storage.local.set(variable2);
    })
  } else if (currentWindowsId == windowsIdArray[2]) {
    console.log("当前窗口id:", currentWindowsId, "进入变量3");
    chrome.storage.local.get(variable3, (variable3) => {
      tabFlow(variable3, tabid);
      chrome.storage.local.set(variable3);
    })
  }
})

//@brief:Reset needs dates when windows be closed
chrome.windows.onRemoved.addListener((value) => {
  //console.log("监听到：windows.onRemoved","现存所有窗口id:",windowsIdArray,time);
  //console.log(value==windowsIdArray[0]);
  //console.log("触发窗口关闭事件","id:",value,"现存窗口列表:",windowsIdArray);
  if (value == windowsIdArray[0]) {
    variableReset(variable1);
    windowsIdArray[0] = 0;
    console.log("id为:", value, "的一号窗口已被关闭", "现存窗口:", windowsIdArray, time);
    chrome.storage.local.set(variable1);
  } else if (value == windowsIdArray[1]) {
    variableReset(variable2);
    windowsIdArray[1] = 0;
    console.log("id为:", value, "的二号窗口已被关闭", "现存窗口:", windowsIdArray, time);
    chrome.storage.local.set(variable2);
  } else if (value == windowsIdArray[2]) {
    variableReset(variable3);
    windowsIdArray[2] = 0;
    console.log("id为:", value, "的三号窗口已被关闭", "现存窗口:", windowsIdArray, time);
    chrome.storage.local.set(variable3);
  } else {
    windowsIdArray.remove(value);
    console.log("窗口id为:", value, "的列表外窗口已被关闭", time);
  }
})
//@brief:Synchronize remove tab's id in the tabidlist when tab be removed
chrome.tabs.onRemoved.addListener((closedTabId, removeInfo) => {

  if (removeInfo.windowId == windowsIdArray[0]) {
    console.log("关闭一号窗口 id为", closedTabId, '的标签页');
    if (variable1.tabsIdList.includes(closedTabId)) {
      variable1.tabsIdList.remove(closedTabId);
      chrome.storage.local.set(variable1);
    } else {
      variable1.groupTabsList.remove(closedTabId);
      chrome.storage.local.set(variable1);
    }
  } else if (removeInfo.windowId == windowsIdArray[1]) {
    console.log("关闭二号窗口 id为", closedTabId, '的标签页');
    if (variable2.tabsIdList.includes(closedTabId)) {
      variable2.tabsIdList.remove(closedTabId);
      chrome.storage.local.set(variable2);
    } else {
      variable2.groupTabsList.remove(closedTabId);
      chrome.storage.local.set(variable2);
    }
  } else if (removeInfo.windowId == windowsIdArray[2]) {
    console.log("关闭三号窗口 id为", closedTabId, '的标签页');
    if (variable3.tabsIdList.includes(closedTabId)) {
      variable3.tabsIdList.remove(closedTabId);
      chrome.storage.local.set(variable3);
    } else {
      variable3.groupTabsList.remove(closedTabId);
      chrome.storage.local.set(variable3);
    }
  }
})
//@brief:When tabs detach at windows,remove it's id for tabsidlist.
chrome.tabs.onDetached.addListener((closedTabId, removeInfo) => {
  if (removeInfo.oldWindowId == windowsIdArray[0]) {
    console.log("关闭一号窗口 id为", closedTabId, '的标签页');
    if (variable1.tabsIdList.includes(closedTabId)) {
      variable1.tabsIdList.remove(closedTabId);
      chrome.storage.local.set(variable1);
    } else {
      variable1.groupTabsList.remove(closedTabId);
      chrome.storage.local.set(variable1);
    }
  } else if (removeInfo.oldWindowId == windowsIdArray[1]) {
    console.log("关闭二号窗口 id为", closedTabId, '的标签页');
    if (variable2.tabsIdList.includes(closedTabId)) {
      variable2.tabsIdList.remove(closedTabId);
      chrome.storage.local.set(variable2);
    } else {
      variable2.groupTabsList.remove(closedTabId);
      chrome.storage.local.set(variable2);
    }
  } else if (removeInfo.oldWindowId == windowsIdArray[2]) {
    console.log("关闭三号窗口 id为", closedTabId, '的标签页');
    if (variable3.tabsIdList.includes(closedTabId)) {
      variable3.tabsIdList.remove(closedTabId);
      chrome.storage.local.set(variable3);
    } else {
      variable3.groupTabsList.remove(closedTabId);
      chrome.storage.local.set(variable3);
    }
  }
})
//@brief:Reset needs dates when group be closed
chrome.tabGroups.onRemoved.addListener((value) => {
  //console.log("监听到：tabGroups.onRemoved");
  if (value.windowId == windowsIdArray[0]) {
    variable1.clock = 0;
    variable1.intoGroupTabsNumbers = 0;
    variable1.groupId = undefined;
    variable1.groupTabsList = [];

    chrome.storage.local.set(variable1);
  } else if (value.windowId == windowsIdArray[1]) {
    variable2.clock = 0;
    variable2.intoGroupTabsNumbers = 0;
    variable2.groupId = undefined;
    variable2.groupTabsList = [];
    chrome.storage.local.set(variable2);
  } else if (value.windowId == windowsIdArray[2]) {
    variable3.clock = 0;
    variable3.intoGroupTabsNumbers = 0;
    variable3.groupId = undefined;
    variable3.groupTabsList = [];
    chrome.storage.local.set(variable3);
  }
})
//@brief:Change group's color when sync storage be changed.
chrome.storage.onChanged.addListener((change) => {
  //is group exist?
  if (change.color) {
    if (variable1.clock) {
      changeGroupColor(change.color.newValue, variable1);
    }
    if (variable2.clock) {
      changeGroupColor(change.color.newValue, variable2);
    }
    if (variable3.clock) {
      changeGroupColor(change.color.newValue, variable3);
    }
  }
  if (variable1.groupLocation) {
    moveGroup(variable1.groupId, change.groupLocation.newValue);
  }
  if (variable2.groupLocation) {
    moveGroup(variable2.groupId, change.groupLocation.newValue);
  }
  if (variable3.groupLocation) {
    moveGroup(variable3.groupId, change.groupLocation.newValue);
  }
})
/*
@brief:Get val's index of array
@parameter:val
@return:val's index of array
*/
Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
}
/*
@brief:Remove val of array
@parameter:val
@return:
*/
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
}

export {
  groupColor,
  windowsIdArray,
  currentWindowsId,
  variable1,
  variable2,
  variable3,
  sourseTime,
  hour,
  minute,
  second,
  time
};