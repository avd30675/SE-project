const ptr=require('../../../../model/adminclassroom')

exports.class=(req,res)=>{
    
    const user =req.body.user;
    const room=req.body.room;
    
    ptr.classroom.findOne({_id:room}).then((result)=>{
        
        var s=[];
        if(result.bookings[0]!=""){
        result.bookings.forEach(element => {
            if(element.user_name==user)
            s.push(element);
        });
        }
        
        res.status(200).json({login:s});

    }).catch((err)=>{
        console.log(err);
        res.send(err);
    })

}