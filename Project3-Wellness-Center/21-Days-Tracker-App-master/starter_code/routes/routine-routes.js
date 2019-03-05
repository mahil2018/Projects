const express        = require('express');
const router         = express.Router();
// Require mongoose model
const User           = require('../models/user-model');
const Plan           = require('../models/plan-model');
const Routine        = require('../models/routine-model');
const uploadCloud    = require('../config/upload-setup/cloudinary');

//Routine details ====> //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
router.get('/routine/:id/1', (req, res, next) =>{
  Routine.findById(req.params.id)
    .then(foundRoutine =>{
      res.render('routine/routine-details', {routine: foundRoutine, user: req.user})
    })
    .catch( error => console.log('Error while finding the routine: ', error))
})

// User update routine =====> POST /routine/5c7eb3ba952c9337f865d955/1
router.post('/routine/:id/1', ensureAuthenticated,(req, res) =>{
    const {session, water, calories, sleep, exercise} = req.body;
    // console.log('the image file is: ', req.file)
    const newRoutine = {
      session  : session,
      calories : calories,
      water    : water,
      sleep    : sleep,
      exercise : exercise
    }
    Routine.create(newRoutine)
      .then((thenewRoutine) =>{
        User.findById(req.user._id)
          .then(foundUser =>{
            foundUser.routines.push(thenewRoutine._id);
            foundUser.save()
              .then(() =>{
                res.redirect(`/routine/${req.params.id}/${thenewRoutine.session}`);
              })
              .catch((error)=> console.log( 'Error while user is adding routine'))
          })

          .catch()
         //localhost:3000/routine/5c7eb3ba952c9337f865d955/1
        res.redirect(`/routine/${req.params.id}/${foundRoutine.session}`);
      })
      .catch((error) =>{
        console.log(error);
      })
});


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//localhost:3000/plans/5c7dac940af36413437b1228/add-routine?
router.get("/:id/add-routine", ensureAuthenticated, uploadCloud.single('imageRoutine'),(req, res) =>{
  console.log('HERE WE ARE ', req.params.id);
  Plan.findById(req.params.id).populate('routines')
  .populate({path:'routines', populate: {path: 'user'}})
    .then(plan =>{
      res.render("plans/plan-update", {plan});
      
    })
    .catch(error => console.log('Error while finding the plan: ', error))
});
  

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}


module.exports = router;