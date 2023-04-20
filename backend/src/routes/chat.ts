import express, { request, Request, Response, } from 'express';
export const userRouter = express.Router();
import user from '../mongo-models/user-schema';
import multer from 'multer';


declare var path: any

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../BACKEND/public/images')

  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage }).single('Image');




// Post api 
userRouter.post("/create", upload, async (req: Request, res: Response) => {


  try {

      const data = await user.create({
        File: req.file?.filename,
        Message: req.body.Message,
      
      });

      res.json(data);
      console.log(data);
      
    
  } catch (error) {
    // Notification.InternalError(req, res, error);
  }
});

userRouter.get("/get", async (req, res) => {
    try {
      const User = await user.find().select("-password");
      res.send(User);
    } catch (error) {
     
    }
  });

module.exports = userRouter;