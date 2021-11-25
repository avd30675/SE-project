const ptr=require('../../../../model/adminsports')

exports.sports=(req,res)=>{
    
    const user =req.body.user;
    const court=req.body.court;
    ptr.sport.findOne({_id:court}).then((result)=>{
        
        var s=[];
        if(result.bookings[0]!=""){
               result.bookings.forEach(element => {
            if(element.user_name==user)
               s.push(element);
        });
        }
        console.log(s);
        res.status(200).json({login:s});
    }).catch((err)=>{
        res.send(err);
    })

}