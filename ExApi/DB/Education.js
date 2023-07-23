const { ObjectID } = require("mongodb");
const {client, db} = require("../DbHelper/ConnectionDb");
class Education{
    constructor(){
        this.educationCollection = db.collection("Education");
    }
    
    list = (listByUserId) => {
        return this.educationCollection.find({user_id : listByUserId});
    }

    listById = (_id_arg) => {
        return this.educationCollection.findOne({_id : _id_arg})
    }

    insert = (educationData) => {
        return this.educationCollection.insertOne(educationData);
    }

    update = async(filterId, setEducationData) => {
        return await this.educationCollection.updateMany({_id : filterId}, {$set : setEducationData});
    }

    delete = async(filterId) => {
        return await this.educationCollection.deleteOne({_id : filterId});
    }
}

module.exports = Education;