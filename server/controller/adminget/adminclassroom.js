const classroom= require('../../model/adminclassroom');

exports.adminclass=  (req,res) => {
    
    classroom.find({}).then(response =>{
        
            res.status(200).json({'login':response});
       
    }).catch(err => {
        res.status(500).json({message :  err});
    });
    
 }