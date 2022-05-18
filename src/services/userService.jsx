// import axios from "axios";
import axios from '../setup/axios';
// neu export 1 bien thi sd ten file

const registerCreateNewUser = (email,phone,username,password) => {
    return axios.post('/api/v1/register', {
            email,phone,username,password
    })
}
const loginUser = (valueLogin,password) => {
    return axios.post('/api/v1/login', {
            valueLogin,password
    })
}
const fetchAllUser = (page,limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
}
const deleteUser = (user) => {
    return axios.delete("/api/v1/user/delete", { data: { id: user.id } })
    
}
const fecthGroup = () => {
    return axios.get("/api/v1/group/read");
}
const createNewUser = (userData) => {
    return axios.post("/api/v1/user/create",{...userData});
}
const updateUser = (userData) => {
    return axios.put("/api/v1/user/update",{...userData});
}
export {
    registerCreateNewUser,loginUser,fetchAllUser, deleteUser,fecthGroup,createNewUser,updateUser
};