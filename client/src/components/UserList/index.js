import React from 'react';

const UserList = props => {
  return (
    <div className="container">
      <h2 className="text-center">User List</h2>
      <ul className="list-group">
        {props.users.map(user => (
          <li key={user._id} className="list-group-item">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
