var peopleNum;

function setting() {
	peopleNum = parseInt(document.getElementById('people').value);
	if(isNaN(peopleNum) || peopleNum < 6 || peopleNum > 18) {
		alert("请输入6~18之间的数字");
	} else {
		allPlayer();
		printf();
		move();
	}
}
var killerNum;
var a = document.getElementById('people');

function allPlayer() {
	peopleNum = parseInt(a.value);
	if(peopleNum <= 8) {
		killerNum = 1;
	} else {
		killerNum = Math.floor(peopleNum / 4); //获取杀手人数
	}
}

var player = document.getElementById("player");
var btn = document.getElementById("btn");

function printf() {
	var peopleNum = parseInt(a.value);
	player.innerHTML = ''; //每次循环前清空上次输出内容
	btn.onclick = function() {
		killerArr.sort(function() {
			return 0.5 - Math.random();

		})
		var res = '';
		for(var i in killerArr) {
			res += '<span><div class="kkk"></div>' + killerArr[i] + '</span>';
		}
		player.innerHTML = res;
		localStorage.ids = killerArr;

	}

	//根据输入的数字组成一个数组
	var killerArr = [];
	for(var i = 0; i < killerNum; i++) {
		killerArr.push('杀手');
	}
	for(i = 0; i < peopleNum - killerNum; i++) {
		killerArr.push('水民');

	}
	//数组转化成字符串并存储与本地
	
//	localStorage.killers = killerNum;
//	localStorage.peoples = peopleNum;
//	localStorage.waters = (peopleNum - killerNum);
}

var bot = document.getElementById('push_card');
bot.onclick=function(){
	var res = {
	'killer':killerNum,
	'people':peopleNum - killerNum
	};
	localStorage.res = JSON.stringify(res);
	location.href='../3/desktop leaf.html';
}
function shuffle(array) {
	for(var i = array.length - 1; i >= 0; i--) {

		var randomIndex = Math.floor(Math.random() * (i + 1));
		var itemAtIndex = array[randomIndex];

		array[randomIndex] = array[i];
		array[i] = itemAtIndex;
	}
	return array;
}

function add() { //增加人数
	if(peopleNum < 18) {
		peopleNum = peopleNum + 1;
		document.getElementById("people").value = peopleNum;
		setting()
	} else {
		alertMsg("本游戏最多18人参与哦");
	}
}

function reduction() { //减少人数
	if(peopleNum > 6) {
		peopleNum = peopleNum - 1;
		document.getElementById("people").value = peopleNum;
		setting()
	} else {
		alertMsg("本游戏最少需要六个人哦");
	}
}

function move() { //改变滑块位置
	document.getElementById("moveback").value = peopleNum;
}

function reset() { //根据滑块位置动态改变输入框人数
	var moveNum = document.getElementById("moveback").value;
	document.getElementById("people").value = moveNum;
}

function dont() {
	alertMsg("即将上线，敬请期待")
}

window.onload = setting; //启动加载
localStorage.clear();