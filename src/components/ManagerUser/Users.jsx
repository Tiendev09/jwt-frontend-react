
import { useEffect,useState } from "react";
import { deleteUser, fetchAllUser } from "../../services/userService";
import "./Users.scss";
import ReactPaginate from 'react-paginate';
import { toast, Toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    //dataModal delete
    const [dataModal, setDataModal] = useState({});
    const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
    const [action, setAction] = useState("Create");
    //dataModal update/create user
    const [dataModalUser, setDataModalUser] = useState({});
    useEffect(() => {
        fetchUsers();
    }, [currentPage]);
    const fetchUsers = async() => {
        let response = await fetchAllUser(currentPage, currentLimit);
        console.log(">>check response", response);
        if (response &&+response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListUsers(response.DT.users);
        }
    }
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        // fetchAllUser(event.selected + 1);
    };
    const handleDeleteUser = async (user) => {
        setIsShowModalDelete(true);
        setDataModal(user);
    }
    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({});
    }
    const confirmDeleteUser = async() => {
        let response = await deleteUser(dataModal);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    }
    const onHideModalUser = async() => {
        setIsShowModalCreateUser(false);
        setDataModalUser({});
        await fetchUsers();
    }
    const handleEditUser = (user) => {
        console.log(user);
        setAction("Update")
        setIsShowModalCreateUser(true);
        setDataModalUser(user);
    }
    const handleRefresh = async() => {
        await fetchUsers();
    }
    return (
        <>
            <div className="container">
        <div className="manager-users-container">
            <div className="user-header">
                <div className="title mt-3">
                        <h3>Manage user</h3>
                </div>
                <div className="action my-3">
                    <button className="btn btn-success refresh" onClick={()=>handleRefresh()}>
                        <i className="fa-solid fa-arrows-rotate"></i> Refresh
                    </button>
                            <button className="btn btn-primary" onClick={() => { setIsShowModalCreateUser(true); setAction("Create"); } }>
                        <i className="fa-solid fa-circle-plus"></i> Add new user
                    </button>
                </div>
            </div>
            <div className="user-body">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Email</th>
                            <th scope="col">Username</th>
                            <th scope="col">Group</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers && listUsers.length > 0 ?
                            <>
                                {
                                    listUsers.map((item, index) => {

                                        return (
                                                <tr key={`row-${index}`}>
                                                <td>{(currentPage-1) * currentLimit + index+1}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                                <td>
                                                    <button className="btn btn-warning mx-3" title="Edit" onClick={()=>handleEditUser(item)}><i className="fa-solid fa-pen-to-square"></i></button>
                                                    <button className="btn btn-danger" title="Delete" onClick={()=>handleDeleteUser(item)}><i className="fa-solid fa-trash"></i></button>
                                                </td>    
                                                </tr>
                                        )
                                    })
                            }
                            </>
                            : 
                            <>
                            <tr><td>Not found user</td></tr>
                            </>
                        }
                        
                    </tbody>
                </table>
                </div>
                {
                    totalPages > 0 &&
                    <div className="user-footer">
                        <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        />
                    </div>
                }
            
        </div>
            </div>
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                onHide={onHideModalUser}
                show={isShowModalCreateUser}
                action={action}
                dataModalUser={dataModalUser}
            />
        </>    
    )
}
export default Users;