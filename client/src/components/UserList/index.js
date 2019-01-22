import React from 'react';

const UserList = props => {
  return (
    <ul>
      {this.state.users.map(user => (
        <li key={user._id}>
          <p>
            {user.name} {user.email}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
