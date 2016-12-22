var charts = {};
charts.init = function () {
    charts.pie();//初始化饼状图；
    charts.Event();//初始化事件区；
};
charts.Event = function () {
    charts.click();//点击切换图表；
};
charts.click = function () {
    //饼状图切换；
    $('.pie').on('click', function () {
        charts.clear();
        $(this).addClass('focus');
        charts.pie();

    });
    //雷达图切换；
    $('.Radar').on('click', function () {
        charts.clear();
        $(this).addClass('focus');
        charts.radar();
    });
    //柱状图切换；
    $('.col').on('click', function () {
        charts.clear();
        $(this).addClass('focus');
        charts.col();
    });
};
//清除所有a标签颜色；
charts.clear = function () {
    $('.chart-header a').each(function (i, ele) {
        $(ele).removeClass('focus')
    })
};
charts.pie = function () {
    $('#mainChart').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 30,
                beta: 0
            }
        },
        title: {
            text: '个人技能数据可视化展示'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '擅长能力',
            data: [
                ['HTML', 15.0],
                ['HTML5', 5.0],
                ['CSS/CSS3', 15.0],
                ['原生javascript', 50.0],
                ['框架&库', 10.0],
                ['其他', 5.0]
            ]
        }]
    });
};
charts.radar = function () {
    $('#mainChart').highcharts({
        chart: {
            polar: true,
            type: 'line'
        },
        colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
            '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
        ],
        title: {
            text: '个人技能数据可视化展示'
        },

        pane: {
            size: '80%'
        },
        xAxis: {
            categories: ['html5', 'CSS3', 'javascript', 'canvas',
                'Ajax', 'vue等框架'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },
        series: [{
            name: '所需储备',
            data: [100, 100, 100, 100, 100, 100],
            pointPlacement: 'on'
        }, {
            name: '领悟熟悉',
            data: [6, 90, 86, 40, 80, 30],
            pointPlacement: 'on'
        }]

    });
};
charts.col = function () {
    $(function () {
        // Create the chart
        $('#mainChart').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: '个人技能数据可视化展示'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: '所需技能百分数'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
            },

            series: [{
                name: '领悟程度',
                colorByPoint: true,
                data: [{
                    name: 'javascript',
                    y: 50.0
                }, {
                    name: 'HTML',
                    y: 15.0
                }, {
                    name: 'CSS3',
                    y: 15.0
                }, {
                    name: '框架库',
                    y: 15.0
                }, {
                    name: 'HTML5',
                    y: 5.0
                }]
            }]
        });
    });
};
$(document).ready(charts.init());