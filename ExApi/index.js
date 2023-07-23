const express = require('express');
const session = require("express-session");
// ADD THIS
var cors = require('cors');

const app = express();



app.use(cors());


app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));


app.use(express.json());
app.use(express.urlencoded({extended:false}));

const personalRoute = require('./PersonalRoute');
const registerRoute = require('./RegisterRoute');
const educationRoute = require('./EducationRouter');
const skillRoute = require('./SkillRouter');
const experienceRoute = require('./ExperienceRouter');

app.use('/personal', personalRoute);
app.use('/register', registerRoute);
app.use('/education', educationRoute);
app.use('/skill', skillRoute);
app.use('/experience', experienceRoute)

app.listen(8080);
console.log("running on 8080")

