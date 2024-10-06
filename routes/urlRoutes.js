import express from "express"
import { handleGenerateNewURL,handleGetShortURL,handleGetAnalytics, handleGetAllUrls, handleDelteUrl } from "../controller/urlController.js";

const router= express.Router();

router.get("/",handleGetAllUrls);
router.post("/",handleGenerateNewURL);
router.get("/:shortID",handleGetShortURL)
router.get('/analytics/:shortID',handleGetAnalytics)
router.delete("/:shortID",handleDelteUrl)

export default router ;