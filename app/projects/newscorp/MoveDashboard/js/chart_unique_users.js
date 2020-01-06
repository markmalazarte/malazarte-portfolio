function checkSize3() {
    if ($(window).width() > 500) {
        resizeRefresh3();
    } else {
        $('#cycle').fadeOut().cycle('stop');
    }
}

D3scale3 = [];
function resizeRefresh3() {
    $(window).bind('resize', function (e) {
        var i, graph;
        for (i = 0; i < D3scale3.length; i++) {
            graph = D3scale3[i];
            graph.setSize();
            graph.render();
        }
    });
}

checkSize3();

$(window).resize(function () {
    checkSize3();
});

var chartUniqueUsers = new Rickshaw.Graph( {
    element: document.getElementById("chart_unique_users"),
    height: 102,
    renderer: 'line',
    padding: {top: 0.05},
    series: [
        {
            color: "#DA5656",
            data: [ 
                    { x: 1, y: 5457926 },
                    { x: 2, y: 5389692 },
                    { x: 3, y: 5324015 },
                    { x: 4, y: 5464877 },
                    { x: 5, y: 5360212 },
                    { x: 6, y: 5475574 },
                    { x: 7, y: 5228146 },
                    { x: 8, y: 5017603 },
                    { x: 9, y: 4292136 },
                    { x: 10, y: 5036706 }
                    ],
            name: 'WEB'
        }, {
            color: "#56BCEB",
            data: [ 
                    { x: 1, y: 698962 },
                    { x: 2, y: 692055 },
                    { x: 3, y: 682184 },
                    { x: 4, y: 671646 },
                    { x: 5, y: 661569 },
                    { x: 6, y: 669689 },
                    { x: 7, y: 662160 },
                    { x: 8, y: 637982 },
                    { x: 9, y: 609945 },
                    { x: 10, y: 615282 }
                    ],
            name: 'APP'
        }, {
            color: "#B356DA",
            data: [ 
                    { x: 1, y: 1776786 },
                    { x: 2, y: 1763748 },
                    { x: 3, y: 1775347 },
                    { x: 4, y: 1785857 },
                    { x: 5, y: 1765633 },
                    { x: 6, y: 1836238 },
                    { x: 7, y: 1789633 },
                    { x: 8, y: 1691760 },
                    { x: 9, y: 1546646 },
                    { x: 10, y: 1699868 }
                    ],
            name: 'mDOT'
        }
    ]
});

D3scale3.push(chartUniqueUsers);

chartUniqueUsers.render();

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: chartUniqueUsers,
    xFormatter: function(x) { return null }
} );

var legend = new Rickshaw.Graph.Legend( {
    graph: chartUniqueUsers,
    element: document.getElementById("chart_unique_users_legend")

} );

var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
    graph: chartUniqueUsers,
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
        graph: chartUniqueUsers,
        tickFormat: format,
        element: document.getElementById("x_axis_chart_unique_users")
        });

        xAxis.render();

var yAxis = new Rickshaw.Graph.Axis.Y( {
    graph: chartUniqueUsers,
    tickFormat: d3.format("s"),
    element: document.getElementById("y_axis_chart_unique_users")
});

yAxis.render();