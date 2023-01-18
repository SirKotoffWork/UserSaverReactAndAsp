import React, {useState} from 'react';
import {Button, Checkbox, DatePicker, Modal, Radio} from "antd";
function EditUser(props) {

    const [inputEName, setInputEName] = useState(props.data.name);
    const [inputEYears, setInputEYears] = useState(props.data.years);
    const [inputECar, setInputECar] = useState(props.data.car);
    const [inputIsAdmin, setInputIsAdmin] = useState(props.data.IsAdmin);
    const [inputSex, setInputSex] = useState(props.data.sex);
    const [inputDate, setInputDate] = useState(props.data.date);
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
            name:inputEName,
            years:inputEYears,
            car:inputECar,
             IsAdmin:inputIsAdmin,
             sex:inputSex,
             date:inputDate
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
            <Modal title="Edit user" open={isModalEOpen} onOk={handleOk} onCancel={handleCancel}>
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
                    
                    <DatePicker selected={inputDate} onChange={date => setInputDate(date)}/>
                     <Checkbox defaultChecked={true} onChange={(e)=>setInputIsAdmin(e.target.value)}>Is Admin</Checkbox>
                    <Radio.Group onChange={(e)=>  setInputSex(e.target.value)} value={inputSex}>
                        <Radio value={"M"}>M</Radio>
                        <Radio value={"W"}>W</Radio>
                    </Radio.Group>
                    <button className="btn btn-primary" onClick={editUser}>Save</button>
                </form></div>
            </Modal>
        </div>
    );
}
export default EditUser;