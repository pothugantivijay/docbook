const Review = require('../models/review');

const createReview = async (reviewData) => {
    const review = new Review(reviewData);
    return await review.save();
};


module.exports = {
    createReview,
};
