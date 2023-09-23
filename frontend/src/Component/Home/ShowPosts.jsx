import {useState,useContext} from 'react';
import { AiOutlineDelete, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { TbEdit } from 'react-icons/tb';
import './EditPost.css';
import PostContext from '../../Context/PostContext';

const ShowPosts = ({ post }) => {
    
    const context = useContext(PostContext);
    const { editPost, deletePost, likePost } = context;
    const [popup, setPopup] = useState("popup");
    const [newpost, setNewpost] = useState({ id: post._id, desc: post.desc, img: post.img });
    const [liked, setLiked] = useState(false);

    const popup2 = () => {
        if (localStorage.getItem('token')===post.userId) {
            setPopup([popup + " poped"]);
        } else {

            alert("Edit Your Own Post", localStorage.getItem('token'), post.userId);
        }
        
    }
    const clickToLiked = async() => { 
        const res = await likePost(post._id);
        if (res === 'like') {
            setLiked(true);
        } else {
            setLiked(false);
        }
        
    }
    const removePost = () => {
       if (localStorage.getItem('token') === post.userId) {
            deletePost(post._id);
        } else {
            alert(" You can't Delete Others Post", localStorage.getItem('token'), post.userId);
        }
    }
    const popupremove = () => {
        setPopup(["popup"]);
    }
    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log("Editing a note")
        console.log(newpost)
        await editPost({id: newpost.id, desc:newpost.desc, img:newpost.img });
        popupremove();
    }
    const handleChange = (e) => {
        e.preventDefault();
        setNewpost({ ...newpost, [e.target.name]: e.target.value })
    }
    return (
        <>
           
        <div className="w-[50%] my-[1rem] m-auto p-[1rem] border-[1px] border-white rounded bg-[#17f9e329]">
            <div className="flex m-auto w-[100%] bg-[#ffffff5c] rounded py-1 px-2">
                {/* <img src="https://th.bing.com/th?id=OIP.puMo9ITfruXP8iQx9cYcqwHaGJ&w=274&h=227&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" className="w-[10%] p-1 rounded-full" alt="" /> */}
                <h1 className='my-auto text-xl'>{ post.userName}</h1>
               
            </div>
            <p>{ post.desc}</p>

            {post.img && <img className="m-auto rounded" src={`${post.img}`} alt="" />}
                <div className='flex m-auto w-[100%] rounded py-1 px-2'>
                    <div className="cursor-pointer text-xl" onClick={() => { clickToLiked() }} >{liked === false ? (<AiOutlineHeart className='text-red-600'  />) : (<AiFillHeart className='text-red-600' />)}</div>
                    <div className='flex ml-auto '>
                        <TbEdit className='text-2xl m-auto cursor-pointer hover:text-gray-700 mx-1' onClick={() => { popup2() }} />
                        <AiOutlineDelete className='text-2xl m-auto cursor-pointer hover:text-red-700 text-red-600 mx-1' onClick={() => { removePost() }} />
                    </div>    
                </div>
            </div>

            {/* Edit form */}
            <div className={`${popup}`}>
                <form className='popup_container relative ' onSubmit={handleSubmit}>
                    <div className='my-2'>
                        <h1 className='text-3xl text-center my-2'>Add New Post</h1>
                        <span onClick={popupremove} className='absolute top-[0] right-[3%] rotate-45 text-3xl cursor-pointer'>+</span>
                    </div>
                    
                    <div className='my-2 '>
                        <h4 className='text-start text-lg my-2'>Description</h4>
                        <textarea rows={4} value={newpost.desc} className="w-[100%] text-black p-2 rounded" name='desc' onChange={handleChange} required />
                    </div>
                    <div className=' my-2'>
                        <h4 className='text-start text-lg my-2'>Image Url</h4>
                        <input className="imgurl text-black" value={newpost.img} type='text' name='image' onChange={handleChange} />
                    </div>
                    <div className='m-auto text-center'>
                        <button className='button text-center'>ADD</button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default ShowPosts;