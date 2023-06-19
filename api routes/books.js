const express = require("express");
const router = express.Router();
const Book = require("../api/models/book");


router.get("/", (req,res,next)=>{
res.json({message:"Books = GET"});
});

router.get("/:bookId", (req,res,next)=>{
    const bookId = req.params.bookId;
    res.json({message:"Books = GET",
                id: bookId
            });
    });

router.post("/", (req,res,next)=>{
res.json({message:"Books = POST"});
});

router.patch("/", (req,res,next)=>{
    res.json({message:"Books = PATCH"});
    });

router.patch("/:bookId", (req,res,next)=>{
    const bookId = req.params.bookId;
    res.json({message:"Books = PATCH",
                id: bookId
            });
    });

    router.delete("/:bookId", (req,res,next)=>{
        const bookId = req.params.bookId;
        res.json({message:"Books = DELETE",
                    id: bookId
                });
        });






        router.post("/", (req,res,next)=>{
            
            const newBook = new Book({
                _id: new Mongoose.Types.ObjectId(),
                title: req.body.title,
                author: req.body.author
            })


            //write to database
            newBook.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: "Book Saved",
                    book: {
                        title: result.title,
                        author: result.author,
                        id: result.id,
                        metadata:{
                            method: req.method,
                            hostname: req.hostname
                        }
                    }
                })
            })
            .catch(err =>{
                console.log(err.message);
                res.status(500).json({
                    error:{
                        messgae: err.message
                    }
                })
            })

            });





module.exports = router;