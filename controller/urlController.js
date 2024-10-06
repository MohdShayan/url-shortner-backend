import { nanoid } from "nanoid"
import URL from "../model/url.js"

export const handleGenerateNewURL = async (req, res) => {
    const body = req.body;
    if (!body.redirectURL) {  
      return res.status(400).json({ success: false, message: "URL is required" });
    }
    const shortid = nanoid(8);
    await URL.create({
      shortID: shortid,
      redirectURL: body.redirectURL,  
      visitHistory: [],
    });
    return res.status(201).json({ success: true, id: shortid });
  };

export const handleGetShortURL = async (req, res) => {
    try {
        const shortID = req.params.shortID;

        const entry = await URL.findOneAndUpdate(
            { shortID }, 
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } 
        );

        if (!entry) {
            return res.status(404).send('Short URL not found');
        }

       return res.status(200).redirect(entry.redirectURL);
    } catch (error) {
        
        console.error('Error fetching short URL:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const handleGetAnalytics = async (req,res) =>{
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID})
    return res.json({totalClicks: result.visitHistory.length ,analytics : result.visitHistory})
}

export const handleGetAllUrls = async (req,res)=>{
  const result = await URL.find({})
  return res.status(200).json(result)


}

export const handleDelteUrl = async (req,res)=>{
  const shortID = req.params.shortID;
  const result = await URL.findOneAndDelete({shortID})
  return res.status(200).json({message: "URL deleted successfully" , "deleted URL : ": result})

}