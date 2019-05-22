// Chart Params
// var svgWidth = 960;
// var svgHeight = 960;

// var margin = { top: 20, right: 40, bottom: 60, left: 50 };
// /nyt/titlelist
function render_line(year){
d3.json('/nyt/titlelist',function(data){
    year  =(data[0][year])
    names= []
    results = []
    year.forEach(function(y){
        names.push(y['team'])
        results.push(y['result'])
    })
    tracers=[]
   trace = {
            x: names,
            y: results,
            type: 'bar',
            marker:{
                color: ['orange', 'red', 'black', 'blue', 'red','red', 'red', 'maroon', 'blue', 'green','red', 'navy', 'navy', 'black', 'green','red', 'navy', 'red', 'blue', 'blue','red', 'orange', 'black', 'blue', 'teal','navy', 'blue', 'navy', 'gold', 'navy','navy']
              }
          };
          tracers.push(trace)
        //   tracers.push(trace2)
         
        //  console.log(tracers)
         var data = tracers;
          var layout = {
            autosize: false,
            width: 1160,
            height: 640,
            title: 'Season Betting Results',
            yaxis: { 
              title: 'earnings (in dollars)'
            },
            showlegend: false
          }
          
          Plotly.newPlot('pie', data, layout);
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

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// d3.json('/nyt/jsondatas',function(data){
//     year = (data[0][2010])
//     x = []
//     z = []
//     year.forEach(function(y){
//         x.push(y['standings'])
//         z.push(y['rank'])
//     })
//     tracers=[]
//     trace = {
//              x: x,
//              y: z,
//              type: 'scatter',
//              mode: 'markers'

//     }
//     tracers.push(trace)
//     var data = tracers;
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
           
//            Plotly.newPlot('pie', data, layout)
// })