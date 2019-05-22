function makeResponsive() {

    // Define SVG area dimensions
    var svgWidth = 850;
    var svgHeight = 400;
    
    // Define the chart's margins as an object
    var chartMargin = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30
    };
    
    // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
    
    // Select body, append SVG area to it, and set the dimensions
    var svg = d3
      .select("#currentChooseWeek")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
    
    
    // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
    // to the margins set in the "chartMargin" object.
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
    
    
    
    
    let countDict = []
    d3.json("/nyt/titlecount", function (error, data) {
      if (error) throw error;
      countDict.push(data)
    })
    
    
    backList = []
    d3.json("/nyt/datecount", function (error, data) {
      if (error) throw error;
      data.forEach(function (dateitem) {
        backList.push(dateitem)
      })
    })
    
    
    let dateList = backList.reverse()
    
    
    currentChart = []
    
    fulldata = []
    // Load data from nyt sorted by date
    d3.json("/nyt/timesort", function (error, data) {
      if (error) return console.warn(error);
      data.forEach(function (info) {
        fulldata.push(info)
      });
    
      // 10x scale on rect height
    
      // @TODO
      // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
    
      // for dropdown creation
      let weekMenu = d3.select("#weekDropdown")
    
      var options = weekMenu
        .append('select')
        .selectAll('option')
        .data(dateList.reverse()).enter()
        .append('option')
        .text(function (d) { return d; });
    
      // plot initial chart
      var initialGraph = function (datePick) {
    
    
        // filter data for choice
        fulldata.forEach(function (data) {
          if (data.date == datePick) {
            currentChart.push(data)
          }
        });
    
        // make sure rank is useable add week count
        currentChart.forEach(function (point) {
          let filler = point.title
          let counthold = countDict[0][filler]
          point['count'] = counthold
          point.rank = +point.rank;
        });
    
    
    
        var barSpacing = 10; // desired space between each bar
    
        var barWidth = (790 - (barSpacing * (currentChart.length - 1))) / currentChart.length;
        var scaleY = 15;
    
    
        // Create code to build the bar chart using the tvData.
        var barGroup = chartGroup.selectAll(".bar")
          .data(currentChart)
          .enter()
          .append("rect")
          .classed("bar", true)
          .attr("width", d => barWidth)
          .attr("height", d => d.count * scaleY)
          .attr("x", (d, i) => (d.rank - 1) * (barWidth + barSpacing))
          .attr("y", d => (chartHeight - (d.count * scaleY)) / 2);
    
    
        var toolTip = d3.tip()
          .attr('class', "tooltip")
          .offset([80,0])
          .html(function(d) {
            return ( `<strong>${d.title} by ${d.author}</strong><hr>On the chart for ${d.count} week(s).`)
          });
    
        chartGroup.call(toolTip);
    
        barGroup.on("mouseover", function(d) {
          toolTip.show(d, this);
        })
          .on("mouseout", function(d) {
            toolTip.hide(d);
          })
        currentChart = []
      };
    
      initialGraph("2019-04-07")
    
      var updateGraph = function (datePick) {
        fulldata.forEach(function (data) {
          if (data.date == datePick) {
            currentChart.push(data)
          }
        });
    
        // make sure rank is useable add week count
        currentChart.forEach(function (point) {
          let filler = point.title
          let counthold = countDict[0][filler]
          point['count'] = counthold
          point.rank = +point.rank;
        });
    
        var barSpacing = 10; // desired space between each bar
        var barWidth = (790 - (barSpacing * (currentChart.length - 1))) / currentChart.length;
    
    
        var scaleY = 15;
    
    
        var selectChangeBars = svg.selectAll(".bar")
          .data(currentChart)
          .transition()
          .duration(1000)
          .attr("width", d => barWidth)
          .attr("height", d => d.count * scaleY)
          .attr("x", (d, i) => (d.rank - 1) * (barWidth + barSpacing))
          .attr("y", d => (chartHeight - (d.count * scaleY)) / 2);
    
    
        
        currentChart = []
      }
    
    weekMenu.on('change', function() {
      var selectedWeek = d3.select(this)
        .select("select")
        .property("value")
    
      updateGraph(selectedWeek)
      
    })
    
    
    
    });
    }
    makeResponsive();
    
    d3.select(window).on("resize", makeResponsive);