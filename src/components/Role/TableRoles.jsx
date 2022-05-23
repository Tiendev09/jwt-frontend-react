import { useState,useEffect } from "react"
import { fetchAllRole, deleteRole } from "../../services/roleService";
import { toast } from "react-toastify";
import ReactPaginate from 'react-paginate';


// cach 2 truyen function tu con len cha sd forwardRef
const TableRoles = (props) => {
    // const [listRoles, setListRoles] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [currentLimit, setCurrentLimit] = useState(3);
    // const [totalPages, setTotalPages] = useState(0);
    // const handlePageClick = (event) => {
    //     setCurrentPage(event.selected + 1);
    //     // fetchAllUser(event.selected + 1);
    // };

    // useEffect(() => {
    //     fetchRoles(); 
    // }, [currentPage])
    // const fetchRoles = async () => {
    //     let response = await fetchAllRole(currentPage, currentLimit);
    //     if (response &&+response.EC === 0) {
    //         setTotalPages(response.DT.totalPages);
    //         setListRoles(response.DT.roles);
    //     }
    // }
    
    // const handleDeleteRole = async(role) => {
    //     let data = await deleteRole(role);
    //     if (data && +data.EC === 0) {
    //         toast.success(data.EM);
    //         await fetchRoles();
    //     }
    // }
    return (
        <>
        <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">URL</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.listRoles && props.listRoles.length > 0 ?
                            <>
                                {
                                    props.listRoles.map((item, index) => {

                                        return (
                                                <tr key={`row-${index}`}>
                                                <td>{(props.currentPage-1) * props.currentLimit + index+1}</td>
                                                <td>{item.url}</td>
                                                <td>{item.description}</td>
                                                <td>
                                                    <button className="btn btn-warning mx-3" title="Edit"><i className="fa-solid fa-pen-to-square"></i></button>
                                                    <button className="btn btn-danger" title="Delete" onClick={()=>props.handleDeleteRole(item)}><i className="fa-solid fa-trash"></i></button>
                                                </td>    
                                                </tr>
                                        )
                                    })
                            }
                            </>
                            : 
                            <>
                            <tr><td colSpan={4}>Not found roles</td></tr>
                            </>
                        }
                        
                    </tbody>
            </table>
            {
                    props.totalPages > 0 &&
                    <div className="user-footer">
                        <ReactPaginate
                        nextLabel="next >"
                        onPageChange={props.handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={props.totalPages}
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
        </>
    )
}
export default TableRoles;