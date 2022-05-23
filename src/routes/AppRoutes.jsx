import {
  Switch,
  Route
  
} from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManagerUser/Users";
import PrivateRoutes from "./PrivateRoutes";
import Roles from "../components/Role/Roles";
import GroupRole from "../components/Group-Role/GroupRole";
import Home from "../components/Home/Home";
const AppRoutes = () => {
    const Projects = () => {
        return (
            <span>
                Projects
            </span>
        )
    }
    return (
        <>
        <Switch>
           {/* <Route path="/project">
            Project
            </Route> */}
          <PrivateRoutes path="/users" component={Users} />
          <PrivateRoutes path="/projects" component={Projects} />
          <PrivateRoutes path="/roles" component={Roles} />
          <PrivateRoutes path="/group-role" component={ GroupRole}/>
          
                
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
            </Route>
            
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="*">
            <div className="container">
              404 not found
            </div>
            
          </Route>
        </Switch>
        </>
    )
}
export default AppRoutes;