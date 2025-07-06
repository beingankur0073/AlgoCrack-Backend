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

    router.route("/getuser").get(getCurrentUser);
    
    router.route("/updateAvatar").patch(
   
    upload.single("avatar"), 
    updateUserAvatar
);
    router.route("/updateCover").patch(
        
        upload.single("coverImage"), 
        updateUserCoverImage
    );


export default router;