
import {useEffect, useState} from 'react';
import validaion from './validation';

import axoisInstace from "../Axois";




const Form = ({allValue, nextForm, updatedSuccess, experience}) => {
    const formField = { position : "", starting_date : "", still_working : true, finish_date : "", company_name : "" }
    const [input, setInput] = useState(formField);
    const [validErr, setValidErr] = useState(formField);

    useEffect(() => {
        if(allValue === undefined){
            if(experience !== undefined && experience){
                for(let key in formField){
                    setInput(input => ({...input, [key] : experience[key]}));  
                }
            } 
           
        }
    }, []);



    const submitAction = () => {
        let valid = true;

        ["company_name"].map((fieldName) => {
            const msg = validaion(fieldName, input[fieldName]);
            if(msg)
                valid=false;
                setValidErr(validErr => ({...validErr, [fieldName] : msg}));

            
        });

        if(valid){

            if(allValue === undefined){
                input.user_id = localStorage.getItem("user_id");
                if(experience === undefined){
                    axoisInstace.axs.post('/experience/add', input, axoisInstace.config)
                        .then((res) => {
                            const result = axoisInstace.axs.get("experience/list/"+localStorage.getItem("user_id"), axoisInstace.config);
                            result.then((myData => {
                                    updatedSuccess(myData.data, "experience")
                            }))
                       
                        })
                }else{
                    input._id = experience._id
                    axoisInstace.axs.put('/experience/update', input, axoisInstace.config);
                    updatedSuccess(input, "experience");
                }
                
                
              }else{
                const user_id = localStorage.getItem("user_id");
                allValue.personal.user_id = user_id;
                allValue.education.user_id = user_id;
                allValue.skill.user_id = user_id;
                input.user_id = user_id;
                
    
    
                axoisInstace.axs.post('personal/add', allValue.personal, axoisInstace.config)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => {
                        console.log("this is error from server " + error);
                    })
     
    
                axoisInstace.axs.post('education/add', allValue.education, axoisInstace.config)
                .then(res => {
                    console.log(res);
                })
                
                .catch(error => {
                    console.log(error);
                })

                axoisInstace.axs.post('skill/add', {skills : allValue.skill, user_id : user_id}, axoisInstace.config)
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.log(error);
                });
    
                axoisInstace.axs.post('experience/add', input, axoisInstace.config)
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.log(error);
                });



            }
           
            nextForm("none");
          
        }



    }

    
    return (
        <>
            <div className="form-wrapper">
                <input 
                    onChange={(e) => setInput({...input, position : e.target.value})}
                    value={input.position}
                    onBlur={(e) => setValidErr({...validErr, position : validaion("position", e.target.value)})}
                    placeholder="Position" className="form-control" type="text" name="name"/>

                {(validErr.position) ? <p>{validErr.position}</p> : ""}

                <input className="form-control" type="date" name="starting_date" 
                    onChange={(e) => setInput({...input, starting_date : e.target.value})}
                    value={input.starting_date}
                />
                <input type="checkbox" onClick={() => setInput({...input, still_working : !input.still_working})} />Still Working

                {(input.still_working) ?
                <input  
                    onChange={(e) => setInput({...input, finish_date : e.target.value})}
                    value={input.finish_date}
                    type="date" placeholder="finish date" className="form-control"  name="phone"/>
                : ""}

                <input 
                    value={input.company_name}
                    onChange={(e) => setInput({...input, company_name : e.target.value})}
                    onBlur={(e) => setValidErr({...validErr, company_name : validaion("company_name", e.target.value)})}
                    type="text" className='form-control' placeholder='company name' />
                
                {(validErr.company_name)?<p>{validErr.company_name}</p>:""}

                <button onClick={submitAction}>
                    {
                        (experience === undefined) ? "Save" : "Update"
                    }
                </button>
            </div>  
        </>
    );
}

export default Form;