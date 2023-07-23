const {client, db} = require("../DbHelper/ConnectionDb");
class Register{
    constructor(){
        this.userCollection = db.collection("User");
    }
    
    signup = async(userDetailarg) => {
        const userDetail = {
            email : userDetailarg.email,
            password : userDetailarg.password
        }
        try{
            const user = await this.userCollection.insertOne(userDetail);
            return user.insertedId;
        }catch(err){
            throw err;
        }    
    }  
    
    login = async(crediantial) => {
        const email = crediantial.email;
        const user = await this.userCollection.findOne({email});
        if(user == null) return {status : false, data : null};
        return {status : true, data : user};
        
    }
}

module.exports = Register;