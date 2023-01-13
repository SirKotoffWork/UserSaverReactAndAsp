import React, {useEffect, useState} from 'react';
import Form from "./User/Form";
import EditUser from "./User/EditUser";
import useSortableData from "./User/sorting"
function FetchData(props) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const { items, requestSort} = useSortableData(users);
    
    function getData() {
        fetch('user')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            });
    }
    useEffect(() => {
        getData();
    }, []);
    function deleteUser(id) {
        const url = `https://localhost:44488/user/api/User/Delete/${id}`;
        fetch(url,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true
                }
            }
        ).then((res) => {
            getData();
            // document.getElementById(`${users.id}`).remove();
        })
    }
    
    return (
        <div>
            <button className="btn btn-outline-dark btn-sm" onClick={()=>requestSort('name')}>⊛ Sort by name</button>
            <button className="btn btn-outline-dark btn-sm" onClick={()=>requestSort('years')}>⊛ Sort by age</button>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                <tr>
                    <th>Id</th>
                    <th className="w-25" > <input type="text" className="form-control w-75" aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"/>Name</th>
                    <th><input type="text" className="form-control w-25" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm"/>
                        Age</th>
                    <th>Car</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {
                    items.map(users =>
                    <tr id={users.id} key={users.id}>
                        <td>{users.id}</td>
                        <td>{users.name}</td>
                        <td>{users.years}</td>
                        <td>{users.car}</td>
                        <td>
                            <button className="btn btn-danger btn-sm"  onClick={() => deleteUser(users.id)}>Delete User</button>
                            <EditUser data={users} />
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="text-center">
                <Form/>
            </div>
        </div>
    );
}
export default FetchData;