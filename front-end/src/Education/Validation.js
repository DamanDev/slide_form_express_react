import Validation from '../Helper/Validation';
const validationObj = new Validation();
const validate = (fieldName, value, moreValidation) => {
    console.log("this is " + value + " " +fieldName)
    if(!validationObj.isRequired(value)) return `*${fieldName} is required !`
    /**
    if(moreValidation)
        switch(fieldName){
            case "edu_level":
                if(!validationObj.isString(value))
                    return "education level should be string";
                break;
            case "uni":
                if(!validationObj.isString(value))
                    return "University name should be string";
                break;
            default:
                return "Field not found"
                
        }
        return "";
     */
}


export default validate;