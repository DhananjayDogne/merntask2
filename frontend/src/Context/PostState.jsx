import { useState } from 'react';
import PostContext from './PostContext';

const PostState = (props) => {
    

    const postInitial = []
    const [posts, setPosts] = useState(postInitial);
    const host = process.env.REACT_APP_HOSTURL;
    const [userName, setUserName] = useState('');
    //fetch All Posts  
    const allPosts = async () => {
        const response = await fetch(`${host}/api/posts/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(),
        });
        const json = await response.json();

        setPosts(json);
    }
    //Add New Post 
    const addPost = async ({ desc, img }) => {
        const userId = localStorage.getItem('token');
        setUserName(localStorage.getItem('user'));
        console.log(userId,userName,desc, img);
        const post = await fetch(`${host}/api/posts/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ userId,  userName, desc, img }),
        });

        setPosts(posts.concat(post));
    }

    //Edit A Post
    const editPost = async ({ id, desc, img }) => {
        const userId = localStorage.getItem('token');
        //Backend Api call
        const response = await fetch(`${host}/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, desc }),
        });

        const newposts = JSON.parse(JSON.stringify(posts))
        for (let i = 0; i < newposts.length; i++) {
            if (newposts[i]._id === id) {
                newposts[i].desc = desc;
                newposts[i].img = img;
                break;
            }
        }
        setPosts(newposts);
       await response.json();
    }

    //Delete Post
    const deletePost = async(id) => {
        const userId = localStorage.getItem('token');
        const response = await fetch(`${host}/api/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ userId }),
        });
        if (response.status === 200) {
            const newPost = posts.filter((post) => { return post._id !== id });
            setPosts(newPost);
        } else {
            console.log(response);
        }

        
    }
    //Like A post 
    const likePost = async (id) => {
        const userId = localStorage.getItem('token');
        const response = await fetch(`${host}/api/posts/${id}/like`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ userId }),
        });
        const json = await response.json();
        return json;
    }
    //Create New User
    const createUser = async (name, email, password) => {
        const response = await fetch(`http://www.localhost:3300/api/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })

        const json = await response.json();
        console.log(json);

        //save int local store
        if (json._id) {
            localStorage.setItem('token', json._id);
            localStorage.setItem('user', json.name);
            setUserName(json.name);
        } else {
            if (json.error) alert(json.error);
            else {
                alert("Some error occurred .PLease try again !");
            }
        }
    }
    const LoginUser = async (user) => {

        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, password: user.password })
        });
        const json = await response.json();
        console.log(json);
        if (json._id) {
            //Save And Redirect To Home
            localStorage.setItem("token", json._id);
            localStorage.setItem('user', json.name);
            setUserName(json.name);
           
        } else {
            if (json.error) alert(json.error);
            else {
                alert("Some error occurred .PLease try again !");
            }
        }
    }
    return (
        <PostContext.Provider value={{ posts, allPosts, addPost, editPost, deletePost,likePost,createUser, LoginUser }}>
            {props.children}
        </PostContext.Provider>
    )
}
export default PostState;