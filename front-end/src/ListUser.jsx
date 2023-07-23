import axoisInstace from "./Axois"
import {useEffect, useState} from 'react';
import PersonalForm from './Personal/form-ui';
import PersonalList from './Personal/List';
import EducationForm from './Education/form-ui';
import EducationList from './Education/List';
import SkillForm from './Skill/form-ui';
import SkillList from './Skill/List';
import ExperienceForm from './Experience/form-ui';
import ExperienceList from './Experience/List';
import { useRef } from "react";
import AddAction from './AddAction';

const ListUser = () => {
    const user_id = localStorage.getItem("user_id");

    const [personal, setPersonal] = useState();
    const [education, setEducation] = useState([]);
    const [skill, setSkill] = useState([]);
    const [experience, setExperience] = useState([]);

    

    //edit and list pages
    const [editPersonal, setEditPersonal] = useState(false);
    const [editEducation, setEditEducation] = useState(false);
    const [addSkill, setAddSkill] = useState(false);
    const [editExp, setEditExp] = useState(false);

    
  

    const listSkill = () =>{
       axoisInstace.axs.get("skill/list/"+user_id, axoisInstace.config)
        .then(resultValue => {
            setSkill(resultValue.data)
        })
    }


    const firstTime = useRef(true);
    useEffect(() => {
        //prevent to call useEffect Twice
        if(firstTime.current)
            {
                axoisInstace.axs.get("education/list/"+user_id, axoisInstace.config)
                    .then(res => {
                        
                        setEducation(res.data);
                    })

                axoisInstace.axs.get("personal/list/"+user_id, axoisInstace.config)
                    .then(res => {
                        setPersonal(res.data);
                    })

                axoisInstace.axs.get("experience/list/"+user_id, axoisInstace.config)
                    .then(res => {
                        setExperience(res.data)
                    })

                listSkill();
                firstTime.current = false;
            }
    }, []);
    
    
    const updatedSuccess = (updatedData, form) => {
        if(form === "personal"){
            setPersonal(updatedData);
            setEditPersonal(false);
        }else if(form === "education"){
            setEducation(updatedData);
            setEditEducation(false);
        }else{
                   
        }
    }
    
    
    const dltSkill = (sliceSkillId) => {
        var filtered = skill.filter(function(value){ 
            return value._id !== sliceSkillId;
        });
       setSkill(filtered);
    }

    const dltEx = (id) => {
        axoisInstace.axs.delete("/experience/delete", {
            data : {_id : id}
            }, axoisInstace.config);

        const fileterExp = experience.filter(value => {
           return value._id !== id;
        })
        setExperience(fileterExp);
                
    }

    const dltEdu = (id) => {
        axoisInstace.axs.delete("/education/dlt", {
            data : {_id : id}
            }, axoisInstace.config);

        const fileterExp = education.filter(value => {
           return value._id !== id;
        })
        setEducation(fileterExp);
    }

    
    return (    
        <>
                {
                    (!personal && education.length < 1 && skill < 1 && experience < 1)
                        ? <AddAction/>
                        : <>
                            <div className="card" style={{width:"100%"}}>
                                <div className="row">
                                    <div className="col-10 section-head">
                                        <h5 className="text-left"><i className="bi bi-file-person-fill"></i> Info</h5>
                                    </div>
                                    <div className="col-2">
                                        {
                                            (editPersonal) ? <button className="btn-red float-right" onClick={ e => setEditPersonal(false)}>Cancle</button>
                                            :<button className="btn-gray float-right" onClick={ e => setEditPersonal(true)}>Edit</button>
                                        }
                                        
                                    </div>
                                </div>
                                {
                                    (editPersonal) 
                                        ? <PersonalForm updatedSuccess={updatedSuccess} personalValue={personal}/>
                                        : <PersonalList personal={personal}/>
                                
                                }
                            </div>
                        
                        
                                
                            {/**======================================== begin education ============================================= */} 
                            <div className="card" style={{width:"100%"}}>
                                <div className="row">
                                    <div className="col-md-10 section-head">
                                            <h5 className="text-left"><i className="bi bi-mortarboard-fill"></i> Education</h5>
                                    </div>
                                    <div className="col-2">
                                        {
                                            (editEducation) 
                                                ? <button className="btn-red float-right" onClick={ e => setEditEducation(false)}>Cancle</button>
                                                    
                                                : <button className="btn-gray float-right" onClick={ e => setEditEducation(true)}>Add</button> 
                                        }
                                    </div>
                                </div>
                                {
                                    (editEducation) 
                                        ?   <EducationForm updatedSuccess={updatedSuccess}/>
                                        :   education.map((edu) =><EducationList key={edu._id} dltEdu={dltEdu} education={edu}/>) 
                                            
                                }
                            </div>
                            {/**======================================== end education ============================================= */} 
                            
                            
                            
                            
                            
                            {/**======================================== begin Skill ============================================= */}                
                            <div className="card" style={{width:"100%"}}>
                                <div className="row">
                                    <div className="col-10">
                                        {(addSkill) ? <SkillForm listSkill={listSkill} skill={skill}/> : ""}
                                        <SkillList dltSkill={dltSkill} skill={skill}/>
                                    </div>
                                    <div className="col-2">
                                        {
                                            (addSkill)
                                                ? <button className="btn-red float-right" onClick={e=>setAddSkill(false)}>Cancle</button>
                                                : <button className="btn-gray float-right" onClick={e=>setAddSkill(true)}>Add</button>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/**======================================== end Skill ============================================= */}
                            
                            
                            
                            
                            
                            {/**======================================== Begin Experience ============================================= */}
                            <div className="card" style={{width:"100%"}}>
                                <div className="row">
                                    <div className="col-10 section-head">
                                        <h5 className="text-left"><i className="bi bi-pc-display-horizontal"></i> Experience</h5>
                                    </div>
                                    
                                    <div className="col-2">
                                        {
                                            (editExp) 
                                                ? <button className="btn-red float-right" onClick={e => setEditExp(false)}>Cancle</button>
                                                : <button className="btn-gray float-right" onClick={e => setEditExp(true)}>Add</button>
                                        }
                                    </div>
                                </div>
                                {
                                    (editExp) 
                                        ? <ExperienceForm updatedSuccess={updatedSuccess} personalValue={experience}/> 
                                        : experience.map((exp) =><ExperienceList key={exp._id} exp={exp} dltExp={dltEx}/>) 
                                }
                            </div>
                            {/**======================================== End Experience ============================================= */}
                        
                        </>
                    }
           
            
        </>
    )
}

export default ListUser