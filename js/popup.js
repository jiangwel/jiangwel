popup();

function popup(){
    var colorBlock=document.getElementsByClassName("color-item");//get element array
    var currentBlock=colorBlock[0];
    var optionBlock=document.getElementsByClassName("option");//获得选项框
    var status = 0;//检测下拉框的点击状态

    var eInput = document.createElement('input');//用于下拉框显示选中项目
    var eInputCon = document.createElement('div');//用于封装eInput
    var eDd = optionBlock[0].parentNode;//整个下拉框的父级
    var eContainer = document.createElement('div');//点击后出现的选项集合
    var optionunion1_1 = createOption("开头"); //点击后出现的单个选项
    var optionunion1_2 = createOption("结尾");

    var status1 = 0;//检测下拉框的点击状态
    var eInput1 = document.createElement('input');//用于下拉框显示选中项目
    var eInputCon1 = document.createElement('div');//用于封装eInput
    var eDd1 = optionBlock[1].parentNode;//整个下拉框的父级
    var eContainer1 = document.createElement('div');//点击后出现的选项集合
    var optionunion2_1 = createOption("1"); //点击后出现的单个选项
    var optionunion2_2 = createOption("2");
    var optionunion2_3 = createOption("3");
    var optionunion2_4 = createOption("4");
    var optionunion2_5 = createOption("5 (笔记本推荐设置)");
    var optionunion2_6 = createOption("6");
    var optionunion2_7 = createOption("7 (PC推荐设置)");
    var optionunion2_8 = createOption("8");
    var optionunion2_9 = createOption("9");
    var optionunion2_10 = createOption("10");

    eInputCon.className = 'input_container';
    eInput.readOnly = true;
    chrome.storage.sync.get(['groupLocation'], function(result) {
        if(!result.groupLocation){
            eInput.value='开头';
        }else{
            eInput.value='结尾';
        }
      });
    eInput.style.backgroundColor = "#fafafa";
    eInput.style.paddingTop="0px";
    eInput.style.cursor="pointer";
    eInputCon.appendChild(eInput);
    eContainer.className='optionList';
    optionBlock[0].appendChild(eInputCon);
    eContainer.appendChild(optionunion1_1);
    eContainer.appendChild(optionunion1_2);
    eDd.appendChild(eContainer);
    eContainer.style.display='none';

    eInputCon1.className = 'input_container';
    eInput1.readOnly = true;
    chrome.storage.sync.get(['maxTabs'], function(result) {
        eInput1.value=result.maxTabs;
      });
    eInput1.style.backgroundColor = "#fafafa";
    eInput1.style.paddingTop="0px";
    eInput1.style.cursor="pointer";
    eInputCon1.appendChild(eInput1);
    eContainer1.className='optionList1';
    optionBlock[1].appendChild(eInputCon1);
    eContainer1.appendChild(optionunion2_1);
    eContainer1.appendChild(optionunion2_2);
    eContainer1.appendChild(optionunion2_3);
    eContainer1.appendChild(optionunion2_4);
    eContainer1.appendChild(optionunion2_5);
    eContainer1.appendChild(optionunion2_6);
    eContainer1.appendChild(optionunion2_7);
    eContainer1.appendChild(optionunion2_8);
    eContainer1.appendChild(optionunion2_9);
    eContainer1.appendChild(optionunion2_10);
    eDd1.appendChild(eContainer1);
    eContainer1.style.display='none';

    optionBlock[0].onclick = function(){
        if(status){
            setTimeout(() => {
                eContainer.style.display='none';
            }, 135);
            document.removeEventListener('click',closeUl);
        }else{
            setTimeout(() => {
                eContainer.style.display='block';
                eContainer1.style.display='none';
            }, 135);
            document.addEventListener('click',closeUl,false);
        }
        status=+!status;
    }
    optionunion1_1.onclick = function(){
        chrome.storage.sync.set({groupLocation:0},function(){});
        status = 0;
        eInput.value = '开头';
        eContainer.style.display='none';
    }
    optionunion1_2.onclick = function(){
        chrome.storage.sync.set({groupLocation:-1},function(){});
        status = 0;
        eInput.value = '结尾';
        eContainer.style.display='none';
    }
    optionBlock[0].addEventListener('click',event=>{
        event.stopPropagation();
      });

    optionBlock[1].onclick = function(){
        if(status1){
            setTimeout(() => {
                eContainer1.style.display='none';
            }, 50);
            document.removeEventListener('click',closeUl);
        }else{
            setTimeout(() => {
                eContainer1.style.display='block';
                eContainer.style.display='none';
            }, 50);
            document.addEventListener('click',closeUl,false);
        }
        status1=+!status1;
    }
    optionBlock[1].addEventListener('click',event=>{
        event.stopPropagation();
      });
    optionunion2_1.onclick = function(){
        status = 0;
        eInput1.value = '1';
        eContainer1.style.display='none';
    }
    optionunion2_2.onclick = function(){
        status = 0;
        eInput1.value = '2';
        eContainer1.style.display='none';
    }
    optionunion2_3.onclick = function(){
        status = 0;
        eInput1.value = '3';
        eContainer1.style.display='none';
    }
    optionunion2_4.onclick = function(){
        status = 0;
        eInput1.value = '4';
        eContainer1.style.display='none';
    }
    optionunion2_5.onclick = function(){
        status = 0;
        eInput1.value = '5 (笔记本推荐设置)';
        eContainer1.style.display='none';
    }
    optionunion2_6.onclick = function(){
        status = 0;
        eInput1.value = '6';
        eContainer1.style.display='none';
    }
    optionunion2_7.onclick = function(){
        status = 0;
        eInput1.value = '7 (PC推荐设置)';
        eContainer1.style.display='none';
    }
    optionunion2_10.onclick = function(){
        status = 0;
        eInput1.value = '10';
        eContainer1.style.display='none';
    }
    optionunion2_8.onclick = function(){
        status = 0;
        eInput1.value = '8';
        eContainer1.style.display='none';
    }
    optionunion2_9.onclick = function(){
        status = 0;
        eInput1.value = '9';
        eContainer1.style.display='none';1
    }


    //setting default value for element
    chrome.storage.sync.get(['color'], function(result) {
        currentBlock.style.borderColor=result.color;
      });
    currentBlock.style.borderRadius='4px';
    currentBlock.style.padding='1px';
    currentBlock.style.color='transparent #1890ff';

    colorBlock[0].onclick = function(){
        currentBlock.style.borderColor='';
        currentBlock.style.borderRadius='';
        currentBlock.style.padding='';
        currentBlock.style.color='';

        chrome.storage.sync.set({color:'grey'},function(){});
        this.style.borderColor='grey';
        this.style.borderRadius='4px';
        this.style.padding='1px';
        this.style.color='transparent #1890ff';

        currentBlock=colorBlock[0];
    }
    colorBlock[1].onclick = function(){
        currentBlock.style.borderColor='';
        currentBlock.style.borderRadius='';
        currentBlock.style.padding='';
        currentBlock.style.color='';

        chrome.storage.sync.set({color:'blue'},function(){});
        this.style.borderColor='rgb(26, 115, 232)';
        this.style.borderRadius='4px';
        this.style.padding='1px';
        this.style.color='transparent #1890ff';

        currentBlock=colorBlock[1];
    }
    colorBlock[2].onclick = function(){
        currentBlock.style.borderColor='';
        currentBlock.style.borderRadius='';
        currentBlock.style.padding='';
        currentBlock.style.color='';

        chrome.storage.sync.set({color:'red'},function(){});
        this.style.borderColor='rgb(217, 48, 37)';
        this.style.borderRadius='4px';
        this.style.padding='1px';
        this.style.color='transparent #1890ff';

        currentBlock=colorBlock[2];
    }
    colorBlock[3].onclick = function(){
        currentBlock.style.borderColor='';
        currentBlock.style.borderRadius='';
        currentBlock.style.padding='';
        currentBlock.style.color='';

        chrome.storage.sync.set({color:'yellow'},function(){});
        this.style.borderColor='rgb(227, 116, 0)';
        this.style.borderRadius='4px';
        this.style.padding='1px';
        this.style.color='transparent #1890ff';

        currentBlock=colorBlock[3];
    }
    colorBlock[4].onclick = function(){
        currentBlock.style.borderColor='';
        currentBlock.style.borderRadius='';
        currentBlock.style.padding='';
        currentBlock.style.color='';

        chrome.storage.sync.set({color:'green'},function(){});
        this.style.borderColor='green';
        this.style.borderRadius='4px';
        this.style.padding='1px';
        this.style.color='transparent #1890ff';

        currentBlock=colorBlock[4];
    }
    colorBlock[5].onclick = function(){
        currentBlock.style.borderColor='';
        currentBlock.style.borderRadius='';
        currentBlock.style.padding='';
        currentBlock.style.color='';

        chrome.storage.sync.set({color:'pink'},function(){});
        this.style.borderColor='rgb(208, 24, 132)';
        this.style.borderRadius='4px';
        this.style.padding='1px';
        this.style.color='transparent #1890ff';

        currentBlock=colorBlock[5];
    }
    colorBlock[6].onclick = function(){
        currentBlock.style.borderColor='';
        currentBlock.style.borderRadius='';
        currentBlock.style.padding='';
        currentBlock.style.color='';

        chrome.storage.sync.set({color:'purple'},function(){});
        this.style.borderColor='rgb(147, 52, 230)';
        this.style.borderRadius='4px';
        this.style.padding='1px';
        this.style.color='transparent #1890ff';

        currentBlock=colorBlock[6];
    }
    colorBlock[7].onclick = function(){
        currentBlock.style.borderColor='';
        currentBlock.style.borderRadius='';
        currentBlock.style.padding='';
        currentBlock.style.color='';

        chrome.storage.sync.set({color:'cyan'},function(){});
        this.style.borderColor='rgb(0, 123, 131)';
        this.style.borderRadius='4px';
        this.style.padding='1px';
        this.style.color='transparent #1890ff';

        currentBlock=colorBlock[7];
    }

    function closeUl(){
        //修改下拉框状态为已关闭状态
        status = 0;
        //关闭下拉框
        eContainer.style.display = 'none';
        eContainer1.style.display = 'none';
        //取消document上的绑定事件
        document.removeEventListener('click',closeUl);
      }

}

function createOption(option_text){
    var option= document.createElement('div');
    option.style.padding='8px 12px';
    option.textContent=option_text;
    option.className='optionText';
    return option;
}
