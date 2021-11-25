const ptr=require('../../../../model/adminguest')

exports.guest =(req,res)=>{

    const hall_id=req.body.hall;
    const book_id=req.body.book;
    const b_start=req.body.start;
    const b_end=req.body.end;
    var i=1;
    console.log(hall_id);
    ptr.guest.findOne({_id:hall_id}).then((result)=>{

            const starttime=new Date(b_start).getTime();
            const endtime=new Date(b_end).getTime();
            
            result.bookings.forEach(element => {
                  const start=new Date(element.start).getTime();
                  const end=new Date(element.end).getTime();
                  if((starttime>=start && starttime<=end) || (endtime>=start && endtime<=end)) {
                      i=0;
                  }
            });


         if(i==1){
             console.log(result.bookings);
          result.bookings.forEach(element => {
            if(element._id==book_id){
               element.start=b_start;
               element.end=b_end;
            }
        });
        result.save();

        ptr.guestbooking.findOne({_id:book_id}).then((response)=>{
            response.start=b_start;
            response.end=b_end;
            response.save();
        })
         }
          
        res.status(200).json({result:i});
    }).catch((err)=>{
        console.log(err);
        res.status(200).json({result:0});
    })

}