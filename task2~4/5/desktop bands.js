//li的点击状态
var stateInit = {
	step: {
		'1': true,
		'2': false,
		'3': false,
		'4': false,
	},
	isClick: {
		'1': false,
		'2': false,
		'3': false,
		'4': false,
	},
	whichStep: 0,
	day: 1
}

var stateLocal = localStorage.getItem('state');
if(stateLocal) {
	stateLocal=JSON.parse(stateLocal);
}
var state = stateLocal ? stateLocal : stateInit;
console.log(state)

function render() {
	var arrNode = [];
	var catalog = document.querySelector(".day");
	for(var i = 0; i < state.day; i++) {
		arrNode.push(
				'<div class="main-1 one"><h1 class="dayIndex">第'+(i+1)+'天</h1><a class="aa"><img src="../image/header/bar-BlueDown.png" ></a></div>'+
				'<div class = "main-1-1" >'+
				'<span class="triangle_border_up"></span> '+
				'<div class = "box" >'+
				'<img src="../image/daytime.png">'+
                '<img src="../image/nighttime.png"/>'+
                '<ul id="info" class="info_col">'+
                    '<li>杀手杀人'+
                    	'<div class="dieInfo"></div>'+
                    '</li>'+
                    '<li>亡灵发表遗言</li>'+
                    '<li>玩家依次发言</li>'+
                    '<li>全民投票<div class="dieInfo"></div></li>'+
                '</ul>'+
            '</div>'+
        '</div>');
				}
				catalog.innerHTML = arrNode.join('');
			}
			render();
			var oli = document.querySelectorAll('.info_col li');
			var one = document.querySelectorAll('.one');
			var dayIndex=document.querySelectorAll('.dayIndex');
			for(var i = 0; i < oli.length; i++) {
				oli[i].setAttribute('index', i);
				~ function(i) {
					oli[i].onclick = function() {
						var index = parseInt(this.getAttribute('index')) + 1;
						var stepGo = state.step[index];
						var canClick = state.isClick[index];
						var whichDay =(dayIndex[dayIndex.length-1].innerHTML).replace(/[^0-9]/ig,"");
						if(!canClick) {
							if(stepGo) {
								//存储第几步
								state.whichStep = index;
								//第四步的时候生成第二天的数据
								if(state.whichStep % 4 == 0) {
									console.log('一天結束了');
									state.day++;
								}
								//下一个置为true
								state.step[(index + 1)] = true;
								//点击当前的置为true
								state.isClick[index] = true;
								//存储点击状态
								localStorage.setItem('state', JSON.stringify(state));
								//跳转
								if(index % 4 == 1) {
									location.href = "../6/desktop kill.html?page=1&day="+whichDay;
								}
								if(index % 4 == 0) {
									location.href = "../6/desktop kill.html?page=0&day="+whichDay;
								}
								//第二个和第三个li
								if(index % 4 == 2 || index % 4 == 3) {
									var res = confirm('请亮明死者身份');
									if(res) {
										this.style.background='red';
									} else {
										state.step[(index + 1)] = false;
										state.isClick[index] = false;
									}
								}
							} else {
								alert('请按顺序操作');
							}
						} else {
							alert('请不要重复操作');
						}

					}
				}(i)
				for(var j = 0; j < state.whichStep; j++) {
					oli[j].style.background='red';
				}
			}
			//隐藏步骤，当前天显示，点击切换
			for(var i = 0; i < state.day - 1; i++) {
				one[i].nextElementSibling.style.display = 'none';
			}
			for(var j = 0; j < state.day; j++) {
				one[j].onclick = function() {
					if(this.nextElementSibling.style.display == 'none') {
						this.nextElementSibling.style.display = 'block';
					} else if(this.nextElementSibling.style.display == 'block') {
						this.nextElementSibling.style.display = 'none';
					}
				}
			}
	
			//返回游戏首页
//			var tion = document.getElementById('tion');
//			tion.onclick = function() {
//				if(window.confirm('你确定要取消游戏吗？')) {
//					localStorage.clear();
//					window.location.href = "桌游首页.html";
//				}
//			}
//			var button_ipt = document.getElementById('button_ipt');
//			console.log(button_ipt)
//			button_ipt.onclick = function() {
//				location.href = '杀手杀人.html?change=2';
//			}
			//记录死亡玩家状态
			function recordRoleState(){
				var dieInfo =document.querySelectorAll('.dieInfo');
				var rolesObj= JSON.parse(localStorage.getItem('rolesObj'));
				if(rolesObj){
					for(var i=0;i<rolesObj.length;i++){
							dieInfo[i].innerHTML=rolesObj[i].dieInfo.number+'号玩家死亡，其身份是'+rolesObj[i].dieInfo.role;
					}
				}
			}
			recordRoleState();
		