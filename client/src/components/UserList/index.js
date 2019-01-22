import React from 'react';

const UserList = props => {
  return (
    <ul>
      {props.users.map(user => (
        <li key={user._id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
