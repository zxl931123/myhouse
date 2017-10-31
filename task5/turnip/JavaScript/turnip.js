var loginPage = {
    login: function () {
        var loginError = $('#loginError');
        var loginData = {
            name: function () {
                return $('#loginName').val();
            }(),
            pwd: function () {
                return $('#loginPwd').val();
            }()
        };
        if (loginData.name.length < 1) {
            loginError.html('请输入用户名!');
        } else if (loginData.pwd.length < 1) {
            loginError.html('请输入密码!');
        } else if (loginData.pwd.length < 6) {
            loginError.html('密码最少6位!');
        } else {
            loginError.html('');
            //ajax
            $.post({
                async: false,
                url: '/carrots-admin-ajax/a/login',
                data: loginData,
                success: function (success) {
                    var ajaxData = JSON.parse(success);
                    if (ajaxData.code === 0 && ajaxData.message === 'success') {
                    	console.log(ajaxData);
                        alert('登录成功!');
                    } else {
                        loginError.html(ajaxData.message + '!');
                    }
                },
                error: function (e) {
                    loginError.html('发生了一个错误，请稍后重试!');
                }
            })
        }
    }
}
//http://localhost/turnip.html
//(function () {
//  var userName = document.getElementById("loginName")[0],
//      userPwd = document.getElementById("loginPwd")[1],
//      btn = document.getElementsByTagName("button")[0],
//      // hint = document.getElementById("hint");
//      //原生JS
//      nameOk = "no",
//      pwdOk = "no";
//  //获得焦点
//  userName.onfocus = function () {
//      userName.className = "login-user-active";
//  };
//  //失去焦点
//  userName.onblur = function () {
//      userName.className = "login-user";
//      var name = userName.value;
//      var reg = /^[a-zA-Z]\w{4,16}$/;
//      console.log(name.length);
//      if (name === "") {
//          hint.innerHTML = "用户名不能为空";
//      } else if (!reg.test(name)) {
//          hint.innerHTML = "用户名不合法";
//      } else {
//          hint.innerHTML = "";
//          nameOk = "yes";
//      }
//  };
//  //获得焦点
//  userPwd.onfocus = function () {
//      userPwd.className = "login-pwd-active";
//  };
//  //失去焦点
//  userPwd.onblur = function () {
//      userPwd.className = "login-pwd";
//      var pwd = userPwd.value;
//      //密码不能包含空格， 且长度在6 - 18位之间
//      var reg = /^\S{5,18}$/;
//      console.log(pwd.length);
//      if (pwd === "") {
//          hint.innerHTML = "密码不能为空";
//      } else if (!reg.test(pwd)) {
//          hint.innerHTML = "密码格式不正确";
//      } else {
//          hint.innerHTML = "";
//          pwdOk = "yes";
//      }
//  };
//  //点击提交
//  btn.onclick = function () {
//      console.log("用户名：" + userName.value);
//      console.log("密码：" + userPwd.value);
//      if (nameOk === "yes" && pwdOk === "yes") {
//          var ajax = new XMLHttpRequest();
//          ajax.onreadystatechange = function () {
//              if (ajax.readyState === 4) {
//                  if (ajax.status >= 200 && ajax.status < 300 || ajax === 304) {
//
//                      //提取服务器返回的文本
//                      console.log(ajax.responseText);
//                      var txt = JSON.parse(ajax.responseText);
//                      console.log(txt);
//                      if (txt.message === "success") {
//                          hint.innerHTML = "登录成功";
//                      } else {
//                          hint.innerHTML = txt.message;
//                      }
//                  } else {
//                      hint.innerHTML = "请求错误，代码：" + ajax.status;
//                  }
//              }
//          };
//
//          ajax.open("POST", "/carrots-admin-ajax/a/login", true);
//          ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//          ajax.send("name=" + userName.value + "&pwd=" + userPwd.value);
//      }
//  };
//  //jQuery写法
//  btn = $(btn);
//  btn.click(function () {
//      $.ajax({
//          type: "POST",
//          url: "/carrots-admin-ajax/a/login",
//          data: {"name": userName.value, "pwd": userPwd.value},
//          dataType: "json",
//          success: function (data) {
//              if (data.message === "success") {
//                  hint.innerHTML = "登录成功";
//              } else {
//                  hint.innerHTML = data.message;
//              }
//          }
//      });
//  });
//})();
//user.oninput = function () {
//  var user_info = user.value;
//  var reg = onlyNum();
//  if (user_info == '') {
//      point_info = '用户名不能为空';
//  } else if (!reg) {
//      point_info = '只能输入手机号码';
//  } else {
//      point_info = '';
//  }
//}