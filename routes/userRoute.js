const express = require('express');
const { isAuthenticatedUser, createUser, login, get_token } = require('../controllers/userController');
const router = express.Router();
// const { getAllTeams, createTeam, getTeamDetails, updateTeam, deleteTeam } = require('../controllers/teamController');


// router.route("/teams").get(getAllTeams);
router.route("/signup").post(createUser);
router.route("/login").post(login);
router.route("/get_token").post(get_token);
// router.route("/team/:id").get(getTeamDetails).put(isAuthenticatedUser,updateTeam).delete(isAuthenticatedUser,deleteTeam)


module.exports = router;