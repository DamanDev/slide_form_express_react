const express = require('express');
const ExperienceController = require('./Controller/ExperienceController');
const router = express.Router();
const experienceControllerObj = new ExperienceController();


router.get('/list/:user_id', (req, res) => {
    experienceControllerObj.list(req).then(data => {
        res.send(data);
    });
});

router.get('/listById/:_id', (req, res) => {
    experienceControllerObj.listByID(req).then(data => {
        res.send(data);
    });
})

router.post('/add', (req, res) => {
    experienceControllerObj.add(req).then(msg=>{
        res.send(msg);
    })
})

router.put('/update', (req, res) => {
    experienceControllerObj.update(req).then(msg => {
        res.sendStatus(msg);
    })
})

router.delete('/delete', (req, res) => {
    experienceControllerObj.delete(req).then(msg=>{
        res.sendStatus(msg);
    });    
})

module.exports = router