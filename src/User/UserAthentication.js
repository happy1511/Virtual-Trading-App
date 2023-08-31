// // StateManager.js
// import { useState } from 'react';
// var user = ""
// export function SetuserFunc(initialValue) {
//     const [value, setValue] = useState(initialValue);
     
//     const updateValue = newValue => {
//         setValue(newValue);
//         user = newValue
//     };

//     return [value, updateValue];
// }

// export const userdetail = user
// export const userprofile = `../../User/UserProfiles/${user.photoURL}`

import { useState } from 'react';

export function useLoggedInUser() {
  const [user, setUser] = useState(null);

  const loginUser = userDetails => {
    setUser(userDetails);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return { user, loginUser, logoutUser };
}
