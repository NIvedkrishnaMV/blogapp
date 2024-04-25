const express=require('express');
const router=express.Router();
const post=require('../model/post');


router.use(express.json());

//add to blog
router.post('/addblog',(req,res)=>{
    try {
        const data= post(req.body).save();
        res.status(200).json({message:'Blog added'});
    } catch (error) {
        console.log(error);
        res.json({message:'Unable to add Blog'});
    }
})



// to view all blogs

router.get('/viewall',async(req,res)=>{
    try {
        const data=await post.find();
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/del/:id',async(req,res)=>{
    const postId=req.params.id;
    try {
        const data= await post.findByIdAndDelete({_id:postId})
        res.status(200).send({message:"Blog deleted"});
        
    } catch (error) {
        res.status(404).send({message:"No blog found"});        
    }
})
router.put('/edit/:id',async(req,res)=>{
    const postId=req.params.id;
    const item=req.body;
    try {
        const data=await post.findByIdAndUpdate({_id:postId},item);
        res.status(200).send({message:"Blog updated"});
    } catch (error) {
        res.status(404).send({message:"Blog not found"});
        
    }
})

module.exports=router;