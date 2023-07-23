const {db} = require('../DbHelper/ConnectionDb');
class Skill{
    constructor(){
        this.skillCollection = db.collection("Skills");    
    }

    get = (user_id_arg) => {
        const filter = {user_id : user_id_arg};
        const skillResult =  this.skillCollection.find(filter);
        return skillResult;
    }  

    insert = (skillData) => {
        return this.skillCollection.insertOne(skillData);
    }

    update = (filterById, skillData) => {
        return this.skillCollection.updateMany({_id : filterById}, {$set:skillData});
    }

    delete = (skillId) => {
     
        return this.skillCollection.deleteOne({_id : skillId});
    }
}

module.exports = Skill;