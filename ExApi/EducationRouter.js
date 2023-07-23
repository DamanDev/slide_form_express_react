const express = require("express");
const router = express.Router();
const EducationController = require("./Controller/EducationController");
const objEduController = new EducationController();
const{ObjectId} = require("mongodb");
const { Router } = require("express");

router.get("/list/:user_id", (req, res) => {
    objEduController.list(req).then(result => {
        res.send(result)
    })
})

router.get('/listById/:_id', (req, res) => {
    objEduController.listByID(req).then(data => {
        res.send(data);
    });
})

router.post('/add', (req, res) => {
    objEduController.add(req).then(result => {
        res.send(result);
    });
})

router.put('/update', (req, res) => {
    objEduController.update(req).then(msg => {
        res.send(msg);
    })
})

router.delete('/dlt', (req, res) => {
    objEduController.dlt(req).then(msg => {
        res.sendStatus(msg);
    })
});

module.exports = router;
