const express        = require('express');
const router         = express.Router();
//Upload configuration
const multer         = require('multer') 
const uploadCloud    = require('../config/upload-setup/cloudinary')
// Require mongoose models
const User           = require('../models/user-model');
const Plan           = require('../models/plan-model');
const Session        = require('../models/session-model')
const Routine        = require('../models/routine-model');
//create functions that will check against different roles automatically
const checkEditor = checkRoles('EDITOR');
const checkAdmin  = checkRoles('ADMIN');

//List all plans created by admins ======>localhost:3000/plans
router.get('/', (req, res, next) =>{
    Plan.find()
      .then((plans) =>{
        res.render('plans/plan-list', {plans});
      })
      .catch((error) =>{
        console.log(error)
      })
})

//localhost:3000/plans/add =====> Only admins can create plans
router.get("/add", checkAdmin, (req, res) => {
    res.render("plans/plan-add", { user: req.user });
});

router.post('/add', uploadCloud.single('imagePlan'), (req, res, next) => {
    const { name, description, } = req.body;
    const imagePlan = req.file.secure_url;
    const owner     = req.user._id;
    const newPlan = new Plan ({name, description, imagePlan, owner})
    newPlan.save()
      .then(plans => {
        res.redirect('/plans');
      })
      .catch(error => {
        console.log(error);
      })
});
////////////////////////////////////////////////////////////////////////////
//Details route =====> http://localhost:3000/plans/5c748a4674aa4936ab77cbf1
router.get('/:id', ensureAuthenticated, (req, res, next) => {
    let planId = req.params.id;
    if (!/^[0-9a-fA-F]{24}$/.test(planId)) { 
      return res.status(404).render('not-found');
    }
    Plan.findById(req.params.id).populate('sessions')
      .then(plan => {
        if (!plan) {
            return res.status(404).render('not-found');
        }
        if(req.user.role === "ADMIN"){
            req.user.isAdmin = true;
        }
        // console.log('The Admin of the plan is: ', req.user.isAdmin)
        res.render('plans/plan-details', { plan, user:req.user })
      })
      .catch (error => next (error))
});
////////////////////////////////////////////////////////////////////////////
//Edit route =====> //localhost:3000/plans/5c6b88be561f7043c47ad7aa/update
router.get('/:id/update', checkAdmin, (req, res, next) => {
    Plan.findOne({_id: req.params.id})
      .then((plan) => {
        res.render("plans/plan-update", {plan});
      })
      .catch((error) => {
        console.log(error);
      })
});

//POST /plans/5c7450030cac6b2d948e91e4/update
router.post('/:id/update', uploadCloud.single('imagePlan'), (req, res, next) => {
    const {name, description} = req.body;
    // console.log('the image file is: ', req.file)
    Plan.findByIdAndUpdate(req.params.id, {
      name        : name,
      description : description,
      imagePlan   : req.file.secure_url
    })
      .then((plan) =>{
        res.redirect('/plans');
      })
      .catch((error) =>{
        console.log(error);
      })
})

//POST /plans/5c742b2ae09a3a265d1ea374/delete
router.post('/:id/delete', (req, res, next) =>{
    Plan.findByIdAndDelete({'_id': req.params.id})
      .then(deletedPlan =>{
        res.redirect('/plans')
      })
      .catch(error => console.log('error while deleting the plan: ', error))
})


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//localhost:3000/plans/5c7dac940af36413437b1228/add-routine?
router.get('/:id/add-session', ensureAuthenticated, uploadCloud.single('imageSession'),(req, res) =>{
  Plan.findById(req.params.id).populate('sessions')
  // .populate({path:'routines', populate: {path: 'user'}})
    .then(plan =>{
      res.render('session/session-add', {plan});
    })
    .catch(error => console.log('Error while finding the plan: ', error))
});

router.post('/:id/add-session', ensureAuthenticated, uploadCloud.single('imageSession'),(req, res) =>{
  // console.log('HERE WE ARE ', req.params.id);
  const newSession = {
    session      : req.body.session,
    education     : req.body.education,
    tips          : req.body.tips,
    imageSession  : req.file.secure_url,
    water         : req.body.water,
    calories      : req.body.calories,
    sleep         : req.body.sleep,
    exercise      : req.body.exercise,
    
    }
  // console.log(' we are to see: ', req.body );
  Session.create(newSession)
    .then(thenewSession =>{
      Plan.findById(req.params.id)
      .then(foundPlan =>{
        foundPlan.sessions.push(thenewSession._id);
        foundPlan.save()
          .then(() => {
            res.redirect(`/plans/${req.params.id}`);
            // res.redirect('/user/profile')
          })
          .catch(err => console.log('Error while saving the user: ', err));
      })
      .catch(err => console.log('Error while saving the user: ', err));
    })
    .catch(err => console.log('Error while saving the user: ', err));
});

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}

module.exports = router;