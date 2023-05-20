async function getAllEmployee(page, limit) {
    const res = await fetch(`http://localhost:3000/employee?page=${page}&limit=${limit}`);
    const {results, data} = await res.json();
    if (res.ok) {
        return {results, data};
    } else {
        alert('Something went Wrong....');
    }
}

async function addEmployee(empData) {
    const res = await fetch(`http://localhost:3000/employee`, {
        method: "POST",
        body: JSON.stringify(empData),
        headers: {
            'content-type': 'application/json'
        }
    });
    if (!res.ok) {
        // if()

        return alert('Something went Wrong....');
    }
    const data = await res.json();
    console.log("Employee Added successfully", data);
    return data.results;
}

module.exports = {getAllEmployee, addEmployee};