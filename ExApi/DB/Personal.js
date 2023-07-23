
const {client, db} = require('../DbHelper/ConnectionDb');
const {ObjectId} = require('mongodb');

class Personal{
    constructor(){
        this.personalCollection = db.collection("Personal");
    }
  
    get = (argId) => {
        const user_id_query = {user_id : argId}
        return this.personalCollection.findOne(user_id_query);
        
    }    

    add = (reqData) => {


        return this.personalCollection.insertOne(reqData);
    }   

    update = (filter, updatedData) => {
        return this.personalCollection.updateMany(filter, updatedData);
    }
    
    delete = (personalId) => {
        const query = { _id : ObjectId(personalId) };
        return this.personalCollection.deleteOne(query);
        
    }
}

module.exports = Personal;