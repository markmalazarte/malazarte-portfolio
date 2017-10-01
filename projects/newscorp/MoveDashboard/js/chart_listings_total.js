function checkSize4() {
    if ($(window).width() > 500) {
        resizeRefresh3();
    } else {
        $('#cycle').fadeOut().cycle('stop');
    }
}

D3scale4 = [];
function resizeRefresh3() {
    $(window).bind('resize', function (e) {
        var i, graph;
        for (i = 0; i < D3scale4.length; i++) {
            graph = D3scale4[i];
            graph.setSize();
            graph.render();
        }
    });
}

checkSize4();

$(window).resize(function () {
    checkSize4();
});

var chartListingsTotal = new Rickshaw.Graph( {
    element: document.getElementById("chart_listings_total"),
    height: 102,
    renderer: 'line',
    padding: {top: 0.05},
    series: [
        {
            color: "#DA5656",
            data: [ 
                    { x: 1, y: 68101 },
                    { x: 2, y: 69879 },
                    { x: 3, y: 66618 },
                    { x: 4, y: 64608 },
                    { x: 5, y: 65926 },
                    { x: 6, y: 68708 },
                    { x: 7, y: 64715 },
                    { x: 8, y: 62715 },
                    { x: 9, y: 52319 },
                    { x: 10, y: 62753 }
                    ],
            name: 'SC-WEB'
        }, {
            color: "#56BCEB",
            data: [ 
                    { x: 1, y: 25147 },
                    { x: 2, y: 24744 },
                    { x: 3, y: 24612 },
                    { x: 4, y: 23825 },
                    { x: 5, y: 23413 },
                    { x: 6, y: 24117 },
                    { x: 7, y: 24409 },
                    { x: 8, y: 22257 },
                    { x: 9, y: 20142 },
                    { x: 10, y: 23205 }
                    ],
            name: 'SC-APP'
        }, {
            color: "#B356DA",
            data: [ 
                    { x: 1, y: 12471 },
                    { x: 2, y: 13151 },
                    { x: 3, y: 13289 },
                    { x: 4, y: 12957 },
                    { x: 5, y: 12925 },
                    { x: 6, y: 13643 },
                    { x: 7, y: 12749 },
                    { x: 8, y: 10540 },
                    { x: 9, y: 9708 },
                    { x: 10, y: 11758 }
                    ],
            name: 'SC-mDOT'
        }, {
            color: "#A5754A",
            data: [ 
                    { x: 1, y: 34732 },
                    { x: 2, y: 37507 },
                    { x: 3, y: 35497 },
                    { x: 4, y: 34703 },
                    { x: 5, y: 37943 },
                    { x: 6, y: 41169 },
                    { x: 7, y: 37997 },
                    { x: 8, y: 36876 },
                    { x: 9, y: 30342 },
                    { x: 10, y: 33663 }
                    ],
            name: 'CB-WEB'
        }, {
            color: "#7EA54A",
            data: [ 
                    { x: 1, y: 14607 },
                    { x: 2, y: 14785 },
                    { x: 3, y: 14389 },
                    { x: 4, y: 14188 },
                    { x: 5, y: 13494 },
                    { x: 6, y: 14269 },
                    { x: 7, y: 13722 },
                    { x: 8, y: 13276 },
                    { x: 9, y: 12374 },
                    { x: 10, y: 13943 }
                    ],
            name: 'CB-APP'
        }, {
            color: "#4A63A5",
            data: [ 
                    { x: 1, y: 5637 },
                    { x: 2, y: 6234 },
                    { x: 3, y: 5978 },
                    { x: 4, y: 6001 },
                    { x: 5, y: 6052 },
                    { x: 6, y: 6493 },
                    { x: 7, y: 6123 },
                    { x: 8, y: 5834 },
                    { x: 9, y: 5291 },
                    { x: 10, y: 6169 }
                    ],
            name: 'CB-mDOT'
        }
    ]
});

D3scale4.push(chartListingsTotal);

chartListingsTotal.render();

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: chartListingsTotal,
    xFormatter: function(x) { return null }
} );

var legend = new Rickshaw.Graph.Legend( {
    graph: chartListingsTotal,
    element: document.getElementById("chart_listings_total_legend")

} );

var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
    graph: chartListingsTotal,
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
        graph: chartListingsTotal,
        tickFormat: format,
        element: document.getElementById("x_axis_chart_listings_total")
        });

        xAxis.render();

var yAxis = new Rickshaw.Graph.Axis.Y( {
    graph: chartListingsTotal,
    tickFormat: d3.format("s"),
    element: document.getElementById("y_axis_chart_listings_total")
});

yAxis.render();