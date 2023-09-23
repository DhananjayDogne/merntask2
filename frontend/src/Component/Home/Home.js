import { useContext, useEffect ,useState} from 'react';
import PostContext from '../../Context/PostContext';
import ShowPosts from './ShowPosts';
import { useNavigate } from 'react-router-dom';
import EditPost from '../AddPost/EditPost';

const Home = () => {
    const { posts, allPosts } = useContext(PostContext);
    const navigate = useNavigate();
    const [popup, setPopup] = useState(true);


    useEffect(() => {
          if (localStorage.getItem('token')) {
              allPosts();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 

    return (
        <>
        {popup && <EditPost setPopup={setPopup} />}
        <div className="text-center m-[1rem] ">
                {  posts.length>0 ?(
                    posts.map((post) => {
                        return <ShowPosts key={post._id} post={post} setPopup={setPopup} />
                    })
                ):("Not Have Any Post Yet!!")
                }
            
            </div>
        </>
    )
}
export default Home;