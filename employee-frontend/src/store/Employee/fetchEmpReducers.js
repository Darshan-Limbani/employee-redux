import {
    ADD_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_SUCCESS,
    FETCH_EMPLOYEE_FAILURE,
    FETCH_EMPLOYEE_REQUEST,
    FETCH_EMPLOYEE_SUCCESS
} from "./actionTypes";

const initialState = {
    loading: false,
    employees: [],
    results: 0,
    page: 1,
    rowsPerPage: 5,
    error: ''
};

const employeeReducer = (state = initialState, action) => {

    switch (action.type) {

        case FETCH_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FETCH_EMPLOYEE_SUCCESS:
            // console.log("action====>", action);
            // console.log("action====>", action.payload);
            return {
                ...state,
                ...action.payload,
                loading: false,
                error: ''
            };

        case FETCH_EMPLOYEE_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                employees: []
            };
        }
        case ADD_EMPLOYEE_SUCCESS: {
            // employees:
            // state.employees.push(action.payload);
            return {
                ...state,
                loading: false,
                results: state.results + 1,
                error: ''
            };
        }

        case DELETE_EMPLOYEE_SUCCESS: {
            console.log('DELETE SUCCESS', action.payload, state.employees);
            return {
                ...state,
                employees: state.employees.filter(emp => emp._id !== action.payload),
                results: state.results - 1,
                loading: false,
                error: ''
            };
        }

        default:
            return state;

    }

};

export default employeeReducer;