import './Login.scss';
import { useHistory } from "react-router-dom";
import { useState,useEffect } from 'react';
import { toast, Toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
const Login = (props) => {
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const defautObjValidInput = {
        isValidValueLogin: true,
        isValidPassword:true
    }
    const [objValidInput, setObjValidInput] = useState(defautObjValidInput);
    const handleCreateNewAccount = () => {
        history.push("/register")
    }
    const handleLogin = async() => {
        setObjValidInput(defautObjValidInput);
        if (!valueLogin) {
            setObjValidInput({...defautObjValidInput, isValidValueLogin: false})
            toast.error("Please enter your email address or your phone number");
            return;
        }
        if (!password) {
            setObjValidInput({...defautObjValidInput, isValidPassword: false})
            toast.error("Please enter your password");
            return;
        }
        let response = await loginUser(valueLogin, password);
        if (response && +response.EC === 0) {
            //success
            let data = {
                isAuthenticated: true,
                token:"fake token"
            }

            sessionStorage.setItem('account', JSON.stringify(data));
            history.push("/users")
            window.location.reload();
            
        }
        if (response && +response.EC !== 0) {
            //error
            toast.error(response.EM);
        }
        console.log("Check respon", response);
    }
    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleLogin();
        }
    }
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        //neu da co bien session thi cap nhat lai giao dien
        if (session) {
            history.push("/");
            window.location.reload();
        }
    },[])
    return (
        <div className="login-container">
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
                        <input type="text" value={valueLogin} onChange={(event)=>{setValueLogin(event.target.value)}} className={objValidInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'} placeholder='Email address or phone number'/>
                        <input type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}}  onKeyPress={(event)=>handlePressEnter(event)} className={objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Password'/>
                        <button className='btn btn-primary' onClick={()=>{handleLogin()}}>Log In</button>
                        <span className='text-center'>
                            <a href='#' className='forgot-password'>Forgotten password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={()=>{handleCreateNewAccount()}}>
                                Create New Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;