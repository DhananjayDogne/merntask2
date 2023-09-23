import "./Login.css";
import { useContext,useState } from 'react';
import PostContext from '../../Context/PostContext';
import { useNavigate } from "react-router-dom";

const AddPost = () => {
    const [newPost, setNewPost] = useState({ desc: "", img:""});
    //getting function addpost
    const { addPost } = useContext(PostContext);
    
    const navigate = useNavigate();
    const handleSubmit = async (e) => { 
        e.preventDefault();
        await addPost({ desc: newPost.desc, img:newPost.img });
        setNewPost({ desc: "", image: "" });
        navigate('/');
    }
    const handleChange = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    }
    return (
    <div className='outer_box'>
        <form className='login_container' onSubmit={handleSubmit}>
            <h1 className='text-3xl text-center my-2'>Add New Post</h1>

                <div className=' addpost_row '>
                <h4 className=' text-lg'>Description</h4>
                <textarea rows={4}  className="w-[100%] text-black p-2 rounded" value={newPost.desc} name='desc' onChange={handleChange} required />
            </div>
            <div className='addpost_row '>
                <h4 className=' text-lg'>Image Url</h4>
                <input className="text-black" type='text' name='image' value={newPost.img} onChange={handleChange}  />
            </div>
            <div className='m-auto text-center'>
                <button className='button text-center'>ADD</button>
            </div>
        </form>
        </div>
    )
}
export default AddPost;