
const express = require("express");
const authenticate_action = require("../methods/authenticate_action");
const user_action = require("../methods/user_action");
const recommend_action = require("../methods/recommend_action");
const router = express.Router();

// POST / Adding New User(SIGN UP)
router.post('/adduser', authenticate_action.addNew);

// POST / Authenticating User(LOG IN)
router.post('/authenticate', authenticate_action.authenticate);

// GET / Getting User Information
router.post('/getuserinfo', user_action.getUserInfo);

// POST / Posting The Movie That User Watched
router.post('/moviewatched', user_action.watchingMovie);

// POST / Posting The Movie Review
router.post('/reviewmovie', user_action.reviewingMovie);

// GET / Content-Based Recommendation
router.post('/contentbased', recommend_action.contentbased);

// GET / Collaborative Recommendation
router.post('/collaborative', recommend_action.collaborative);

// GET / Genre-Based Recommendation
router.post('/genrebased', recommend_action.genresBased);

module.exports = router;
