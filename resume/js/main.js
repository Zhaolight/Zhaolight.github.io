//主函数；
var main = {};
/*-------------------------------------------全局变量区域--------------------------------------------------------*/
main.timeScroll = null;//挂载滚屏实例；
main.currentStep = 'step1';//当前动画状态；


/*-------------------------------------------功能配置区--------------------------------------------------------*/
/*一、页面初始化函数*/
main.init = function () {
    main.open();//初始化卷轴打开效果；
    main.springFlower("./img/huaban.png");//初始化执行飘花函数；
    main.drawTree();//初始化画树；
    main.Event();//事件加载函数；
    main.middle($('.content'));//展示区元素居中；
    main.Pos();
    main.Pos($('.first'), 0);
    main.Pos($('.second'), 1);
    main.Pos($('.third'), 1);
    main.configTimeScroll();//配置动画；
};
/*二、事件触发函数*/
main.Event = function () {
    main.resize();//窗口改变时函数；
    //阻止浏览器的滚动默认行为；
    $('#wrap').bind('mousewheel', function (ev) {
        ev.preventDefault()
    });
    $('#wrap').one('mousewheel', mousewheelFn);
    //鼠标滚动函数；
    var wheel_time = null;

    function mousewheelFn(ev, direction) {

        if (direction < 1) {//向下滚动；
            //console.log('滚下去了')
            main.changeStep('next');
        } else {//向上滚动；
            //console.log('滚上去了')
            main.changeStep('prev');
        }
        clearTimeout(wheel_time);
        wheel_time = setTimeout(function () {
            $('#wrap').one('mousewheel', mousewheelFn);
        }, 1500)
    }
};
$(document).ready(main.init);
/*----------------------------------------------功能函数封装区域--------------------------------------------------------*/
//飘花函数；
main.springFlower = function (src) {
    var time1 = setTimeout(function () {
        $(document).snowfall('clear');
        $(document).snowfall({
            image: src,
            flakeCount: 20,
            minSize: 5,
            maxSize: 22
        });
    }, 200);
};
//卷轴展开效果
main.open = function () {
    $(".l-pic-index").animate({'left': '9px'}, 2000);
    $(".r-pic-index").animate({'right': '9px'}, 2000);
    $(".l-bg-index").animate({'width': '432px', 'left': '73px'}, 2000);
    $(".r-bg-index").animate({'width': '432px', 'left': '504px'}, 2000, function () {
        $(".main-index").fadeIn(900);
        $(".bgPen").fadeIn(600);
    });
};
//画树效果；
main.drawTree = function () {
    var tree = document.getElementById('tree');
    tree.width = 852;
    tree.height = 576;
    var ctx = tree.getContext('2d');
    var img = new Image();
    img.src = 'img/Treebg.png';
    img.onload = function () {
        ctx.drawImage(img, 0, 0, tree.width, tree.height);
    };
    setTimeout(function () {
        drawTree(ctx, tree.width / 6, tree.height + 30, 60, -Math.PI / 2, 10, 6);
    }, 2200);
    setTimeout(function () {
        drawTree(ctx, tree.width / 3, tree.height - 30, 40, -Math.PI / 2, 8, 4);
    }, 1000);
    setTimeout(function () {
        drawTree(ctx, tree.width * 5 / 6, tree.height, 20, -Math.PI / 2, 7, 4);
    }, 500);
};

//位置及样式调整；
main.middle = function (obj) {
    obj.css('left', ($(window).width() - obj.outerWidth()) / 2);
    obj.css('top', ($(window).height() - obj.outerHeight()) / 2);
};
//窗口自适应位置函数；
main.resize = function () {
    $(window).on('resize', function () {
        main.middle($('.content'));
    })
};
//画树函数；
function drawTree(ctx, startX, startY, length, angle, depth, branchwidth) {
    /**
     * [drawTree description]
     * @param  ctx         [画布]
     * @param  startX      [树的起始 x 坐标]
     * @param  startY      [树的起始 y 坐标]
     * @param  length      [树干长度]
     * @param  angle       [树干方向，以坐标系x轴正方向为0度]
     * @param  depth       [树干的节数]
     * @param  branchwidth [树干宽度]
     */
    var rand = Math.random, newLength, newAngle, newDepth, maxBranch = 3, endX, endY, maxAngle = Math.PI / 4, subBranches;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    endX = startX + length * Math.cos(angle);
    endY = startY + length * Math.sin(angle);
    ctx.lineCap = 'round';
    ctx.lineWidth = branchwidth;
    ctx.lineTo(endX, endY);
    if (depth <= 2) {
        ctx.strokeStyle = 'rgb(237,' + parseInt(((rand() * 64) + 100)) + ',65)';
        ctx.strokeStyle = 'rgb(0,' + parseInt(((rand() * 64) + 128)) + ',0)';
    } else {
        ctx.strokeStyle = 'rgb(' + parseInt(((rand() * 64) + 64)) + ',50,25)';
    }
    ctx.stroke();
    newDepth = depth - 1;
    if (!newDepth) {
        return;
    }
    subBranches = rand() * (maxBranch - 1) + 1;
    branchwidth *= 0.7;
    setTimeout(function () {
        for (var i = 0; i < subBranches; i++) {
            newAngle = angle + rand() * maxAngle * 2 - maxAngle;
            newLength = length * (0.7 + rand() * 0.3);
            drawTree(ctx, endX, endY, newLength, newAngle, newDepth, branchwidth);
        }
    }, 100);
}
main.Pos = function (ele, n) {
    $(ele).css({
        left: n * 850,
        top: 0
    })
};
main.configTimeScroll = function () {
    main.timeScroll = new TimelineMax();
    main.timeScroll.add('step1');//首屏；
    main.timeScroll.to('.second', 0.8, {left: 0, ease: Cubic.easeInOut});
    main.timeScroll.to({}, 0.1, {
        onComplete: function () {
            main.springFlower("./img/huaban.png");//初始化执行飘花函数；
        }
    });
    main.timeScroll.add('step2');
    main.timeScroll.to('.third', 0.8, {left: 0, ease: Cubic.easeInOut});
    main.timeScroll.to({}, 0.1, {
        onComplete: function () {
            main.springFlower("./img/sumer.png");//初始化执行飘花函数；
        }
    });
    main.timeScroll.add('step3');
    main.timeScroll.to('.fourth', 0.8, {left: 0, ease: Cubic.easeInOut});
    main.timeScroll.to({}, 0.1, {
        onComplete: function () {
            main.springFlower("./img/trees.png");//初始化执行飘花函数；
        }
    });
    main.timeScroll.add('step4');
    main.timeScroll.to('.fifth', 0.8, {left: 0, ease: Cubic.easeInOut});
    main.timeScroll.to({}, 0.1, {
        onComplete: function () {
            main.springFlower("./img/snow.png");//初始化执行飘花函数；
        }
    });
    main.timeScroll.add('step5');
    main.timeScroll.stop();
};
//滚屏变化函数；
main.changeStep = function (value) {
    if (value === 'next') {//向下切换；
        //获取当前时间；
        var currentTime = main.timeScroll.getLabelTime(main.currentStep);
        //console.log(currentTime);
        //获取下一个状态字符串；
        var afterStep = main.timeScroll.getLabelAfter(currentTime);
        //console.log(afterStep)
        //运动到下一个状态；
        main.timeScroll.tweenTo(afterStep);
        //记录当前状态为下一个状态，方便继续切换到下一个状态上；
        main.currentStep = afterStep;
    } else {//向上切换；
        var currentTime = main.timeScroll.getLabelTime(main.currentStep);
        //console.log(currentTime);
        //获取上一个状态字符串；
        var beforeStep = main.timeScroll.getLabelBefore(currentTime);
        //console.log(beforeStep)
        //运动到下一个状态；
        main.timeScroll.tweenTo(beforeStep);
        //记录当前状态为上一个状态，方便继续切换到上一个状态上；
        main.currentStep = beforeStep;
    }
};

//个人信息输入；
