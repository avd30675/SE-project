const ptr=require('../../../../model/adminguest')

exports.guest=(req,res)=>{
    // console.log(req.body);
    const user =req.body.user;
    const room=req.body.room;
    
    ptr.guest.findOne({_id:room}).then((result)=>{
        
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