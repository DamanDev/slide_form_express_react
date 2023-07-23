import { useState, useEffect } from "react";
import validation from "./Validation";
import axoisInstace from "../Axois";

const Form = ({nextForm,mergeAllForm, education, updatedSuccess}) => {
    const inputField = {edu_level : "", started_data : "", still_study : false, end_date : "", uni : ""}
    const [input, setInput] = useState(inputField);
    const [err, setErr] = useState(inputField);

    
        useEffect(() => {
            if(nextForm === undefined && mergeAllForm === undefined){
                if(education !== undefined && education){
                    for(let key in inputField){
                        setInput(input => ({...input, [key] : education[key]}));  
                    }
                } 
               
            }
        }, []);
    
    


    const submitAction =  () => {
        let valid  = true;
            ['edu_level', 'uni'].map((filName) => {
                const errMsg = validation(filName, input[filName], true);
                if(errMsg){
                    valid = false;
                    setErr(err => ({...err, [filName] : errMsg}))
                }
            });

            if(nextForm === undefined && mergeAllForm === undefined){
                if(education === undefined){
                    input.user_id = localStorage.getItem("user_id");
                    axoisInstace.axs.post('education/add', input, axoisInstace.config)
                    .then(res => {
                        const result = axoisInstace.axs.get("education/list/"+localStorage.getItem("user_id"), axoisInstace.config);
                        result.then((myData => {
                            updatedSuccess(myData.data, "education");
                        }))
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }else{  
                    input.user_id = localStorage.getItem("user_id");
                    input._id = education._id;
                    axoisInstace.axs.put('education/update', input, axoisInstace.config)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => {
                        console.log("this is error from server " + error);
                    })
                    updatedSuccess(input, "education");
                    
                }
            }else{
                if(valid){
                    nextForm("skill");
                    mergeAllForm("education", input);
                }

            }
    }

    let submitButton;if(nextForm === undefined){
        if(education === undefined){
            submitButton = "Save";
        }else{
            submitButton = "Update";
        }
    }else{
        submitButton = "Next";
    }
    return(
       <div className="form-wrapper">

            <input 
                onBlur={(e) => setErr({...err, edu_level : validation(e.target.name, e.target.value, true)})}
                onChange={(e) => setInput({...input, edu_level : e.target.value})}
                value={input.edu_level}
                type="text" name="edu_level" placeholder="Level" className="form-control" />
            {(err.edu_level) ? <p>{err.edu_level}</p> : ""}

            <input 
                onBlur={(e) => setErr({...err, started_data : validation(e.target.name, e.target.value, false)})}
                onChange={e => setInput({...input, started_data : e.target.value})}
                value={input.started_data}
                type="date" name="started_from" placeholder="Started From" className="form-control" />
            {(err.started_data) ? <p>{err.started_data}</p> : ""}

            <input type="checkbox" onClick={(e) => setInput({...input, still_study : !input.still_study})} /> Still Study

            {
                (!input.still_study) ? 
                <>
                <input 
                    onBlur={(e) => setErr({...err, end_date : validation(e.target.name, e.target.value, false)})}
                    onChange={e => setInput({...input, end_date : e.target.value})}
                    value={input.end_date}
                    type="date" name="end_date" className="form-control date" placeholder="End date" /> 
                    {(err.end_date) ? <p>{err.end_date}</p> : ""}
                </> : ""
            } 
            
            
            <input
                onChange={e => setInput({...input, uni : e.target.value})}
                value={input.uni}
                onBlur={(e) => setErr({...err, edu_level : validation(e.target.name, e.target.value, true)})}
                type="text" name="uni" placeholder="Uni" className="form-control" />  
                 {(err.uni) ? <p>{err.uni}</p> : ""}
          
            <button onClick={submitAction}>{submitButton}</button> 
            
       </div>
    )
}

export default Form;