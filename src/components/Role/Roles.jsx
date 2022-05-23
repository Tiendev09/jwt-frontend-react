import './Role.scss';
import { useState,useEffect } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createRoles } from '../../services/roleService';
import TableRoles from './TableRoles';
import { fetchAllRole, deleteRole } from "../../services/roleService";
const Roles = (props) => {
    
    const dataChildDefault = {
            url: '',
            description: '',
            isValidUrl:true
    }
    //c1 truyền dữ liệu từ cha xuống con
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [listRoles, setListRoles] = useState([]);
    useEffect(() => {
        fetchRoles(); 
    }, [currentPage])
    const fetchRoles = async () => {
        let response = await fetchAllRole(currentPage, currentLimit);
        if (response &&+response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListRoles(response.DT.roles);
        }
    }
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        // fetchAllUser(event.selected + 1);
    };
    const handleDeleteRole = async(role) => {
        let data = await deleteRole(role);
        if (data && +data.EC === 0) {
            toast.success(data.EM);
            await fetchRoles();
        }
    }


    const [listChilds, setListChilds] = useState({
        child1: dataChildDefault
    });
    const handleOnchangeInput = (name, value, key)=>{
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        if (value && name === 'url') {
        _listChilds[key]['isValidUrl'] = true;
        }
        setListChilds(_listChilds);
    }
    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = dataChildDefault
        setListChilds(_listChilds);
    }
    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    }
    const buildDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];
        Object.entries(listChilds).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description
            })
        })
        return result;
    }
    const handleSave = async() => {
        // console.log(listChilds);
        let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
            return child && !child.url;
        })
        if (!invalidObj) {
            //call api
            let data = buildDataToPersist();
            let response = await createRoles(data);
            if (response && response.EC === 0) {
                toast.success(response.EM);
                // setListChilds(dataChildDefault);
                await fetchRoles();
            }
        } else {
            //error
            let _listChilds = _.cloneDeep(listChilds);
            const key = invalidObj[0];
            _listChilds[key]['isValidUrl'] = false;
            setListChilds(_listChilds);
            toast.error("Input URL must not be empty ...")
        }
    }
    return (
        <>
            <div className="roles-container">
                <div className="container">
                    <div className="adding-roles mt-3">
                        <div className="title-role">
                            <h4>
                                Add a new roles
                            </h4>
                        </div>
                        <div className="role-parent">
                            {
                                Object.entries(listChilds).map(([key, child],index) => {
                                    return (
                                        
                                            <div className="role-children row" key={`children-${key}`}>
                                                    <div className={`col-5 form-group ${key}`}>
                                                    <label htmlFor="url">URL</label>
                                                    <input type="text" id='url' className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'} value={child.url} onChange={(event) =>handleOnchangeInput('url', event.target.value, key) } />
                                                </div>
                                                <div className="col-5 form-group">
                                                    <label htmlFor="desc">Description</label>
                                                    <input type="text" id='desc' className='form-control' value={child.description} onChange={(event)=>handleOnchangeInput('description',event.target.value,key)} />
                                                </div>
                                                <div className="col-2 mt-4">
                                                    <button className='btn btn-primary' onClick={()=>handleAddNewInput()}>
                                                        <i className="fa-solid fa-plus add"></i>
                                                </button>
                                                {
                                                    index >= 1 &&
                                                    <button className='btn btn-danger delete' onClick={()=>handleDeleteInput(key)}><i className="fa-solid fa-trash"></i></button>
                                                    
                                                }
                                                </div>
                                            </div>
                                        
                            )
                            }) 
                            }
                            
                            <div>
                                <button className='btn btn-success mt-4' onClick={()=>handleSave()}>Save</button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="mt-3">
                        <h4>List current roles</h4>
                        <TableRoles
                            currentPage={currentPage}
                            currentLimit={currentLimit}
                            totalPages={totalPages}
                            handlePageClick={handlePageClick}
                            listRoles={listRoles}
                            handleDeleteRole={handleDeleteRole}
                        />
                    </div>
                
                </div>
            </div>
        </>
    )
}
export default Roles;