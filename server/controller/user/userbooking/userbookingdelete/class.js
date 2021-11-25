const ptr=require('../../../../model/adminclassroom');

exports.class=(req,res)=>{
    console.log(req);
    const class_id=req.body.class;
    const book_id=req.body.book;
    
    ptr.classroom.findOne({_id:class_id}).then((result)=>{
    
        result.bookings=result.bookings.filter(x=>{
            return (x._id!=book_id);
        })
        
        
        result.save();
        ptr.classbooking.find({_id:book_id}).then((result)=>{
            console.log(result);
        });
        ptr.classbooking.deleteOne({ _id:book_id}).then(()=>{
            console.log("deleted");
        }).catch((err)=>{
            console.log(err);
        })
        
        res.status(200).send({deletion:1});
    }).catch((err)=>{
        console.log(err);
        res.status(200).send({deletion:0});
    })
}