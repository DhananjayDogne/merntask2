import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="fixed top-0 flex  bg-blue-400 text-white p-2 w-[100%]">
            <Link to="/" className=" text-3xl ">
                Socio
            </Link>
            <div className='ml-auto'>
                {!localStorage.getItem('token') ? (<>
                    <Link className={`link ${location.pathname === '/login' ? "active" : ""}`} to='/login'>Login</Link>
                    <Link className={`link ${location.pathname === '/signup' ? "active" : ""}`} to='/signup'>Signup</Link>
                </>)
                    :
                    (<div className='flex '>
                        <h5 className="text-white border-[1px] rounded-full py-1 px-2">{localStorage.getItem('user') }</h5>
                        <Link className={`link  ${location.pathname === '/addpost' ? "active" : ""}`} to='/addpost'>Add Post</Link>
                        <h5 className="nav_logout " onClick={handleLogout}>Logout</h5>
                        </div>)}
            </div>
          

        </div>
    )
}

export default Nav;