import './Login.scss';
import { useHistory } from "react-router-dom";
import React,{ useState,useEffect } from 'react';
import { toast, Toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';
import { NavLink,Link } from 'react-router-dom';
const Login = (props) => {
    const { loginContext,user } = React.useContext(UserContext);
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
    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/');
       } 
    },[])
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
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_Token;
            let data = {
                isAuthenticated: true,
                token: token,
                account: {
                    groupWithRoles,email,username
                }
            }
            localStorage.setItem("jwt",token)
            loginContext(data);
            history.push("/users")
            
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
    return (
        <div className="login-container">
            <div className="container px-4 px-md-0">
                <div className="row">
                    <div className="col-12 d-none content-left col-md-7 d-md-block ">
                        <div className="brand">
                            <NavLink className="logo" to={"/"}>Facebook</NavLink>
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
                        <div className='text-center'>
                            <Link to='/' className='logo'><i className="fa fa-arrow-circle-left"></i>
                                <span> Return to home page</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;