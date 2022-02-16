popup();
function popup(){
    var colorBlock=document.getElementsByClassName("color-item");
    var currentBlock=colorBlock[0];
    currentBlock.style.borderColor='gray';//容易出bug
    currentBlock.style.borderRadius='4px';
    currentBlock.style.padding='1px';
    currentBlock.style.color='transparent #1890ff';
    colorBlock[0].onclick = function(){
        currentBlock.style.borderColor='';
        currentBlock.style.borderRadius='';
        currentBlock.style.padding='';
        currentBlock.style.color='';

        this.style.borderColor='gray';
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

        this.style.borderColor='blue';
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

        this.style.borderColor='red';
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

        this.style.borderColor='yellow';
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

        this.style.borderColor='pink';
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

        this.style.borderColor='purple';
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

        this.style.borderColor='orange';
        this.style.borderRadius='4px';
        this.style.padding='1px';
        this.style.color='transparent #1890ff';

        currentBlock=colorBlock[7];
    }
}
