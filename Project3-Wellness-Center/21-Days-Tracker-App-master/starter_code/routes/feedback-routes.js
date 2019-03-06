const express  = require('express');
const router   = express.Router();
const Plan     = require('../models/plan-model');
const Feedback = require('../models/feedback-model');
const Session  = require('../models/session-model');

//localhost:3000/feedback/5c7efcb5493c9b606e198b1a/add-feedback
router.post('/:sessionId/add-feedback', (req, res, next) => {
    const newComment = {
        user        : req.user._id,
        comment     : req.body.comment,
    }
    Feedback.create(newComment)
        .then(theNewComment => {
            Session.findById(req.params.sessionId)
            .then(foundSession => {
                foundSession.feedbacks.push(theNewComment._id);
                foundSession.save()
                .then(() => {
                    res.redirect(`/session/${foundSession._id}/${foundSession.session}`)
                })
                .catch(err => next(err));
                })
            .catch(err => next(err));
  })
  .catch(err => next(err));
})


// delete review ====> http://localhost:3000/feedback/5c7fe50796e7e67e2815d297/delete
router.post('/:feedbackId/delete', (req, res, next) => {
  Feedback.findByIdAndDelete(req.params.feedbackId) 
    .then(() => {
        Session.findOne({'feedbacks': req.params.feedbackId})
            .then(foundSession => {
                for(let i=0; i< foundSession.feedbacks.length; i++ ){
                    console.log(foundSession.feedbacks[i]._id.equals(req.params.feedbackId))
                    if(foundSession.feedbacks[i]._id.equals(req.params.feedbackId)){
                        foundSession.feedbacks.splice(i, 1);
                    }
                }
                foundSession.save()
                    .then(() => {
                        res.redirect(`/session/${foundSession._id}/${foundSession.session}`)
                    })
                    .catch(err => next(err))
                    })
            .catch(error => console.log('Error while finding the review: ', error))
    })
    .catch(error => console.log('Error while deleting the review: ', error))
})
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//localhost:3000/feedback/5c7fe50796e7e67e2815d297/edit?
router.get('/:id/edit', (req, res, next) => {
    // console.log("HERE...");
    const feedbackId = req.params.id;
  
    res.render('session/session-edit', {feedbackId})
})
http://localhost:3000/feedback/5c7fe50796e7e67e2815d297/edit
router.post('/:id/edit', (req, res, next) => {
    const comment = req.body.comment;
    const editFeedback = { comment};
    Feedback.findByIdAndUpdate(req.params.id, editFeedback)
        .then((theEditFeedback) =>{
            Session.findOne({'feedbacks': req.params.id})
            .then(foundSession => {
                theEditFeedback.save()
                res.redirect(`/session/${foundSession._id}/${foundSession.session}`)
            })
            .catch(error => console.log('Error while editing the review: ', error))
        .catch(error => console.log('Error while deleting the review: ', error))
    })
})


module.exports = router;