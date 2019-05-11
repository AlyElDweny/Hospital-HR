const Joi = require('joi');

function validateMember(member) {
    const schema = {
      name: Joi.string().min(3).required(),
      mail: Joi.string().email({ minDomainAtoms: 2 }),
      phone: Joi.number().min(3).required(),
      sex: Joi.string().min(3).required(),
      section: Joi.string().min(3).required(),
      department: Joi.string().min(3).required(),
      salary: Joi.number().min(3).required(),
      level: Joi.string().min(3).required(),
      rate: Joi.number().min(3).required(),
    };
  
    return Joi.validate(member, schema);
  }

  module.exports = validateMember;