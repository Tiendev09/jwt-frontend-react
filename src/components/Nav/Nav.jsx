import { NavLink,useLocation } from 'react-router-dom';
import './Nav.scss';
import { useEffect, useState } from "react";
const Nav = () => {
    const [isShow, setIsShow] = useState(true);
    let location = useLocation();
    useEffect(() => {
        //neu da co bien session thi cap nhat lai giao dien
        if (location.pathname === "/login") {
            setIsShow(false)
        }
    },[])
    return (
        <>
            {
                isShow === true &&
                <div className="">
                    <div className="topnav">
                        <NavLink to="/" exact>Home</NavLink>
                        <NavLink to="/projects">Projects</NavLink>
                        <NavLink to="/users">Users</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </div>
                </div>
            }
        </>
        
)
}
export default Nav;