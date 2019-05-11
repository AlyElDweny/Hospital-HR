const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    name: String,
    mail: String, 
    phone: Number,
    sex: String, 
    section: String,
    department: String,
    salary: Number,
    level: String,
    rate: Number
});

const Member = mongoose.model('affairs', sectionSchema); // 'allSections' refers to the collection

module.exports = Member