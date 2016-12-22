function toDo(n) {
    return n < 10 ? '0' + n : '' + n;
}
var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
var monthImg = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var time = null;
var publicyear = new Date().getFullYear();//公共的年用于onchang事件的调用与覆盖；
var publicMonth = new Date().getMonth() + 1;//公共的月用于onchang事件的调用与覆盖；
var oDate = document.getElementById('date');
var RL = oDate.getElementsByTagName('div')[0];
function getDate() {//封装自动获取时间函数；
    var h3 = document.getElementsByTagName('h3')[0];
    var h4 = document.getElementsByTagName('h4')[0];
    var date = new Date();
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var d = date.getDate();
    var w = date.getDay();
    var h = date.getHours();
    var min = date.getMinutes();
    var s = date.getSeconds();
    var str = '';
    var str2 = '';
    str += toDo(h) + ':' + toDo(min) + ':' + toDo(s);
    str2 += Y + "年" + M + '月' + d + '日' + "   " + week[w];
    h3.innerHTML = str;
    h4.innerHTML = str2;
}
time = setInterval(getDate, 500);//初始化动态的时间和日期、星期；
var sel = document.getElementsByTagName('select');
var year = '';
var month = '';
var date1 = new Date();
var yearNum = date1.getFullYear();
var monthNum = date1.getMonth() + 1;
for (var i = 1700; i < yearNum + 50; i++) {
    if (yearNum != i) {//渲染opinion；
        year += '<option value="' + i + '" >' + i + '</option>';
    } else {
        year += '<option value="' + i + '" selected="selected" >' + i + '</option>';
    }
}
for (var k = 1; k <= 12; k++) {//渲染opinion；如果等于今年今月，就添加selected状态，即默认是选中的状态；
    if (monthNum != k) {
        month += '<option value="' + k + '" >' + k + '</option>';
    } else {
        month += '<option value="' + k + '" selected="selected">' + k + '</option>';
    }
}
sel[0].innerHTML = year;
sel[1].innerHTML = month;//下拉选项的初始化；
function show(Yea, Mon) {//封装传参函数用于传入年月然后调用对应的日历；
    var firstDate = new Date(Yea, Mon - 1, 1);//设置成“当前月”的第一天；
    var firstDay = firstDate.getDay();//当前月第一天是星期几；
    var ThisMonth = new Date(Yea, Mon - 1, 0);//设置成当前月的前一个月；
    var LastMonthDate = ThisMonth.getDate();//当前月的前一个月有多少天；
    var ThisDate = new Date(Yea, Mon, 0).getDate();//当前月有多少天；
//        console.log(ThisDate);
//        console.log(LastMonthDate);
    firstDay--;//从当前月的星期firstDay的前一位开始渲染上个月的最后firstDay天；
    var str = '';//先自减下，然后开始拼最开始的是(最后一天-星期n)；然后一直输出到最大；
    for (var i = LastMonthDate - firstDay; i <= LastMonthDate; i++) {
        str += '<span>' + i + '</span>';
    }
    RL.innerHTML = str;
    //开始拼接当前月的；
    for (var k = 0; k < ThisDate; k++) {
        str += '<span>' + (k + 1) + '</span>';
    }
    RL.innerHTML = str;
    //拼接当前月的末尾，即下个月的日期；从1开始到42-ThisDate - firstDay结束；
    for (var j = 1; j < 42 - ThisDate - firstDay; j++) {
        str += '<span>' + j + '</span>';
    }
    RL.innerHTML = str;
    var spans = RL.getElementsByTagName('span');
//        console.log(spans);
    //让选中月的所有日期变色白色；其余的是默认的黑色；
    for (var i = firstDay + 1; i <= (ThisDate + firstDay); i++) { //这里记得给firstDay+1因为上面程序有了firstDay--了；
        spans[i].style.color = "red";
    }
//        console.log(sel[1].selectedIndex);//下拉框的索引；
    for (var i = 0; i < spans.length; i++) {//渲染今天的日期的状态；只有今年今月今天才有此状态；
        if ((sel[0].selectedIndex + 1700 == new Date().getFullYear()) && (sel[1].selectedIndex + 1 == new Date().getMonth() + 1)) {
            if (i == firstDay + new Date().getDate()) {//如果i是前面空的那些上个月末尾几天+当前时间日期的时候；即找到了今天日期对应的坐标；
                spans[i].className = "active";
            }
        }
    }
}
function begin() {
    show(publicyear, publicMonth);//初始化今年今月；
    changeBg(publicMonth);
}
begin();
sel[0].onchange = function () {
    publicyear = this.value;//年的onchange事件传参；传的是年；月默认；
    console.log(this.value);
    show(publicyear, publicMonth);
};
sel[1].onchange = function () {//月的onchange事件传参；传的是月，年默认；
    publicMonth = this.value;
    changeBg(this.value);
    show(publicyear, publicMonth);
};
function changeBg(Num) {
    $('.fourth').css({'background': "url(./img/" + monthImg[Num - 1] + ".jpg)no-repeat", 'background-size': 'cover'})
}