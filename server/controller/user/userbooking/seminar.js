const { response } = require("express");
const pointer = require("../../../model/adminseminar")

exports.seminarbook = (req, res) => {

    const hall_id = req.body.hall;
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
    
    pointer.seminar.findOne({ _id: hall_id }).then(response => {
        
        console.log("enetr");
        console.log(response);
        if(response.bookings[0]==''){
            const book = new pointer.seminarbooking({
                    user_name: userid,
                    start: b_start,
                    end: b_end
                 });
                book.save();
            response.bookings[0]=book ;

             response.save().then(()=>{
                console.log("true");
               }).catch((err)=>{
                  console.log(err);
             })
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
            if(endtime-starttime<1800000 || starttime-curtime<1800000 || endtime-starttime>15000000){
                i=0;
            }
            if(i==1){
                const book = new pointer.seminarbooking({
                    user_name: userid,
                    start: st,
                    end: et
                 });
                book.save();
                response.bookings.push(book);
                response.save().then(()=>{
            console.log("true");
        }).catch((err)=>{
            console.log(err);
        })
            }
            

       
        }


        
        
        
        res.status(200).json({result:i})
    }).catch(err => {
        res.status(500).json({ message: err });
    });

}