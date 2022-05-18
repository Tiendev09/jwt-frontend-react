import './Register.scss';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerCreateNewUser } from '../../services/userService';
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    let history = useHistory();
    
    const defaultValidIputs = {
        isValidEmail: true,
        isValidPassword: true,
        isValidPhone: true,
       isValidConfirmPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidIputs);
    const handleLoginAccount = () => {
        history.push("/login")
    }
    const isValidInputs = () => {
        setObjCheckInput(defaultValidIputs);
        if (!email) {
            toast.error("Email is required!");
            setObjCheckInput({...defaultValidIputs, isValidEmail: false});
            return false;
        }
        let reg = /\S+@\S+\.\S+/;
        if (!reg.test(email)) {
            setObjCheckInput({...defaultValidIputs, isValidEmail: false});
            toast.error("Please enter a valid email address!");
            return false;
        }
        if (!phone) {
            setObjCheckInput({...defaultValidIputs, isValidPhone: false});
            toast.error("Phone is required!");
            return false;
        }
        let regPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regPhone.test(phone)) {
            setObjCheckInput({...defaultValidIputs, isValidPhone: false});
            toast.error("Số điện thoại không đúng định dạng");
            return false;
        }
        if (!password) {
            setObjCheckInput({...defaultValidIputs, isValidPassword: false});
            toast.error("Password is required!");
            return false;
        }
        if (password !== confirmPassword) {
            setObjCheckInput({...defaultValidIputs, isValidConfirmPassword: false});
            toast.error("Your password is not the same!");
            return false;
        }
        
        
        return true;
    }
    const handleRegister = async() => {
        let check = isValidInputs();
        // let userData = { email, phone, username, password, confirmPassword } hoac
        if (check === true) {
            let serverData = await registerCreateNewUser(email, phone, username, password);
            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                history.push("/login");
            } else {
                toast.error(serverData.EM);
            }
        }
    }
    return (
        <div className="register-container">
            <div className="container px-4 px-md-0">
                <div className="row">
                    <div className="col-12 d-none content-left col-md-7 d-md-block ">
                        <div className="brand">
                            Facebook
                        </div>
                        <div className="detail">
                            Facebook helps you connect and share with the people in your life
                        </div>
                    </div>
                    <div className="col-12 col-md-5 content-right d-flex flex-column gap-4 py-3">
                        <div className="brand d-md-none text-center">
                            Facebook
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id='username' value={username} onChange={(event)=>setUsername(event.target.value)} className='form-control' placeholder='Username'/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}
                                id='email' className={objCheckInput.isValidEmail ? 'form-control' :'form-control is-invalid'  } placeholder='Email address' />

                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone number:</label>
                            <input type="text" className={objCheckInput.isValidPhone ? 'form-control' :'form-control is-invalid'  } id='phone' value={phone} onChange={(event)=>setPhone(event.target.value)} placeholder='Phone number'/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className={objCheckInput.isValidPassword ? 'form-control' :'form-control is-invalid'  } id='password' value={password} onChange={(event)=>setPassword(event.target.value)} placeholder='Password'/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="reenterpassword">Re-enter password:</label>
                            <input type="password" value={confirmPassword} onChange={(event)=>setConfirmPassword(event.target.value)} id='reenterpassword' className={objCheckInput.isValidConfirmPassword ? 'form-control' :'form-control is-invalid'  } placeholder='Re-enter Password'/>

                        </div>
                        
                        <button className='btn btn-primary' onClick={()=>{handleRegister()}}>Sign Up</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={()=>{handleLoginAccount()}}>
                                Already've an account. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;