const ptr=require('../../../../model/adminseminar')

exports.seminar=(req,res)=>{
    
    const user =req.body.user;
    const hall=req.body.hall;
    
    ptr.seminar.findOne({_id:hall}).then((result)=>{
        
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