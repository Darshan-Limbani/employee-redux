const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new mongoose.Schema({
    // e_id: {
    //     type: String,
    //     require: [true, 'Employee ID should be Required']
    // },
    profile: {
        type: String,
        require: [true, 'Please provide a Profile Picture of the Employee!!']
    },
    first_name: {
        type: String,
        require: [true, 'Please provide a first name of the Employee!!']
    },
    last_name: {
        type: String,
        require: [true, 'Please provide a last name the Employee!!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    mobile: {
        type: String,
        maxLength: 10,
        unique: true,
        require: [true, 'Please provide a mobile number of the Employee']
    },
    post: {
        type: String,
        require: [true, 'Please provide a post of the Employee!!']
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;