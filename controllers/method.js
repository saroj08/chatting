var connection=require('./connection');
exports.getuserdetailes=function(req, res){
 
    var details=new connection({
        email:req.body.email,
        username:req.body.username,
        password:req.body.pwd,
       
    })
     
    details.save(function(err,success){
        if(err){
            throw err;
        }
        else{
            res.json(success);
        }

    })
}
exports.getlogin=function(req, res){
          email=req.body.email
        userName=req.body.username;
        passWord=req.body.pwd ;


    connection.find({ $and : [{ email: email},{password: passWord}]},function(err,user){
        if(err){
            throw err
        }
        else if(user[0]== undefined){
       console.log(user)
            return res.json({ success: false, msg: 'User Not Found at here'});
        }
        else if(user)
        { 
            console.log("kkkkkkkkk")
            console.log(user);
            res.json({success: true, msg: 'successfully logged in',user:user})
        }
    })
} 