const Skill = require('../DB/Skill');
const {ObjectId} = require("mongodb")

class SkillController{
    constructor(){
        this.skillQuery = new Skill();
    }

    list = async(req) => {
      
        const skillList = this.skillQuery.get(req.params.user_id);
        let storeResult = [];     
        await skillList.forEach(resExp => {
            storeResult.push(resExp)
        })
        
        return storeResult;
       
        
        
    } 

    add = async(req) => {
        console.log(req.body.skills.length)
        if(req.body.skills.length > 0){
            try{
                let addedSkill;
                console.log(req.body)
                req.body.skills.map(value=>{
                    addedSkill = this.skillQuery.insert({title : value, user_id : req.body.user_id}); 
                })
                return true;
            }catch(error){
                console.log(error);
            }
        }

        
        
    }
    
    update = async(req) => {
        const updateData = {
            title : req.body.title
        }    
        try{
            const updatedSkill = await this.skillQuery.update(ObjectId(req.body._id), updateData);
            if(updatedSkill.modifiedCount > 0){
                return {status:200, data : updatedSkill.modifiedCount, msg : `${updatedSkill.modifiedCount} number data updated`}
    
            }else{
                return {status:200, data : updatedSkill.modifiedCount, msg : `could not update data`}
            }
        }catch(error){
            console.log(error)
        }
        
    }   

    delete = async(req) => {
        try{
            const skill_id = req.body.skill_id;
            const deletedSkill = await this.skillQuery.delete(ObjectId(skill_id));
            return deletedSkill.deletedCount;
        }catch(err){
            throw err;
        }
        
    }

    
}

module.exports = SkillController;