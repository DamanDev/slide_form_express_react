const { ObjectId } = require("mongodb");
const Personal = require("../DB/Personal"); 
class PersonalController{
    constructor(){
        this.personalModule = new Personal();
        
    }
    
    list = async(req) => {
        return await this.personalModule.get(req.params.user_id);
    }

    add = async(req) => {
        const reqData = {
            name : req.body.name,
            address : req.body.address,
            phone : req.body.phone,
            user_id : req.body.user_id
        }
        
        try{
            const personal = await this.personalModule.get(req.body.user_id);
            if(personal === null){
                const addPerson = await this.personalModule.add(reqData);
                
                if(addPerson.insertedId !== null){
                    return {status:200, data : addPerson.insertedId}
                }else{
                    return {status:204 , data : null}
                }
            }else{
                return {status : 304, data : null};
            }  
        }catch(error){
            console.log(error);
        }


        
    }

    update = async(req) => {
        const data = req.body;
        const filter = {
            _id : ObjectId(data._id) 
         }
         const replaceData = {
             $set : {
                 name : data.name,
                 address : data.address,
                 phone : data.phone 
             }
         }

        try{
            const updatedPersonal = await this.personalModule.update(filter, replaceData);
            if(updatedPersonal.modifiedCount < 1) return { status : 204, data : null}
            return { status : 200, data : updatedPersonal.modifiedCount}
        }catch(error){
            console.log(error)
        }
        
    }

    delete = async(req) => {
        try{
            const dltPerson = await this.personalModule.delete(req.body._id);
            if(dltPerson.deletedCount > 0){
                return {status:200, data : dltPerson.deletedCount}
            }else{
                return {status : 204, data : null}
            }
        }catch(error){
            console.log(error);
        }
    }
}
module.exports = PersonalController;