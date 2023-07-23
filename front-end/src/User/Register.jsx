import {useState} from 'react';
import axoisInstace from '../Axois';
    
const Register = ({redirectToProp}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failSignup, setFailSignUp] = useState(false);

    const signupAction = () => {
        axoisInstace.axs.post('register/signup', {
            email : email,
            password : password
        }, axoisInstace.config)
        .then(res => {
            if(res.data.status === 200){
                localStorage.setItem("user_id", res.data.user_id)
               redirectToProp("listUser");
            }else{
                setFailSignUp(true);
            }
        }) 
    }

    return(
        <>
            <div className="card auth-form">
                <input 
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    type="text" className="form-control" placeholder="email" />
                <input 
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    type="text" className="form-control" placeholder="password" /> 
                {(failSignup)?<p>could not register</p>:""}
                <button className='btn-sml' onClick={(e)=>signupAction()}>Signup</button>
            </div>
        </>
    );
}

export default Register;