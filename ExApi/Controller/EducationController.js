
const { ObjectId } = require('mongodb');
const Education = require('../DB/Education');
class EducationController{
    constructor(){
        this.educationQuery = new Education();
    }

   
    list = async(req) => {
        try{
            const education =  this.educationQuery.list(req.params.user_id);
                let storeResult = [];     
                await education.forEach(resExp => {
                    storeResult.push(resExp)
                })
                return storeResult;
            
        }catch(error){
            console.log(error)
        }
    }

    listByID = async(req) => {
        return this.educationQuery.listById(ObjectId(req.params._id));

    }


    add = async(req) => {
        const educationDataBody = req.body;
        const educationData = {
            edu_level : educationDataBody.edu_level,
            uni : educationDataBody.uni,
            started_data : educationDataBody.started_data,
            end_date : educationDataBody.end_date,
            user_id : educationDataBody.user_id
        };
        const education = await this.educationQuery.insert(educationData);
        if(education.insertedId !== null){
            return {status : 200, data : education.insertedId, msg :`${education.insertedId} is inserted` };
        }else{
            return {status : 204, data : null, msg : "could not inserted"};
        }
    } 

    update = async(req) => {
        const resBody = req.body;
        const educationData = {
            edu_level : resBody.edu_level,
            user_id : resBody.user_id,
            started_data : resBody.started_data,
            end_date : resBody.end_date,
            uni : resBody.uni,
        };


        try{
            const education = await this.educationQuery.update(ObjectId(resBody._id), educationData);
            if(education.modifiedCount > 0){
                return {status : 200, data : education.modifiedCount};
            }else{
                return {status : 204, data : null};
            }
        }catch(error){
            console.log(error);
        }
        
    }

    dlt = async(req) => {
        const dltEducation = await this.educationQuery.delete(ObjectId(req.body._id));
        if(dltEducation.deletedCount > 0){
            return 200;
        }else{
            return 204;
        }
    }
    
    
    
}

module.exports = EducationController;