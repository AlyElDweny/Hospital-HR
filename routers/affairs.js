const express = require('express');
const router = express.Router();
const validateMember = require('./validateMember');

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
const Member = require('../models/affairsModel')

// Get sections
  router.get('/', (req, res) => {
  //  res.send(members);
    Member.find()
      .then(members => res.json(members));
  });
// Get one member by his id
  router.get('/:id', (req, res) => {
    const member = members.findById(req.params.id)
       .then(member => res.json(member));
    if (!member) return res.status(404).send('The member with the given ID was not  found...');
    
});

// post new member
    router.post('/', (req, res) => {
      //  const { error } = validateMember(req.body); // = result.error بس اختصارا يعنى
      //   if (error) return res.status(400).send(error.details[0].message);
    
      //   const member = {
      //   id: members.length + 1,
      //   name: req.body.name,
      //   mail: req.body.mail,
      //   phone: req.body.phone,
      //   sex: req.body.sex,
      //   section: req.body.section,
      //   sec: req.body.sec,
      //   salary: req.body.salary,
      //   level: req.body.level,
      //   rate: req.body.rate
      //   };
      //   members.push(member);
      //   res.send(member);
      const newMember = new Member({
        name: req.body.name,
          mail: req.body.mail,
          phone: req.body.phone,
          sex: req.body.sex,
          section: req.body.section,
          salary: req.body.salary,
          level: req.body.level,
          rate: req.body.rate
      })
      newMember.save()
        .then(member => res.json(member))
    });

// put (update) member
router.put('/:id', (req, res) => {
    const member = members.find(m => m.id === parseInt(req.params.id));
    if (!member) return res.status(404).send('The member with the given ID was not found...');
  
    const { error } = validateMember(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
     member.name = req.body.name;
     member.mail= req.body.mail;
     member.phone= req.body.phone;
     member.sex= req.body.sex;
     member.section= req.body.section;
     member.sec= req.body.sec;
     member.salary= req.body.salary;
     member.level= req.body.level;
     member.rate= req.body.rate;

    res.send(member);
  });

// Delete a member
// router.delete('/:id', (req, res) => {
//     const member = members.find(m => m.id === parseInt(req.params.id));
//     if (!member) return res.status(404).send('The member with the given ID was not found...');

//     const index = members.indexOf(member);
//     members.splice(index, 1);

//     res.send(member);
// });
router.delete('/:id', (req, res) => {
  Member.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


  module.exports = router;