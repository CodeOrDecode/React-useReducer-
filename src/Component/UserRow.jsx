import React from "react";

const UserRow = ({ name, gender, role, maritalStatus, id }) => {
  return <>
  <tr>
    <td>{id+1}</td>
    <td>{name}</td>
    <td>{gender}</td>
    <td>{role}</td>
    <td>{maritalStatus==true ?"married":"unmarried"}</td>
  </tr>
  
  </>;
};
export { UserRow };
