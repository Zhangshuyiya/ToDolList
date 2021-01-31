//存取localStorage中的数据
			var store={
			    save(key,value){
			        window.localStorage.setItem(key,JSON.stringify(value));
			    },
			    fetch(key){
			     return JSON.parse(window.localStorage.getItem(key))||[];
			    }
			}
			//list存放列表中取出的所有的值
			var list = store.fetch("storeData");
		
			var app=new Vue({
				el:'#app',
				data:{
					list,
					item:"",
					changeItem:"", //修改后的事项
					beforeData:"" //修改前的事项的数据
				},
				watch:{
				//监控list这个属性，当这个属性对应的值发生变化就会执行函数，及时更新数据并保存
				    list:{
				        handler:function(){
				            store.save("storeData",this.list);
				        },
				        deep:true
				    }
							 
				},
				methods:{
					//添加新事项
					addNewItem: function(){
						if (this.item=="")
							window.alert("输入内容不能为空！")
						else{
							let newItem={itemValue:this.item,isFinished:false}
							this.list.push(newItem); 
							this.item=""; //清空输入框中的内容
						}
					},
					//删除列表事项
					deleteItem: function(item){
						let index = this.list.indexOf(item);
						this.list.splice(index,1)
					},
					//修改事项状态(是否完成)
					changeState: function(item){
						let temp=item.isFinished;
						item.isFinished=!temp; //改变事项的完成状态
					},
					//清空列表
					deleteAll: function(){
						//删除起始坐标为0，长度为this.list.length个元素
						this.list.splice(0,this.list.length);
					},
					//修改事项内容
					changeMes: function(item){
						//保存之前的事项内容
						this.beforeData=item.itemValue;
						item.itemValue="";
						this.changeItem=item;
					},
					//取消修改事项内容
					cancelCha: function(item){
						item.itemValue=this.beforeData;
						this.beforeData="";
						this.changeItem="";
					},
					//保存事项内容
					storeCha: function(item){
						//用户输入内容为空
						if (item.itemValue=="")
							window.alert("输入内容不能为空！")
						else
							this.changeItem="";
					}
				},
				computed:{
					unfinishedNum(){ //计算未完成事项总数
						return this.list.filter(item=>{
							return !item.isFinished;
						}).length;
					}
				}
			})
