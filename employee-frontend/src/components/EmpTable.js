import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {Avatar} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, {Fragment, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {deleteEmployee, getEmployees} from "../store/Employee/actions";

const columns = [{
    id: 'first_name', label: 'First Name'
}, {
    id: 'last_name', label: 'Last Name'
}, {
    id: 'post', label: 'Post'
}, {
    id: 'email', label: 'Email'
}, {
    id: 'mobile', label: 'Mobile Number', minWidth: 100
}];


function EmpTable({employeesData, getEmployees, deleteEmployee, handlePagination}) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [length, setLength] = useState(0);

    // const [showLoader, setShowLoader] = useState(false);
    // const [employeeData, setEmployeeData] = useState(INITIAL_STATE);
    // const [percent, setPercent] = useState(0);
    // const [profile, setProfile] = useState(null);
    // const [disable, setDisable] = useState(false);
    //
    // const [open, setOpen] = React.useState(false);
    //
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const handleChangePage = (event, newPage) => {
        console.log("handleChangePage newPage:", newPage);
        setPage(newPage);
        handlePagination(page, rowsPerPage);

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        console.log("setRowsPerPage newPage:", event.target.value);
        setPage(0);
        handlePagination(page, rowsPerPage);
    
    };


    useEffect(() => {
        getEmployees();
    }, []);
    // console.log("employeesData----------->", employeesData.employees.data.employee);
    // setTimeout(() => {

    useEffect(() => {
        setLength(employeesData.results);
    }, [employeesData.results]);


    //
    console.log("EMPLOYEE---------------------->", employeesData);
    //
    // }, 5000);

    // const employee = useSelector((state) => state.employee.employees);
    //
    // console.log(employee);
    // setLength(employee.length);


    const handleDeleteEmployee = (id) => {
        console.log("handleDeleteEmployee --->", id);
        deleteEmployee(id);
    };

    const handleUpdateEmployee = (emp) => {
        console.log("handleUpdateEmployee", emp);
    };

    return (

        employeesData.loading
            ? <h2>Loading...</h2>
            : employeesData.error
                ? <h2>{employeesData.error}</h2>
                :
                (
                    <Fragment>
                        <Paper sx={{width: '80%', overflow: 'hidden'}}>
                            <TableContainer sx={{width: '100%', maxHeight: '85vh'}} component={Paper}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Profile</TableCell>
                                            {columns.map((column) => (<TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth}}
                                            >
                                                {column.label}
                                            </TableCell>))}
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {employeesData.employees && employeesData.employees
                                            .map((emp, index) => {
                                                return (<TableRow hover tabIndex={-1} key={index}>
                                                    <TableCell>
                                                        <Avatar
                                                            src={emp.profile ? emp.profile : ""}>{emp.first_name ? emp.first_name[0] : ""}</Avatar>
                                                    </TableCell>

                                                    {columns.map((column) => {
                                                        const value = emp[column.id];
                                                        return (<TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>);
                                                    })}
                                                    <TableCell align={"left"}>
                                                        <div style={{
                                                            width: "100%",
                                                            alignItems: "center",
                                                            justifyContent: "space-around",
                                                            display: "flex",

                                                        }}>

                                                            <DeleteForeverIcon
                                                                onClick={handleDeleteEmployee.bind(null, emp._id)}/>

                                                            <EditIcon onClick={handleUpdateEmployee.bind(null, emp)}/>
                                                        </div>
                                                    </TableCell>

                                                </TableRow>);
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 25, 50]}
                                component="div"
                                count={length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                // sx={{bottom: "0", position: "fixed"}}
                            />
                        </Paper>

                    </Fragment>
                )
    );
}

const mapStateToProps = (state) => {
    return {
        employeesData: state.employee
    };

};

const mapDispatchToProps = (dispatch) => {
    return {
        getEmployees: () => dispatch(getEmployees()),
        deleteEmployee: (id) => dispatch(deleteEmployee(id)),
        handlePagination: (page, rowsPerPage) => dispatch(getEmployees(page, rowsPerPage))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(EmpTable);