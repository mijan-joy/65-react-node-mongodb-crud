
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect( () => {
        fetch('http://localhost:5000/user')
        .then(res => res.json())
        .then(data => setUsers(data));
    }, []);

    const handleUserDelete = (id) => {
        const proceed = window.confirm('Are you sure you want to delete this user?');
        if (proceed) {
            console.log('delete user with id, ', id);
            const url =`http://localhost:5000/user/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
               if(data.deletedCount > 0){
                toast('user deleted successfully');
                const remaining = users.filter(user => user._id !== id);
                setUsers(remaining);
               }
        
            });
        }
        
       
    }

    return (
        <div>
            <h2>Total Users: {users.length}</h2>
            <ul>
                {
                    users.map(user => <li key={user._id}>{user.name} :: {user.email}
                    <Link to={`/update/${user._id}`}><button className='btn btn-info'>Update</button></Link>
                    <button className='btn btn-warning'onClick={() => handleUserDelete(user._id)}>delete</button></li>)
                }
            </ul>
            <ToastContainer/>
        </div>
    );
};

export default Home;