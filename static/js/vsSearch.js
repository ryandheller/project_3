// Chart Params
// var svgWidth = 960;
// var svgHeight = 960;

// var margin = { top: 20, right: 40, bottom: 60, left: 50 };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;
function render_line(season){
d3.json('/nyt/jsondatas',function(data){
    year = (data[0][season])
    console.log(year)
    s_t = []
    z = []
    year.forEach(function(y){
        s_t.push([y['standings'],y['team']])
        z.push(y['rank'])
    })
    x=[]
    teams = []
    s_t.forEach(function(t){
        x.push(t[0])
        teams.push(t[1])
    })
    tracers=[]
    trace = {
             x: x,
             y: z,
             type: 'scatter',
             mode: 'markers',
             text: teams,
             marker: { size: 12,
            },

    }
    tracers.push(trace)
    var data = tracers;
           var layout = {
             autosize: false,
             width: 960,
             height: 500,
             title: season,
             xaxis: {
               title: 'standings'
             },
             yaxis: {
               title: 'earnings Rank'
             },
             showlegend: false
           }
           
           Plotly.newPlot('pie', data, layout)
})}

years = ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019']

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

  autocomplete(document.getElementById("myInput"), years)

  let author = d3.select('#filter-btn').on('click', function(e) {
    d3.event.preventDefault();
    let author = d3.select('#myInput').node().value
  //   console.log(author)
    render_line(author)
  })
// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
// d3.json('/nyt/jsondata',function(data){
//     all_teams = data
//     ducks = (all_teams[0]['Pittsburgh Penguins'])
//     years = ['2010_results','2011_results','2012_results','2013_results','2014_results','2015_results','2016_results','2017_results','2018_results','2019_results']
//     suck = []
//     duck = []
//     suck1 = []
//     suck2 = []
//     years.forEach(function(y){
//         suck.push([ducks[y]['result'],y])
//         duck.push(ducks[y]['result'])
//     })
//  //    ducks = ducks['2010_results']['result']
//  //    suck.push(ducks)
//  //    console.log(suck)
//  //    console.log(duck)
//     suck.forEach(function(S){
//      //    console.log(S[0])
//         if (S[0] > 0){suck1.push(S)}
//         else {suck2.push(S)}
//     })
//     suck1_date=[]
//     suck1_result=[]
//     suck1.forEach(function(s){
//         suck1_date.push(s[1])
//         suck1_result.push(s[0])
//     })
//     suck2_date=[]
//     suck2_result=[]
//     suck2.forEach(function(s){
//         suck2_date.push(s[1])
//         suck2_result.push(s[0])
//     })
//     console.log(suck1_date)
//     tracers=[]
//     trace = {
//              x: years,
//              y: duck,
//              type: 'bar',
//              color: 'blue'
//            };
//            var trace2 = {
//              x: suck2_date,
//              y: suck2_result,
//              color: 'red',
//              type: 'bar'
//            };
//            tracers.push(trace)
//          //   tracers.push(trace2)
          
//          //  console.log(tracers)
//           var data = tracers;
//            var layout = {
//              autosize: false,
//              width: 960,
//              height: 500,
//              title: 'title',
//              xaxis: {
//                title: 'standings'
//              },
//              yaxis: {
//                title: 'earnings Rank'
//              },
//              showlegend: true
//            }
           
//            Plotly.newPlot('pie', data, layout);})
    