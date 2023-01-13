import React, {useState} from 'react';
import {Button, Modal} from "antd";
function Form(props) {

    const [inputName, setInputName] = useState('');
    const [inputYears, setInputYears] = useState('');
    const [inputCar, setInputCar] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    function addUser(){
        let newUser = {
            name: inputName,
            years: inputYears,
            car:inputCar
        };
        
        fetch('https://localhost:44488/user/api/User/Create', {
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
                Create user
            </Button>
            <Modal title="Create user" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
             <div>   <form className="form-group w-25 text-center">
                 <input className="text-dark form-control align-content-center" required  min="1"  maxLength="100" placeholder="Name" type="text"
                        value={inputName}
                        onChange={(event) => setInputName(event.target.value)}
                 />
                 <br/>
                 <input className="text-dark form-control align-content-center" required min="1" max="120" maxLength="3" placeholder="Years" type="number"
                        value={inputYears}
                        onChange={(event) => setInputYears(event.target.value)}
                 />
                 <br/>
                 <select className="form-control" required
                         value={inputCar}
                         onChange={(event) => setInputCar(event.target.value)}
                 >
                     <option value="Volvo">Volvo</option>
                     <option value="BMW">BMW</option>
                     <option value="Honda">Honda</option>
                     <option value="Audi">Audi</option>
                     <option value="Dodge">Dodge</option>
                     <option value="Subaru">Subaru</option>
                 </select>
                 <br/>
                 <button className="btn btn-primary" onClick={addUser}>Save</button>
             </form></div>
            </Modal>
        </div>
    );
}
export default Form;