import EducationForm from './form-ui';
import {useState} from 'react';
const List = ({education, dltEdu}) => {

    const [redirect, setRedirect] = useState();
    const [storeEdu, setStoreEdu] = useState(education);

    const updatedSuccess = (value) => {
        setStoreEdu(value);
        setRedirect("list");
    }

    return(
        
        <div className="list-content-wrapper">
            <div className="list-content">

                {
                    (redirect === "edit") ?
                        <>
                            <EducationForm education={storeEdu} updatedSuccess={updatedSuccess}/>
                            
                        </>
                    :
                        <>
                            <h5 className="text-left">
                                {(storeEdu !== undefined && storeEdu.edu_level)? storeEdu.edu_level : ""}
                            </h5>
                            <p className="text-left">{(storeEdu !== undefined && storeEdu.uni) ?  storeEdu.uni : ""}</p>
                            <p className="text-left">
                                <small>
                                    <i className="bi bi-calendar-week"></i>
                                        {(storeEdu !== undefined && storeEdu.started_data) ? " To  " + storeEdu.started_data + "   " : ""} 
                                    
                                    <i className="bi bi-calendar-week "></i>
                                        {(storeEdu !== undefined && storeEdu.end_date) ?  " From  " +storeEdu.end_date + "   " : ""}</small>
                            </p>
                        </>
                }

                
            </div>
            <div className="list-action">
                {
                    (redirect === "edit")? 
                        <i className="bi bi-dash-square custom-icon-md" onClick={() => {setRedirect("list")}}></i>
                    : 
                        <>
                            <i className="bi bi-pencil-square custom-icon-md" onClick={() => {setRedirect("edit")}}></i>
                            <i className="bi bi-trash custom-icon-md" onClick={() => dltEdu(storeEdu._id)}></i>
                        </>
                }
                
                
            </div>
        </div>
           
        
    )
}


export default List;