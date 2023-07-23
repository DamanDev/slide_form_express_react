const express = require("express")

const router = express.Router();
const SkillController = require("./Controller/SkillController");
const skillControllerObj = new SkillController();

router.get('/list/:user_id', (req, res) => {
   skillControllerObj.list(req).then(result => {
    res.send(result);
   });
      
})

router.post("/add", (req, res) => {
    skillControllerObj.add(req).then(newSkillMsg => {
        res.send(newSkillMsg);
    })
})

router.put("/update", (req, res) => {
    skillControllerObj.update(req).then(msg => {
        res.send(msg); 
    })
})  

router.delete("/dlt", (req, res) => {
    
    try{
        skillControllerObj.delete(req).then(result => {
            if(result > 0){
                res.sendStatus(200)
            }else{
                res.sendStatus(409)
            }
            
        });
    }catch(error){
        console.log(error)
    }
}) 

module.exports = router;