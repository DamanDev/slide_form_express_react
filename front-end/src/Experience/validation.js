import Validation from '../Helper/Validation';
const validationObj = new Validation();
const validate = (fieldName, value) => {

    if(!validationObj.isRequired(value)) return `*${fieldName} is required !`
    
    
        switch(fieldName){
            case "company_name":
                if(!validationObj.isString(value))
                    return "company name should be string";
                break;
             case "position" :
                if(!validationObj.isString(value))
                    return "position name should be string";
                break;
            default:
                return "Field not found"
                
        }
        return "";
    
}


export default validate;