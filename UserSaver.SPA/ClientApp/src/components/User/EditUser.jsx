import React, {useState} from 'react';
import {Button, Modal} from "antd";
function EditUser(props) {

    const [inputEName, setInputEName] = useState('');
    const [inputEYears, setInputEYears] = useState('');
    const [inputECar, setInputECar] = useState('');

    const [isModalEOpen, setIsModalEOpen] = useState(false);
    const showModal = () => {
        setIsModalEOpen(true);
    };
    const handleOk = () => {
        setIsModalEOpen(false);
    };
    const handleCancel = () => {
        setIsModalEOpen(false);
    };
    function editUser(){
        let newUser = {
            id:props.data.id,
            name:inputEName ,
            years:inputEYears,
            car:inputECar
        };

        fetch('https://localhost:44488/user/api/User/Edit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(res => res.json())
            .then(res => console.log(res));
    }
    return (
        <div>
            <Button type="primary" onClick={showModal}>
                edit user
            </Button>
            <Modal title="Create user" open={isModalEOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>   <form className="form-group w-25 text-center">
                    <input className="text-dark form-control align-content-center" required  min="1"  maxLength="100" placeholder="Name" type="text"
                           value={inputEName}
                           onChange={(event) => setInputEName(event.target.value)}
                    />
                    <br/>
                    <input className="text-dark form-control align-content-center" required min="1" max="120" maxLength="3" placeholder="Years" type="number"
                           value={inputEYears}
                           onChange={(event) => setInputEYears(event.target.value)}
                    />
                    <br/>
                    <select className="form-control" required
                            value={inputECar}
                            onChange={(event) => setInputECar(event.target.value)}
                    >
                        <option value="Volvo">Volvo</option>
                        <option value="BMW">BMW</option>
                        <option value="Honda">Honda</option>
                        <option value="Audi">Audi</option>
                        <option value="Dodge">Dodge</option>
                        <option value="Subaru">Subaru</option>
                    </select>
                    <br/>
                    <button className="btn btn-primary" onClick={editUser}>Save</button>
                </form></div>
            </Modal>
        </div>
    );
}
export default EditUser;