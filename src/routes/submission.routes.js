// routes/submissionRoutes.js
import express from 'express';
import { verfiyJWT } from "../middlewares/auth.middleware.js"; // Your auth middleware
import {
    createSubmission,
    getLatestSubmissionsForUser,
  getLeaderboard,
  //  getLeaderboardBySolvedCount,
    getSubmissionDetails // Make sure to import getSubmissionDetails
} from '../controllers/submission.controller.js'; // Adjust the path if controllers are in a different file

const router = express.Router();

router.use(verfiyJWT); 


router.get('/user-submissions', getLatestSubmissionsForUser);
router.get('/leaderboard',getLeaderboard);



router.get('/:submissionId',getSubmissionDetails); 


router.post('/:problemId',createSubmission);


export default router;