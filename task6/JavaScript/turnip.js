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
                        loginError.html('登录成功')
                        location.href="html/homePage.html";
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




