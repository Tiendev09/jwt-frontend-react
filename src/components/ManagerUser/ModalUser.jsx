import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { fecthGroup,createNewUser,updateUser } from '../../services/userService';
import { toast, Toast } from 'react-toastify';
import _ from "lodash"
const ModalUser = (props) => {
    const [userGroups, setUserGroups] = useState([]);
    // console.log(userGroups);
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [username, setUsername] = useState("");
    // const [address, setAddress] = useState("");
    // const [password, setPassword] = useState("");
    // const [gender, setGender] = useState("");
    // const [group, setGroup] = useState("");
    
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        adress: '',
        password: '',
        gender: '',
        groupId:''
    }
    const validInputsDefault = {
            email: true,
            phone: true,
            username: true,
            address: true,
            password: true,
            gender: true,
            groupId: true
    }
    const {action, dataModalUser} = props;
    const [objCheckInput, setObjCheckInput] = useState(validInputsDefault);
    const [userData, setUserData] = useState(defaultUserData);
    useEffect(() => {
        getGroups();
        
    }, []);
    useEffect(() => {
        if (action === "Update") {
            setUserData({ ...dataModalUser, groupId: dataModalUser.Group ? dataModalUser.Group.id : "" });
        }
    }, [dataModalUser]);
    useEffect(() => {
        if (action === "Create") {
            if (userGroups && userGroups.length > 0) {
                setUserData({...userData,groupId:userGroups[0].id})
            }
        }
    },[action])
    const getGroups = async() => {
        let response = await fecthGroup();
        if (response && response.EC === 0) {
            setUserGroups(response.DT);
            if (response.DT && response.DT.length > 0) {
                let groups = response.DT;
                setUserData({...userData,groupId:groups[0].id})
            }
        } else {
            toast.error(response.EM);
        }
    }
    
    const handleOnchangeInput = (value,name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }
    const checkValidInput = () => {
        if (action === "Update") {
            return true;
        }
        //create user
        setObjCheckInput(validInputsDefault);
        if (!userData.email) {
            toast.error("Email is required!");
            setObjCheckInput({...validInputsDefault, email: false});
            return false;
        }
        let reg = /\S+@\S+\.\S+/;
        if (!reg.test(userData.email)) {
            setObjCheckInput({ ...validInputsDefault, email: false});
            toast.error("Please enter a valid email address!");
            return false;
        }
        if (!userData.phone) {
            setObjCheckInput({...validInputsDefault, phone: false});
            toast.error("Phone is required!");
            return false;
        }
        let regPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regPhone.test(userData.phone)) {
            setObjCheckInput({...validInputsDefault, phone: false});
            toast.error("Số điện thoại không đúng định dạng");
            return false;
        }
        if (!userData.password) {
            setObjCheckInput({...validInputsDefault, password: false});
            toast.error("Password is required!");
            return false;
        }
        return true;
    }
    // const checkValidateInputs = () => {
    //     setValidInputs(validInputsDefault);
    //     let arr = ['email', 'phone', 'password', 'groupId'];
    //     let checked = true;
    //     for (let i = 0; i < arr.length; i++){
    //         if (!userData[arr[i]]) {
    //             let _validInputs = _.cloneDeep(validInputsDefault);
    //             _validInputs[arr[i]] = false;
    //             setValidInputs(_validInputs);
    //             checked = false;
    //             break;
    //         } 
    //         return checked;
    //     }
    // }
    const handleConfirmUser = async () => {
        //create user
        let check = checkValidInput();
        if (check === true) {
                let response = action === "Create" ? await createNewUser(userData) : await updateUser(userData);
                if (response && +response.EC === 0) {
                    toast.success(response.EM);
                    props.onHide()
                    setUserData({ ...defaultUserData, groupId: userGroups && userGroups.length >0 ? userGroups[0].id : ""});
                    return;
                }
                if (response && response.EC !== 0) {
                    toast.error(response.EM);
                    let _validInputs = _.cloneDeep(validInputsDefault);
                    _validInputs[response.DT] = false;
                    setObjCheckInput(_validInputs);
                }
        }
    }
    const handleCloseModalUser = () => {
        props.onHide();
        setUserData(defaultUserData);
        setObjCheckInput(validInputsDefault);
    }
    return (
        <>
            <Modal size="lg" show={props.show} onHide={()=>{handleCloseModalUser()}} className="modal-user">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                        <span>{ props.action === "Create" ? "Create new user" : "Edit a user"}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="email">Email address (<span className='red'> * </span>) :</label>
                            <input disabled={action === "Create" ? false : true} value={userData.email} onChange={(event)=>handleOnchangeInput(event.target.value,"email")} type="email" id='email' className={objCheckInput.email ? 'form-control' : 'form-control is-invalid'} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="phone">Phone number (<span className='red'> * </span>)</label>
                            <input type="text" disabled={action === "Create" ? false : true} value={userData.phone} onChange={(event)=>handleOnchangeInput(event.target.value,"phone")} id='phone' className={objCheckInput.phone ? 'form-control' : 'form-control is-invalid'} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" value={userData.username} onChange={(event)=>handleOnchangeInput(event.target.value,"username")} id='username' className='form-control' />
                        </div>
                        { action === "Create" &&
                            <>
                                <div className="col-12 col-sm-6 form-group">
                                <label htmlFor="password">Password (<span className='red'> * </span>)</label>
                                <input type="password" value={userData.password} onChange={(event)=>handleOnchangeInput(event.target.value,"password")} id='password' className={objCheckInput.password ? 'form-control' : 'form-control is-invalid'} />
                                </div>
                            </>
                        }
                        
                        <div className="col-12 col-sm-12 form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" value={userData.adress} onChange={(event)=>handleOnchangeInput(event.target.value,"adress")} id='address' className='form-control' />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="">Gender (<span className='red'> * </span>)</label>
                            <select value={userData.gender} className="form-select form-select-md" onChange={(event)=>handleOnchangeInput(event.target.value,"gender")}>
                                <option defaultValue="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="group">Group (<span className='red'> * </span>)</label>
                            <select value={userData.groupId} className={objCheckInput.groupId ? 'form-select' : 'form-select is-invalid'} onChange={(event)=>handleOnchangeInput(event.target.value,"groupId")}>
                                {
                                    userGroups.length > 0 && userGroups.map((item, index) => {
                                        return (
                                            <option value={item.id} key={`group-${index}`}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                </div>
            </Modal.Body>
                <Modal.Footer>
                <Button onClick={()=>handleConfirmUser()}>{action === "Create" ? 'Save' : 'Update'}</Button>
                <Button variant="secondary" onClick={()=>{handleCloseModalUser()}}>Close</Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser