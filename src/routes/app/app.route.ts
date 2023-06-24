import { Router } from "express";
const router = Router();

/* [START ROUTING] */
import roleRoute from "../userManagement/role.route";
router.use("/role", roleRoute);

import userRoute from "../userManagement/user.route";
router.use("/user", userRoute);

import aboutRoute from "../aboutManagement/about.route";
router.use("/about", aboutRoute);

import profileImageRoute from "../aboutManagement/profileImage.route";
router.use("/profileImage", profileImageRoute);

import resumeRoute from "../aboutManagement/resume.route";
router.use("/resume", resumeRoute);

import jobTypeRoute from "../experienceManagement/jobType.route";
router.use("/jobType", jobTypeRoute);

import experienceRoute from "../experienceManagement/experience.route";
router.use("/experience", experienceRoute);

import skillsRoute from "../skillsManagement/skills.route";
router.use("/skills", skillsRoute);
/* [END ROUTING] */

export default router;
