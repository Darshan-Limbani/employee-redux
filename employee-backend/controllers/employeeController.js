const Employee = require('./../models/employeeModel');

const getTotal = async () => {
    return Employee.countDocuments({});
};

exports.getAllEmployees = async (req, res) => {

    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;
        // console.log("QUERY STRING -->", req.query);

        const employee = await Employee.find({}).skip(skip).limit(limit);
        return res.status(200).json({
            status: 'success', results: await getTotal(), data: {
                employee
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: 'failed', error: err.code, message: err.message, stack: err.stack

        });
    }
};

exports.addEmployee = async (req, res) => {

    console.log("Employee DATA : ", req.body);


    try {
        const employee = await Employee.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: employee
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed',

            error: err.code, message: err.message, stack: err.stack

        });
    }
};

exports.deleteEmployee = async (req, res) => {

    console.log(req);
    const empId = req.params.id;
    await Employee.findByIdAndDelete(empId);
    try {
        res.status(204).json({});
    } catch (err) {
        res.status(400).json({
            status: 'failed', error: err.code, message: err.message, stack: err.stack
        });
    }
};


exports.updateEmployee = async (req, res) => {

    try {
        const empId = req.params.id;
        const employee = await Employee.findByIdAndUpdate(empId, req.body, {runValidators: true, new: true});
        res.status(200).json({
            status: 'success',
            data: {
                data: employee
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed', error: err.code, message: err.message, stack: err.stack
        });
    }

};