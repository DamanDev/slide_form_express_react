const {db} = require('../DbHelper/ConnectionDb');
class Experience{
    constructor(){
        this.experience = db.collection("Experience");
    }


    list = (user_id_arg) => {
        return this.experience.find({user_id : user_id_arg})
    }

    listById = (_id_arg) => {
        return this.experience.findOne({_id : _id_arg})
    }

    insert = (insertData) => {
        return this.experience.insertOne(insertData);
    }

    update = (filter, updatedExperienceData) => {
        return this.experience.updateMany({_id:filter}, {$set : updatedExperienceData});
    }

    delete = (experience_id) => {
        return this.experience.deleteOne({ _id : experience_id});
    }
}

module.exports =Experience;