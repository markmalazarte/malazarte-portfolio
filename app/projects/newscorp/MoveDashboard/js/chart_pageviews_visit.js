function checkSize5() {
    if ($(window).width() > 500) {
        resizeRefresh3();
    } else {
        $('#cycle').fadeOut().cycle('stop');
    }
}

D3scale5 = [];
function resizeRefresh3() {
    $(window).bind('resize', function (e) {
        var i, graph;
        for (i = 0; i < D3scale5.length; i++) {
            graph = D3scale5[i];
            graph.setSize();
            graph.render();
        }
    });
}

checkSize5();

$(window).resize(function () {
    checkSize5();
});

var chartPageviewsVisit = new Rickshaw.Graph( {
    element: document.getElementById("chart_pageviews_visit"),
    height: 102,
    renderer: 'line',
    padding: {top: 0.05},
    series: [
        {   data: [         
                { x: 1, y: 20}
            ],
            name: null
        },
        {
            color: "#DA5656",
            data: [ 
                    { x: 1, y: 10.06 },
                    { x: 2, y: 10.10 },
                    { x: 3, y: 9.95 },
                    { x: 4, y: 9.62 },
                    { x: 5, y: 9.83 },
                    { x: 6, y: 9.76 },
                    { x: 7, y: 9.70 },
                    { x: 8, y: 9.73 },
                    { x: 9, y: 10.54 },
                    { x: 10, y: 9.70 }
                    ],
            name: 'WEB'
        }, {
            color: "#56BCEB",
            data: [ 
                    { x: 1, y: 17.39 },
                    { x: 2, y: 17.56 },
                    { x: 3, y: 16.25 },
                    { x: 4, y: 17.59 },
                    { x: 5, y: 17.39 },
                    { x: 6, y: 17.34 },
                    { x: 7, y: 17.30 },
                    { x: 8, y: 17.12 },
                    { x: 9, y: 17.78 },
                    { x: 10, y: 17.48 }
                    ],
            name: 'APP'
        }, {
            color: "#B356DA",
            data: [ 
                    { x: 1, y: 6.00 },
                    { x: 2, y: 6.10 },
                    { x: 3, y: 6.14 },
                    { x: 4, y: 6.06 },
                    { x: 5, y: 6.15 },
                    { x: 6, y: 6.17 },
                    { x: 7, y: 6.11 },
                    { x: 8, y: 6.16 },
                    { x: 9, y: 6.67 },
                    { x: 10, y: 6.24 }
                    ],
            name: 'mDOT'
        }
    ]
});

D3scale5.push(chartPageviewsVisit);

chartPageviewsVisit.render();

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: chartPageviewsVisit,
    xFormatter: function(x) { return null }
} );

var legend = new Rickshaw.Graph.Legend( {
    graph: chartPageviewsVisit,
    element: document.getElementById("chart_pageviews_visit_legend")

} );

var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
    graph: chartPageviewsVisit,
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
        graph: chartPageviewsVisit,
        tickFormat: format,
        element: document.getElementById("x_axis_chart_pageviews_visit")
        });

        xAxis.render();

var yAxis = new Rickshaw.Graph.Axis.Y( {
    graph: chartPageviewsVisit,
    tickFormat: d3.format("r"),

    element: document.getElementById("y_axis_chart_pageviews_visit")
});

yAxis.render();