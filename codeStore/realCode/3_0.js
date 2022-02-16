//@Used API: chrome.tabs,chrome.tabgroups,chrome.windows
var clock = 0;
var tabsIdList=[];
var matherWebId;
var intoGroupTabsNumbers=0;
var groupId;
var motherWebExist=false;

chrome.tabs.onActivated.addListener(()=>{
  //console.log(clock);
  tabFlow();
  
});
chrome.windows.onRemoved.addListener(()=>{
  clock = 0;
  tabsIdList=[];
  intoGroupTabsNumbers=0;
})

function tabFlow(){
  var intoGroupTabId;
  var updateProperties={
    collapsed:true
  }
  var group;
  var currentId;
  var tab;
  var startList;
  var endList;
  var currentIndex;
  var isMotherWeb=false;

  tab = getTabInfo();
  tab.then(function(value){
    currentIndex=value.index;
    //2.得到当前的标签的id 
    currentId=value.id;
    //3.把当前的标签的id加入标签id列表 
    startList = tabsIdList.length;
    if(!tabsIdList.includes(currentId)){
      tabsIdList.push(currentId);
    }
    endList=tabsIdList.length;
    //console.log("标签id列表:",tabsIdList);
    //5.如果标签id列表的长度大于5 并且确实新建了标签
    if(tabsIdList.length>=5 && endList>startList){
      console.log("所有标签的id:",tabsIdList);
      console.log("满足生成组的条件");
        //5-a-i-1.最旧的标签属于母网页 例：0，1，2，3，4... 
        console.log("id:",tabsIdList[intoGroupTabsNumbers]);

        var tabId = tabsIdList[intoGroupTabsNumbers];
        var tab1 = getTabInfo(tabId);
        tab1.then(function(value){
          tabUrl=value.url;
          if (tabUrl.search("google.com/search?q="||"baidu&wd="||"search.naver?"||"https://www.baidu.com/s?ie=UTF-8&wd=")){
            isMotherWeb=true;
          }
        },function(){
          console.log("isMotherWeb() error");
        })

        intoGroupTabId = selectIntoGroupTab(intoGroupTabsNumbers,isMotherWeb);
        intoGroupTabsNumbers++;
        //5-a.如果锁是开的: 
        if(clock==0){
          console.log("进入循环3");
          //5-a-i.创建一个组 
          console.log("进组标签id",intoGroupTabId);
          createNewGroup(intoGroupTabId);
          //5-a-ii.关闭锁 
          clock = 1;


          group = getGroupInfo();
          group.then(function(value){
            groupId = value.id;
            chrome.tabGroups.update(groupId,updateProperties);
          },function(){
            console.log("Failed");
          })
          //5-b.如果锁是关的: 
        }else{
          console.log("进入循环4");
          createNewGroup(intoGroupTabId,groupId);
        }
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
function selectIntoGroupTab(index,isMotherWeb){
  var intoGroupTabId;
  /* var isMotherWeb=false;
  var tabId;
  var tab; */
  //最旧的网页属于母网页

  /* tabId = tabsIdList[index];
  tab = getTabInfo(tabId);
  tab.then(function(value){
    tabUrl=value.url;
    if (tabUrl.search("google.com/search?q="||"baidu&wd="||"search.naver?"||"https://www.baidu.com/s?ie=UTF-8&wd=")){
      isMotherWeb=true;
    }
  },function(){
    console.log("isMotherWeb() error");
  }) */

  if(isMotherWeb){
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
/* function isMotherWeb(index){
  var tabId;
  var tabUrl;
  var tab;

  tabId = tabsIdList[index];
  tab = getTabInfo(tabId);
  tab.then(function(value){
    tabUrl=value.url;
    return tabUrl.search("google.com/search?q="||"baidu&wd="||"search.naver?"||"https://www.baidu.com/s?ie=UTF-8&wd=");
  },function(){
    console.log("isMotherWeb() error");
  })
  
} */
/*
    @brief:Get the recently opened tab's info.
    @parameter:None
    @return:A tab promise object.
*/ 
async function getTabInfo(tabID){
  
  var queryInfo;
  //console.log("getTabInfo被调用");
  if(tabID==undefined){
      // Tab is Choosed
      queryInfo = {
      active:true 
    }
    //console.log("索引未指定");

  }else{
    queryInfo = {
      id:tabID
    }
    //console.log("入组");
  }
  
  var [tabs] = await chrome.tabs.query(queryInfo);
  return tabs;
}
