const express = require('express');
const router  = express.Router();
const Plan = require('../models/plan-model');
const Review = require('../models/review-model');


// create a new review==========='/plan/{{plan._id}}/add-review'=/plan/5c7703ead9ff79e3f02e7fb8/add-review


router.post('/:planId/add-review', (req, res, next) => {
  // step 1: create a new review
  console.log('Review: ', req.params.planId);
  Review.create({
    user        : req.user._id,
    comment     : req.body.comment,
  })
  .then(newComment => {
    // step 2: find the room that the new comment belongs to
    Plan.findById(req.params.planId)
    .then(foundPlan => {
      // when find the room, push the ID of the new comment into the 'reviews' array
      foundPlan.reviews.push(newComment._id);
      // step 3: save the changes you just made in the found room
      foundPlan.save()
      .then(() => {
        res.redirect(`/${foundPlan.name}/${foundPlan._id}`)
      })
      .catch(err => next(err));
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
})


// delete review
// since we have saved reviews inside reviews collection and as array of ids in the rooms' reviews,
// we have to make sure when deleted, the review disappears from the reviews collection and from
// the room's reviews array
router.post('/reviews/:id', (req, res, next) => {
  Review.findByIdAndDelete(req.params.id) // <--- deleting review from reviews collection
  .then(() => {
    Room.findOne({'reviews': req.params.id}) // <--- find a room that has the review we deleted from the collections
    .then(foundPlan => {

      // loop through all the reviews and when find matching ids...
      for(let i=0; i< foundPlan.reviews.length; i++ ){
        console.log(foundPlan.reviews[i]._id.equals(req.params.id))
        if(foundPlan.reviews[i]._id.equals(req.params.id)){
          // ... use method splice to delete that id from the array
          foundPlan.reviews.splice(i, 1);
        }
      }
      // make sure you save the changes in the room (you just deleted one review id from its array of reviews,
      // so that needs to be saved in the database)
      foundPlan.save()
      .then(() => {
        res.redirect(`/plan/${foundPlan._id}`)
      })
      .catch(err => next(err))
    })
  })
})




module.exports = router;