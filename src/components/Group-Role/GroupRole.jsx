import './GroupRole.scss';
import { useState, useEffect } from 'react';
import { fecthGroup } from '../../services/userService';
import { toast } from 'react-toastify';
import {getAllRoles,fetchRoleByGroup,assignRolesToGroup} from "../../services/roleService";
import _ from "lodash"
const GroupRole = () => {

    const [userGroups, setUserGroups] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");
    const [listRoles, setListRoles] = useState([]);
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);
    useEffect(() => {
        getGroups();
        getAllRolesWithGroup();
    }, []);
    const getGroups = async() => {
        let response = await fecthGroup();
        if (response && response.EC === 0) {
            setUserGroups(response.DT);
        } else {
            toast.error(response.EM);
        }
    }
    const getAllRolesWithGroup = async () => {
        let response = await getAllRoles();
        // console.log(response.DT)
        if (response &&+response.EC === 0) {
            setListRoles(response.DT);
        }
    }
    const handleOnchangeGroup = async (value) => {
        setSelectGroup(value)
        if (value) {
            let response = await fetchRoleByGroup(value);
            if (response &&+response.EC === 0) {
                let result = buildDataRolesByGroup(response.DT.Roles, listRoles);
                setAssignRolesByGroup(result);
            }
        }
        
    }
    const buildDataRolesByGroup = (groupRoles,allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0 ) {
            allRoles.map(role => {
                let object = {};
                object.url = role.url;
                object.description = role.description;
                object.id = role.id;
                object.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some(item => item.url === object.url);
                }
                result.push(object);
            })
        }
        return result;
    }
    const handleSelectRole = (value) => {
        // setAssignRolesByGroup()
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value)
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned
            // console.log(_assignRolesByGroup[foundIndex]);
        }
        setAssignRolesByGroup(_assignRolesByGroup);
        
    }
    const buildDataToSave = () => {
        //data = {groupId:'' , groupRoles:[{},{}]} gui len server
        let result = {};
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        result.groupId = selectGroup;
        let groupRolesFilter = _assignRolesByGroup.filter(item => item.isAssigned === true);
        let finalGroupRoles = groupRolesFilter.map(item => {
            let data = {
                groupId: +selectGroup,
                RoleId:+item.id
            }
            return data;
        })
        result.groupRoles = finalGroupRoles;
        return result;
    }
    const handleSave = async() => {
        let data = buildDataToSave();
        // assignRolesToGroup
        let response = await assignRolesToGroup(data);
        if (response && response.EC === 0) {
            toast.success(response.EM);
        } else {
            toast.error(response.EM);
        }
    }
    return (
        <div className='group-role-container'>
            <div className="container">
                <div className="container mt-4">
                    <h4>Group Role</h4>
                    <div>
                        <div className="assign-group-role">
                            <div className="col-12 col-sm-6 form-group">
                                <label htmlFor="group">Select group: (<span className='red'> * </span>)</label>
                                <select className='form-select' onChange={(event)=>handleOnchangeGroup(event.target.value)}>
                                    <option value="">---Select group---</option>

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
                        <hr />
                        {
                            selectGroup && 
                                <div className="roles">
                            <h5>Assign Roles</h5>
                            
                            {
                                assignRolesByGroup && assignRolesByGroup.length > 0 && assignRolesByGroup.map((item, index) => {
                                    return (
                                        <div className="form-check" key={`list-role-${index}`}>
                                            <input className="form-check-input"
                                                type="checkbox" value={item.id}
                                                checked={item.isAssigned}
                                                id={`list-role-${index}`}
                                                onChange={(event)=>handleSelectRole(event.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                {item.url}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        }
                        <div className="mt-3">
                            <button className='btn btn-success' onClick={()=>handleSave()}>Save</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GroupRole;