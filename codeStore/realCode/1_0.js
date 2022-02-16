//Listener at when a new tab be created.
//Used API: chrome.tabs,chrome.tabgroups,chrome.windows
var currentIndex;
var clock = 0;
var groupId;
var tab;
var currentId;
var group;
var updateProperties={
    collapsed:true
}
/* chrome.runtime.onConnect.addListener (()=>{
  tabFlow();
}); */
chrome.tabs.onActivated.addListener(()=>{
  //tabsCreatedTimes++;
  console.log(clock);
  tabFlow();
  
});
chrome.windows.onRemoved.addListener(()=>{
  clock = 0;
})
/* chrome.tabs.onAttached.addListener(()=>{
  tabFlow();
}) */

/* chrome.tabs.onDetached.addListener(()=>{
  tabsCreatedTimes--;
  console.log(tabsCreatedTimes);
}); */

/*
    @brief:Main function.
    @parameter:None
    @return:None
*/
function tabFlow(){
  

  tab = getTabInfo();
  //promise对象的语法,会执行第一个函数,第一次会创建新组,第二次以后会加入旧组
  tab.then(function(value){
    currentIndex=value.index;
    console.log("当前索引:",currentIndex);
    //if it's equl to 4,make a group at index 0,put 0  into group
    if(currentIndex>=4){
      console.log("进入循环1");
      //tab Re-assay
      //console.log("索引是什么?",currentIndex);
      //console.log(typeof currentIndex);
      tab = getTabInfo(currentIndex);
      //Will focus in a tab that currentIndex-4
      tab.then(function(value){
        console.log("进入循环2");
        currentId = value.id;
        console.log("索引是什么?",value.index);
        //console.log("id是什么?",currentId);
        if(clock==0){
          console.log("进入循环3");
          createNewGroup(currentId);
          clock = 1;
          console.log("入组标签id",currentId);
          console.log("入组标签索引",currentIndex);
          group = getGroupInfo();
          group.then(function(value){
            groupId = value.id;
            chrome.tabGroups.update(groupId,updateProperties);
          },function(){
            console.log("Failed");
          })
          //foldGroup(groupId);
        }else{
          console.log("进入循环4");
          //console.log(groupId);
          console.log("入组标签id",currentId);
          console.log("入组标签索引",currentIndex);
          createNewGroup(currentId,groupId);
        }
        //console.log("在外部打印的组id",groupId);
        
        //foldGroup();
        //moveTabs();
      },function(){
        console.log("Filed!");
      });

      
    }

  },function(){console.log("Filed!");});
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

function foldGroup(groupId){
  var updateProperties={
    collapsed:true
  }
  chrome.tabGroups.update(groupId,updateProperties);
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
    @brief:Get the recently opened tab's info.
    @parameter:None
    @return:A tab promise object.
*/ 
async function getTabInfo(tabIndex){
  
  var queryInfo;
  //console.log("getTabInfo被调用");
  if(tabIndex==undefined){
      // Tab is Choosed
      queryInfo = {
      active:true 
    }
    //console.log("索引未指定");

  }else{
    queryInfo = {
      index:tabIndex-4
    }
    //console.log("入组");
  }
  
  var [tabs] = await chrome.tabs.query(queryInfo);
  return tabs;
}

async function getGroupInfo(){
  var groupInfo;
  groupInfo = {}
  var [TabGroup] = await chrome.tabGroups.query(groupInfo);
  return TabGroup;
}

