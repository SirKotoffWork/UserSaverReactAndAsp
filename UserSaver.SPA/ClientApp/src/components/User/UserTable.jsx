import React, {useState} from 'react';
import {Home} from "../Home";

function UserTable() {
    const [user, setUser] = useState(true);

    function getuser(){
       const response = fetch('user');
       const data = response.json();
       this.setState({users: data, setUser: false});
    }

getuser();
    
    return (
       <div>
           <table className="table text-white w-25">
               <thead>
               <tr>
                   <th scope="col">#</th>
                   <th scope="col">Name</th>
                   <th scope="col">Age</th>
                   <th scope="col">Car</th>
                   <th scope="col">Options</th>
               </tr>
               </thead>
               <tbody>
               <tr>
                   <th>{user.id}</th>
                   <td>{user.name}</td>
                   <td>{user.age}</td>
                   <td>{user.car}</td>
                   <button className="btn btn-primary">Edit</button>
                   <button className="btn btn-danger">Delete User</button>
               </tr>
               </tbody>
           </table>
           
       </div>
    );
}

export default UserTable;