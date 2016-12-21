/**
 * Created by Zhaoliang on 2016/9/4.
 * 百度云切换页面网址分析；
 * */
window.onload = function () {
    /*功能需求：
     1.页面初始化时候渲染第一级的数据内容；内容点击选择的时候，出现“功能框”可进行；‘增、删、改、查’；
     2.每项内容双击的时候，可进入下一级，即当前文件的下一级，在新的子级内仍然能够进行；‘增、删、改、查’，顶部导航菜单出现；
     3.进入子级时候；导航显示出进入该子级的名字；进入一层就显示一层；
     4.点击导航菜单的链接时返回到对应的子集；
     5.每次渲染hash都改变，本质是通过hash的改变来渲染页面；
     */
    var grid = document.getElementById('grid');//获取包含文件夹的父级包裹层；
    var gridEditName = document.getElementsByClassName('grid_edit_name')[0];  //新建输入悬浮层的包裹层；
    var txt = gridEditName.getElementsByClassName('txt')[0]; //新建输入层；
    var sure = gridEditName.getElementsByClassName('sure')[0];//确认按钮；
    var cancel = gridEditName.getElementsByClassName('cancel')[0];//取消按钮；
    var CheckAll = document.getElementsByClassName('CheckAll')[0];//全选按钮；
    var bTns = document.getElementsByClassName('g-button');//上面功能控制区；
    var creNew = document.getElementsByClassName('creNew')[0];//新建按钮；
    var resetName = document.getElementsByClassName('resetName')[0];//重命名按钮；
    var hidDom = document.getElementsByClassName('hidDom')[0];//第二功能控制区；
    var child = grid.children;//所有的第一子集；
    var nav = document.getElementById('nav');//导航菜单；
    var navChild = nav.children;//导航菜单下的子集；
    var data = [];  //用于存放当前页面的数据；
    var nowPid = 0;//用于记录监测并调用‘对应页’的数据；初始化时，默认渲染第一级的内容；即pid是0的数据；
    var path = [];//用于存储导航菜单的数据；
    navChild[1].id = 0;//将‘全部文件’的id设置为默认的0，后面点击时候通过hash渲染出pid为0的数据页面；
    var loadFiles = document.getElementsByClassName('loadFiles')[0];
    var allFiles = document.getElementsByClassName('allFiles')[0];
    var list = document.getElementById('list');
    var open = document.getElementsByClassName('open')[0];
    var del = document.getElementsByClassName('del')[0];
    var rec = document.getElementsByClassName('rec')[0];
    var neW = document.getElementsByClassName('new11')[0];
    window.location.hash = 'path=/';//初始化hash；
    for (var i = 0; i < navChild.length; i++) {//循环导航菜单的每一位；将数据存入数组path；一开始默认的有两个，“上一级”、“全部文件”
        path.push(navChild[i]);
    }
    /*
     * 渲染页面分析：
     * 1.通过id找到对应的pid，并获取数据，同时改变hash，通过onhashchange()监测事件，渲染出对应的页面；
     * 2.渲染页面的时候，生成头部的面包屑菜单；点击进入下一级的时候，内容区清空并重新渲染；面包屑菜单也需要对应的渲染；
     * 3.主要采用数据思维，在平面上删除或者新建的时候，数据也需要改变；通过数据渲染页面；
     * */
    /*first：初始化页面；*/
    show();
    //导航菜单渲染函数；
    function navShow() {
        nav.innerHTML = '';
        for (var i = 0; i < path.length; i++) {
            nav.appendChild(path[i]);
        }
    }

    //hash改变时，根据nowPid和path渲染页面和面包屑导航
    window.onhashchange = function () {
        show();
        navShow();
    };

    //根据pid找到第一级子数据，即传入对应的pid找到对应的数据，并存储；
    function getChild(needPid) {
        var arr = [];
        for (var i = 0; i < dataList.length; i++) {
            if (dataList[i].pId == needPid) {
                arr.push(dataList[i]);
            }
        }
        return arr;
    }

//根据id找数据
    function getById(id) {
        for (var i = 0; i < dataList.length; i++) {
            if (dataList[i].id == id) {
                return dataList[i];
            }
        }
    }

    //根据id找到下边的所有子数据
    function getAllChild(id) {
        var arr = [];
        arr.push(getById(id));
        xkdzmm(id);
        function xkdzmm(id) {
            var arr2 = getChild(id);//第一级子数据
            if (arr2.length == 0) {
                return;
            }
            arr = arr.concat(arr2);
            for (var i = 0; i < arr2.length; i++) {
                var c = getChild(arr2[i].id);
                if (c.length != 0) {
                    xkdzmm(arr2[i].id);
                }
            }
        }
        return arr;
    }

    //渲染页面；
    function show() {
        data = getChild(nowPid);//调取对应的数据data；渲染页面，
        grid.innerHTML = '';//每次渲染数据的时候先清除页面；
        for (var i = 0; i < data.length; i++) {
            create(i);
        }
    }

    //上一级；
    navChild[0].onclick = function () {
        //console.log(path);
        if (path.length == 2) {
            return;
        }
        path.pop();
        /*删除导航菜单数据的最后一位；因为要从当前页返回到父级页；
         *pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值。
         *如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值*/
        /*path数据分析：默认状态下是[{上一级}，{全部文件}]，然后进入其中一个子集的时候；通过nav.appendChild(path[i])
         *增加一个节点，由于节点增加了，因此path的数据也增加了（path.push(navChild[i])）；
         *返回到上一级的时候；先删除当前页的导航菜单数据，即最后一个数据；
         *然后在渲染页面的时候，选择倒数第二个的id；即新的path.length-1；;
         *然后重新渲染导航菜单的内容；
         *将hash改为新的和上级对应的hash，渲染页面；*/
        nowPid = path[path.length - 1].id;//将此时要渲染的页面的nowPid设置为倒数第二位的id,；
        var str = '';
        for (var i = 2; i < path.length; i++) {
            str += path[i].innerHTML + '/';
        }
        window.location.hash = 'path=/' + str;
    };
    //全部文件；
    navChild[1].onclick = function () {
        nowPid = 0;//全部文件点击的时候，让nowPid = 0，
        path = path.splice(0, 2);//只留‘上一级’、‘全部文件’两个数据；
        window.location.hash = 'path=/';//改变hash，通过onhashchange事件渲染页面；
    };
    //生成一条，渲染页面；
    function create(n, c) {
        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        var div3 = document.createElement('div');
        var span = document.createElement('span');
        div1.className = 'grid_item';
        div2.className = 'fileIcon';
        div3.className = 'file_name';
        span.className = 'checkbox';
        div3.innerHTML = data[n].name;//当前该渲染页面的数据；
        div2.appendChild(span);
        div1.appendChild(div2);
        div1.appendChild(div3);
        if (c == 1) {
            grid.insertBefore(div1, child[0]);
        } else {
            grid.appendChild(div1);
        }
        div1.onmouseover = function () {
            if (!this.checked) {
                this.className = 'grid_item hover';
            }
        };
        div1.onmouseout = function () {
            if (this.checked) {
                this.className = 'grid_item active';
            } else {
                this.className = 'grid_item';
            }
        };
        div1.ondblclick = function () {
            //双击的时候，导航菜单多增一条，即导航菜单增加一个a标签，具有点击功能；输出信息为上一个文件夹的名字；
            console.log(getAllChild(this.id));
            nowPid = this.id;//要渲染子集页面；即将传入的参数的id设置为点击的这个div的id，就找到了数据；
            window.location.hash += this.name + '/'; //将对应的hash改为相同格式；
            var a = document.createElement('a');
            a.href = "javascript:;";
            a.id = this.id;//给a绑定id；
            a.innerHTML = this.name;
            a.onclick = function () {
                nowPid = this.id;//点击的时候，将nowPid改变为当前需要渲染的页面的数据对应的id；从而获取数据；
                for (var i = 0; i < path.length; i++) {//在path数据里面找；如果path[i]的id与点击的相等；截取从头到找到这个的位置的数据；
                    if (path[i].id == this.id) {
                        path = path.splice(0, i + 1); //截取从‘上一级’、‘全部文件’、‘###’的下一位；
                    }
                }
                //渲染新的hash；
                var str = '';    //导航重新渲染；刷新hash渲染页面；
                for (var i = 2; i < path.length; i++) {
                    str += path[i].innerHTML + '/';
                }
                window.location.hash = 'path=/' + str;
            };
            path.push(a);//push了一个对象，且该对象具有绑定事件；
            navShow();
            choiceNum();
        };
        div1.name = data[n].name;
        div1.id = data[n].id;
        div1.checked = false;
        span.onclick = function (e) {
            div1.checked = !div1.checked;
            if (div1.checked) {
                div1.checked = true;
                div1.className = 'grid_item active';
            } else {
                div1.checked = false;
                div1.className = 'grid_item hover';
            }
            var m = 0;
            for (var i = 0; i < child.length; i++) {
                if (child[i].checked) {
                    m++;
                }
            }
            if (m > 1) {
                resetName.disabled = true;
            } else {
                resetName.disabled = false;
            }
            if (m == child.length) {
                CheckAll.checked = true;
            } else {
                CheckAll.checked = false;
            }
            choiceNum();
            e.cancelBubble = true;
        }
    }

    //新建
    creNew.onclick = function newMake() {
        if (!this.onOFF) {//给新建按钮一个自定义属性；因为未定义的转为false取反,为true；
            this.onOFF = true;
            gridEditName.style.display = 'block';
            gridEditName.style.left = 0;
            gridEditName.style.top = 0;
            txt.value = '新建文件夹';
            /*渲染文件夹的时候需要数据，但新建的时候，临时数据是无用的，
             *所以可以使用null，当sure点击的时候，需要删除临时文件夹那个节点
             * 并且删除数据*/
            var j = {};
            j.id = null;//设置临时id，
            j.name = null;//设置临时name，
            j.pId = nowPid;//生成对应的pid；
            dataList.unshift(j);//生成数据；
            data = getChild(nowPid);//获取到需要的数据；
            create(0, 1);//渲染出第1文件夹
            /*console.log(dataList);*/
            sure.onclick = function () {
                creNew.onOFF = false;//在确定和取消按钮点击的时候都需要取反，才能使新建能够再点；
                var val = txt.value;//将名字存储下来；
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name == val) {
                        alert('命名重复了');
                        return;
                    }
                }
                j.id = maxId() + 1;
                j.name = val;
                grid.removeChild(child[0]);
                create(0, 1);
                gridEditName.style.cssText = '';
            }
        }
        cancel.onclick = function () {
            creNew.onOFF = false;
            gridEditName.style.cssText = '';
            grid.removeChild(child[0]);
            dataList.shift();
            data = getChild(nowPid); //取消的时候，重新获取数据；
        };
    };
    //删除
    bTns[2].onclick = function () {
        bTns[4].disabled = false;
        if (confirm('确定要删除吗')) {
            for (var i = 0; i < child.length; i++) {
                if (child[i].checked) {
                    for (var j = 0; j < dataList.length; j++) {
                        if (dataList[j].id == child[i].id) {
                            dataList.splice(j, 1);
                            j--;
                        }
                    }
                    grid.removeChild(child[i]);
                    i--;
                }
            }
        }
        console.log(dataList);
        choiceNum();
    };
    //重命名
    resetName.onclick = function () {
        var ele = null;
        for (var i = 0; i < child.length; i++) {
            if (child[i].checked) {
                gridEditName.style.display = 'block';
                gridEditName.style.left = child[i].offsetLeft + 'px';
                gridEditName.style.top = child[i].offsetTop + 'px';
                txt.value = child[i].name;
                ele = child[i];
            }
        }
        sure.onclick = function () {
            var val = txt.value;
            for (var i = 0; i < dataList.length; i++) {
                if (dataList[i].name == val) {
                    alert('命名重复了');
                    return;
                }
            }
            ele.getElementsByClassName('file_name')[0].innerHTML = val;
            ele.name = val;
            for (var j = 0; j < dataList.length; j++) {
                if (dataList[j].id == ele.id) {
                    dataList[j].name = val;
                }
            }
            console.log(dataList);
            console.log(data);
            back();
        };
        cancel.onclick = function () {
            back();
        }
    };
    function back() {
        for (var k = 0; k < child.length; k++) {
            child[k].checked = false;
        }
        gridEditName.style.cssText = '';
    }

    //找最大id
    function maxId() {
        var max = dataList[0].id;
        for (var i = 0; i < dataList.length; i++) {
            if (dataList[i].id > max) {
                max = dataList[i].id;
            }
        }
        return max;
    }

    CheckAll.onclick = function (e) {//全选；
        for (var i = 0; i < child.length; i++) {
            if (this.checked) {
                child[i].checked = true;
                child[i].className = 'grid_item active';
            } else {
                child[i].checked = false;
                child[i].className = 'grid_item';
            }
        }
        choiceNum();
        e.cancelBubble = true;//阻止冒泡；
    };

    function creatKuang() {
        var box = document.createElement('div');
        box.id = "Kuang";
        document.body.appendChild(box);
        grid.addEventListener('mousedown', function (e) {
            box.style.display = 'block';
            box.style.width = 0 + 'px';
            box.style.height = 0 + 'px';
            var l = e.clientX;
            var t = e.clientY;
            grid.onmousemove = function (e) {
                var iL = e.clientX;
                var iT = e.clientY;
                //计算方块宽高
                var w = Math.abs(l - iL);
                var h = Math.abs(t - iT);
                //计算方块定位left,top
                var n = l < iL ? l : iL;
                var m = t < iT ? t : iT;
                box.style.width = w + 'px';
                box.style.height = h + 'px';
                box.style.left = n + 'px';
                box.style.top = m + 'px';
                for (var i = 0; i < child.length; i++) {
                    if (duang(box, child[i])) {
                        allFiles.innerHTML = '已选中' + choice() + '个文件夹';
                        child[i].checked = true;
                        child[i].className = 'grid_item active';
                    } else {
                        allFiles.innerHTML = '已选中' + choice() + '个文件夹';
                        child[i].checked = true;
                        child[i].className = 'grid_item';
                    }
                }
            };
            grid.onmouseup = function () {
                box.style.display = 'none';
                grid.onmousemove = null;
                grid.onmouseup = null;
            };
            e.preventDefault();
        });
    }

    creatKuang();
    //碰撞检测
    function duang(obj1, obj2) {
        var pos1 = obj1.getBoundingClientRect();
        var pos2 = obj2.getBoundingClientRect();
        if (pos1.right < pos2.left || pos1.bottom < pos2.top || pos1.left > pos2.right || pos1.top > pos2.bottom) {
            return false;
        } else {
            return true;
        }
    }

    function Rightclick() {
        document.oncontextmenu = function (e) {
            list.style.display = 'block';
            list.style.left = e.clientX + 'px';
            list.style.top = e.clientY + 'px';
            return false;
        }
    }

    neW.onclick = function () {

    };
    function choice() {
        var x = 0;
        for (var i = 0; i < child.length; i++) {
            if (child[i].checked) {
                x++;
            }
            if (x == child.length) {
                CheckAll.checked = true;
            }
        }
        return x;
    }

    function choiceNum() {
        var x = 0;
        allFiles.innerHTML = '已选中' + choice() + '个文件夹';
    }

    choiceNum();
    function load() {
        var cd = grid.children;
        loadFiles.innerHTML = '已加载全部，共' + cd.length + '个';
    }

    load();
    Rightclick();
    function Tz() {
        for (var i = 0; i < child.length; i++) {
            drag(child[i])
        }
    }

    /* Tz();*/
    function drag(obj) {
        obj.onmousedown = function (e) {
            var disx = e.clientX - obj.offsetLeft;
            var disy = e.clientY - obj.offsetTop;
            document.onmousemove = function (e) {
                var l = e.clientX - disx;
                var t = e.clientY - disy;
                var maxLeft = window.innerWidth - obj.offsetWidth;
                var maxTop = window.innerHeight - obj.offsetHeight;
                //范围限制
                if (l < 0) {
                    l = 0;
                }
                if (l > maxLeft) {
                    l = maxLeft;
                }
                if (t < 0) {
                    t = 0;
                }
                if (t > maxTop) {
                    t = maxTop;
                }
                obj.style.left = l + 'px';
                obj.style.top = t + 'px';

            };
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
            };
            return false;
        }
    }
};













