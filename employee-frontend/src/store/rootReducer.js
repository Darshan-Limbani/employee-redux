import {combineReducers} from "redux";
import employeeReducer from "./Employee/fetchEmpReducers";

const rootReducer = combineReducers({
    employee: employeeReducer
});

export default rootReducer;