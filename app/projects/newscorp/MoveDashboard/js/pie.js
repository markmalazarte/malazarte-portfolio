// This example lays out multiple interactive pie charts on a page with multiple HTML layout constructs.
      // Created by Frank Guerino : "http://www.guerino.net"

      // Data Used for this example...

      // FOR SALE, PROPERTY TYPE (left)
      var dataSet1 = [
        {legendLabel: "Showcase", dollarAmount: 39.9, link: "#"},
        {legendLabel: "Co-Broke", dollarAmount: 40.1, link: "#"},
        {legendLabel: "Basic", dollarAmount: 20, link: "#"}];

      // FOR SALE, RESIDENTIAL ONLY (right)
      var dataSet2 = [
        {legendLabel: "Showcase", dollarAmount: 41.5, link: "#"},
        {legendLabel: "Co-Broke", dollarAmount: 54.3, link: "#"},
        {legendLabel: "Basic", dollarAmount: 4.2, link: "#"}];

       // TRAFFIC - UNIQUE USERS (left)
      var dataSet3 = [
        {legendLabel: "Paid Search", dollarAmount: 6.2, link: "#"},
        {legendLabel: "Organic Search", dollarAmount: 55.8, link: "#"},
        {legendLabel: "Direct", dollarAmount: 25.4, link: "#"},
        {legendLabel: "Social", dollarAmount: 2, link: "#"},
        {legendLabel: "Refferal", dollarAmount: 3.4, link: "#"},
        {legendLabel: "Other", dollarAmount: 7.2, link: "#"}];

      // TRAFFIC - PAGE VIEWS (right)
      var dataSet4 = [
        {legendLabel: "Paid Search", dollarAmount: 11.1, link: "#"},
        {legendLabel: "Organic Search", dollarAmount: 46.6, link: "#"},
        {legendLabel: "Direct", dollarAmount: 34, link: "#"},
        {legendLabel: "Social", dollarAmount: 0.6, link: "#"},
        {legendLabel: "Refferal", dollarAmount: 3.4, link: "#"},
        {legendLabel: "Other", dollarAmount: 4.3, link: "#"}];

      function drawPie( pieName, dataSet, selectString, colors, margin, outerRadius, innerRadius, sortArcs ) {

    // pieName => A unique drawing identifier that has no spaces, no "." and no "#" characters.
    // dataSet => Input Data for the chart, itself.
    // selectString => String that allows you to pass in
    //           a D3 select string.
    // colors => String to set color scale.  Values can be...
    //           => "colorScale10"
    //           => "colorScale20"
    //           => "colorScale20b"
    //           => "colorScale20c"
    // margin => Integer margin offset value.
    // outerRadius => Integer outer radius value.
    // innerRadius => Integer inner radius value.
    // sortArcs => Controls sorting of Arcs by value.
    //              0 = No Sort.  Maintain original order.
    //              1 = Sort by arc value size.

    // Color Scale Handling...
        var colorScale = d3.scale.ordinal();  
        switch (colors)
        {
          //Current Listing
          case "colorScale1":
            colorScale = d3.scale.ordinal()
            .range(["#865CD9", "#31B0CD", "#DABE2F", "#da542f", "#a05d56", "#d0743c", "#ff8c00"]);
            break;
           //Traffic 
          case "colorScale2":
            colorScale = d3.scale.ordinal()
            .range(["#42c82c", "#e64e4e", "#9357c5", "#3b5998", "#cf9440", "#888888", "#ff8c00"]);
            break;
          case "colorScale3":
            colorScale = d3.scale.ordinal()
            .range(["#da542f", "#888"]);
            break;
          case "colorScale20c":
            colorScale = d3.scale.category20c();
            break;
          default:
            colorScale = d3.scale.ordinal()
            .range(["#da542f", "#497CBC", "#888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
        };

        var canvasWidth = 200;
        var pieWidthTotal = outerRadius * 2;;
        var pieCenterX = outerRadius + margin/2;
        var pieCenterY = outerRadius + margin/2;
        var legendBulletOffset = 30;
        var legendVerticalOffset = outerRadius - margin;
        var legendTextOffset = 20;
        var textVerticalSpace = 20;

        var canvasHeight = 0;
        var pieDrivenHeight = outerRadius*2 + margin*2;
        var legendTextDrivenHeight = (dataSet.length * textVerticalSpace) + margin*2;
    // Autoadjust Canvas Height
    if (pieDrivenHeight >= legendTextDrivenHeight)
    {
      canvasHeight = pieDrivenHeight;
    }
    else
    {
      canvasHeight = legendTextDrivenHeight;
    }
    
        var x = d3.scale.linear().domain([0, d3.max(dataSet, function(d) { return d.dollarAmount; })]).rangeRound([0, pieWidthTotal]);
        var y = d3.scale.linear().domain([0, dataSet.length]).range([0, (dataSet.length * 20)]);

        var synchronizedMouseOver = function() {
          var arc = d3.select(this);
          var indexValue = arc.attr("index_value");

          var arcSelector = "." + "pie-" + pieName + "-arc-" + indexValue;
          var selectedArc = d3.selectAll(arcSelector);
          selectedArc.style("fill", "#2A3642");

          var bulletSelector = "." + "pie-" + pieName + "-legendBullet-" + indexValue;
          var selectedLegendBullet = d3.selectAll(bulletSelector);
          selectedLegendBullet.style("fill", "#2A3642");

          var textSelector = "." + "pie-" + pieName + "-legendText-" + indexValue;
          var selectedLegendText = d3.selectAll(textSelector);
          selectedLegendText.style("display", "block");
        };

        var synchronizedMouseOut = function() {
          var arc = d3.select(this);
          var indexValue = arc.attr("index_value");

          var arcSelector = "." + "pie-" + pieName + "-arc-" + indexValue;
          var selectedArc = d3.selectAll(arcSelector);
          var colorValue = selectedArc.attr("color_value");
          selectedArc.style("fill", colorValue);

          var bulletSelector = "." + "pie-" + pieName + "-legendBullet-" + indexValue;
          var selectedLegendBullet = d3.selectAll(bulletSelector);
          var colorValue = selectedLegendBullet.attr("color_value");
          selectedLegendBullet.style("fill", colorValue);

          var textSelector = "." + "pie-" + pieName + "-legendText-" + indexValue;
          var selectedLegendText = d3.selectAll(textSelector);
          selectedLegendText.style("fill", "Blue");
        };

        var tweenPie = function (b) {
          b.innerRadius = 0;
          var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
          return function(t) {
            return arc(i(t));
          };
        }

        // Create a drawing canvas...
        var canvas = d3.select(selectString)
          .append("svg:svg") //create the SVG element inside the <body>
            .data([dataSet]) //associate our data with the document
            .attr("width", canvasWidth) //set the width of the canvas
            .attr("height", canvasHeight) //set the height of the canvas
            .append("svg:g") //make a group to hold our pie chart
              .attr("transform", "translate(" + pieCenterX + "," + pieCenterY + ")") // Set center of pie

    // Define an arc generator. This will create <path> elements for using arc data.
        var arc = d3.svg.arc()
            .innerRadius(innerRadius) // Causes center of pie to be hollow
            .outerRadius(outerRadius);

    // Define a pie layout: the pie angle encodes the value of dataSet.
    // Since our data is in the form of a post-parsed CSV string, the
    // values are Strings which we coerce to Numbers.
        var pie = d3.layout.pie()
        .value(function(d) { return d.dollarAmount; })
        .sort(function(a, b) {if (sortArcs==1) { return b.dollarAmount - a.dollarAmount; } else { return null; } });

        // Select all <g> elements with class slice (there aren't any yet)
        var arcs = canvas.selectAll("g.slice")
          // Associate the generated pie data (an array of arcs, each having startAngle,
          // endAngle and value properties) 
          .data(pie)
          // This will create <g> elements for every "extra" data element that should be associated
          // with a selection. The result is creating a <g> for every object in the data array
          // Create a group to hold each slice (we will have a <path> and a <text>      // element associated with each slice)
      .enter().append("svg:a")
            .attr("xlink:href", function(d) { return d.data.link; })
            .append("svg:g")
              .attr("class", "slice")    //allow us to style things in the slices (like text)
              // Set the color for each slice to be chosen from the color function defined above
              // This creates the actual SVG path using the associated data (pie) with the arc drawing function
              .style("stroke", "transparent" )
              .attr("d", arc);

        arcs.append("svg:path")
          // Set the color for each slice to be chosen from the color function defined above
          // This creates the actual SVG path using the associated data (pie) with the arc drawing function
          .attr("fill", function(d, i) { return colorScale(i); } )
          .attr("color_value", function(d, i) { return colorScale(i); }) // Bar fill color...
          .attr("index_value", function(d, i) { return "index-" + i; })
          .attr("class", function(d, i) { return "pie-" + pieName + "-arc-index-" + i; })
          .style("stroke", "transparent" )
          .attr("d", arc)
          .on('mouseover', synchronizedMouseOver)
          .on("mouseout", synchronizedMouseOut)
          .transition()
            .ease("bounce")
            .duration(2000)
            .delay(function(d, i) { return i * 10; })
            .attrTween("d", tweenPie);

        // Add a dollarAmount value to the larger arcs, translated to the arc centroid and rotated.
        arcs.filter(function(d) { return d.endAngle - d.startAngle > .0; }).append("svg:text")
          .attr("dy", ".35em")
          .attr("text-anchor", "middle")

          //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
          
          .text(function(d) {
            // Define your formatting function to return SI units
            var totalFormat = d3.format(",");
            return String(totalFormat(d.data.dollarAmount)) + "%";
            }
            );

        // Computes the angle of an arc, converting from radians to degrees.
        function angle(d) {
          var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
          return a > 90 ? a - 180 : a;
        }

        // Plot the bullet circles...
        canvas.selectAll("circle")
          .data(dataSet).enter().append("svg:circle") // Append circle elements
          .attr("cx", pieWidthTotal + legendBulletOffset)
          .attr("cy", function(d, i) { return i*textVerticalSpace - legendVerticalOffset; } )
          .attr("stroke-width", "0")
          .style("fill", function(d, i) { return colorScale(i); }) // Bullet fill color
          .attr("r", 5)
          .attr("color_value", function(d, i) { return colorScale(i); }) // Bar fill color...
          .attr("index_value", function(d, i) { return "index-" + i; })
          .attr("class", function(d, i) { return "pie-" + pieName + "-legendBullet-index-" + i; })
          .on('mouseover', synchronizedMouseOver)
          .on("mouseout", synchronizedMouseOut);

        // Create hyper linked text at right that acts as label key...
        canvas.selectAll("a.legend_link")
          .style("display", "none")
          .data(dataSet) // Instruct to bind dataSet to text elements
          .enter().append("svg:a") // Append legend elements
            .attr("xlink:href", function(d) { return d.link; })
            .append("text")
              .attr("text-anchor", "center")
              .attr("x", pieWidthTotal + legendBulletOffset + legendTextOffset)
              //.attr("y", function(d, i) { return legendOffset + i*20 - 10; })
          //.attr("cy", function(d, i) {    return i*textVerticalSpace - legendVerticalOffset; } )
              .attr("y", function(d, i) { return i*textVerticalSpace - legendVerticalOffset; } )
              .attr("dx", 0)
              .attr("dy", "2px") // Controls padding to place text in alignment with bullets
              .text(function(d) { return d.legendLabel + d.dollarAmount;})
              .attr("color_value", function(d, i) { return colorScale(i); }) // Bar fill color...
              .attr("index_value", function(d, i) { return "index-" + i; })
              .attr("class", function(d, i) { return "pie-" + pieName + "-legendText-index-" + i; })
              .style("fill", "#222")
              .on('mouseover', synchronizedMouseOver)
              .on("mouseout", synchronizedMouseOut);

      };