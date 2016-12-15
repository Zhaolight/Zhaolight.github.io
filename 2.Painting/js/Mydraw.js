/* 
* @Author: anchen
* @Date:   2016-12-05 21:22:00
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-06 22:49:55
*/
function  Draw(){
    this.mom = document.getElementById('mom');
    this.home = document.getElementById('home');
    this.all = document.getElementById('all');//所以小画板
    this.child = this.all.children;
    this.Right = document.getElementById('right');//侧栏
    this.sidebar = document.getElementById('right_r');
    this.navchild = this.sidebar.children;
    this.addtexts=document.getElementById('addtexts');

    
    this.arrc = ['#ff007f', '#FF7300', 'yellow', 'green', 'blue', '#4B0080', '#FF00FF', '#fff', '#000'];//画笔颜色
    this.arrl = ['1', '2', '5', '8', '10', '20', '30','50'];//画笔颜色控制；
    this.speak = '欢迎关注：smile小小羽 的微博 ';
    this.str='images/bg.jpg';//切换的图片

    this.cas = document.getElementById('cas');
    this.w = this.cas.width = document.documentElement.clientWidth/2;
    this.h = this.cas.height = document.documentElement.clientHeight/1.5;
    this.OnOff = true;//控制大颜色器自传
    this.headOff=true;//控制head的按钮按下后可不可以实现功能
    this.l = 1;//线宽
    this.c = 0;//线的颜色
    this.OR = 80;//颜色板的运动半径
    this.n = 0;//开始画的第几个汉字
    this.lastx,this.lasty;//控制橡皮擦的位置
    this.off=false;//控制橡皮擦的显示与否
    this.eraserw;//存橡皮擦大小
    this.cas.style.left = (document.documentElement.clientWidth - this.cas.offsetWidth) / 2 + 'px';
    this.cas.style.top = (document.documentElement.clientHeight - this.cas.offsetHeight) / 2 + 'px';
    this.gs = this.cas.getContext('2d');//创建二维画布
    this.init();
    
}
Draw.prototype={
    constructor:Draw,
    init:function(){
        this.changebg();//加背景
        this.painting(this.gs, this.arrc[this.c],this.l);//调用绘画函数-----------------------------?????ccccc
        this.colo();
        this.side();
        this.mine();
    },
    changebg:function(){//加背景
        var img = new Image();
        img.src=this.str;
        var that=this;
        img.onload = function () {
        that.gs.drawImage(img,0,0,that.w,that.h);
        }
    },

    painting:function(goal,cl,m) {//目标，颜色，线宽，，，，画线
        goal.beginPath();//重置当前路径
        goal.lineWidth=m;//线宽
        var _this=this;
        this.cas.onmousedown = function (e) {
            goal.strokeStyle = cl;
            var l = e.layerX;
            var t = e.layerY;
            goal.moveTo(l, t);
            _this.cas.onmousemove = function (e) {
                var x = e.layerX;
                var y = e.layerY;
                goal.lineTo(x, y);
                goal.stroke();
            };
            _this.cas.onmouseup = function () {
                _this.cas.onmousemove = _this.cas.onmouseup = null;
            };
            return false;
        }
    },
    side:function(){//生成侧帘
        
        for (var i = 0; i < this.navchild.length; i++) {
            this.navchild[i].style.width='37px';
        }
        //控制控制板的显示与否
        this.Right.style.left=cas.getBoundingClientRect().right+3+'px';
        this.Right.style.top=(document.documentElement.clientHeight-this.Right.offsetHeight)/2+'px';
        var _this = this;
        this.cas.onmouseleave=function(e){
            var l=e.clientX;
            var t=e.clientY;
            if(l>_this.cas.getBoundingClientRect().right&&t<_this.cas.getBoundingClientRect().bottom&&t>_this.cas.getBoundingClientRect().top){
                 _this.Right.style.left=_this.cas.getBoundingClientRect().right+3+'px';
                _this.Right.style.top=(document.documentElement.clientHeight-_this.Right.offsetHeight)/2+'px';
            }
        };
        this.cas.onmouseenter=function(){
            _this.Right.style.left=_this.cas.getBoundingClientRect().right+3-_this.Right.offsetWidth+'px';
            _this.Right.style.top=(document.documentElement.clientHeight-_this.Right.offsetHeight)/2+'px';
        };
        //侧栏点击
        for (var i = 0; i < this.navchild.length; i++) {
            this.navchild[i].onmouseover=function(){
                this.style.width='42px';
                this.style.height='22px';
            };
            this.navchild[i].onmouseout=function(){
                this.style.width='39px';
                this.style.height='19px';
            }
        }
    },
    mine:function(){
        var file = document.getElementById('file');//上传图片按钮
        var updown = document.getElementById('updown');//左上角
        var udchild = updown.children;//左上角
        var introduce = document.getElementById('introduce');//功能介绍
        var _this = this;
        //-----------------------------------------上传----------------------------------------------
        udchild[1].onclick=function(){
            file.onchange=function(){
                var files = this.files[0];
                var fr = new FileReader();

                fr.onload = function(ev){
                    var result = ev.target.result;
                    var img = new Image(400,400);
                    img.src = result;
                    _this.str=result;
                    _this.gs.clearRect(0,0,_this.w,_this.h);
                    _this.gs.drawImage(img,0,0,_this.w,_this.h);
                    _this.painting(_this.gs,_this.arrc[_this.c],_this.l);//调用绘画函数
                };
                fr.readAsDataURL(files);
            }
        };
        // ----------------------------------显示功能区-------------------------------
        udchild[0].onmouseenter=function(){
            introduce.style.display='block';
        };
        udchild[0].onmouseleave=function(){
            introduce.style.display='none';
        }
    },
    colo:function(){//颜色控制器
        for (var i = 0; i < this.child.length; i++) {
            this.child[i].style.background = '-webkit-gradient(radial,15 15,5,15 15,15,from(' + this.arrc[i] + '),to(#fff))';
        }
        //定位颜色控制器；
        this.home.style.left = parseFloat(this.cas.style.left) + this.w - 20 + 'px';
        this.home.style.top = parseFloat(this.cas.style.top) - 25 + 'px';
        console.log(this.cas.style.left,this.home.style.top);
        
        
        this.colo_click();
        
        //鼠标滑到颜色器上
        for (var i = 0; i < this.child.length; i++) {
            this.child[i].index = i;
            var _this = this;
            this.child[i].onmouseover = function () {
                this.style.WebkitTransform = "scale(1.6)";//对应这一个变大两倍
            };
            this.child[i].onmouseout = function () {
                this.style.WebkitTransform = "scale(1)";//对应这一个变回原来的大小
            };

            //选中颜色，所有颜色收回
            this.child[i].addEventListener('click',function(){

                _this.c=this.index;
                _this.text(_this.gs,_this.arrc[_this.c]);//调用写字函数

                _this.painting(_this.gs, _this.arrc[_this.c],_this.l);//调用绘画函数
                 _this.OnOff = true;
                _this.mom.style.WebkitTransform = "rotate(0deg)";
                for (var i = 0; i < _this.child.length; i++) {
                    _this.child[i].style.WebkitTransform = "scale(1)";
                    _this.child[i].style.left = 0 + 'px';
                    _this.child[i].style.top = 0 + 'px';
                }
            }) 
        }
        // console.log(size(60));
    },
    colo_click:function(){//点击颜色器展开，闭合
        var _this = this;
        this.mom.onclick = function () {
            if (_this.OnOff) {
                this.style.WebkitTransform = "rotate(-720deg)";//旋转的度数
                for (var i = 0; i < _this.child.length; i++) {
                    var mo = (180 / 7) * i - 138;//控制角度;
                   _this.child[i].style.transition='0.5s '+i*100+'ms';
                   _this.child[i].style.left = -_this.size(mo).l + 'px';
                   _this.child[i].style.top = -_this.size(mo).t + 'px';
                }
            } else {
                this.style.WebkitTransform = "rotate(0deg)";
                for (var k = 0; k < _this.child.length; k++) {
                    _this.child[k].style.transition='0.3s '+k*20+'ms';
                    _this.child[k].style.left = 0 + 'px';
                    _this.child[k].style.top = 0 + 'px';
                }
            }
            _this.OnOff = !_this.OnOff;
        };
    },
    size:function(x) {//每个小色板的位移计算
        var l = Math.floor(this.OR * Math.sin(x / 180 * Math.PI));
        var t = Math.floor(this.OR * Math.cos(x / 180 * Math.PI));
        return {
                l:l,
                t:t
        }
    },
    ca:function(x,y,s){//橡皮擦清除
        var img = new Image();
        img.src = this.str;
        this.gs.save();
        this.gs.beginPath();
        this.gs.arc(x, y, 10*(s/10+0.2), 0, Math.PI * 2);
        this.gs.clip();
        this.gs.drawImage(img,0, 0,this.w,this.h);//画图片来填充对应的部分
        this.gs.restore()
    },
    earse:function(x,y,s){//画橡皮擦
        if(this.off){
            this.gs.beginPath();
            this.gs.strokeStyle="#000";
            this.gs.lineWidth=1;
            this.gs.fillStyle='#fff';
            this.gs.save();
            this.gs.arc(x, y, 10*(s/10), 0, Math.PI * 2);
            this.gs.fill();
            this.gs.stroke();
            this.gs.restore()
        }
     },
    eraser:function(image,s){//背景图片，橡皮擦大小----总控制橡皮擦
        var _this = this;
        this.cas.onmousedown=function(e){
            _this.off=true;
            var x = e.offsetX+window.pageXOffset;
            var y = e.clientY+window.pageYOffset-_this.cas.offsetTop;
            _this.earse(x,y,s);
            
            _this.cas.onmousemove=function(e){
                var l = e.offsetX+window.pageXOffset;
                var t = e.clientY+window.pageYOffset-cas.offsetTop;

                _this.ca(_this.lastx,_this.lasty,s);//先擦除再画橡皮
                _this.earse(l,t,s);//画橡皮
                _this.lastx=l;_this.lasty=t;
                
            };
            _this.cas.onmouseup=function(e){
                var m = e.offsetX+window.pageXOffset;
                var n = e.clientY+window.pageYOffset-_this.cas.offsetTop;
                _this.off=false;
                _this.cas.onmousemove=_this.cas.onmouseup=null;

                _this.ca(m,n,s);//清除当前橡皮擦
            };
            return false;
         }
    },
    ceraser:function(value){//-改变橡皮擦大小
        this.eraserw=value;
        this.eraser(this.str,this.eraserw);//背景图片，橡皮擦大小
    },
    cline:function(value){//改变线的粗细，按下确定按钮后
        this.l=value;
        this.painting(this.gs,this.arrc[this.c],this.l);//调用绘画函数
    },
    distance:function(d1,d2){//算画字的时候鼠标移动的距离
        var dx = d2.x - d1.x;
        var dy = d2.y - d1.y;
        return Math.sqrt(dx*dx + dy*dy);
    },
    getSize:function(speak,size){//测量每个字所占的宽度
        this.gs.font = `${size}px Arial`;
        return this.gs.measureText(speak).width;
    },
    text:function(color){//字体颜色-------画字
        var mouse = {x:0,y:0,down:false};//鼠标滑动时候的坐标,text
        var position = {x:0,y:0};//鼠标点击时候的坐标,text
        var minFontSize = 10;//最字体小
        var n = 0;//开始画的第几个汉字
        var _this=this;
        this.cas.onmousedown = function(e){
            position.x = e.offsetX;
            position.y = e.offsetY;
            mouse.down = true;
        };
        this.cas.onmousemove = function(e){
            if(!mouse.down) return false;
            mouse.x = e.offsetX;
            mouse.y = e.offsetY;
            var d = _this.distance(position,mouse);
            var letter = _this.speak[_this.n];//具体的那个字
            var fontSize = minFontSize + d/2;//字体大小
            var step = _this.getSize(letter,fontSize);

            if(d > step){
                var angle = Math.atan2(mouse.y - position.y,mouse.x - position.x);//算旋转角度
                _this.gs.fillStyle = color;
                _this.gs.font = `${fontSize}px Arial`;//字体设置
                _this.gs.save();
                _this.gs.translate(position.x,position.y)//移动
                _this.gs.fillText(letter,0,0);//画字
                _this.gs.restore();

                _this.n ++;
                _this.n %= _this.speak.length;//可以一直写字

                position.x = position.x + step*Math.cos(angle);
                position.y = position.y + step*Math.sin(angle);
            }

        };
        this.cas.onmouseup = function(){
            mouse.down = false;
            _this.n=0;
        }
    },
    add_text:function(){//改变画的文字内容
        
        var textarea = this.addtexts.getElementsByTagName('textarea')[0];
        var add_child=this.addtexts.children;
        this.addtexts.style.left=(document.documentElement.clientWidth-this.addtexts.offsetWidth)/2+'px';
        this.addtexts.style.top=(document.documentElement.clientHeight-this.addtexts.offsetHeight)/2+'px';
        add_child[0].style.margin="10px 15px";
        add_child[0].style.borderRadius='5px';
        add_child[0].style.fontSize='14px';
        add_child[0].style.width=this.addtexts.offsetWidth-30+'px';
        var _this=this;
        //添加点击事件
        add_child[2].onclick=function(){//重置
            textarea.value='';
        };
        add_child[1].onclick=function(){//确定
            _this.addtexts.style.display='none';
            if(textarea.value.length!=0){
                _this.speak=textarea.value;
            }
            textarea.value='';
            _this.headOff=true;//其他head按钮就可以按了
            _this.text(_this.arrc[_this.c]);
        };
        add_child[3].onclick=function(){//取消
            _this.addtexts.style.display='none';
            textarea.value='';
            _this.headOff=true;
            text(arrc[c]);
        }
    }





}

var canv = new Draw();console.log(canv.navchild)
if(canv.headOff){
    for (var i = 0; i < canv.navchild.length; i++) {
        canv.navchild[0].onchange=function(){//线宽
            canv.cline(canv.navchild[0].value);
        }
        canv.navchild[1].onclick=function(){//加文字
            canv.text(canv.arrc[canv.c]);
        }
        canv.navchild[2].onclick=function(){//该文字内容
            canv.addtexts.style.display='block';
            canv.text(canv.arrc[canv.c]);
            canv.headOff=false;
            canv.add_text();
        }
        canv.navchild[3].onclick=function(){//橡皮擦
            canv.ceraser(canv.navchild[4].value)
        }
        canv.navchild[4].onchange=function(){//该橡皮擦大小
            canv.ceraser(canv.navchild[4].value);
        }
        canv.navchild[5].onclick=function(){//该橡皮擦大小
            canv.gs.clearRect(0,0,canv.w,canv.h);
            canv.changebg();//调用加背景的函数
            canv.painting(canv.gs,canv.arrc[canv.c],canv.l);//调用绘画函数
        }
    };
}

