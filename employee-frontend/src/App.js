import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useEffect, useState} from "react";
import {Provider} from "react-redux";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import EmpTable from "./components/EmpTable";
import Model from "./components/Model";
import store from "./store/store";


function App() {

    const [employee, setEmployee] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [length, setLength] = useState(0);
    const [mode, setMode] = useState('light');

    const darkTheme = createTheme({
        palette: {
            mode: `${mode}`,
        },
    });


    useEffect(() => {
        // getEmp();

        /* getEmp().then(data => {
             setLength(props.totalResults ? props.totalResults : data.results);
             // setLength(data.results);
             setEmployee(data.data.employee);
         }).catch(err => {
             console.log("ERROR FETCHING EMPLOYEE : ", err);
         });*/

    }, [page, rowsPerPage]);

    async function getEmp() {
        const res = await fetch(`http://localhost:3000/employee?page=${page + 1}&limit=${rowsPerPage}`);
        const data = await res.json();
        if (res.ok) {
            // return {results, data};
            console.log("data from fetch----------------------->", data);
            setEmployee(data.data.employee);
            setLength(data.results);
        } else {
            console.log("RESPONSE : --->", data);
            toast.warning('Something went Wrong....', {position: toast.POSITION.TOP_CENTER});
        }
    }

    const handleMode = () => {
        setMode(mode === 'dark' ? 'light' : 'dark');
    };

    return (

        <Provider store={store}>

            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Model/>
                <EmpTable/>
                {/* <div className={'container-center'}>
                    <ToastContainer/>
                    <div className={'container'}>
                        <div className={"btn-emp"}>
                             <Button
                            variant="outlined"
                            color="primary"

                            onClick={handleMode}
                            style={{marginRight: "10px"}}
                        >
                            {mode === 'dark' ? 'Turn light' : 'Turn dark'}
                        </Button>
                            <TransitionsModal getEmp={getEmp}/>
                        </div>
                        <EmployeeForm/>
                        <EmployeeTable
                            employee={employee}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            length={length}
                            setPage={setPage}
                            setRowsPerPage={setRowsPerPage}
                            getEmp={getEmp}/>
                    </div>
                </div>*/}
            </ThemeProvider>
        </Provider>

    );
}

export default App;