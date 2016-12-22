/////////////////////<----------数据区-------->/////////////////////////
var data = [
    {
        song: "丑八怪",
        singer: "薛之谦",
        src: "mp3/1choubaguai.mp3",
        img: './img/7.jpg',
        lyric: 'choubaguai'
    },
    {
        song: "天使",
        singer: "五月天",
        src: "mp3/2angel-wuyue.mp3",
        img: './img/8.jpg',
        lyric: 'angel',
        offset: -1.6
    },
    {
        song: "突然好想你",
        singer: "五月天",
        src: "mp3/3turan-wuyue.mp3",
        img: './img/10.jpg',
        lyric: 'turan'
    }, {
        song: "Cry Wolf",
        singer: "Luna Shadows",
        src: "mp3/4Luna Shadows - Cry Wolf.mp3",
        img: './img/4.jpg',
        lyric: 'crywolf'
    }
];
///////////////////<-------变量区-------->//////////////////////////////////////
//获取audio音频文件；
var audio = document.getElementsByTagName('audio')[0];
var cas = document.getElementById('canvas');
//设置画布宽高；
var width = cas.width = document.getElementsByClassName('center')[0].offsetWidth;
var height = cas.height = document.getElementsByClassName('center')[0].offsetHeight;
//兼容音频对象；
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
var context = new AudioContext;
//从元素创建媒体节点
var media = context.createMediaElementSource(audio);
//创建脚本处理节点
var processor = context.createScriptProcessor(4096, 1, 1);
//Canvas初始化
var g = canvas.getContext("2d");
g.translate(0.5, height / 2 + 0.5);
//连：媒体节点→控制节点→输出源
media.connect(processor);
processor.connect(context.destination);
//控制节点的过程处理
var styleArr = ['./img/black.png', './img/red.png', './img/pink.png', './img/blue.png', './img/green.png', './img/gold.png'];
var off = false;
var Audio1 = document.getElementsByTagName('audio')[0];
var processBar = document.getElementById("process-bar");//进度条
var curBtn = document.getElementById("cur-btn");//进度条拖拽按钮
var processCur = document.getElementById("process-cur");//进度条播放线
var totalTime = document.getElementById("total-time");//歌曲总时长
var currentTime = document.getElementById("currentTime");//歌曲当前播放时间
var playBtn = document.getElementsByClassName("play")[0];//播放键
var pauseBtn = document.getElementsByClassName("pause")[0];//暂停键
var preBtn = document.getElementsByClassName("pre")[0];//上一曲键
var nextBtn = document.getElementsByClassName("next")[0];//下一曲键
var songName = document.getElementById("songName");//歌曲名
var artist = document.getElementById("artist");//歌手
var playListCount = document.getElementById("playListCount");//播放列表歌曲数量
var playList = document.getElementById('play-list'); //歌曲列表
var loop = document.getElementsByClassName('loop')[0];//循环按钮
var ul = playList.getElementsByTagName('ul')[0];//播放列表ul
var lis = playList.getElementsByTagName('li');//播放列表li
var w = document.getElementsByClassName('main')[0].offsetWidth;//可视区宽度（新增）
var Third = document.getElementsByClassName('third')[0];//主展示区；
var timer2 = null;//定时器
var n = 0; //当前播放歌曲下标
var durationT = 0;//歌曲总时长
var changing = false;//监控歌曲切换过程是否在进行中
var ended = false;//监控歌曲是否结束
var prevSong = -1;//上一曲下标
var curDraging = false; //监控进度点是否是在拖拽中
//--------------歌词相关变量---------------
var oLyric = document.querySelector(".lyric");//歌词界面div
var lyricUl = document.querySelector(".lyric ul");//歌词界面ul
var lyricLi = lyricUl.getElementsByTagName("li");//歌词界面li
var olyricLine = document.getElementById('line');//歌词定位黄色虚线
var lyric = {
    lyricStr: '',//储存当前歌曲歌词字符串数据
    unitHeight: 42,//每个歌词li的高度
    lyricTop: 147,//ul初始高度
    lyNum: 0,//当前显示第几句歌词
    lyMTime: [],//每句歌词运动时间
    lyMtext: [],//每句歌词
    timer: null,//歌词自动滚动的定时器
    lyPreNum: -1,//上一句歌词下标
    color: '#fff',//改变当前播放歌词颜色
    offset: 0,//歌词偏移（可以提前或延迟歌词滚动，负数提前正数延迟）
    draging: false//歌词是否拖拽
};

/////////////////<-----函数区------->////////////////////////////////////////////////
processor.onaudioprocess = function (e) {
    //获取输入和输出的数据缓冲区
    var input = e.inputBuffer.getChannelData(0);
    var output = e.outputBuffer.getChannelData(0);
    //将输入数缓冲复制到输出缓冲上
    for (var i = 0; i < input.length; i++)output[i] = input[i];
    //将缓冲区的数据绘制到Canvas上
    g.clearRect(-0.5, -height / 2 - 0.5, width, height);
    g.beginPath();
    g.strokeStyle = 'red';
    for (var j = 0; j < width; j++)
        g.lineTo(j, height / 2 * output[output.length * j / width | 0]);
    g.stroke();
};
$('.skin').on('click', function () {
    if (!off) {
        $('.skinImg').show();
        $('.triangle-up').show();
        off = true;
    } else {
        $('.skinImg').hide();
        $('.triangle-up').hide();
        off = false;
    }
});
changeStyle();
function changeStyle() {
    $('.skinImg li').each(function (index, item) {
        $(item).css({'background': 'url(' + styleArr[index] + ')', 'backgroundSize': 'cover'});
        $(item).on('click', function () {
            $('.skinImg').hide();
            $('.triangle-up').hide();
            changeColor($(this).index());
            off = false;
        });
    });
}
function changeColor(n) {
    switch (n) {
        case 0:
            $('.head').css('background', 'black');
            break;
        case 1:
            $('.head').css('background', 'red');
            break;
        case 2:
            $('.head').css('background', 'pink');
            break;
        case 3:
            $('.head').css('background', '#2c84e5');
            break;
        case 4:
            $('.head').css('background', '#145804');
            break;
        case 5:
            $('.head').css('background', '#f5d90e');
            break;
    }
}
function round(i, j, x) {
    Audio1.src = data[i].src;
    timer1();
    if (x > j) {
        show(i, j, x);
        playState();
        changing = false;
    }
    //上一首点击要改变的状态
    if (x < j) {
        show(i, j, x);
        playState();
        changing = false;
    }
}
//2.播放状态监控函数
function playState() {
    if (playBtn.onOff) {
        Audio1.play();
        lyricTimer();
    }
}
// 3.歌曲切换时页面渲染函数
function show(i, j, x) {
    songName.innerHTML = data[i].song;
    artist.innerHTML = data[i].singer;
    Third.style.background = 'url(' + data[i].img + ')';
    Third.style.backgroundSize='cover';
    Audio1.src = data[i].src;
    timer1();
    playListCount.innerHTML = data.length;
}
show(0, 0, 1);//播放页面初始化渲染
// 4.将秒换算成分钟 换算后放入相应innerHTML函数
function sToM(sec, name) {
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    name.innerHTML = toZero(m) + ':' + toZero(s);
}
//5.时间补0函数
function toZero(n) {
    return n < 10 ? '0' + n : '' + n;
}
//6.进度点位置(当前播放时间)根据鼠标位置移动（改变）函数
function curMoveByMouse(mL, distance, fl) {
    //鼠标需要移动的宽度
    var tar = mL - distance + fl;//
    // 鼠标当前的位置-进度点距离页面左边的距离（或者进度条移动前的位置）+进度条的left=鼠标需要移动的宽度
    if (tar > 235) {
        tar = 235;
    }
    if (0 > tar) {
        tar = 0;
    }
    curBtn.style.left = tar + 'px';
    processCur.style.width = tar + 'px';
    lyMoveTo((tar / 235) * durationT);
    Audio1.currentTime = (tar / 235) * durationT;//歌曲当前时间变为拖拽的位置对应的时间
    sToM(Audio1.currentTime, currentTime);
}
//7.进度点根据播放当前时间运动函数
function curMoveByCurtime(nowtime, alltime) {
    if (nowtime > alltime) {
        nowtime = alltime;
    }
    processCur.style.width = (nowtime / alltime) * 235 + 'px';
    curBtn.style.left = (nowtime / alltime) * 235 + 'px';//进度点的位置根据歌曲的时间运动
}
// 8.通过定时器获取当前歌曲的总时长 （需要延迟获取）
function timer1() {
    var timer1 = setInterval(function () {
        if (Audio1.duration) {
            // 获取到当前歌曲的总时长后就不用再获取了
            durationT = Audio1.duration;
            clearInterval(timer1);
            sToM(Audio1.duration, totalTime);
        }
    }, 16);
}
//9.一首歌曲走完时，循环方式载入函数
function ifEnd() {
    if (ended) {
        reStatus();
        if (loop.onOff) {
            //列表循环
            //切换下一首
            if (!changing) {
                nextsong();
            }
        } else {
            playState();
        }
    }
}
//10.通过定时器不断获取当前歌曲的当前播放时间
function timer() {
    ifEnd();
    clearInterval(timer2);
    timer2 = setInterval(function () {
        if (curDraging) {
            return;
        }
        ended = Audio1.ended;
        sToM(Audio1.currentTime, currentTime);
        ifEnd();
        curMoveByCurtime(Audio1.currentTime, durationT);
    }, 500);
}

//14.状态初始化
function reStatus() {
    currentTime.innerHTML = '00:00';
    Audio1.currentTime = 0.001;
    curMoveByCurtime(Audio1.currentTime, durationT);
    Audio1.pause();
    clearInterval(lyric.timer);
}
// 15.歌曲切换时数据切换
function tabData() {
    loadLyric(data[n].lyric);
    songName.innerHTML = data[n].song;
    artist.innerHTML = data[n].singer;
    lis[n].className += " active";
}
// 16.下一曲函数
function nextsong() {
    reStatus();
    changing = true;
    prevSong = n;
    lis[prevSong].className = "";
    n++;
    if (n > data.length - 1) {
        n = 0;
    }
    tabData();
    nextTab();
}
// 17.下一曲状态与运动
function nextTab() {
    if (playBtn.onOff) {
        setTimeout(function () {
            round(n, 0, 1);
        }, 500);
    } else {
        round(n, 0, 1);
    }
}
//--------歌词相关函数区--------//
//18.载入歌词数据生成一堆li
function loadLyric(name) {
    lyReset();
    lyric.lyricStr = lyrics[name];
    lyric.lyMTime = returnTimeLyric(lyric.lyricStr)[0];
    lyric.lyMtext = returnTimeLyric(lyric.lyricStr)[1];
    lyricUl.innerHTML = '';
    for (var i = 0; i < lyric.lyMtext.length; i++) {
        var li1 = document.createElement('li');
        if (lyric.lyMtext[i] == '') {
            li1.innerHTML = '&nbsp;';
        } else {
            li1.innerHTML = lyric.lyMtext[i];
        }
        lyricUl.appendChild(li1);
    }
}
//19.歌词清除样式,ul回到顶部(切换歌曲调用，歌词复位)
function lyReset() {
    lyric.lyPreNum = -1;//上一句复位
    lyric.lyNum = 0;//当前句复位
    lyricUl.style.top = lyric.lyricTop + 'px';//ul初始高度
}
//20.歌词根据播放时间滚动
function lyMoveTo(time) {
    var last = true;//是否是最后一句
    for (var i = 0; i < lyric.lyMTime.length; i++) {
        if (lyric.lyMTime[i] > (time - lyric.offset)) {
            lyric.lyNum = i - 1;
            last = false;
            break;//显示第i个
        }
    }
    if (last) {
        lyric.lyNum = lyric.lyMTime.length - 1;
    }
    if (lyric.lyNum < 0) {
        lyric.lyNum = 0;
    }
    if (!lyricLi[lyric.lyNum]) {
        return;
    }
    if (lyric.lyPreNum == lyric.lyNum) {
        return;
    } else {
        if (lyric.lyPreNum > -1) {
            lyricLi[lyric.lyPreNum].className = "";
            lyricLi[lyric.lyPreNum].style.cssText = '';
        }
        lyric.lyPreNum = lyric.lyNum;
    }
    lyricLi[lyric.lyNum].className = "active";
    lyricLi[lyric.lyNum].style.color = lyric.color;
    move(lyricUl, {top: lyric.lyricTop - lyric.unitHeight * lyric.lyNum}, 150, 'easeIn');
}
//21.主要给歌词根据播放时间滚动加判断
function lyricTimer() {
    clearInterval(lyric.timer);
    lyric.timer = setInterval(function () {
        if (lyric.draging) {
            return;
        }
        if (curDraging) {
            return;
        }
        if (!playBtn.onOff) {
            clearInterval(lyric.timer);
            return;
        }
        if (!Audio1.currentTime) {
            return;
        }
        lyMoveTo(Audio1.currentTime);
    }, 150);
}
// 22.拆分歌词数据中的时间和歌词，并做匹配一一对应
function returnTimeLyric(lyric) {
    var arr = lyric.split('[');
    var arrTime = [];
    var arrLyric = [];
    var arrTemp = [];
    for (var i = 1; i < arr.length; i++) {
        arrTime.push(minToSec(arr[i].split(']')[0]));
        arrLyric.push(arr[i].split(']')[1]);
    }
    arrTemp.push(arrTime, arrLyric);
    return arrTemp;
}
// 23.分钟转化成秒
function minToSec(StrTime) {
    var arr = StrTime.split(':');
    var sec = parseFloat((parseFloat(arr[0]) * 60 + parseFloat(arr[1])).toFixed(2));
    return sec;
}

///////////////////////<--------事件区--------->//////////////////////////////////////////

// 1.播放键点击事件
playBtn.onclick = function () {
    ended = Audio1.ended;
    //this.onOff用来检测播放暂停键状态
    this.onOff = true;
    // 切换播放键状态为暂停并开始播放
    this.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    if (!changing) {
        Audio1.play();
        lyricTimer();
    }
    // 播放后唱针进入唱片
    timer();
    /*  content.style.webkitFilter = 'blur(10px)';//改变模糊度*/
};
// 2.暂停键点击事件
pauseBtn.onclick = function () {
    playBtn.onOff = false;
    clearInterval(lyric.timer);
    // 切换播放键状态为暂停
    this.style.display = 'none';
    playBtn.style.display = 'inline-block';
    Audio1.pause();
    clearInterval(timer2);
};
//3.鼠标拖拽进度条事件
curBtn.onclick = function (ev) {
    ev = ev || window.event;
    ev.stopPropagation();//点击的时候阻止拖拽
};
// 鼠标向下时可以点住进度条按钮进行横向拖拽移动
curBtn.onmousedown = function (ev) {
    if (changing) {
        return;
    }
    // 鼠标向下时，获取到当前left的位置（0-235）
    var fl = curBtn.offsetLeft + 10;//进度条的left(加本身的margin)
    // 然后获取鼠标点击的X坐标
    var bL = ev.clientX;
    curDraging = false;
    var tar = fl;
    document.onmousemove = function (e) {
        curDraging = true;
        //鼠标需要移动的宽度
        tar = e.clientX - bL + fl;//
        // 鼠标当前的位置-进度点距离页面左边的距离（或者进度条移动前的位置）+进度条的left=鼠标需要移动的宽度
        if (tar > 235) {
            tar = 235;
        }
        if (0 > tar) {
            tar = 0;
        }
        curBtn.style.left = tar + 'px';
        processCur.style.width = tar + 'px';
        lyMoveTo((tar / 235) * durationT);
        // 移动过程中不改变当前歌曲当前时间
        sToM((tar / 235) * durationT, currentTime);
    };
    document.onmouseup = function () {
        curDraging = false;
        Audio1.currentTime = (tar / 235) * durationT;//鼠标抬起后改变当前时间(回到移动时的位置的时间)
        document.onmousemove = null;
        document.onmouseup = null;
    };
};
// 4.点击进度条任意位置时，进度点和当前时间跳到对应的位置
processBar.onclick = function (e) {
    if (changing) {
        return;
    }
    var bL = curBtn.getBoundingClientRect().left;
    var mL = e.clientX;
    var fl = curBtn.offsetLeft;//进度条的left
    curMoveByMouse(mL, bL, fl);
};
// 5.上一曲点击事件
preBtn.onclick = function () {
    if (!changing) {
        reStatus();
        changing = true;
        prevSong = n;
        lis[n].className = "";
        n--;
        if (n < 0) {
            n = data.length - 1;
        }
        tabData();
        if (playBtn.onOff) {
            setTimeout(function () {
                round(n, 1, 0);
            }, 500);
        } else {
            round(n, 1, 0);
        }
    }
};
// 6.下一曲点击事件
nextBtn.onclick = function () {
    if (!changing) {
        nextsong();
    }
};
// 10.列表单个点击切换歌曲，并移动列表事件(播放列表根据数据循环生成)
for (var i = 0; i < data.length; i++) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    if (i == n) {
        li.className = "active";
    }
    li.index = i;
    li.onclick = function () {
        if (changing) {
            return;
        }
        if (n == this.index) {
            return;
        }
        prevSong = n;
        lis[n].className = "";
        n = this.index;
        this.className = "active";
        loadLyric(data[n].lyric);
        songName.innerHTML = data[n].song;
        artist.innerHTML = data[n].singer;
        reStatus();
        changing = true;
        nextTab();
        scrollToMove(ul, 42 * (this.index - 2), 400);

    };
    li.innerHTML = data[i].song;
    span.innerHTML = "&nbsp;&nbsp;-" + data[i].singer;
    li.appendChild(span);
    ul.appendChild(li);
}
//11.播放模式选择点击事件。设置一个开关，true是列表循环，false是单曲循环
loop.onOff = true;
loop.onclick = function () {
    //列表循环
    if (this.onOff) {
        this.style.background = 'url(img/play_icn_loop_solo.png)';
        this.onOff = false;
        //单曲循环
    } else {
        this.style.background = 'url(img/play_icn_loop.png)';
        this.onOff = true;
    }
};
//11.播放列表根据点击歌曲上下滚动函数
function scrollToMove(obj, target, time) {
    var scrollTopMax = 0;
    if (document.documentElement.clientHeight < obj.offsetHeight) {
        scrollTopMax = obj.scrollHeight - document.documentElement.clientHeight;
    } else {
        scrollTopMax = obj.scrollHeight - obj.offsetHeight;
    }
    if (target < 0) {
        target = 0;
    }
    if (target > scrollTopMax) {
        target = scrollTopMax;
    }
    var nowScrollTop = obj.scrollTop;
    var disTop = target - nowScrollTop;
    var ci = time / 20;
    var perDis = disTop / ci;
    var num = 0;
    clearInterval(obj.timer);
    if (obj.scrollTop == scrollTopMax && perDis >= 0) {
        return;
    }
    if (obj.scrollTop == 0 && perDis <= 0) {
        return;
    }
    obj.timer = setInterval(function () {
        num++;
        var goal = nowScrollTop + Math.round(perDis * num);
        if (goal < 0) {
            goal = 0;
        } else if (goal > scrollTopMax) {
            goal = scrollTopMax;
        }
        obj.scrollTop = goal;
        if (num == ci) {
            obj.scrollTop = target;
            clearInterval(obj.timer);
        }
    }, 20);
}
//12.歌词初始化
loadLyric(data[n].lyric);
songName.innerHTML = data[n].song;
artist.innerHTML = data[n].singer;
//15.歌词面板拖拽事件
oLyric.onmousedown = function (ev) {
    ev = ev || window.event;
    oLyric.onOff = true;
    var T1 = ev.clientY;//鼠标当前y轴坐标
    var ulTop1 = lyricUl.offsetTop;//歌词ul距离定位父级的top距离
    var finalTar = lyricUl.offsetTop;//歌词拖动结束时的目标点初始化
    document.onmousemove = function (ev) {
        if (changing) {
            return;
        }
        ev = ev || window.event;
        if (Math.abs(ev.clientY - T1) < 4) {
            return;
        }
        lyric.draging = true;
        oLyric.onOff = false;
        olyricLine.style.display = "block";
        var target = ev.clientY - T1 + ulTop1;
        if (target > lyric.lyricTop) {
            target = lyric.lyricTop;
        }
        if (target < (-lyricUl.offsetHeight + lyric.lyricTop + lyric.unitHeight)) {
            target = (-lyricUl.offsetHeight + lyric.lyricTop + lyric.unitHeight);
        }
        lyricUl.style.top = target + "px";
        var numTar = Math.round((target - lyric.lyricTop) / lyric.unitHeight);
        finalTar = numTar * lyric.unitHeight + lyric.lyricTop;
        if (lyric.lyPreNum > -1) {
            lyricLi[lyric.lyPreNum].className = "";
            lyricLi[lyric.lyPreNum].style.cssText = '';
        }
        lyric.lyNum = Math.abs(numTar);
        lyricLi[lyric.lyNum].className = "active";
        lyricLi[lyric.lyNum].style.color = lyric.color;
        lyric.lyPreNum = lyric.lyNum;
    };
    document.onmouseup = function () {
        if (changing) {
            return;
        }
        if (lyric.draging) {
            lyric.draging = false;
            olyricLine.style.display = "none";
            if (lyric.lyMTime[lyric.lyNum]) {
                Audio1.currentTime = (lyric.lyMTime[lyric.lyNum] + 0.001);
            } else {
                Audio1.currentTime = (lyric.lyMTime[0] + 0.001);
            }
            sToM(lyric.lyMTime[lyric.lyNum], currentTime);
            curMoveByCurtime(lyric.lyMTime[lyric.lyNum], durationT);
            move(lyricUl, {top: finalTar}, 100, 'easeIn');
        }
        document.onmousemove = null;
        document.onmouseup = null;
    };
};


