const express = require("express");
const { isNumber } = require("util");
const router = express.Router();
const personalController = require("./Controller/PersonalController");
const ObjPersonalController = new personalController();

router.get("/list/:user_id", (req, res) => {
    ObjPersonalController.list(req).then(result => {
         res.send(result);
    })
});


router.post('/add', (req, res) => {
    ObjPersonalController.add(req).then(result => {
        res.send(result);
    })
});


router.put('/update', (req, res) => {
    ObjPersonalController.update(req).then(result => {
        res.send(result);
    })
});

router.delete('/delete', (req, res) => {
    ObjPersonalController.delete(req).then(result => {
        res.send(result);
    })
})

module.exports = router;