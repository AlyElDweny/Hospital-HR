const express = require('express');
const router = express.Router();
const validateMember = require('./validateMember');
const auth = require('../middleWareFuncs/auth');

// members = [
//     {id: 1 ,name: 'ALy', mail: 'aly@g.com', phone: 12345, sex: 'Male', section: 'services', sec: 'security', salary: 5000, level: 'chef', rate: 9 },
//     {id: 3 ,name: 'Bahy', mail: 'ss@g.com', phone: 13245, sex: 'Male', section: 'services', sec: 'Gynecology', salary: 5000, level: 'chef', rate: 9 },
//     {id: 5 ,name: 'Abdo', mail: 'sc@g.com', phone: 56345, sex: 'Male', section: 'services', sec: 'Neurology', salary: 5000, level: 'chef', rate: 9 },
//     {id: 67 ,name: 'ALy', mail: 'aly@g.com', phone: 12345, sex: 'Male', section: 'services', sec: 'Emergency Medicine', salary: 5000, level: 'chef', rate: 9 },
//     {id: 44 ,name: 'Bahy', mail: 'ss@g.com', phone: 13245, sex: 'Male', section: 'services', sec: 'Gynecology', salary: 5000, level: 'chef', rate: 9 },
//     {id: 54 ,name: 'Abdo', mail: 'sc@g.com', phone: 56345, sex: 'Male', section: 'services', sec: 'Gynecology', salary: 5000, level: 'chef', rate: 9 },
//     {id: 11 ,name: 'ALy', mail: 'aly@g.com', phone: 12345, sex: 'Male', section: 'services', sec: 'Emergency Medicine', salary: 5000, level: 'chef', rate: 9 },
//     {id: 21 ,name: 'Ahmed', mail: 'ahmed@g.com', phone: 12378, sex: 'Male', section: 'services', sec: 'Neurology', salary: 5000, level: 'chef', rate: 9 },
//     {id: 31 ,name: 'Bahy', mail: 'ss@g.com', phone: 13245, sex: 'Male', section: 'services', sec: 'Neurology', salary: 5000, level: 'chef', rate: 9 },
//     {id: 41 ,name: 'Islam', mail: 'fg@g.com', phone: 17845, sex: 'Male', section: 'services', sec: 'Gynecology', salary: 5000, level: 'chef', rate: 9 },
//     {id: 51 ,name: 'Abdo', mail: 'sc@g.com', phone: 56345, sex: 'Male', section: 'services', sec: 'Gynecology', salary: 5000, level: 'chef', rate: 9 },
//     {id: 61 ,name: 'Mohamed', mail: 'xx@g.com', phone: 44345, sex: 'Male', section: 'services', sec: 'Gynecology', salary: 5000, level: 'chef', rate: 9 }
//   ];
const Member = require('../models/departmentsModel')

// Get sections
  router.get('/', auth, (req, res) => {
  //  res.send(members);
    Member.find()
      .then(members => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
         res.json(members)})
      .catch(err => console.log('api get error...'+ err))
  });
// Get one member by his id
//   router.get('/:id', auth, (req, res) => {
//     const member = members.findById(req.params.id)
//        .then(member => res.json(member));
//     if (!member) return res.status(404).send('The member with the given ID was not  found...');
    
// });

// post new member
    router.post('/', auth, (req, res) => {
      
      const newMember = new Member({
          name: req.body.name,
          mail: req.body.mail,
          phone: req.body.phone,
          sex: req.body.sex,
          section: req.body.section,
          department: req.body.department,
          salary: req.body.salary,
          level: req.body.level,
          rate: req.body.rate
      })
      newMember.save()
      .then(members => {
         res.json(members)})
    });

// put (update) member

router.put('/:id', auth, (req, res) => {
  Member.findById(req.params.id, (err, member) =>{
    console.log(member);
          member.name = req.body.name;
          member.mail = req.body.mail;
          member.phone = req.body.phone;
          member.sex = req.body.sex;
          member.section = req.body.section;
          member.department= req.body.department,
          member.salary = req.body.salary;
          member.level = req.body.level;
          member.rate = req.body.rate;
          member.save()
            .then(members => {res.json(members)})
            .catch(err => res.status(404).json({ success: false }));
      })
    });

router.delete('/:id', auth, (req, res) => {
  Member.findById(req.params.id)
    .then(member =>{
      member.remove()
        .then(() => {
          res.json({ success: true })
        })
    })
    .catch(err => res.status(404).json({ success: false }));
});


  module.exports = router;