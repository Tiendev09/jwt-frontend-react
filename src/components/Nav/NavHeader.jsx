import { Link,NavLink,useLocation,useHistory } from 'react-router-dom';
import './Nav.scss';
import { toast, Toast } from 'react-toastify';
import logo from '../../../src/logo.svg';
import { useEffect, useState,useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { logoutUser } from '../../services/userService';
const NavHeader = () => {
    const { user,logoutContext } = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();
    const handleLogout = async() => {
        let data = await logoutUser();//clear cookie
        localStorage.removeItem("jwt");//clear localStorage
        logoutContext();//clear user in context
        if (data && +data.EC === 0) {
            
            toast.success("Logout success");
            history.push("/login")
        } else {
            toast.error(data.EM);
        }
    }
    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
        <>
                <div className='nav-header'>
                    <Navbar bg="header" expand="lg">
                        <Container>
                            <Navbar.Brand href="/">
                                <NavLink to="/" className="logo">
                                    <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top animation"
                                    // alt="React Bootstrap logo"
                                    />
                                    <span className='brand-name'> React</span>
                                    </NavLink>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className='nav-link'>Home</NavLink>
                                    <NavLink to="/users" className='nav-link'>Users</NavLink>
                                    <NavLink to="/roles" className='nav-link'>Roles</NavLink>
                                    <NavLink to="/group-role" className='nav-link'>Group-Role</NavLink>
                                    <NavLink to="/projects" className='nav-link'>Projects</NavLink>
                                    <NavLink to="/about" className='nav-link'>About</NavLink>
                                </Nav>
                                <Nav>
                                    {
                                        user && user.isAuthenticated === true ?
                                            <>
                                    <Nav.Item className='nav-link'>Welcome {user.account.username} !</Nav.Item>
                                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                <NavDropdown.Item>Change Password</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item> <span onClick={()=>handleLogout()}>Logout</span> </NavDropdown.Item>
                                            </NavDropdown>
                                            </>
                                            :
                                            <Link to="/login" className='nav-link'>Login</Link>
                                    }
                                    
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        )
    } else {
        return (
            <>
            
            </>
        )
    }
    
        

}
export default NavHeader;