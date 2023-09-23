import './Login.css';
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostContext from '../../Context/PostContext';

const Login = () => {
    let navigate = useNavigate();
    const {LoginUser}=useContext(PostContext);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
   

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await LoginUser(user);
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }
    return (
        <div className='outer_box'>
            <form className='login_container' onSubmit={handleSubmit}>
                <h1 className='text-3xl text-center my-2'>Login</h1>

                <div className='login_row'>
                    <h4 className=' my-2 text-lg'>Email</h4>
                    <input className="text-black w-[100%]" type='email' name='email' onChange={handleChange} required />
                </div>
                <div className='login_row'>
                    <h4 className='text-start my-2 text-lg'>Password</h4>
                    <input className="text-black w-[100%]" type='password' name='password' onChange={handleChange} required />
                </div>
                <div className='m-auto text-center'>
                    <button className='button text-center'>Submit</button>
                </div>
            </form>
        </div>


    );
}

export default Login;