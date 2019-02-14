import axios from 'axios';

export default {
  getUsers: function() {
    return axios.get('/api/users');
  },
  getUser: function(id) {
    return axios.get('/api/users/' + id);
  },
  deleteUser: function(id) {
    return axios.delete('/api/users/' + id);
  },
  saveUser: function(userData) {
    return axios
      .post('/api/users', userData)
      .then(function(res) {
        return res;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  updateUser: function(id, userData) {
    console.log(userData);
    return axios.put('/api/users/' + id, userData);
  }
};
