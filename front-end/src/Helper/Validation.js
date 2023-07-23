class Validation{

    isRequired = (value) => {
       
        if(value !== "") return true;
        return false; 

    }

    isString = (value) => {
        if(value.match("^[a-zA-Z ]*$")) return true;
        return false;
    }

    isStrNum = (value) => {
        if(value.match("^[0-9a-zA-Z ]*$")) return true;
        return false;
    }

    isNumber = (value) => {
        if(value.match("^[0-9]{10}$")) return true;
        return false;    
    }

}

export default Validation;