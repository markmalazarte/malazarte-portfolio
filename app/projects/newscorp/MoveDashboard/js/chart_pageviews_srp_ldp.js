function checkSize() {
    if ($(window).width() > 500) {
        resizeRefresh();
    } else {
        $('#cycle').fadeOut().cycle('stop');
    }
}

D3scale = [];
function resizeRefresh() {
    $(window).bind('resize', function (e) {
        var i, graph;
        for (i = 0; i < D3scale.length; i++) {
            graph = D3scale[i];
            graph.setSize();
            graph.render();
        }
    });
}

checkSize();

$(window).resize(function () {
    checkSize();
});

var chartPageViewsSRPLDP = new Rickshaw.Graph( {
    element: document.getElementById("chart_pageviews_srp_ldp"),
    height: 102,
    renderer: 'line',
    padding: {top: 0.05},
    series: [
        {
            color: "#DA5656",
            data: [ 
                    { x: 1, y: 85146415 },
                    { x: 2, y: 84420903 },
                    { x: 3, y: 82407754 },
                    { x: 4, y: 81310808 },
                    { x: 5, y: 81676352 },
                    { x: 6, y: 82839201 },
                    { x: 7, y: 78807929 },
                    { x: 8, y: 75656341 },
                    { x: 9, y: 67843523 },
                    { x: 10, y: 74105624 }
                    ],
            name: 'WEB'
        }, {
            color: "#56BCEB",
            data: [ 
                    { x: 1, y: 81380795 },
                    { x: 2, y: 81150802 },
                    { x: 3, y: 73772783 },
                    { x: 4, y: 80051245 },
                    { x: 5, y: 78674897 },
                    { x: 6, y: 80215144 },
                    { x: 7, y: 78935100 },
                    { x: 8, y: 74796286 },
                    { x: 9, y: 73057521 },
                    { x: 10, y: 72849689 }
                    ],
            name: 'APP'
        }, {
            color: "#B356DA",
            data: [ 
                    { x: 1, y: 21012044 },
                    { x: 2, y: 21194786 },
                    { x: 3, y: 21513165 },
                    { x: 4, y: 21331158 },
                    { x: 5, y: 21404846 },
                    { x: 6, y: 22382196 },
                    { x: 7, y: 21649256 },
                    { x: 8, y: 20605349 },
                    { x: 9, y: 20208327 },
                    { x: 10, y: 20910882 }
                    ],
            name: 'mDOT'
        }
    ]
});

D3scale.push(chartPageViewsSRPLDP);

chartPageViewsSRPLDP.render();

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: chartPageViewsSRPLDP,
    xFormatter: function(x) { return null }
} );

var legend = new Rickshaw.Graph.Legend( {
    graph: chartPageViewsSRPLDP,
    element: document.getElementById("chart_pageviews_srp_ldp_legend")

} );

var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
    graph: chartPageViewsSRPLDP,
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
        graph: chartPageViewsSRPLDP,
        tickFormat: format,
        element: document.getElementById("x_axis_chart_pageviews_srp_ldp")
        });

        xAxis.render();

var yAxis = new Rickshaw.Graph.Axis.Y( {
    graph: chartPageViewsSRPLDP,
    tickFormat: d3.format("s"),
    element: document.getElementById("y_axis_chart_pageviews_srp_ldp")
});

yAxis.render();