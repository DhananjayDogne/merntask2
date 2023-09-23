import "./Login.css";
import { useContext, useState } from 'react';
import PostContext from '../../Context/PostContext';

const EditPost = ({ setPopup }) => {
    const [newPost, setNewPost] = useState({ desc: "", image: "" });
    //getting function editpost
    const { editPost } = useContext(PostContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        editPost({ desc: newPost.desc, image: newPost.image });
        setNewPost({ desc: "", image: "" });
        setPopup(false);
    }
    const handleChange = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    }
    return (
        <div className={`popup`}>
        <div className='outer_box'>
            <form className='login_container' onSubmit={handleSubmit}>
                <h1 className='text-3xl text-center my-2'>Add New Post</h1>
                <span onClick={()=>setPopup(false)}>+</span>
                <div className='login_row '>
                    <h4 className=' text-lg'>Description</h4>
                    <textarea rows={4} className="text-black p-2 rounded" name='desc' onChange={handleChange} required />
                </div>
                <div className='login_row '>
                    <h4 className=' text-lg'>Image Url</h4>
                    <input className="text-black" type='text' name='image' onChange={handleChange} />
                </div>
                <div className='m-auto text-center'>
                    <button className='button text-center'>ADD</button>
                </div>
            </form>
            </div>
        </div>
    )
}
export default EditPost;