import React, {useEffect, useState} from 'react';
import Form from "./User/Form";
import EditUser from "./User/EditUser";
import useSortableData from "./User/sorting"
import {Modal, Pagination   , Tooltip} from "antd";

const {confirm} = Modal;

function FetchData(props) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const {items, requestSort} = useSortableData(users);
     const [page, setPage] = useState(1);
     const [index, setIndex] = useState({startInd: 5, endInd: 5})

    function a (){
        fetch(`https://localhost:44488/user/api/User/PartialList/0/5`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res =>  setUsers(res));
    }
    
    function getData() {
        fetch('user')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            });

    }
    useEffect(() => {
      //  getData();
        a();
    }, []);
    function deleteUser(id) {
        confirm({
            title: 'Are you sure delete this user?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
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
                    onChangePagination();
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    
function getCountUsers(){
        let userCount=0;
    fetch('https://localhost:44488/user/api/User/Count', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
        .then(res => {
            userCount = res;
            return Number(userCount);
        });
}
    function onChangePagination(e)
    {
          fetch(`https://localhost:44488/user/api/User/PartialList/${index.startInd}/${index.endInd}`, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
              },
          }).then(res => res.json())
              .then(res =>  setUsers(res));
          setPage(e);
          console.log(e);
          setIndex({startInd:5*(e), endInd:5});
    }
    return (
        <div>
            <div className="text-center">
                <Form/>
            </div>
            <button className="btn btn-outline-dark btn-sm" onClick={() => requestSort('name')}>⊛ Sort by name</button>
            <button className="btn btn-outline-dark btn-sm" onClick={() => requestSort('years')}>⊛ Sort by age</button>
            <input placeholder="Filter"
                   onChange={(e) => setFilter(e.target.value)} type="text" className="form-control w-25"
                   aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>

            <Pagination defaultCurrent={1} onChange={(e)=>onChangePagination(e)} total={35} pageSize={5}/>

            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Car</th>
                    <th>Sex</th>
                    <th>Admin</th>
                    <th>Date</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {
                    items.filter((items) => {
                        if (filter.toLowerCase() === '') {
                            return items;
                        } else if (Number(filter.toLowerCase())) {
                            return String(items.years).toLowerCase().includes(filter);

                        } else if (filter.toLowerCase() !== '') {
                            return items.name.toLowerCase().includes(filter);
                        }
                    }).map(users =>
                        <tr id={users.id} key={users.id}>
                            <td>{users.id}</td>
                            <td>{users.name}</td>
                            <td>{users.years}</td>
                            <td>{users.car}</td>
                            <td>{users.sex}</td>
                            <td>{users.IsAdmin}</td>
                            <td>{users.date}</td>
                            <td>
                                <Tooltip title={`Name:${users.name}  Age:${users.years}`}>
                                    <button className="btn btn-danger btn-sm"
                                            onClick={() => deleteUser(users.id)}>Delete User
                                    </button>
                                </Tooltip>
                                <EditUser data={users}/>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default FetchData;