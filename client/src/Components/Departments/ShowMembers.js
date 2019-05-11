import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button,
        Modal,
        ModalHeader,
        ModalBody,
        Form,
        // FormGroup,
        // Label,
        Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getMembers, deleteMember, updateMember } from '../../actions/memberActions'; // , updateMember
import PropTypes from 'prop-types';

class ShowMembers extends Component {
  state ={
    member: {
      _id: '' ,name: '', mail: '', phone: '', sex: '', section: '', department: '', salary: '', level: '', rate: ''
    },
    model: false
  }

  componentDidMount() {
    this.props.getMembers();
  }

  handleChange = (e) => {
      this.setState({
          [e.target.id]: e.target.value
      })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

   handleSubmit = (e) => {
      e.preventDefault();
      if(e.target.name.value === '' || e.target.mail.value === '' || e.target.phone.value === '' || e.target.sex.value === '' || e.target.section.value === '' || e.target.salary.value === '' || e.target.level.value === '' || e.target.rate.value === '' ){
          return false
      } else{

        this.setState({
          member: {
          ...this.state.member,
          name: e.target.name.value,
          mail: e.target.mail.value,
          phone: e.target.phone.value,
          sex: e.target.sex.value,
          section: e.target.section.value,
          department: e.target.department.value,
          salary: e.target.salary.value,
          level: e.target.level.value,
          rate: e.target.rate.value
          }
        }, () => {
          this.props.updateMember(this.state.member);
        })
        this.toggle();    
      }
  }
  componentDidUpdate = () =>{
     console.log(this.state.member);
    }

  onUpdateClick = id => {
   let { members } = this.props.member
   const updatedMember = members.find(member => member._id === id);
    // console.log(updatedMember)
    this.setState(({member}) => ({member: {
      ...member,
      _id: updatedMember._id,
      name: updatedMember.name,
      mail: updatedMember.mail,
      phone: updatedMember.phone,
      sex: updatedMember.sex,
      section: updatedMember.section,
      department: updatedMember.department,
      salary: updatedMember.salary,
      level: updatedMember.level,
      rate: updatedMember.rate
    }})
    );
    this.toggle();
  };

  onDeleteClick = id => {
    this.props.deleteMember(id);
  };

  render() {
   const {members} = this.props.member;
   const {departmentMembers} = this.props.member

  let length = members.length;

    if (length && ! departmentMembers.length) {
      return (
        <div className="ShowMembers">
          <Container>
          <ListGroup>
            <TransitionGroup className=''>
              {members.map(member => (
                <CSSTransition key={member._id} timeout={100} classNames='fade' className='member'>
                  <ListGroupItem >
                    <span>{member.name}</span>
                    <span>{member.mail}</span>
                    <span>{member.phone}</span>
                    <span>{member.sex}</span>
                    <span>{member.section}</span>
                    <span>{member.department}</span>
                    <span>{member.salary}</span>
                    <span>{member.level}</span>
                    <span>{member.rate}</span>
                   {
                    member._id && <Button
                                       className='remove-btn'
                                       color='success' size='sm' 
                                        onClick={() => this.onUpdateClick(member._id)}
                                     // onClick={this.onUpdateClick.bind(this, member._id)}
                                    >Update Doctor</Button>
                  }
                    {
                    member._id && <Button
                                       className='remove-btn'
                                       color='danger' size='sm' 
                                        onClick={() => {
                                          this.onDeleteClick(member._id)
                                          }}
                                     // onClick={this.onDeleteClick.bind(this, member._id)}
                                    >Delete Doctor</Button>
                  }
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Update Member...</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>

            <Input className='addFormInput' type="text" placeholder="Enter name... " id="name" onChange={this.handleChange} defaultValue={this.state.member.name} />
            <Input className='addFormInput' type="mail" placeholder="Enter mail... " id="mail" onChange={this.handleChange} defaultValue={this.state.member.mail}  />
            <Input className='addFormInput' type="number" placeholder="Enter phone... " id="phone" onChange={this.handleChange} defaultValue={this.state.member.phone}  />
            <Input className='addFormInput' type="text" placeholder="Enter sex... " id="sex" onChange={this.handleChange} defaultValue={this.state.member.sex}  />
            <Input className='addFormInput' type="text" placeholder="Enter section... " id="section" onChange={this.handleChange} defaultValue={this.state.member.section}  />
            <Input className='addFormInput' type="text" placeholder="Enter department... " id="department" onChange={this.handleChange} defaultValue={this.state.member.department}  />
            <Input className='addFormInput' type="number" placeholder="Enter salary... " id="salary" onChange={this.handleChange} defaultValue={this.state.member.salary}  />
            <Input className='addFormInput' type="text" placeholder="Enter level... " id="level" onChange={this.handleChange} defaultValue={this.state.member.level}  />
            <Input className='addFormInput' type="number" placeholder="Enter rate... " id="rate" onChange={this.handleChange} defaultValue={this.state.member.rate}  />
            <Input className='addFormInput' type="submit" value="Upate" />
            </Form>
          </ModalBody>
        </Modal>
        </div>
      )} else if (departmentMembers.length && length) {
        return(
<div className="ShowMembers">
          <Container>
          <ListGroup>
            <TransitionGroup className=''>
              {departmentMembers.map(member => (
                <CSSTransition key={member._id} timeout={100} classNames='fade' className='member'>
                  <ListGroupItem >
                    <span>{member.name}</span>
                    <span>{member.mail}</span>
                    <span>{member.phone}</span>
                    <span>{member.sex}</span>
                    <span>{member.section}</span>
                    <span>{member.department}</span>
                    <span>{member.salary}</span>
                    <span>{member.level}</span>
                    <span>{member.rate}</span>
                  {
                    member._id && <Button
                                       className='remove-btn'
                                       color='success' size='sm' 
                                        onClick={() => this.onUpdateClick(member._id)}
                                     // onClick={this.onUpdateClick.bind(this, member._id)}
                                    >Update Doctor</Button>
                  }
                    {
                    member._id && <Button
                                       className='remove-btn'
                                       color='danger' size='sm' 
                                        onClick={() => this.onDeleteClick(member._id)}
                                     // onClick={this.onDeleteClick.bind(this, member._id)}
                                    >Delete Doctor</Button>
                  }
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Update Member...</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>

            <Input className='addFormInput' type="text" placeholder="Enter name... " id="name" onChange={this.handleChange} defaultValue={this.state.member.name} />
            <Input className='addFormInput' type="mail" placeholder="Enter mail... " id="mail" onChange={this.handleChange} defaultValue={this.state.member.mail}  />
            <Input className='addFormInput' type="number" placeholder="Enter phone... " id="phone" onChange={this.handleChange} defaultValue={this.state.member.phone}  />
            <Input className='addFormInput' type="text" placeholder="Enter sex... " id="sex" onChange={this.handleChange} defaultValue={this.state.member.sex}  />
            <Input className='addFormInput' type="text" placeholder="Enter section... " id="section" onChange={this.handleChange} defaultValue={this.state.member.section}  />
            <Input className='addFormInput' type="text" placeholder="Enter department... " id="department" onChange={this.handleChange} defaultValue={this.state.member.department}  />
            <Input className='addFormInput' type="number" placeholder="Enter salary... " id="salary" onChange={this.handleChange} defaultValue={this.state.member.salary}  />
            <Input className='addFormInput' type="text" placeholder="Enter level... " id="level" onChange={this.handleChange} defaultValue={this.state.member.level}  />
            <Input className='addFormInput' type="number" placeholder="Enter rate... " id="rate" onChange={this.handleChange} defaultValue={this.state.member.rate}  />
            <Input className='addFormInput' type="submit" value="Upate" />
            </Form>
          </ModalBody>
        </Modal>
        </div>
        )
      }else {
        return(
          <p className='noMember'>There is no doctor yet...</p>
        )
      }
    
  }
};


  ShowMembers.propTypes = {
    getMembers: PropTypes.func.isRequired,
    member: PropTypes.object.isRequired
  };
  
  const mapStateToProps =(state) => ({
    member: state.member
  })
  
  export default connect(
    mapStateToProps,
     { getMembers, deleteMember, updateMember } //
     ) (ShowMembers);


