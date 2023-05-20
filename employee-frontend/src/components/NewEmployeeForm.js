import {Avatar, FormControl, FormGroup, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import React, {useState} from 'react';
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {storage} from "../firebase/firebaseConfig";
import {addEmployee} from "../store/Employee/actions";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

const INITIAL_STATE = {
    profile: "",
    first_name: "",
    last_name: "",
    post: "",
    email: "",
    mobile: ""
};

function NewEmployeeForm({addEmployee}) {

    const [percent, setPercent] = useState(0);
    const [employeeData, setEmployeeData] = useState(INITIAL_STATE);
    const [profile, setProfile] = useState(null);
    const [disable, setDisable] = useState(false);
    const [change, setChange] = useState(false);


    const changeHandler = (e) => {
        const {name, value} = e.target;
        setEmployeeData({...employeeData, [name]: value});
        console.log(employeeData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("handlesubmit called...", employeeData);
        addEmployee(employeeData);

    };

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        // console.log("FILES : ==========>",event.target.files[0]);
        console.log("FILES : ==========>", URL.createObjectURL(file));
        setProfile(URL.createObjectURL(file));
        setDisable(true);

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
                    setChange(true);
                    setEmployeeData({...employeeData, profile: url});
                });
            }
        );
    };


    return (
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
                Add Employee
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
                        <Avatar src={profile} sx={{height: "50px", width: "50px"}}></Avatar>
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
                                percent === 0 ? !change ? <p>Add Profile Picture</p> :
                                    <CircularProgressWithLabel value={percent}/> : percent === 100 ?
                                    <p>Change</p> : <CircularProgressWithLabel value={percent}/>
                            }
                            <input
                                required
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
    );
}


const mapStateToProps = (state) => {
};

const mapDispatchToProps = (dispatch) => {

    return {
        addEmployee: (employeeData) => dispatch(addEmployee(employeeData))
    };

};

export default connect(null, mapDispatchToProps)(NewEmployeeForm);