/**
 * Created by 67087 on 2017-03-22.
 */
var playerStr = localStorage.ids;
var newPlayer = playerStr.split(',');//获取setting页储存的玩家身份信息
console.log(newPlayer);//控制台显示所有玩家身份
var i   ;
var play='';
for(i=0; i < newPlayer.length; i++){
    play += '<div class="main-box">' + '<div class="main-box-hide"></div>' +
        '<div class="main-box-all"> '+ '<div class="main-box-open">' + newPlayer[i] + '</div>' +'</div>'+
        '<div class="main-box-number">' + (i + 1) + '号</div>' + '</div>';
    // console.log(play);
    $('.main').eq(0).html(play);
}
$('#startGame').click(function () {
    if(location.search.indexOf("?")==0){
        url = "../4/desktop bands.html" +3;
        location.href=url;

    }
    else {
        var user = {
            step:0,
            die:[],
            die_num:[],
        };
        user.step+=1;
        sessionStorage.setItem('user',JSON.stringify(user));
        location.href="../4/desktop bands.htmll" ;

    // window.location.href = 'nighttime01.html'
}});
