const admin = require('../model/loginadmin');
const user = require('../model/loginuser');

exports.adminlogin=  (req,res) => {
    var email = req.body.email;
    var pass = req.body.password;
    var signed= req.body.whosigned;
    if(signed==1){
            admin.find({email:email,password:pass}).then(results =>{
            
                if(Object.keys(results).length!=0 && results.constructor!=Object){
                    res.json({
                        status:true,
                        autheciation:true,
                        rest_string: results,
                        update:results[1],
                        message:'data fetched sucessfully'
                    });
                }else{
                    res.json({
                        status:true,
                        autheciation:false,
                        rest_string: results[0],
                        update:results[1],
                        message:'data  not fetched '
                    });
                }
        
                }).catch(err => {
                    res.status(500).json({message :  err});
                });
    }else{
        user.find({email:email,password:pass}).then(results =>{
            
            if(Object.keys(results).length!=0 && results.constructor!=Object){
                res.json({
                    status:true,
                    autheciation:true,
                    rest_string: results[0],
                    update:results[1],
                    message:'data fetched sucessfully'
                });
            }else{
                res.json({
                    status:true,
                    autheciation:false,
                    rest_string: results[0],
                    update:results[1],
                    message:'data  not fetched '
                });
            }
        
        }).catch(err => {
            res.status(500).json({message :  err});
        });
    }   
    
 }
