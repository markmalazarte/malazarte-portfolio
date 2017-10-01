function checkSize6() {
    if ($(window).width() > 500) {
        resizeRefresh3();
    } else {
        $('#cycle').fadeOut().cycle('stop');
    }
}

D3scale6 = [];
function resizeRefresh3() {
    $(window).bind('resize', function (e) {
        var i, graph;
        for (i = 0; i < D3scale6.length; i++) {
            graph = D3scale6[i];
            graph.setSize();
            graph.render();
        }
    });
}

checkSize6();

$(window).resize(function () {
    checkSize6();
});

var chartListings1K = new Rickshaw.Graph( {
    element: document.getElementById("chart_listings_1k"),
    height: 102,
    renderer: 'line',
    padding: {top: 0.08},
    series: [
        {
            color: "#DA5656",
            data: [ 
                    { x: 1, y: 12.15 },
                    { x: 2, y: 12.85 },
                    { x: 3, y: 12.33 },
                    { x: 4, y: 11.75 },
                    { x: 5, y: 12.50 },
                    { x: 6, y: 12.94 },
                    { x: 7, y: 12.64 },
                    { x: 8, y: 12.81 },
                    { x: 9, y: 12.84 },
                    { x: 10, y: 12.62 }
                    ],
            name: 'WEB'
        }, {
            color: "#56BCEB",
            data: [ 
                    { x: 1, y: 8.50 },
                    { x: 2, y: 8.55 },
                    { x: 3, y: 8.59 },
                    { x: 4, y: 8.35 },
                    { x: 5, y: 8.16 },
                    { x: 6, y: 8.30 },
                    { x: 7, y: 8.36 },
                    { x: 8, y: 8.13 },
                    { x: 9, y: 7.91 },
                    { x: 10, y: 8.91 }
                    ],
            name: 'APP'
        }, {
            color: "#B356DA",
            data: [ 
                    { x: 1, y: 5.17 },
                    { x: 2, y: 5.58 },
                    { x: 3, y: 5.50 },
                    { x: 4, y: 5.38 },
                    { x: 5, y: 5.45 },
                    { x: 6, y: 5.55 },
                    { x: 7, y: 5.33 },
                    { x: 8, y: 4.90 },
                    { x: 9, y: 4.95 },
                    { x: 10, y: 5.35 }
                    ],
            name: 'mDOT'
        }
    ]
});

D3scale6.push(chartListings1K);

chartListings1K.render();

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: chartListings1K,
    xFormatter: function(x) { return null }
} );

var legend = new Rickshaw.Graph.Legend( {
    graph: chartListings1K,
    element: document.getElementById("chart_listings_1k_legend")

} );

var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
    graph: chartListings1K,
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
        graph: chartListings1K,
        tickFormat: format,
        element: document.getElementById("x_axis_chart_listings_1k")
        });

        xAxis.render();

var yAxis = new Rickshaw.Graph.Axis.Y( {
    graph: chartListings1K,
    tickFormat: d3.format("s"),
    element: document.getElementById("y_axis_chart_listings_1k")
});

yAxis.render();