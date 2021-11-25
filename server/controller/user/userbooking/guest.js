const pointer = require("../../../model/adminguest")

exports.guestbook = (req, res) => {

    const guest_id = req.body.guest;
    const b_start = req.body.start;
    const b_end = req.body.end;
    const userid = req.body.user;
    var i=1;

    const st=new Date(b_start);
                st.setHours(st.getHours()+5);
                st.setMinutes(st.getMinutes()+30);
                console.log(st);
    const et=new Date(b_end);
                et.setHours(et.getHours()+5);
                et.setMinutes(et.getMinutes()+30);

    pointer.guest.findOne({ _id: guest_id }).then(response => {
        
        // console.log(response);
        
        const book = new pointer.guestbooking({
            user_name: userid,
            start: st,
            end: et
        });
        book.save();
        
    
        if(response.bookings[0]==''){
            response.bookings[0]=book ;
        }
        else{

            const starttime=st.getTime();
            const endtime=et.getTime();
            const curtime=new Date().getTime();
            response.bookings.forEach(element => {
                  const start=new Date(element.start).getTime();
                  const end=new Date(element.end).getTime();
                  if((starttime>=start && starttime<=end) || (endtime>=start && endtime<=end)) {
                      i=0;
                  }
            });
            if(endtime-starttime<1800000 || starttime-curtime<1800000){
                i=0;
            }
            if(i==1){
                response.bookings.push(book);
            }
        }
        response.save().then(()=>{
            console.log(i);
        }).catch((err)=>{
            console.log(err);
        })
        
    
        res.status(200).json({result:i});
    }).catch(err => {
        res.status(500).json({ message: err });
    });

}



