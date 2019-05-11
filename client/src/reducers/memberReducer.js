import {
  GET_MEMBERS,
  ADD_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
  MEMBERS_LOADING,
  GET_DEPARTMENT
} from '../actions/types';

const initialState = {
  members: [
    // {_id: 1 ,name: 'ALy', mail: 'aly@g.com', phone: 12345, sex: 'Male', section: 'departments', sec: 'Emergency Medicine', salary: 5000, level: 'chef', rate: 9 },
    // {_id: 3 ,name: 'Bahy', mail: 'ss@g.com', phone: 13245, sex: 'Male', section: 'departments', sec: 'Gynecology', salary: 5000, level: 'chef', rate: 9 },
    // {_id: 5 ,name: 'Abdo', mail: 'sc@g.com', phone: 56345, sex: 'Male', section: 'departments', sec: 'Neurology', salary: 5000, level: 'chef', rate: 9 },
    // {_id: 67 ,name: 'ALy', mail: 'aly@g.com', phone: 12345, sex: 'Male', section: 'departments', sec: 'Emergency Medicine', salary: 5000, level: 'chef', rate: 9 },
    // {_id: 44 ,name: 'Bahy', mail: 'ss@g.com', phone: 13245, sex: 'Male', section: 'departments', sec: 'Gynecology', salary: 5000, level: 'chef', rate: 9 },
    // {_id: 54 ,name: 'Abdo', mail: 'sc@g.com', phone: 56345, sex: 'Male', section: 'departments', sec: 'Gynecology', salary: 5000, level: 'chef', rate: 9 }
  ],
  departmentMembers: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERS:
      return {
        ...state,
        members: action.payload,
        loading: false
      };
      case GET_DEPARTMENT:
      return {
        ...state,
        departmentMembers: state.members.filter(member => member.department === action.payload)
      };
    case ADD_MEMBER:
      return {
        ...state,
        members: [action.payload, ...state.members]
      };
      case UPDATE_MEMBER:
        return {
          ...state,
          members: [action.payload, ...state.members] 
        };
    case DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter(member => member._id !== action.payload),
        departmentMembers: state.departmentMembers.filter(member => member._id !== action.payload)
      };
    case MEMBERS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
