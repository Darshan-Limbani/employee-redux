import axios from "axios";
import {
    ADD_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_FAILURE,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS,
    FETCH_EMPLOYEE_FAILURE,
    FETCH_EMPLOYEE_REQUEST,
    FETCH_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_FAILURE,
    UPDATE_EMPLOYEE_REQUEST,
    UPDATE_EMPLOYEE_SUCCESS
} from "./actionTypes";

export const fetchEmployeeRequest = () => {

    return {
        type: FETCH_EMPLOYEE_REQUEST
    };
};
export const fetchEmployeeSuccess = (employeeData) => {
    console.log(employeeData);
    return {
        type: FETCH_EMPLOYEE_SUCCESS,
        payload: employeeData
    };
};

export const fetchEmployeeError = (error) => {

    return {
        type: FETCH_EMPLOYEE_FAILURE,
        payload: error
    };
};


// ------------------------------------------------------------------------------
//                               DELETE EMPLOYEE
// ------------------------------------------------------------------------------


export const deleteEmployeeRequest = () => {
    console.log("REQUEST FOR DELETE...........");

    return {
        type: DELETE_EMPLOYEE_REQUEST
    };
};


export const deleteEmployeeSuccess = (id) => {
    return {
        type: DELETE_EMPLOYEE_SUCCESS,
        payload: id
    };

};

export const deleteEmployeeFailure = (error) => {

    return {
        type: DELETE_EMPLOYEE_FAILURE,
        payload: error
    };
};


export const updateEmployeeRequest = () => {
    console.log("REQUEST FOR DELETE...........");

    return {
        type: UPDATE_EMPLOYEE_REQUEST
    };
};


export const updateEmployeeSuccess = (employeeData) => {
    return {
        type: UPDATE_EMPLOYEE_SUCCESS,
        payload: employeeData
    };

};

export const updateEmployeeFailure = (error) => {

    return {
        type: UPDATE_EMPLOYEE_FAILURE,
        payload: error
    };
};


export const addEmployeeSuccess = (employeeData) => {
    return {
        type: ADD_EMPLOYEE_SUCCESS,
        payload: employeeData
    };
};


// const page = 0;
// const rowsPerPage = 5;

export function getEmployees(page = 0, rowsPerPage = 5) {

    console.log("getEmployees called............");
    return function (dispatch) {
        dispatch(fetchEmployeeRequest());

        axios.get(`http://localhost:3000/employee?page=${page + 1}&limit=${rowsPerPage}`)
            .then(response => {

                const {results, data} = response.data;
                console.log("GET EMPLOYEE : ", results, data);
                dispatch(fetchEmployeeSuccess({results, employees: data.employee}));

            })
            .catch(err => {

                dispatch(fetchEmployeeError(err.message));

            });
    };
}


export function deleteEmployee(id) {

    return function (dispatch) {

        dispatch(deleteEmployeeRequest());
        axios.delete(`http://localhost:3000/employee/${id}`)
            .then(response => {
                dispatch(deleteEmployeeSuccess(id));
            })
            .catch(error => {
                dispatch(deleteEmployeeFailure(error.message));
            });

        // setShowLoader(true);
        //     const res = await fetch(`http://localhost:3000/employee/${id}`, {
        //         method: "DELETE"
        //     });
        //     // const data = await res.json();
        //     if (!res.ok) {
        //         // console.log(data);
        //         toast.error("Something went wrong!!");
        //         // setShowLoader(false);
        //
        //     } else {
        //         // setShowLoader(false);
        //         // getEmp();
        //         toast.success("Employee data deleted successfully!!");
        //     }
        // };
    };
}

export function updateEmployee(employeeData) {
    return function (dispatch) {

        dispatch(updateEmployeeRequest());

        axios.patch(`http://localhost:3000/employee/${employeeData._id}`, JSON.stringify(employeeData))
            .then(response => {
                dispatch(updateEmployeeSuccess(employeeData));
            })
            .catch(error => {
                dispatch(updateEmployeeFailure(error.message));
            });

        /* const res = await fetch(`http://localhost:3000/employee/${employeeData._id}`, {
             method: "PATCH",
             headers: {
                 'Content-Type': "application/json"
             },
             body: JSON.stringify(employeeData)
         });*/
    };
}


export function addEmployee(employeeData) {
    return function (dispatch) {

        // dispatch()
        console.log("add Employee Called......", employeeData);

        axios.post(`http://localhost:3000/employee`, employeeData)
            .then(response => {
                const {data} = response;
                console.log("NEW EMPLOYEE :", data.data.data);
                dispatch(addEmployeeSuccess(data));
            })
            .catch(error => {
                console.log(error);
                // dispatch();
            });

    };
}