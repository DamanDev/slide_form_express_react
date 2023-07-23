import PersonalForm from "./Personal/form-ui";
import EducationForm from './Education/form-ui';
import SkillForm from './Skill/form-ui';
import ExperienceForm from './Experience/form-ui';
import ListUser from './ListUser';

import { useState } from "react";

const AddAction = ({redirectProp}) => {

    let [activeForm, setActiveForm] = useState("personal");
    const [storeAllValue, setStoreAllValue] = useState({personal : "", education : "", skill : []})

    const mergeAllForm = (valueKey, value) => {
       setStoreAllValue({...storeAllValue, [valueKey] : value});
    }


let activeFormCom;
    if(activeForm === "personal")
        activeFormCom = <PersonalForm 
            nextForm={setActiveForm}
            mergeAllForm={mergeAllForm}
        />   
    else if(activeForm === "education")
        activeFormCom = <EducationForm
            nextForm={setActiveForm}
            mergeAllForm={mergeAllForm}
        />
    else if(activeForm === "skill")
        activeFormCom =<SkillForm
            nextForm={setActiveForm}
            mergeAllForm={mergeAllForm}
        />
    else if(activeForm === "experience")
        activeFormCom = <ExperienceForm
            nextForm = {setActiveForm}
            allValue = {storeAllValue}
        />
    else if(activeForm === "none")
        activeFormCom = <ListUser/>
    else
        console.log("no next form!")
    
    
    return(
        <>
            <div className="container">
                {activeFormCom}
            </div>
        </>
    )
}

export default AddAction;          
