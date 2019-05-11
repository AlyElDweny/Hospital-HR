import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  // FormGroup,
  // Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addMember } from '../../actions/memberActions';


class AddForm extends Component {
    state ={
      _id: '' ,name: '', mail: '', phone: '', sex: '', section: '', department: '', salary: '', level: '', rate: ''
      ,model: false
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
        if(e.target.name.value === '' || e.target.mail.value === '' || e.target.phone.value === '' || e.target.sex.value === '' || e.target.section.value === '' || e.target.department.value === '' || e.target.salary.value === '' || e.target.level.value === '' || e.target.rate.value === '' ){
            return false
        } else{
          const newMember = {
            name: this.state.name,
            mail: this.state.mail,
            phone: this.state.phone,
            sex: this.state.sex,
            section: this.state.section,
            deparment: this.state.department,
            salary: this.state.salary,
            level: this.state.level,
            rate: this.state.rate
          }
            this.props.addMember(newMember);
        this.toggle();
        }
    }
  render() {
    return (
      <div className="AddFormCon">
      <div className='buttonWrapper'>
          <Button
              color='dark'
              style={{ marginBottom: '2rem' }}
              onClick={this.toggle}
              className = 'formButton'
            >
              Add Member
            </Button>
            </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add New Member...</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>

            <Input className='addFormInput' type="text" placeholder="Enter name... " id="name" onChange={this.handleChange} value={this.state.name} />
            <Input className='addFormInput' type="mail" placeholder="Enter mail... " id="mail" onChange={this.handleChange} value={this.state.mail}  />
            <Input className='addFormInput' type="number" placeholder="Enter phone... " id="phone" onChange={this.handleChange} value={this.state.phone}  />
            <Input className='addFormInput' type="text" placeholder="Enter sex... " id="sex" onChange={this.handleChange} value={this.state.sex}  />
            <Input className='addFormInput' type="text" placeholder="Enter section... " id="section" onChange={this.handleChange} value={this.state.section}  />
            <Input className='addFormInput' type="text" placeholder="Enter department... " id="department" onChange={this.handleChange} value={this.state.department}  />
            <Input className='addFormInput' type="number" placeholder="Enter salary... " id="salary" onChange={this.handleChange} value={this.state.salary}  />
            <Input className='addFormInput' type="text" placeholder="Enter level... " id="level" onChange={this.handleChange} value={this.state.level}  />
            <Input className='addFormInput' type="number" placeholder="Enter rate... " id="rate" onChange={this.handleChange} value={this.state.rate}  />
            <Input className='addFormInput' type="submit" value="Add" />
            </Form>
          </ModalBody>
        </Modal>
      <div className='clearfix'></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  member: state.member
});

export default connect(
  mapStateToProps,
  { addMember }
)(AddForm);
