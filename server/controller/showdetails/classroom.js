const pointer= require('../../model/adminclassroom');

exports.adminclass=  (req,res) => {

    const id=req.params.classid;
    
    pointer.classroom.findOne({_id:id}).then(response =>{
            
            
            res.status(200).json({login:response});
       
    }).catch(err => {
        res.status(500).json({message :  err});
    });
    
 }