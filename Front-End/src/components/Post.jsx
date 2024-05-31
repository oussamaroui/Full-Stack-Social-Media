import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import CircleProfile from './CircleProfile';
import './styles.css';

const Post = () => {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const { users, currentUser } = useContext(UserContext);

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
    };

    console.log(posts[1]);

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            {posts.map((post) => (
                <div key={post.id} className="post-card">
                    {users.map((user) => (
                        user.id === post.user_id &&
                        <div key={user.id} style={{ margin: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CircleProfile first_name={user.first_name} last_name={user.last_name} />
                                <p style={{ fontWeight: '500' }}>
                                    {user.first_name} {user.last_name}
                                </p>
                            </div>
                            <p>{new Date(post.created_at).toLocaleDateString()}</p>
                        </div>
                    ))}
                    <img
                        src={`http://localhost:8000/storage/${post.image}`}
                        alt={`Post Image ${post.id}`}
                        className="post-image"
                    />
                    <div className="post-content">
                        <button
                            className={`${post.current_user_like_value === 1 ? 'liked-button' : 'like-button'}`}
                            onClick={() => handleLike(post.id, post.current_user_like_value)}
                        >
                            ❤ {post.likes_count}
                        </button>
                        <p>{post.caption}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Post;
