function checkSize7() {
    if ($(window).width() > 500) {
        resizeRefresh3();
    } else {
        $('#cycle').fadeOut().cycle('stop');
    }
}

D3scale7 = [];
function resizeRefresh3() {
    $(window).bind('resize', function (e) {
        var i, graph;
        for (i = 0; i < D3scale7.length; i++) {
            graph = D3scale7[i];
            graph.setSize();
            graph.render();
        }
    });
}

checkSize7();

$(window).resize(function () {
    checkSize7();
});

var chartVisitsUnique = new Rickshaw.Graph( {
    element: document.getElementById("chart_visits_unique"),
    height: 102,
    renderer: 'line',
    padding: {top: 0.08},
    series: [
        {
            color: "#DA5656",
            data: [ 
                    { x: 1, y: 1.55 },
                    { x: 2, y: 1.55 },
                    { x: 3, y: 1.56 },
                    { x: 4, y: 1.55 },
                    { x: 5, y: 1.55 },
                    { x: 6, y: 1.55 },
                    { x: 7, y: 1.55 },
                    { x: 8, y: 1.55 },
                    { x: 9, y: 1.50 },
                    { x: 10, y: 1.52 }
                    ],
            name: 'WEB'
        }, {
            color: "#56BCEB",
            data: [ 
                    { x: 1, y: 6.69 },
                    { x: 2, y: 6.68 },
                    { x: 3, y: 6.66 },
                    { x: 4, y: 6.78 },
                    { x: 5, y: 6.84 },
                    { x: 6, y: 6.91 },
                    { x: 7, y: 6.89 },
                    { x: 8, y: 6.85 },
                    { x: 9, y: 6.74 },
                    { x: 10, y: 6.77 }
                    ],
            name: 'APP'
        }, {
            color: "#B356DA",
            data: [ 
                    { x: 1, y: 1.97 },
                    { x: 2, y: 1.97 },
                    { x: 3, y: 1.97 },
                    { x: 4, y: 1.97 },
                    { x: 5, y: 1.97 },
                    { x: 6, y: 1.98 },
                    { x: 7, y: 1.98 },
                    { x: 8, y: 1.98 },
                    { x: 9, y: 1.96 },
                    { x: 10, y: 1.97 }
                    ],
            name: 'mDOT'
        }
    ]
});

D3scale7.push(chartVisitsUnique);

chartVisitsUnique.render();

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: chartVisitsUnique,
    xFormatter: function(x) { return null }
} );

var legend = new Rickshaw.Graph.Legend( {
    graph: chartVisitsUnique,
    element: document.getElementById("chart_visits_unique_legend")

} );

var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
    graph: chartVisitsUnique,
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
        graph: chartVisitsUnique,
        tickFormat: format,
        element: document.getElementById("x_axis_chart_visits_unique")
        });

        xAxis.render();

var yAxis = new Rickshaw.Graph.Axis.Y( {
    graph: chartVisitsUnique,
    tickFormat: d3.format("s"),
    element: document.getElementById("y_axis_chart_visits_unique")
});

yAxis.render();