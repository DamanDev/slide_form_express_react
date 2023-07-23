import ExperienceForm from "./form-ui";
import {useState} from 'react';

const List = ({exp, dltExp}) => {

    const [redirect, setRedirect] = useState();
    const [stroeExp, setStroeExp] = useState(exp);

    const updatedSuccess = (value) => {
        setStroeExp(value);
        setRedirect("list");
    }
    
    return(
       <div className="list-content-wrapper">   
            <div className="list-content">
                {
                    (redirect === "edit") 
                        ? <ExperienceForm updatedSuccess={updatedSuccess} experience = {stroeExp}/> 
                        :   <>
                                <h5 className="text-left">
                                {(stroeExp !== undefined && stroeExp.position) ? stroeExp.position : ""}
                                </h5>
                                <p className="text-left"> {(stroeExp !== undefined && stroeExp.company_name) ? stroeExp.company_name : ""}</p>
                                <p className="text-left">
                                    <small>
                                        <i className="bi bi-calendar-week"></i>    
                                            {(stroeExp !== undefined && stroeExp.starting_date) ? "  To  " +stroeExp.starting_date + "   " : ""} 
                                        <i className="bi bi-calendar-week "></i>
                                            {(stroeExp !== undefined && stroeExp.finish_date) ? "  From  "  + stroeExp.finish_date + "   " : ""}
                                    </small>
                                </p>
                            </>
                }
            </div> 
            <div className="list-action">
                {
                    (redirect === "edit")
                    ? <i className="bi bi-dash-square custom-icon-md" onClick={() => {setRedirect("list")}}></i>
                    : <> 
                        <i className="bi bi-pencil-square custom-icon-md" onClick={() => {setRedirect("edit")}}></i>
                        <i onClick={() => dltExp(stroeExp._id)} className="bi bi-trash custom-icon-md"></i>
                        </>
                }
            </div>
        </div> 
    )
}



export default List;
