const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async(req,res) => {
    const {id} = req.params;
    if(!req.body.review) throw new ExpressError(400, "Invalid Review Data");
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New review Created!");

    res.redirect(`/listings/${listing._id}`);
};

module.exports.drestroyReview = async(req,res) => {
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull : { reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");

    res.redirect(`/listings/${id}`);
};