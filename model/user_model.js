// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    username:      { type: String, required: true, unique: true },
    password:      { type: String, required: true },
    fullName:      { type: String, required: true, unique: true },
    employeeId:    { type: String, required: true, unique: true },
    telNumber:     { type: String, default: null },
    email:         { type: String, default: null },
    roleName:      { type: String, required: true, default: 'GeneralAdmin' }     // 'GeneralAdmin' or 'DepartmentAdmin' or 'FacultyAdmin'

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);