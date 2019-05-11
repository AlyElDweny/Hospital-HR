import axios from 'axios';
import { GET_MEMBERS,
         GET_DEPARTMENT,
         ADD_MEMBER,
         DELETE_MEMBER,
         UPDATE_MEMBER,
        MEMBERS_LOADING
         } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getMembers = () => (dispatch, getState) =>  {
  dispatch(setMembersLoading());
  axios
    .get('http://localhost:5000/api/doctors', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_MEMBERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getDepdartment = department =>{
  return{
    type: GET_DEPARTMENT,
    payload: department
  }
}

export const addMember = member => (dispatch, getState) => {
 // console.log(member)
  // return{
  //   type: ADD_MEMBER,
  //   payload: member
  // }
  axios
    .post('http://localhost:5000/api/doctors', member, tokenConfig(getState) )
    .then(res =>
      dispatch({
        type: ADD_MEMBER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateMember = ( member ) => (dispatch, getState) =>  {
  // console.log(id);
  console.log(member);

  axios
  .put(`http://localhost:5000/api/doctors/${member._id}`, member, tokenConfig(getState))
  .then(res =>
    dispatch({
      type: UPDATE_MEMBER,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch(returnErrors(err.response.data, err.response.status))
  );
};

export const deleteMember = id => (dispatch, getState) =>  {
  // return{
  //   type: DELETE_MEMBER,
  //   payload: id
  // }
  axios
  .delete(`http://localhost:5000/api/doctors/${id}`, tokenConfig(getState))
  .then(res =>
    dispatch({
      type: DELETE_MEMBER,
      payload: id
    })
  )
  .catch(err =>
    dispatch(returnErrors(err.response.data, err.response.status))
  );
};

export const setMembersLoading = () => {
  return {
    type: MEMBERS_LOADING
  };
};
