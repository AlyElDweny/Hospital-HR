import React, { Component } from 'react';
import ShowMembers from './ShowMembers';
import AddForm from './addForm';
// import Data from './../../json/doctors';

import { connect } from 'react-redux';
import { getDepdartment } from '../../actions/memberActions';


class DepartmentsNav extends Component {

  getDepdartment = (department) => {
  // let {members} = this.props.member
  //   const members = json.filter(member =>{
  //     return member.department === department
  this.props.getDepdartment(department)
    }
  

  render() {
    return (
      <div className="DepartmentsNav">
      <ul className='mycontainer'>
          <li className='child' onClick = {() => this.getDepdartment('Emergency Medicine')} >Emergency Medicine</li>
          <li className='child' onClick = {() => this.getDepdartment('Neurology')}>Neurology</li>
          <li className='child' onClick = {() => this.getDepdartment('Gynecology')}>Gynecology</li>
          <li className='child' onClick = {() => this.getDepdartment('Surgery')}>Surgery</li>
          <li className='child' onClick = {() => this.getDepdartment('Orthopedics')}>Orthopedics</li>
      </ul>
        <AddForm />
        <ShowMembers/>
      </div>
    );
  }

}

const mapStateToProps =(state) => ({
  member: state.member
})

export default connect(
  mapStateToProps,
{ getDepdartment }
   ) (DepartmentsNav);



