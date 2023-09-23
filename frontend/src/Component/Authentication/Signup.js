import './Login.css';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import PostContext from '../../Context/PostContext';

const Signup = () => {
    let navigate = useNavigate();
    const { createUser } = useContext(PostContext);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        await createUser(user.name, user.email, user.password);
        
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        
    }

    return (
        <div className='outer_box'>
            <form className='login_container' onSubmit={handleSubmit}>
                <h1 className='text-3xl text-center my-2'>Signup</h1>
                <div className='login_row'>
                    <h4 className='login_email text-lg'>Name</h4>
                    <input className="text-black" type='text' name='name' onChange={handleChange} required />
                </div>
                <div className='login_row'>
                    <h4 className='login_email text-lg'>Email</h4>
                    <input className="text-black" type='email' name='email' onChange={handleChange} required />
                </div>
                <div className='login_row'>
                    <h4 className='text-start'>Password</h4>
                    <input className="text-black" type='password' name='password' onChange={handleChange} required />
                </div>
                <div className='m-auto text-center'>
                    <button className='button text-center'>Submit</button>
                </div>
            </form>
        </div>


    );
}

export default Signup;