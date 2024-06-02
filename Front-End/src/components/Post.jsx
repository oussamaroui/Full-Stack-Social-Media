import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import CircleProfile from './CircleProfile';
import './styles.css';
import { Link } from 'react-router-dom';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/posts');
                setPosts(response.data);
            } catch (error) {
                setError('Error fetching posts: ' + error.message);
            }
        };

        fetchPosts();
    }, []);

    const handleLike = async (postId, currentLikeValue) => {
        const newLikeValue = currentLikeValue === 1 ? 0 : 1;

        console.log(currentLikeValue);

        const formData = new FormData();
        formData.append('user_id', currentUser.id);
        formData.append('post_id', postId);
        formData.append('like_value', newLikeValue);
        try {
            await axios.post('http://localhost:8000/api/like', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setPosts(posts.map(post =>
                post.id === postId ? {
                    ...post,
                    likes_count: newLikeValue === 1 ? post.likes_count + 1 : post.likes_count - 1,
                    current_user_like_value: newLikeValue
                } : post
            ));
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }

        window.location.reload();
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            {posts.length === 0 && !error && <div>Loading posts...</div>}
            {posts.slice().reverse().map((post) => (
                <div key={post.id} className="post-card">
                    <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to={`/profile/${post.user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CircleProfile pic={post.user.profile_pic} first_name={post.user.first_name} last_name={post.user.last_name} />
                                <p style={{ fontWeight: '500' }}>
                                    {post.user.first_name} {post.user.last_name}
                                </p>
                            </div>
                        </Link>
                        <p>{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                    <img
                        loading='lazy'
                        src={`http://localhost:8000/storage/${post.image}`}
                        alt={`Post Image ${post.id}`}
                        className="post-image"
                    />
                    <div className="post-content">
                        <button
                            className={`${currentUser && post.likes.some(like => like.user_id === currentUser.id && like.like_value === 1) ? 'liked-button' : 'like-button'}`}
                            onClick={() => handleLike(post.id, (post.likes.some(like => like.user_id === currentUser.id && like.like_value)) ? 1 : 0)}
                        >
                            ❤ {post.likes.filter(like => like.like_value === 1).length}
                        </button>
                        <p>{post.caption}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Post;
