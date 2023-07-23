const { ObjectId } = require("mongodb");
const Experience = require("../DB/Experience"); 
class ExperienceController{

    constructor(){
        this.experienceModule = new Experience();
    }

    list = async(req) => {
        try{
            const experience =  this.experienceModule.list(req.params.user_id);
                let storeResult = [];     
                await experience.forEach(resExp => {
                    storeResult.push(resExp)
                })
                return storeResult;
            
        }catch(error){
            console.log(error)
        }
        
    }

    listByID = async(req) => {
        return this.experienceModule.listById(ObjectId(req.params._id));

    }

    
    add = async(req) => {
        const experienceData = {
            position : req.body.position,
            starting_date : req.body.starting_date,
            finish_date : req.body.finish_date,
            company_name : req.body.company_name,
            user_id : req.body.user_id
        }
        try{
            const addedEx = await this.experienceModule.insert(experienceData);
            return addedEx.insertedId;
        }catch(error){
            console.log(error)
        }
         
    }

    update = async(req) => {
        const updatedExperienceData = {
            position : req.body.position,
            starting_date : req.body.starting_date,
            finish_date : req.body.finish_date,
            company_name : req.body.company_name,
            user_id : req.body.user_id
        }
        
        const filter = ObjectId(req.body._id);
        try{
            const updatedExperience = await this.experienceModule.update(filter, updatedExperienceData);
            if(updatedExperience.modifiedCount > 0){
                return 200;
            }else{
                return 409;
            }
            
        }catch(error){
            console.log(error)
        }
        
    }

    delete = async(req) => {
        const deltedExp = await this.experienceModule.delete(ObjectId(req.body._id));
        if(deltedExp.deletedCount > 0) {
            return 200;
        }else{
            return 403;
        }
    }
}

module.exports = ExperienceController;