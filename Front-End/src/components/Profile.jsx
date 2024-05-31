import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import CircleProfile from './CircleProfile';
import './styles.css';

const Profile = () => {
    const { users, error } = useContext(UserContext);
    const { currentUser } = useContext(UserContext);
    const { userId } = useParams();
    const user = users.find(user => user.id === parseInt(userId));

    if (!user) {
        return <div>Loading...</div>;
    }

    const styles = {
        width: '100px',
        height: '100px',
        fontSize: '36px',
        fontWeight: '600'
    };

    return (
        <section>
            <div className="profile-container">
                <div className="profile-header">
                    <CircleProfile first_name={user.first_name} last_name={user.last_name} style={styles} />
                    <div className="profile-details">
                        <h2>{user.first_name} {user.last_name}</h2>
                        <p>{user.email}</p>
                        {
                            currentUser.id !== user.id &&
                            <button className="follow-button">Follow</button>
                        }

                        {
                            currentUser.id === user.id &&
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Link to="/new-post">
                                    <button className="follow-button">New Post</button>
                                </Link>
                                <button className="logout-button">Logout</button>
                            </div>
                        }
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
            </div>
            <div className="image-grid">
                {user.images.map((image, index) => (
                    <div key={index} className="image-container">
                        <div>
                            <img src={`http://localhost:8000/storage/${image}`} alt={`User Image ${index + 1}`} className="user-image" />
                        </div>
                        okok
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Profile;
