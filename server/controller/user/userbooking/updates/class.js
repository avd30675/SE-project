const ptr=require('../../../../model/adminclassroom')

exports.class =(req,res)=>{

    const class_id=req.body.class;
    const book_id=req.body.book;
    const b_start=req.body.start;
    const b_end=req.body.end;
    var i=1;

    const st=new Date(b_start);
                st.setHours(st.getHours()+5);
                st.setMinutes(st.getMinutes()+30);
                console.log(st);
    const et=new Date(b_end);
                et.setHours(et.getHours()+5);
                et.setMinutes(et.getMinutes()+30);
    console.log(class_id);
    ptr.classroom.findOne({_id:class_id}).then((result)=>{

            const starttime=st.getTime();
            const endtime=et.getTime();
            
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
               element.start=st;
               element.end=et;
            }
        });
        result.save();

        ptr.classbooking.findOne({_id:book_id}).then((response)=>{
            response.start=st;
            response.end=et;
            response.save();
        })
         }
          
        res.status(200).json({result:i});
    }).catch((err)=>{
        console.log(err);
        res.status(200).json({result:0});
    })

}