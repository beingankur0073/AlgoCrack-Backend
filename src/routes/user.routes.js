import { Router } from "express";
import { registerUser,loginUser, logoutUser,refreshAccessToken, getCurrentUser, updateUserAvatar, updateUserCoverImage } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verfiyJWT } from "../middlewares/auth.middleware.js";


const router=Router();

// 
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1,
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser);

    router.route("/login").post(loginUser);

    // secured routes
    router.route("/logout").post(verfiyJWT,logoutUser);
    router.route("/refresh-token").post(refreshAccessToken);

    router.route("/getuser").get(verfiyJWT,getCurrentUser);
    
    router.route("/updateAvatar").patch(
    verfiyJWT,
    upload.single("avatar"), 
    updateUserAvatar
);
    router.route("/updateCover").patch(
        verfiyJWT,
        upload.single("coverImage"), 
        updateUserCoverImage
    );


export default router;