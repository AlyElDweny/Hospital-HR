import React, { Component, Fragment } from 'react';
import {NavLink} from 'react-router-dom';


import { connect } from 'react-redux';
import { getMembers } from '../../actions/memberActions';
import PropTypes from 'prop-types';

import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal';
import Logout from '../auth/Logout';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';

class Navy extends Component {
  state = {
    isOpen : false
}

toggle = () => {
  this.setState({
    isOpen: !this.state.isOpen
  });
};
 
  
  render() {
    // console.log(this.props.members)
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
      <NavLink to="/" className='navItem'>Home</NavLink>
      <a href="/doctors" className='navItem' onClick ={ () => getMembers()} >Departments</a>
      <NavLink to="/services"  className='navItem'>Services</NavLink>
      <NavLink to="/affairs"  className='navItem'>Affairs</NavLink>
      <NavLink to="/newcvs"  className='navItem'>New CVs</NavLink>
      
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong className='avatar' >{user ? `${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div className="Nav">
        <Navbar color='primary' dark expand='sm' className=''>
          <Container>
            <NavbarBrand href='/'>Hospital HR</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar> 
      </div>
    );
  }
}
Navy.propTypes = {
  getMembers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps =(state) => ({
  member: state.member,
  auth: state.auth
})

export default connect(
  mapStateToProps,
   { getMembers }
   ) (Navy);

