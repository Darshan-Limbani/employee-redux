import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {Avatar, CircularProgress, FormControl, FormGroup, TextField} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import * as React from "react";
import {Fragment, useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {storage} from "../firebase/firebaseConfig";
import CircularProgressWithLabel from "./CircularProgressWithLabel";


// const TableHead = withStyles(theme => ({
//     root: {
//         backgroundColor: 'orange'
//     }
// }))(MuiTableHead);
//
// const TableHeaderCell = withStyles(theme => ({
//     root: {
//         color: 'white'
//     }
// }))(TableCell);


const columns = [
    {
        id: 'first_name',
        label: 'First Name'
    },
    {
        id: 'last_name',
        label: 'Last Name'
    },
    {
        id: 'post',
        label: 'Post'
    },
    {
        id: 'email',
        label: 'Email'
    },
    {
        id: 'mobile',
        label: 'Mobile Number',
        minWidth: 100
    }];
const INITIAL_STATE = {
    profile: "",
    first_name: "",
    last_name: "",
    post: "",
    email: "",
    mobile: ""
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid dark-grey',
    boxShadow: 24,
    p: 5,
    borderRadius: '5px'
};

// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
export default function EmployeeTable({page, length, rowsPerPage, employee, setRowsPerPage, setPage, getEmp}) {

    const [showLoader, setShowLoader] = useState(false);


    const [employeeData, setEmployeeData] = useState(INITIAL_STATE);
    const [percent, setPercent] = useState(0);
    const [profile, setProfile] = useState(null);
    const [disable, setDisable] = useState(false);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    // const [employee, setEmployee] = useState([]);
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(5);
    // const [length, setLength] = useState(0);

    /*async function getEmp() {
        const res = await fetch(`http://localhost:3000/employee?page=${page + 1}&limit=${rowsPerPage}`);
        const data = await res.json();
        if (res.ok) {
            // return {results, data};
            console.log("data from fetch----------------------->", data);
            setEmployee(data.data.employee);
            setLength(data.results);
        } else {
            console.log("RESPONSE : --->", data);
            toast('Something went Wrong....');
        }
    }*/

    // props.fetchEmploye


    /*
        useEffect(() => {

            console.log("USE EFFECT CALLED");

            // getEmp();

            /!* getEmp().then(data => {
                 setLength(props.totalResults ? props.totalResults : data.results);
                 // setLength(data.results);
                 setEmployee(data.data.employee);
             }).catch(err => {
                 console.log("ERROR FETCHING EMPLOYEE : ", err);
             });*!/

        }, [page, rowsPerPage ]);
    */

    // setLength(props.totalResults);

    /*    useCallback(
            () => {
                async function getEmp() {
                    return await API.getAllEmployee(page, rowsPerPage);
                }

                getEmp().then(data => {
                    setLength(data.results);
                    setEmployee(data.data.employee);
                }).catch(err => {
                    console.log("ERROR FETCHING EMPLOYEE : ", err);
                });
            },
            [employee],
        );*/


    const handleChangePage = (event, newPage) => {
        console.log("handleChangePage newPage:", newPage);
        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        console.log("setRowsPerPage newPage:", event.target.value);

        setPage(0);
    };

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        // console.log("FILES : ==========>",event.target.files[0]);
        console.log("FILES : ==========>", URL.createObjectURL(file));
        setProfile(URL.createObjectURL(file));
        setDisable("disabled");

        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `/files/${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
                console.log(percent);
            },
            (err) => toast.error('Something went wrong while uploading Profile Picture!!', {autoClose: 3000}),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log("AVATAR URL : ------------->", url);
                    setDisable(false);
                    setEmployeeData({...employeeData, profile: url});
                });
            }
        );
    };


    const handleUpdateEmployee = async (emp) => {
        // e.preventDefault();
        console.log("DATA........", emp);
        setOpen(true);
        setEmployeeData({
            profile: emp.profile,
            first_name: emp.first_name,
            last_name: emp.last_name,
            post: emp.post,
            email: emp.email,
            mobile: emp.mobile,
            _id: emp._id
        });
        // handleOpen();

    };
    const changeHandler = (e) => {
        const {name, value} = e.target;
        setEmployeeData({...employeeData, [name]: value});
        console.log(employeeData);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3000/employee/${employeeData._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(employeeData)
        });
        const data = await res.json();
        if (res.ok) {
            toast.success("Employee Data Updated Successfully!!", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER
            });
            // console.log(data);
        } else {
            if (data?.error === 11000) {
                console.log("ERROR");
                return toast.error(`${data.message.toLowerCase().includes('email') ? 'Email ID' : 'Mobile Number'} already exists`, {
                    autoClose: 3000,
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
        setOpen(false);

    };


    const handleDeleteEmployee = async (id) => {
        setShowLoader(true);
        const res = await fetch(`http://localhost:3000/employee/${id}`, {
            method: "DELETE"
        });
        // const data = await res.json();
        if (!res.ok) {
            // console.log(data);
            toast.error("Something went wrong!!");
            setShowLoader(false);

        } else {
            setShowLoader(false);
            getEmp();
            toast.success("Employee data deleted successfully!!");
        }

    };

    return (

        <Fragment>

            <Modal
                // aria-labelledby="transition-modal-title"
                // aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="transition-modal-description" sx={{mt: 2}}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>*/}

                        <form onSubmit={handleSubmit}>
                            <div style={{
                                display: "flex",
                                fontSize: "x-large",
                                fontWeight: "bold",
                                color: "ghostwhite",
                                background: "#2e7fce",
                                justifyContent: "center",
                                marginTop: "0px",
                                height: "70px",
                                alignItems: 'center',
                                borderRadius: "5px",
                            }}>
                                Update Employee Details
                            </div>
                            <div style={{
                                border: "1px solid #2e7fce",
                                borderRadius: "5px",
                                marginTop: "8px",
                                padding: "10px 2px"
                            }}>
                                <FormGroup>

                                    <FormControl sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        margin: "5px"
                                    }}
                                    >
                                        <Avatar src={employeeData.profile}
                                                sx={{height: "50px", width: "50px"}}></Avatar>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            sx={{
                                                margin: "5px",
                                                marginLeft: "10px"
                                            }}
                                            disabled={disable}
                                        >
                                            {
                                                percent === 0 ? <p> Change Profile Picture</p> : percent === 100 ?
                                                    <p>Change</p> : <CircularProgressWithLabel value={percent}/>
                                            }
                                            <input

                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={handleUpload}
                                            />
                                        </Button>
                                    </FormControl>

                                    <TextField
                                        id="first_name"
                                        sx={{margin: "5px"}}
                                        required
                                        variant={"outlined"}
                                        name={"first_name"}
                                        label={"First Name"}
                                        value={employeeData.first_name}
                                        onChange={changeHandler}
                                    />

                                    <TextField
                                        id="last_name"
                                        sx={{margin: "5px"}}
                                        required
                                        name={"last_name"}
                                        label={"Last Name"}
                                        value={employeeData.last_name}
                                        onChange={changeHandler}/>

                                    <TextField
                                        id="post"
                                        sx={{margin: "5px"}}
                                        required
                                        name={"post"}
                                        label={"Post"}
                                        value={employeeData.post}
                                        onChange={changeHandler}/>

                                    <TextField
                                        type={'email'}
                                        id="email"
                                        sx={{margin: "5px"}}
                                        required
                                        name={"email"}
                                        label={"Email"}
                                        value={employeeData.email}
                                        onChange={changeHandler}/>

                                    <TextField
                                        id="mobile"
                                        sx={{margin: "5px"}}
                                        required
                                        type={"number"}
                                        minLength={10}
                                        name={"mobile"}
                                        label={"Mobile Number"}
                                        value={employeeData.mobile}
                                        onChange={changeHandler}/>

                                    <Button
                                        id={"submit"}
                                        variant="contained"
                                        sx={{margin: "5px"}}
                                        type="submit">
                                        Submit
                                    </Button>

                                </FormGroup>
                            </div>
                        </form>
                    </Box>
                </Fade>
            </Modal>

            <Paper sx={{width: '80%', overflow: 'hidden'}}>
                <TableContainer sx={{width: '100%', maxHeight: '85vh'}} component={Paper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Profile</TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employee && employee
                                .map((emp, index) => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={index}>
                                            <TableCell>
                                                <Avatar
                                                    src={emp.profile ? emp.profile : ""}>{emp.first_name ? emp.first_name[0] : ""}</Avatar>
                                            </TableCell>

                                            {columns.map((column) => {
                                                const value = emp[column.id];
                                                return (<TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>);
                                            })
                                            }
                                            <TableCell align={"left"}>
                                                <div style={{
                                                    width: "100%",
                                                    alignItems: "center",
                                                    justifyContent: "space-around",
                                                    display: "flex",

                                                }}>
                                                    {showLoader
                                                        ? <CircularProgress/>
                                                        : <DeleteForeverIcon
                                                            onClick={handleDeleteEmployee.bind(null, emp._id)}/>
                                                    }
                                                    <EditIcon onClick={handleUpdateEmployee.bind(null, emp)}/>
                                                </div>
                                            </TableCell>

                                        </TableRow>
                                    );
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

    );
}