window.onload = function () {
    /***********************************************函数封装区域*********************************************************/
    /* 功能汇总：
     * 标题滚动效果；
     * 功能选项卡，可改变播放形式，以及烟花‘厚薄程度’；
     * 小孩儿"骑车"；
     * 元素居中；
     * 元素右下角对齐；
     * 随机色；
     * 烟火上升；
     * 烟花爆炸；
     * 清除页面；
     * 长宽“半自适应”；
     * 鼠标状态；
     * 失焦传值；
     * 阻止默认行为、冒泡；
     * */
    //获取元素封装；
    function getTag(name, obj) {
        //如果传入元素对象，就从元素下获取；如果没传，就从document获取；
        obj = obj || document;
        var t = name.charAt(0);
        var tag = name.substring(1);
        if (t === '#') {
            return document.getElementById(tag);
        } else if (t === '.') {
            var arr = [];
            var eles = obj.getElementsByTagName('*');
            for (var i = 0; i < eles.length; i++) {
                var c = eles[i].className.split(' ');
                for (var j = 0; j < c.length; j++) {
                    if (c[j] == tag) {
                        arr.push(eles[i]);
                    }
                }
            }
            return arr;
        } else {
            return obj.getElementsByTagName(name);
        }
    }
//元素居中在浏览器底部函数封装；
    function autoMiddle(obj) {
        var w = (window.innerWidth - obj.offsetWidth) / 2;
        var h = window.innerHeight - obj.offsetHeight;
        obj.style.left = w + 'px';
        obj.style.top = h + 'px';
    }
//元素居中在浏览器底部右下角函数封装；
    function autoRight(obj) {
        var h = window.innerHeight - obj.offsetHeight;
        obj.style.right = 0;
        obj.style.top = h + 'px';
    }
//页面高度自适应函数；
    function autoHeight(obj) {
        obj.style.height = window.innerHeight + 'px';
    }
//生成随机数函数封装；
    function randomNum(min, max) {
        return Math.random() * ( max - min ) + min;
    }
//生成随机背景颜色；
    function color(obj) {
        var r = Math.ceil(randomNum(0, 255));
        var g = Math.ceil(randomNum(0, 255));
        var b = Math.ceil(randomNum(0, 255));
        obj.style.background = 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    /****************************************************创建烟花（烟花爆炸）********************************************/
    //以下函数中的obj：运动对象；x：运动初始横坐标位置，运动初始纵坐标位置，m：创建运动对象个数；
    var screenWidth = document.documentElement.clientWidth || document.body.clientWidth;//屏幕的宽度；
    var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;//屏幕的高度；
    function show(obj, x, y, m) {
        for (var i = 0; i < m; i++) {
            var fireDiv = document.createElement('div');
            obj.appendChild(fireDiv);
            fireDiv.className = "fireDiv";
            fireDiv.style.left = x + 'px';
            fireDiv.style.top = y + 'px';
            color(fireDiv);//赋色；
            var a = Math.random() * 360;//产生随机角度；
            fireDiv.speedX = Math.sin(a * 180 / Math.PI) * screenWidth / 3 * Math.random();//x轴分速度
            fireDiv.speedY = Math.cos(a * 180 / Math.PI) * screenHeight / 2 * Math.random();//y轴分速度
            fireDiv.speedY += 10;//y轴的加速度；
            move(fireDiv, {
                left: parseFloat(fireDiv.style.left) + fireDiv.speedX,
                top: parseFloat(fireDiv.style.top) + fireDiv.speedY,
                opacity: 0
            }, 2000, 'easeOut', function () {
                //垃圾回收，当烟花碎屑完全运动结束之后，开始清除‘烟花垃圾’，即透明度变为0的时候；
                var rubbish = obj.children;
                //console.log(rubbish.length);
                for (var k = 0; k < rubbish.length; k++) {
                    if (rubbish[k].style.opacity == '0') {
                        obj.removeChild(rubbish[k])
                    }
                }
                //console.log(rubbish.length);
            });
        }
    }
    /*********************************************创建烟火（烟火上升）***************************************************/
    function firework() {//参数决定播放形式；
        document.addEventListener('mousedown', function (e) {
            e.preventDefault();
        });
        document.addEventListener('click', function (e) {
            e = e || event;  //事件对象兼容性获取
            /*1、点击页面时获取点击位置坐标*/
            var mouseX = e.clientX;
            var mouseY = e.clientY;
            function createFire(objx, objY, targetX, targetY, obj) {
                /* objX：生成烟火距离屏幕左边的距离
                 * objY：生成烟火距离屏幕顶部的距离
                 * targetX/Y：运动的目标点*/
                /*2、创建DIV元素对象:包裹层*/
                var wrap = document.createElement("div");
                wrap.id = "wrap";
                if (arg == 1 || arg == 3) {//表示从中心生起烟花；
                    wrap.style.left = screenWidth / 2 + "px";
                }
                if (arg == 2) {//表示从点击点的正下方升起烟花；
                    wrap.style.left = mouseX + "px";
                }
                wrap.style.top = screenHeight + "px";

                /*烟火颜色和宽度值、长度值的控制*/
                var n = 0;//div宽度值的变化
                var m = 10;//div长度值的变化
                /*创建DIV：烟火形状*/
                for (var i = 0; i < 10; i++) {
                    var div = document.createElement("div");
                    div.style.width = (3 - n) + "px";
                    div.style.height = (20 + (m += 10)) + "px";
                    div.style.top = 0;
                    color(div);
                    n += 0.2;
                    //烟火偏转角度规定；
                    if (arg == 1 || arg == 3) {
                        if (mouseX < screenWidth / 2) {
                            div.style.left = 15 * n + "px";
                            div.style.transform = "rotate(-30deg)";
                        }
                        if (mouseX > screenWidth / 2) {
                            div.style.left = -14 * n + "px";
                            div.style.transform = "rotate(30deg)";
                        }
                        if (mouseX >= screenWidth / 2 - 150 && mouseX <= screenWidth / 2 + 150) {
                            div.style.left = 0.3 * n + "px";
                            div.style.transform = "rotate(0deg)";
                        }
                    } else {//从正下方升起；
                        div.style.left = 0.3 * n + "px";
                        div.style.transform = "rotate(0deg)";
                    }
                    wrap.appendChild(div);
                }
                box.appendChild(wrap);
                //烟花生成封装
                move(wrap, {top: mouseY, left: mouseX, opacity: 0}, 900, "easeOut", function () {
                    if (wrap.style.opacity == 0) {
                        obj.removeChild(wrap);
                    }
                    //烟花绽放；
                    show(box, e.clientX, e.clientY, inp.value)
                });
            }
            //烟花真实生成；
            if (arg == 1) {
                createFire(screenWidth / 2, screenHeight, mouseX, mouseY, box)
            } else if (arg == 2) {
                createFire(mouseX, screenHeight, mouseX, mouseY, box)
            } else if (arg == 3) {
                var m = 0;
                var time = null;
                clearInterval(time);
                time = setInterval(function () {
                    createFire(screenWidth / 2, screenHeight, mouseX, mouseY, box);
                    m++;
                    //console.log(m)；
                    if (m == 3) {
                        clearInterval(time)
                    }
                }, 500);
            }
            e.preventDefault();
        })
    }
    /***************************************************页面操作区域*****************************************************/
    //标题滚动效果；
    var s = document.title.split('');//console.log(s);获取并将tittle截成数组；
    //封装“滚动函数”
    function loop() {
        s.push(s[0]);//在数组的最后一位推入第一位；
        s.shift();//删除第一位；
        document.title = s.join('');//拼成字符串再赋值给tittle；
    }
    setInterval(loop, 500);//开定时器，实现“滚动效果”
    //元素获取，页面初始化过程；
    var box = getTag("#box");
    autoHeight(box);    //页面高度自适应函数
    var Table = getTag('.btn-box')[0];//菜单区域；更多模式选框位置js
    var inp = getTag('#inp');
    var list = getTag('.list')[0];
    var lis = getTag('li', list);
    var man = getTag('.man')[0];
    var girl = getTag('.girl')[0];
    var city = getTag('.city')[0];
    autoMiddle(city);
    //小娃娃初始位置；
    autoRight(man);
    autoRight(girl);
    //小娃娃欢快骑车随机运动；
    setInterval(function () {
        move(man, {left: Math.random() * screenWidth}, 1000, "easeOut");
    }, 2500);
    setInterval(function () {
        move(girl, {left: Math.random() * screenWidth}, 1000, "easeOut");
    }, 3000);
    //按钮区域模式切换，阻止冒泡；
    Table.onmouseover = function (e) {
        this.style.left = '0';
        e.cancelBubble = true;//阻止冒泡；
    };
    Table.onmouseout = function () {
        this.style.left = '-100px';
    };
    inp.onfocus = function () {
        this.value = '';
    };
    inp.onblur = function () {
        return this.value = this.value == "" ? 100 : this.value;
    };
    inp.onmousedown = function (e) {
        e.cancelBubble = true;//阻止冒泡；
    };
    //菜单操作；
    for (var i = 0; i < lis.length; i++) {
        choice(i)
    }
    function choice(a, e) {
        lis[a].onclick = function (e) {
            e.cancelBubble = true;//阻止冒泡；
        }
    }
    /*烟花效果区域*/
    var arg;
    function ff() {
        arg = 1;
        firework();
    }
    ff();//初始化烟花播放；
    //初始化点击默认从中间升起；
    lis[1].onclick = function (e) {
        arg = 1;
        firework();
        e.cancelBubble = true;//阻止冒泡；
    };
    lis[2].onclick = function (e) {
        arg = 2;
        firework();
        e.cancelBubble = true;//阻止冒泡；
    };
    lis[3].onclick = function (e) {
        arg = 3;
        firework();
        e.cancelBubble = true;//阻止冒泡；
    };
};


