    let toDoNum=document.getElementById('toDoNum');
    let newitem=document.getElementById('newitem');

    //修改li标签的信息
    function changeMes(lab, chagBtn,delBtn){
        let con=lab.innerHTML; //保存label标签原先的内容

        //在label标签中添加input输入框和相应按钮
        lab.innerHTML="<label><input type='text' id='inp'><button id='cancel'>取消</button><button id='store'>保存</button></label>" 
            
        //当用户点击保存按钮时
        document.getElementById("store").addEventListener("click", function(){
            let input=document.getElementById("inp");
            if (input.value==""){
                window.alert("内容不能为空！");
                lab.innerHTML=con; //将label标签的内容恢复为原来的内容
            }
            else{
                lab.innerHTML=input.value; //将label标签的内容设置为用户修改的内容
            }
            chagBtn.style.display="block"; //显示修改和删除按钮
            delBtn.style.display="block";
        });
            
        //当用户点击取消按钮时
        document.getElementById("cancel").addEventListener("click", function(){
            lab.innerHTML=con; //将label标签的内容恢复为原来的内容
            chagBtn.style.display="block";
            delBtn.style.display="block";
        });
    }
    
        //添加新标签
    function addNewItem(){

        //向列表中添加新的li标签
        let temp=document.createElement("li");
        let element=document.getElementById("todolist");
        element.appendChild(temp);

        //向新的li标签中添加复选框
        let block=document.createElement("input");
        block.type="checkbox"; //复选框
        element.lastChild.appendChild(block);
        
        //向新的li标签中添加label标签
        let lab=document.createElement("label");
        lab.appendChild(document.createTextNode(newitem.value));
        element.lastChild.appendChild(lab);

        //向新的li标签中添加修改按钮
        let chagBtn=document.createElement("button");
        chagBtn.appendChild(document.createTextNode("修改"));
        element.lastChild.appendChild(chagBtn);
        chagBtn.onclick=function(){
            chagBtn.style.display="none"; //隐藏修改和删除按钮
            delBtn.style.display="none";
            changeMes(lab,chagBtn,delBtn); //修改label标签的信息
        }

        //向新的li标签中添加删除按钮
        let delBtn=document.createElement("button");
        delBtn.appendChild(document.createTextNode("删除"));
        element.lastChild.appendChild(delBtn);
        delBtn.onclick=function(){
            delBtn.parentNode.parentNode.removeChild(delBtn.parentNode);
            toDoNum.innerHTML=Number(toDoNum.innerHTML)-1; //事项总数减一
        }
    }

    //当用户点击提交按钮时
    document.getElementById('submit').onclick=function(){
        if (newitem.value=="")
            window.alert("内容不能为空！");
        else{
            //将新结点加入未完成列表中
            addNewItem();
            newitem.value=""; //将输入框中的内容置空
            toDoNum.innerHTML=Number(toDoNum.innerHTML)+1; //事项总数加一
        }
    }

    //当用户点击清空列表按钮时
    document.getElementById('deleteAll').onclick=function(){
        let list=document.getElementById('todolist');
        list.innerHTML="";  //将ul列表的内容清空
        toDoNum.innerHTML=0; //事项总数清零
    }
