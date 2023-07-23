import {useState} from 'react';

import axoisInstace from "../Axois";
import SkillList from './List';


const Form = ({nextForm, mergeAllForm, listSkill}) => {
    const [skills, setSkills] = useState([]);
    const [validErr, setValidErr] = useState("");
    const skillCat = {
        IT : ["php", "java", "python"],
        Account : ["auditing", "accounting"],
        Artist : ["desiging", "concpt art"]
    };

   

    const mergeSkill = [];
    
    Object.keys(skillCat).map((cat) => {
        mergeSkill.push(cat);
        skillCat[cat].map((skill) => {
            mergeSkill.push(skill);
        })
    });
    
    const skillOption = mergeSkill.map((skill, index) => {
        if(skill in skillCat)
            return <option className='skill-category' value={skill}  key={index} disabled>{skill}</option>
        return <option value={skill} key={index}>{skill}</option> 
    });

    const nextAction = () => {
        if(nextForm === undefined && mergeAllForm === undefined){
            if(localStorage.getItem("user_id")){
                axoisInstace.axs.post("/skill/add", {skills : skills, user_id : localStorage.getItem("user_id")}, axoisInstace.config)
                .then(result => {
                    listSkill();
                })
                .catch(error => {
                    console.log(error);
                });
            }else{
                console.log("not logged it");
            }
            
        }else{
            if(skills.length > 0){
                mergeAllForm("skill", skills);
                nextForm('experience');
            }else{
                setValidErr("Please select atleast one skill");
            } 
        }                                                  
    }

    const dltSkill = (deleteSkill) => {
        var filtered = skills.filter(function(value){ 
            return value !== deleteSkill;
        });
       setSkills(filtered);
    }

    
    return(
        
        <>
           
                <div className="form-wrapper">
                    <select onChange={e =>(!skills.includes(e.target.value) ? setSkills([...skills, e.target.value]) : "" )}>
                        <option value="">Select skill</option>
                        {skillOption}
                    </select>
                    <p>{validErr}</p>

                   
                    <div className="skill-wrapper">
                        {skills.map((value, index) => {
                                return <p key={index}>{value} 
                                         <i class="bi bi-x-circle-fill" onClick={e=>dltSkill(value)}></i>
                                    </p>
                            })}
                    </div>
                  
                    <button onClick={(e) => nextAction()}>{(nextForm === undefined) ?"save" : "next"}</button>
                </div>
           

            
        </>
    )    
}
export default Form;

/**
 * 
 */