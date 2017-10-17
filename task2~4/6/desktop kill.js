var tion = document.getElementById('tion');
			var sheet = document.getElementById('sheet');
			var murder_btn = document.getElementById('murder_btn')
			var ids = localStorage.getItem('ids').split(',');
			var vote = document.getElementById('vote');
			var vote_in = document.getElementById('vote_in');
			var vote_info = document.getElementById('vote_info');
			var rolesObj = [];
			if(localStorage.getItem('rolesObj')) {
				rolesObj = JSON.parse(localStorage.getItem('rolesObj'))
			}
			tion.onclick = function() {
				if(window.confirm('你确定要取消游戏吗？')) {
					window.location.href = "../1/desktop home page.html";
					return true;
				} else {
					return false;
				}
			}

			function getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}
			var page = getQueryString('page');

			murder_btn.value = (page == 1) ? '杀人' : '投票';
			if(page == 0) {
				vote.innerHTML = '投票';
				vote_in.innerHTML = '发言讨论结束，大家请投票';
				vote_info.innerHTML = '点击投票数最多的头像';
			}
			//取出url传过来的chang
			var change = getQueryString('change');
			$("#cutout_b");
			$('#cutout_batten');
			$('#murder');
			if(change == 2) {
				vote.innerHTML = '法官日记';
				$('#cutout').remove();
				$('#tion').remove();
				cutout_b.parentNode.removeChild(cutout_b);
				sheet.className = 'cutout_sheet';
				cutout_batten.className = 'circle';
				murder_btn.style.display = 'none';
				murder.onclick = function() {
					location.href = "../5/desktop bands.html";
				}
			}
			var arr = [];
			var new_arr;
			for(var i = 0; i < ids.length; i++) {
				new_arr =
					'<div class="vote-2 pull-left">' +
					'<div class="first vote-3">' +
					'<p>' + ids[i] + '</p>' +
					'<span>' + (i + 1 + '号') + '</span>' +
					'</div>' +
					'<div class="first_img">' +
					'<img src="../image/killer.png" class="drop"/>' +
					'</div>' +
					'</div>';
				arr.push(new_arr);

			}
			sheet.innerHTML = arr.join('');

			function memoryobj() {
				if(window.localStorage) {
					localStorage.setItem('rolesObj', JSON.stringify(rolesObj));
				} else {
					alert('你的浏览器不支持');
				}
			}
			var roleIndex = null;
			var first = document.querySelectorAll('.first');
			for(var i = 0; i < first.length; i++) {
				for(var k = 0; k < rolesObj.length; k++) {
					var deadNum = rolesObj[k].dieInfo.number - 1;
					first[deadNum].querySelector('p').style.background = '#83B09A';
				}

				if(change != 2) {
					document.querySelectorAll('.first_img img')[i].style.visibility = "hidden";
					first[i].onclick = (function(index) {
						return function() {
							for(var j = 0; j < first.length; j++) {
								document.querySelectorAll('.first_img img')[j].style.visibility = "hidden";
							}
							document.querySelectorAll('.first_img img')[index].style.visibility = "visible";
							roleIndex = index + 1;
						}
					})(i)
				} else {
					document.querySelectorAll('.first_img img')[i].style.visibility = "hidden";
				}
			}
			murder_btn.onclick = function() {
				if(roleIndex) {
					//如果玩家死亡，不执行操作
					for(var i = 0; i < rolesObj.length; i++) {
						if(rolesObj[i].dieInfo.number == roleIndex) {
							alert('当前玩家已死亡，请选择其他玩家');
							return
						}
					}
					var when = {};
					var rolesWhich = first[roleIndex - 1].querySelector('p').innerHTML;
					if(page == 1) {
						if(rolesWhich == '杀手') {
							alert("杀手不能杀死自己，换一个玩家");
							return;
						} else {
							when.dieInfo = {
								'number': roleIndex,
								'isAlive': true,
								'role': rolesWhich,
								'reason': page
							};
							rolesObj.push(when);
							memoryobj();
							var res = localStorage.getItem('res');
							res = JSON.parse(res);
							res.people--;
							localStorage.setItem('res', JSON.stringify(res));
							if(res.people === 0) {
								alert('杀手胜利！');
                                location.href = '../7/game over.html';
								// localStorage.clear();
								return;
							} else {
								location.href = '../5/desktop bands.html';
							}
						}
					} else {
						when.dieInfo = {
							'number': roleIndex,
							'isAlive': true,
							'role': rolesWhich,
							'reason': page

						};
						rolesObj.push(when);
						memoryobj();
						var res = localStorage.getItem('res');
						res = JSON.parse(res);
						if (rolesWhich == '杀手') {
							res.killer--;
						} else{
							res.people--;
						}
						
						localStorage.setItem('res', JSON.stringify(res));
						if(res.killer === 0) {
							alert('水民胜利！');
							location.href = '../7/game over.html';
							return;
						} else {
							location.href = '../5/desktop bands.html';
						}

					}
				} else {
					alert('请选择要操作的玩家');
				}

				if(res.kill == res.people || res.kill == 0) {
					location.href = '../7/game over.html';
				}
			}
			var res = JSON.parse(localStorage.getItem("res"));