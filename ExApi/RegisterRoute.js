const Register = require("./DB/Register");
const express = require("express");
const router = express.Router();

const registerQry = new Register();




router.post('/login', (req, res) => {
    const crediantial ={email : req.body.email};
    const login = registerQry.login(crediantial);
    login.then(user => {
        if(user.status){
            res.send({status : 200, session : user.data._id.toString()})
        }else{
            res.send({status : 401, msg : "could nt logged in"});
        }
    });

});

router.post('/signup', (req, res) => {
    const userDetail = req.body;
    const user = registerQry.login(userDetail);
    user.then(ifUserExit => {
        if(!ifUserExit.status){
            const singnup = registerQry.signup(userDetail);
            singnup.then(response => {
                res.send({status : 200, user_id : response})
            })
        }else{
            res.send({status:304, msg : `${userDetail.email} is already exit`});
        }
    });

})

module.exports = router;

