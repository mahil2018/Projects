
//porque script es e unico archivo que cargo en el DOM y puede leer document 
const routineInfo  = axios.create({
  baseURL: 'http://localhost:3000/api/',
}); 
 
 //Get Character Form

 document.getElementById("getButton").onclick = function(event){
  routineInfo.get('data')
    .then(response => {
        // console.log('Response from API is: ', response.data);
        // const countryName = response.data[0].calories;
        // const countryCapital = response.data[0].water;
        // const currencyName  = response.data[0].sleep
        // The following lane hides the form to create a new character when we are updating one
        // document.getElementById("routine-form").style.display = "none";
        document.getElementById("myChart").style.display = "block";
        // document.getElementById("countryName").innerHTML = "Calories: " + countryName;
        // document.getElementById("countryCapital").innerHTML = "Capital: " + countryCapital;
        // document.getElementById("currency").innerHTML = "Sleep: " + currencyName;  
        printTheChart(response.data);
    })
    .catch( error => {
      console.log(error);
    });
    const printTheChart = (routineData => {
      console.log('The response after printChart is: ', routineData)
      // instead in the console, show data in the browser using JS DOM manipulation:
      
      const xLabels = routineData.map( element => element.session);
      const yRoutine  = routineData.map( element => element.water);
      // const calRoutine  = routineData.map( element => element.calories);
      const sleepRoutine  = routineData.map( element => element.sleep);
      const exeRoutine  = routineData.map( element => element.exercise);
      // console.log('The array of calories is: ', yRoutine)
      // console.log('The array of sessions is: ', xLabels)
      const ctx         = document.getElementById('myChart').getContext('2d');
      var mixedChart       = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: xLabels,
          datasets: [{
            label: "Progress Water",
            backgroundColor: 'mediumseagreen',
            backgroundColor: '#e4e338',
            borderColor: 'mediumseagreen',
            data: yRoutine,
          },
          // {
          //   label: "Progress Calories ",
          //   backgroundColor: 'peru',
          //   borderColor: 'brown',
          //   data: calRoutine,
          // },
          {
            label: "Progress Sleep",
            backgroundColor: 'navy',
            borderColor: 'turquese',
            data: sleepRoutine,
          },
          {
            label: "Progress Exercise",
            backgroundColor: 'dodgerblue',
            borderColor: 'papayawhip',
            data: exeRoutine,
          }
        ]
        }
      });
  });
}
