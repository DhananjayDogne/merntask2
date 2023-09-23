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
    // const LoginUser = async () => {

    //     const response = await fetch(`${process.env.REACT_APP_HOSTURL}/api/auth/login`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ email: user.email, password: user.password })
    //     });
    //     const json = await response.json();
    //     console.log(json);
    //     if (json._id) {
    //         //Save And Redirect To Home
    //         localStorage.setItem("token", json._id);
    //         navigate('/');
    //     } else {
    //         if (json.error) alert(json.error);
    //         else {
    //             alert("Some error occurred .PLease try again !");
    //         }
    //     }
    // }

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
                    <h4 className='login_email text-lg'>Email</h4>
                    <input className="text-black" type='email' name='email' onChange={handleChange} required />
                </div>
                <div className='login_row'>
                    <h4 className='m-auto text-lg'>Password</h4>
                    <input className="text-black" type='password' name='password' onChange={handleChange} required />
                </div>
                <div className='m-auto text-center'>
                    <button className='button text-center'>Submit</button>
                </div>
            </form>
        </div>


    );
}

export default Login;