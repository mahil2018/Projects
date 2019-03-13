const stockInfo  = axios.create({
  baseURL: 'http://localhost:3000/api/data',
}); 
 
 //Get Character Form
 document.getElementById("getButton").onclick = function(event){
  axios.get('http://localhost:3000/api/data')
    .then(response => {
        // console.log('Response from the API is: ', response.data);
        
        // The following lane hides the form to create a new character when we are updating one
        document.getElementById("character-form").style.display = "none";
        document.getElementById("updateForm").style.display = "block";
        // console.log('the response is: ', response.routines)
        printTheChart(response.routines);
    })
    .catch( error => {
      console.log(error);
    });
    const printTheChart = (stockData => {
      console.log('The response after printChart is: ', stockData)
      const stockLabels = stockData.map( element => element.water);
      const stockPrice  = stockData.map( element => element.sleep);
      console.log('The array of calories is: ', stockLabels)
      console.log('The array of sessions is: ', stockPrice)
      const ctx         = document.getElementById('myChart').getContext('2d');
      const chart       = new Chart(ctx, {
        type: 'line',
        data: {
          labels: stockLabels,
          datasets: [{
            label: "Stock Chart",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: stockPrice,
          }]
        }
      });
  });
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// const routinesInfo = axios.create({
//   baseURL: 'http://localhost:3000/api/data',
// });


// document.getElementById("theButton").onclick = function(event){
  
//   const routine = document.getElementById("theInput").value;       
//   getroutineProgress(routine);
// }

// const printTheChart = (routinedata => {
//   const labels = routinedata.map( element => element.routines);
//   const userSession = routinedata.map( element => element.routines.session);
//   const ctx = document.getElementById('myChart').getContext('2d');
//   const chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: labels,
//       datasets: [{
//         label: "Progress Routine Chart",
//         backgroundColor: 'rgb(255, 99, 132)',
//         borderColor: 'rgb(255, 99, 132)',
//         data: userSession,
//       }]
//     }
//   });
// });
// function getroutineProgress(theName) {
//   routinesApi.get(`${theName}/chart`)
//   .then(response => {
//     console.log(response.data.routines)
//     printTheChart(response.data);
//    })
//    .catch( error => console.log('Error while finding the Chart: ', error));
// }