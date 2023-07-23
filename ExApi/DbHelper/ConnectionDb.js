const {MongoClient} = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function run(){
     try{
          await client.connect();  
          console.log("Pinged your deployment. You successfully connected to MongoDB!");

     } finally {
        //  client.close();
     }
}

run().catch(console.dir);



 module.exports = {
     client : client,
     db : client.db('SlidFormDb')
}

 