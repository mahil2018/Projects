const express        = require('express');
const router         = express.Router();
// Require mongoose model
const User           = require('../models/user-model');
const Plan           = require('../models/plan-model');
const Session       = require('../models/session-model');
const Routine        = require('../models/routine-model');
const uploadCloud    = require('../config/upload-setup/cloudinary');

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
router.get('/session/:id/1', (req, res, next) =>{
  Session.findById(req.params.id).populate('feedbacks')
  .populate({path:'feedbacks', populate: {path: 'user'}})

    .then(foundSession =>{
      res.render('session/session-details', {session: foundSession, user: req.user})
    })
    .catch( error => console.log('Error while finding the routine: ', error))
})

// User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
router.post('/session/:id/1', ensureAuthenticated,(req, res) =>{
    const {session, water, calories, sleep, exercise} = req.body;
    // console.log('the image file is: ', req.file)
    const newRoutine = {
      session  : session,
      calories : calories,
      water    : water,
      sleep    : sleep,
      exercise : exercise,
      member   : req.user._id
    }
    Routine.create(newRoutine)
      .then((thenewRoutine) =>{
        User.findById(req.user._id)
          .then(foundUser =>{
            foundUser.routines.push(thenewRoutine._id);
            foundUser.save()
              .then(() =>{
                
                res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`);
              })
              .catch((error)=> console.log( 'Error while user is adding routine', error))
          })

          .catch()
    
      })
      .catch((error) =>{
        console.log(error);
      })
});


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
router.get('/session/:id/2', (req, res, next) =>{
  Session.findById(req.params.id)
    .then(foundSession =>{
      res.render('session/session-details', {session: foundSession, user: req.user})
    })
    .catch( error => console.log('Error while finding the routine: ', error))
})

// User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
router.post('/session/:id/2', ensureAuthenticated,(req, res) =>{
    const {session, water, calories, sleep, exercise} = req.body;
    // console.log('the image file is: ', req.file)
    const newRoutine = {
      session  : session,
      calories : calories,
      water    : water,
      sleep    : sleep,
      exercise : exercise,
      member   : req.user._id
    }
    Routine.create(newRoutine)
      .then((thenewRoutine) =>{
        User.findById(req.user._id)
          .then(foundUser =>{
            foundUser.routines.push(thenewRoutine._id);
            foundUser.save()
              .then(() =>{
                res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`);
              })
              .catch((error)=> console.log( 'Error while user is adding routine', error))
          })

          .catch()
    
      })
      .catch((error) =>{
        console.log(error);
      })
});



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  //Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
router.get('/session/:id/3', (req, res, next) =>{
  Session.findById(req.params.id)
    .then(foundSession =>{
      res.render('session/session-details', {session: foundSession, user: req.user})
    })
    .catch( error => console.log('Error while finding the routine: ', error))
})

// User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
router.post('/session/:id/3', ensureAuthenticated,(req, res) =>{
    const {session, water, calories, sleep, exercise} = req.body;
    // console.log('the image file is: ', req.file)
    const newRoutine = {
      session  : session,
      calories : calories,
      water    : water,
      sleep    : sleep,
      exercise : exercise,
      member   : req.user._id
    }
    Routine.create(newRoutine)
      .then((thenewRoutine) =>{
        User.findById(req.user._id)
          .then(foundUser =>{
            foundUser.routines.push(thenewRoutine._id);
            foundUser.save()
              .then(() =>{
                res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`);
              })
              .catch((error)=> console.log( 'Error while user is adding routine', error))
          })

          .catch()
    
      })
      .catch((error) =>{
        console.log(error);
      })
});



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
router.get('/session/:id/4', (req, res, next) =>{
  Session.findById(req.params.id)
    .then(foundSession =>{
      res.render('session/session-details', {session: foundSession, user: req.user})
    })
    .catch( error => console.log('Error while finding the routine: ', error))
})

// User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
router.post('/session/:id/4', ensureAuthenticated,(req, res) =>{
    const {session, water, calories, sleep, exercise} = req.body;
    // console.log('the image file is: ', req.file)
    const newRoutine = {
      session  : session,
      calories : calories,
      water    : water,
      sleep    : sleep,
      exercise : exercise,
      member   : req.user._id
    }
    Routine.create(newRoutine)
      .then((thenewRoutine) =>{
        User.findById(req.user._id)
          .then(foundUser =>{
            foundUser.routines.push(thenewRoutine._id);
            foundUser.save()
              .then(() =>{
                res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`);
              })
              .catch((error)=> console.log( 'Error while user is adding routine', error))
          })

          .catch()
    
      })
      .catch((error) =>{
        console.log(error);
      })
});



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@






// //Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
// router.get('/session/:id/1', (req, res, next) =>{
//   Session.findById(req.params.id).populate('feedbacks')
//   .populate({path:'feedbacks', populate: {path: 'user'}})

//     .then(foundSession =>{
//       res.render('session/session-details', {session: foundSession, user: req.user})
//     })
//     .catch( error => console.log('Error while finding the routine: ', error))
// })

// // User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
// router.post('/session/:id/1', ensureAuthenticated,(req, res) =>{
//     const {session, water, calories, sleep, exercise} = req.body;
//     // console.log('the image file is: ', req.file)
//     const newRoutine = {
//       session  : session,
//       calories : calories,
//       water    : water,
//       sleep    : sleep,
//       exercise : exercise,
//       member   : req.user._id
//     }
//     Routine.create(newRoutine)
//       .then((thenewRoutine) =>{
//         User.findById(req.user._id)
//           .then(foundUser =>{
//             foundUser.routines.push(thenewRoutine._id);
//             foundUser.save()
//               .then(() =>{
//                 consti=thenewRoutine.session;
//                 res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`, i);
//               })
//               .catch((error)=> console.log( 'Error while user is adding routine', error))
//           })

//           .catch()
    
//       })
//       .catch((error) =>{
//         console.log(error);
//       })
// });
// //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// //Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
// router.post('/session/:id/progress', (req, res, next) =>{
//   User.findById(req.user.id)
//     .then(foundUser =>{
//       console.log('HERE WE GO', foundUser);
//       session.findById(req.params.id).populate('routines')
//       .populate({path:'routines', populate: {path: 'user'}})
//       .then(foundSession =>{
//         if (foundSession.user = req.user)
//         water = user.routine.water;
//       const routines=foundRoutine;
//       // if (i<user.routines.session)
//       // console.log(water);
//       // var ctx = document.getElementById('myChart').getContext('2d');
//       // var chart = new chart(ctx, {
//       //   type: 'bar',
//       //   data: {
//       //     labels:["session.session"],
//       //     datasets: [{
//       //       label: "Progress Plan",
//       //       backgroundColor: 'rgb(255, 99, 132)',
//       //       bordercolor: 'rgb(255, 99, 132)',
//       //       data: [session.calories],
//       //     }]
//         // }
//       // })
//       // document.getElementById("theButton").onclick = function(){
//       //     const progress = document.getElementById("theInput").value;       
//       //   }
//       res.render('session/session-details', {session: foundSession, user: req.user, water})
//     })
//     .catch( error => console.log('Error while finding the routine: ', error))
// })
// .catch( error => console.log('Error while finding the user: ', error))
// })
// //##########################################
// // router.get('/session/:id/progress', (req, res) =>{
// //    console.log('HERE WE ARE ', session.session);
// //    res.render('session/session-details', {session: foundSession, user: req.user})
// // })

// // router.post('/session/:id/progress', (req, res) =>{
// //   console.log('HERE WE ARE post', session.session);
// //   const i=0
// //   if (i<session.session)
// //   Session.findById(req.params.id)
// //   .then(foundSession =>{

// //     res.render('session/session-details', {session: foundSession, user: req.user})
// //   })
// //   .catch( error => console.log('Error while finding the routine: ', error))
// // })
     
//  //##########################################
// // axios({
// //   method: "The HTTP method (verb) we are going to use",
// //   url: "The url the server is going to receive.", 
// //   params: "URL parameters to be sent with the request" ,
// // })
// // .then(response => {
// //   // Here we can do something with the response object
// // })
// // .catch(err => {
// //   // Here we catch the error and display it
// // })
// // const restCountriesApi = axios.create({
// //   baseURL: 'https://restcountries.eu/rest/v2/name/'
// // });

// // function getCountryInfo(theName) {
// //   restCountriesApi.get(theName)
// //   .then(responseFromAPI => {
// //       console.log('Response from API is: ', responseFromAPI.data);           
// // })
// // .catch(err => {
// //   console.log('Error is: ', err);
// //   })
// // }

// // document.getElementById("theButton").onclick = function(){
// //   const country = document.getElementById("theInput").value;       
// //   getCountryInfo(country);
// // }
// //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// router.get('/session/:id/2', (req, res, next) =>{

//   Session.findById(req.params.id)
//     .then(foundSession =>{
//       res.render('session/session-details', {session: foundSession, user: req.user})
//     })
//     .catch( error => console.log('Error while finding the routine: ', error))
// })
// // User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
// router.post('/session/:id/2', ensureAuthenticated,(req, res) =>{
//     const {session, water, calories, sleep, exercise} = req.body;
//     // console.log('the session 2: ', session);
//     const newRoutine = {
//       session  : session,
//       calories : calories,
//       water    : water,
//       sleep    : sleep,
//       exercise : exercise,
//       member   : req.user._id
//     }
//     Routine.create(newRoutine)
//       .then((thenewRoutine) =>{
//         User.findById(req.user._id)
//           .then(foundUser =>{
//             foundUser.routines.push(thenewRoutine._id);
//             foundUser.save()
//               .then(() =>{
//                 i=thenewRoutine.session;
//                 res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`, i);
//               })
//               .catch((error)=> console.log( 'Error while user is adding routine', error))
//           })

//           .catch()
    
//       })
//       .catch((error) =>{
//         console.log(error);
//       })
// });



// //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//   //Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
// router.get('/session/:id/3', (req, res, next) =>{
//   Session.findById(req.params.id)
//     .then(foundSession =>{
//       res.render('session/session-details', {session: foundSession, user: req.user})
//     })
//     .catch( error => console.log('Error while finding the routine: ', error))
// })

// // User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
// router.post('/session/:id/3', ensureAuthenticated,(req, res) =>{
//     const {session, water, calories, sleep, exercise} = req.body;
//     console.log('the session 3 is : ', session);
//     const newRoutine = {
//       session  : session,
//       calories : calories,
//       water    : water,
//       sleep    : sleep,
//       exercise : exercise,
//       member   : req.user._id
//     }
//     Routine.create(newRoutine)
//       .then((thenewRoutine) =>{
//         User.findById(req.user._id)
//           .then(foundUser =>{
//             foundUser.routines.push(thenewRoutine._id);
//             foundUser.save()
//               .then(() =>{
//                 i=thenewRoutine.session;
//                 res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`, i);
//               })
//               .catch((error)=> console.log( 'Error while user is adding routine', error))
//           })

//           .catch()
    
//       })
//       .catch((error) =>{
//         console.log(error);
//       })
// });



// //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// //Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
// router.get('/session/:id/4', (req, res, next) =>{
//   Session.findById(req.params.id)
//     .then(foundSession =>{
//       res.render('session/session-details', {session: foundSession, user: req.user})
//     })
//     .catch( error => console.log('Error while finding the routine: ', error))
// })

// // User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
// router.post('/session/:id/4', ensureAuthenticated,(req, res) =>{
//     const {session, water, calories, sleep, exercise} = req.body;
//     // console.log('the image file is: ', req.file)
//     const newRoutine = {
//       session  : session,
//       calories : calories,
//       water    : water,
//       sleep    : sleep,
//       exercise : exercise,
//       member   : req.user._id
//     }
//     Routine.create(newRoutine)
//       .then((thenewRoutine) =>{
//         User.findById(req.user._id)
//           .then(foundUser =>{
//             foundUser.routines.push(thenewRoutine._id);
//             foundUser.save()
//               .then(() =>{
//                 i=thenewRoutine.session;
//                 res.redirect(`/session/${req.params.id}/${thenewRoutine.session}`, i);
//               })
//               .catch((error)=> console.log( 'Error while user is adding routine', error))
//           })

//           .catch()
    
//       })
//       .catch((error) =>{
//         console.log(error);
//       })
// });



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}


module.exports = router;