import axoisInstace from "../Axois";
import { useState } from "react";
import validation from './validation';


const FormUi = ({nextForm, mergeAllForm, personalValue, updatedSuccess}) => {
    

    const personalFormField = {
        name: (personalValue !== undefined) ? personalValue.name : "", 
        address : (personalValue !== undefined) ? personalValue.address : "", 
        phone : (personalValue !== undefined) ? personalValue.phone : ""
    };
    const [formField, setFormField] = useState(personalFormField);
    const [validationErr, setValidationErr] = useState({name:"",address:"",phone:""});



    const actionNext = () => {
        let valid = true;
        for(let name in personalFormField){
            let errorMsg = validation(name, formField[name]);
            if(errorMsg)
                valid = false;
                setValidationErr(validationErr => ({...validationErr, [name] : errorMsg}))
            
        }

       
        

        //if edit form
        
        if(nextForm == undefined && mergeAllForm == undefined){
            formField._id = personalValue._id;
            axoisInstace.axs.put('personal/update', formField, axoisInstace.config)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log("this is error from server " + error);
            })
            
            updatedSuccess(formField, "personal");
        }else{
            //if normal form
            if(valid){
                nextForm("education");
                mergeAllForm("personal", formField);
            }
        }
 
        

    }


    
    return(
        <div className="form-wrapper">
            <input type="text" 
                name="name"
                placeholder="name"
                value={formField.name}
                onBlur={(e) => setValidationErr({...validationErr, [e.target.name] : validation(e.target.name, e.target.value)}) }
                className="form-control"
                onChange={(e) => setFormField({...formField, name:e.target.value})}
            />
            {(validationErr.name)?<p>{validationErr.name}</p>:""}
            <input type="text" 
                name="address"
                placeholder="address"
                value={formField.address}
                onBlur={(e) => setValidationErr({...validationErr, [e.target.name] : validation(e.target.name, e.target.value)}) }
                className="form-control"
                onChange={(e) => setFormField({...formField, address:e.target.value})}
            />
            {(validationErr.address)?<p>{validationErr.address}</p>:""}

            <input type="text" 
                name="phone" 
                placeholder="phone"
                value={formField.phone}
                className="form-control"
                onBlur={(e) => setValidationErr({...validationErr, [e.target.name] : validation(e.target.name, e.target.value)}) }
                onChange={(e) => setFormField({...formField, phone:e.target.value})}
            />

            {(validationErr.phone)?<p>{validationErr.phone}</p>:""}

            
            <button onClick={actionNext}>{(nextForm == undefined)?"Update":"Next"}</button> 
        </div>
   ); 
}
export default FormUi;