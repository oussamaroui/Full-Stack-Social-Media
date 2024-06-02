import { useContext } from 'react';
import { UserContext } from './UserContext';
import CircleProfile from './CircleProfile';
import './styles.css';
import { Link } from 'react-router-dom';

const Nav = () => {
    const { currentUser, error } = useContext(UserContext);

    return (
        <header className='header'>
            <h2>KC Media</h2>
            {currentUser && (
                <Link to={`/profile/ ${currentUser && currentUser.id}`} style={{ textDecoration: 'none' }}>
                    <CircleProfile pic={currentUser.profile_pic} first_name={currentUser.first_name} last_name={currentUser.last_name} />
                </Link>
            )}
            {error && <div className="error-message">{error}</div>}
        </header>
    );
};

export default Nav;
