import axios from 'axios';

// declare a response interceptor
axios.interceptors.response.use((response) => {
  // do something with the response data
  console.log('Response was received');
  return response;
}, error => {
  // handle the response error
  return Promise.reject(error);
});


export function loadUsersRequest(actionType) {
  return (dispatch) => {
    return axios.get(`https://randomuser.me/api/?results=50`).then(function ({ data }) {
      if (data) {
        dispatch({ type: actionType, payload: { data } });
      }

    });
  };
}

export function deleteUsersRequest(actionType, uuid) {
  return (dispatch) => {
    dispatch({ type: actionType, payload: { uuid } });
  }
}