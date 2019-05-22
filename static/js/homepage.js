// Chart Params
// var svgWidth = 960;
// var svgHeight = 960;

// var margin = { top: 20, right: 40, bottom: 60, left: 50 };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
function render_lines(author){
    d3.json('nyt/authorsort',function(data){
      filtered = data.filter(function(d){
        return d.author.toLowerCase() == author.toLowerCase()
      })
      // console.log(filtered)
      titles = []
      filtered.forEach(function(d){
        if (d.title in titles){'nothing'}
        else {titles.push(d.title)}
      })
      var titles_set = new Set(titles)
      // console.log(titles_set)
      title_data = []
      titles_list = []
      titles_set.forEach(function(d){
        titles_list.push(d)
        filtered.forEach(function(g){
          if (d === g.title){
            title_data.push({'date':g.date,'rank':g.rank, 'title':g.title})
          } else {'nothing'}
        })
      })
    
    
    data_to_plot = [] 
    titles_list.forEach(function(d){
      data = []
       title_data.forEach(function(g){
         if (g.title === d){
           data.push({'date':g.date,'rank':g.rank,'title':g.title})
           
         }
       })
       data_to_plot.push(data)
     })
     ranks = []
    tracers = []
     data_to_plot.forEach(function(d){
       sum = 0
       dates = []
       ranks = []
       d.forEach(function(g){
         sum +=1
         dates.push(sum)
         ranks.push(g.rank)
         title = g.title
       })
       trace = {
        x: dates,
        y: ranks,
        type: 'scatter',
        name: title
      };
      tracers.push(trace)
     })
    //  console.log(tracers)
    
    
          
          var data = tracers;
          var layout = {
            autosize: false,
            width: 960,
            height: 500,
            title: author.toUpperCase(),
            xaxis: {
              title: 'Weeks on List'
            },
            yaxis: {
              title: 'Rank'
            },
            showlegend: true
          }
          
          Plotly.newPlot('pie', data, layout);
        
        })}
    
        let author = d3.select('#filter-btn').on('click', function(e) {
          d3.event.preventDefault();
          let author = d3.select('#author').node().value
          // console.log(author)
          render_lines(author)
        })
    
