const express = require('express')
const bodyParser = require('body-parser')
const postModel = require('../models/post')
const fileupload = require('express-fileupload')
const path = require('path')
const router = express.Router();
const { v4: uniquekey } = require('uuid')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(fileupload())
// parse application/json
router.use(bodyParser.json())

//------------------------------------Show - post -----------------------------------

router.get('/posts', async (req, res) => {

    try {

        const posts = await postModel.find().sort({createdAt:-1});
        // console.log(posts);
        res.status(200).json({
            posts
        })


    } catch (error) {

        res.status(400).json({

            status: "failed",
            message: error.message

        })

    }
})
//--------------------------------show images----------------------------

router.get("/image/:filename", (req, res) => {
     
 
    try {
        
        res.sendFile(path.join(__dirname, `/uploadedimages/${req.params.filename}`)); 

    } catch (error) {
          res.status(404).json({
            message:error.message
          })        
    }

})

//------------------------------------------------------create post ---------------------------------
router.post('/post', async (req, res) => {



    const fragment = req.files.image.name.split(".");
    const file_extension = fragment[fragment.length - 1]
    const imagekey = uniquekey()
    const file_name = imagekey + "." + file_extension
    const accepted_files = ["jpeg", "png", "jpg", "svg"];
    if (accepted_files.includes(file_extension)) {

        req.files.image.mv("./Routes/uploadedimages/"+file_name, async (e) => {

            if (e) {
                res.status(500).json({
                    message: e
                })
            } else {
                try {
                    const created_post = await postModel.create({
                        
                        name : req.body.name,
                        location : req.body.location,
                        likes : 0,
                        description : req.body.description,
                        postimage : file_name,
                        date : "01-22-2032"
                        
                    })
                    res.status(201).json({
                        message : "succesfully creted post"
                    })
                } catch (e) {

                    res.status(500).json({
                        status: "failed",
                        message: e.message
                    })

                }

            }
        })
    } else {
        res.status(400).json({
            message: "please upload an image file"
        })
    }

})


module.exports = router