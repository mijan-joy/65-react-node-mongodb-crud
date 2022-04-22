import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddUser = () => {
    const handleAddUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;

        const user = {name, email};

        // send user to server
        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data =>{
                console.log('success', data);
                // toast here
                toast('User added successfully');
                event.target.reset();
            })
    }
    return (
        <div>
            <h2>Please add a new user</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" name="name" placeholder="name" required />
                <br/>
                <input type="email" name="email" placeholder="Email" required />
                <br/>
                
                <input type="submit" value="Add User" />

                

            </form>
            <ToastContainer />
        </div>
    );
};

export default AddUser;