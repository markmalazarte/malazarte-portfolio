function checkSize2() {
    if ($(window).width() > 500) {
        resizeRefresh2();
    } else {
        $('#cycle').fadeOut().cycle('stop');
    }
}

D3scale2 = [];
function resizeRefresh2() {
    $(window).bind('resize', function (e) {
        var i, graph;
        for (i = 0; i < D3scale2.length; i++) {
            graph = D3scale2[i];
            graph.setSize();
            graph.render();
        }
    });
}

checkSize2();

$(window).resize(function () {
    checkSize2();
});

var chartVisits = new Rickshaw.Graph( {
    element: document.getElementById("chart_visits"),
    height: 102,
    renderer: 'line',
    padding: {top: 0.05},
    series: [
        {
            color: "#DA5656",
            data: [ 
                    { x: 1, y: 8466075 },
                    { x: 2, y: 8355648 },
                    { x: 3, y: 8282341 },
                    { x: 4, y: 8453549 },
                    { x: 5, y: 8308526 },
                    { x: 6, y: 8489782 },
                    { x: 7, y: 8128646 },
                    { x: 8, y: 7775409 },
                    { x: 9, y: 6439763 },
                    { x: 10, y: 7638448 }
                    ],
            name: 'WEB'
        }, {
            color: "#56BCEB",
            data: [ 
                    { x: 1, y: 4679027 },
                    { x: 2, y: 4621829 },
                    { x: 3, y: 4540717 },
                    { x: 4, y: 4551862 },
                    { x: 5, y: 4525147 },
                    { x: 6, y: 4626405 },
                    { x: 7, y: 4562818 },
                    { x: 8, y: 4368288 },
                    { x: 9, y: 4109443 },
                    { x: 10, y: 4167150 }
                    ],
            name: 'APP'
        }, {
            color: "#B356DA",
            data: [ 
                    { x: 1, y: 3504519 },
                    { x: 2, y: 3474323 },
                    { x: 3, y: 3501427 },
                    { x: 4, y: 3521550 },
                    { x: 5, y: 3483275 },
                    { x: 6, y: 3628319 },
                    { x: 7, y: 3541357 },
                    { x: 8, y: 3343284 },
                    { x: 9, y: 3031501 },
                    { x: 10, y: 3352540 }
                    ],
            name: 'mDOT'
        }
    ]
});

D3scale2.push(chartVisits);

chartVisits.render();

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: chartVisits,
    xFormatter: function(x) { return null }
} );

var legend = new Rickshaw.Graph.Legend( {
    graph: chartVisits,
    element: document.getElementById("chart_visits_legend")

} );

var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
    graph: chartVisits,
    legend: legend
} );

var format = function(n) {

    var map = {
        0: 'zero',
        1: '10/04/14',
        2: '10/11/14',
        3: '10/18/14',
        4: '10/25/14',
        5: '11/01/14',
        6: '11/08/14',
        7: '11/15/14',
        8: '11/22/14',
        9: '11/29/14',
        10: '12/06/14'
    };

    return map[n];
}


var xAxis = new Rickshaw.Graph.Axis.X({
        graph: chartVisits,
        tickFormat: format,
        element: document.getElementById("x_axis_chart_visits")
        });

        xAxis.render();

var yAxis = new Rickshaw.Graph.Axis.Y( {
    graph: chartVisits,
    tickFormat: d3.format("s"),
    element: document.getElementById("y_axis_chart_visits")
});

yAxis.render();