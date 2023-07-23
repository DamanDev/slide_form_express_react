import axoisInstace from '../Axois';
import {useState} from 'react';
const Login = ({redirectToProp}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidMsg, setInvalidMsg] = useState(false);


    const loginAction = () => {
        axoisInstace.axs.post("register/login", {
            email : email,
            password : password
        }, axoisInstace.config)
        .then(res => {
            if(res.data.status === 200){
                localStorage.setItem("user_id", res.data.session);
                redirectToProp("base");
                setInvalidMsg(false);
            }else{
                 
                redirectToProp("login");
                setInvalidMsg(true);
            }
        })
        .catch(error => {
            console.log(error);
        });

        

    }
    return(
        <>
            <div className="card auth-form">
                <input 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text" placeholder="email" className="form-control"/>
                <input 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="text" className="form-control" placeholder="password"/>

                    {(invalidMsg)?<p>Invalid user or password</p>:""}
                <button onClick={loginAction} className="btn-sml">Login</button>
            </div>
        </>
    )
}

export default Login;   