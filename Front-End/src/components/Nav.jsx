import { useContext } from 'react';
import { UserContext } from './UserContext';
import CircleProfile from './CircleProfile';
import './styles.css';

const Nav = () => {
    const { currentUser, error } = useContext(UserContext);

    return (
        <header className='header'>
            <h2>KC Media</h2>
            {currentUser && (
                <div>
                    <CircleProfile first_name={currentUser.first_name} last_name={currentUser.last_name} />
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
        </header>
    );
};

export default Nav;
