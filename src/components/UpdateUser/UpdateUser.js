import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdateUser = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    useEffect( () =>{
        const url = `http://localhost:5000/user/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data));
    }, [id]);
    const handleUpdateUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;

        const updatedUser = {name, email};

    // send user to server
    const url = `http://localhost:5000/user/${id}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
        .then(res => res.json())
        .then(data =>{
            console.log('success', data);
            // toast here
            toast('User Update successfully');
            event.target.reset();
        })
}
    
    return (
        <div className='mt-4'>
            
            <h2>Update User</h2>
            <h4>name: {user.name}</h4>
            <h4>Email: {user.email}</h4>

            <form onSubmit={handleUpdateUser}>
                <input type="text" name="name" placeholder="name" required />
                <br/>
                <input type="email" name="email" placeholder="Email" required  />
                <br/>
                
                <input className='btn btn-primary mt-3' type="submit" value="Update User" />

                

            </form>
            <ToastContainer/>
        </div>
    );
};

export default UpdateUser;