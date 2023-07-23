import Validation from '../Helper/Validation';
const validationObj = new Validation();
const validate = (fieldName, value) => {

    if(!validationObj.isRequired(value)) return `*${fieldName} is required !`
    
    switch(fieldName){
        case "name":
            if(!validationObj.isString(value))
                return "name should be string";
            break;
        case "address":
            if(!validationObj.isStrNum(value))
                return "address should be string or number";
            break;
        case "phone":
            if(!validationObj.isNumber(value))
                return "number should be number";
            break;
        default:
            return "Field not found"
            
    }
    return "";
    
}


export default validate;