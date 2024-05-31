import { useContext } from 'react';
import { UserContext } from './UserContext';
import CircleProfile from './CircleProfile';
import './styles.css';
import { Link } from 'react-router-dom';

const Aside = () => {
    const { users, error } = useContext(UserContext);

    const liStyles = {
        display: "flex",
        alignItems: "center",
        gap: "13px",
        marginBottom: '10px'
    };

    return (
        <aside style={{ padding: '0px 12px' }}>
            <ul>
                {users.map((user) => (
                    <li key={user.id} style={liStyles}>
                        <CircleProfile first_name={user.first_name} last_name={user.last_name} />
                        <div style={{ fontWeight: '500', flex: '1 1 0', fontSize: '14px' }}>
                            {user.first_name} {user.last_name}
                        </div>
                        <Link to={`/profile/ ${user.id}`}>
                            <button id="profileButton">
                                View Profile
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
            {error && <div className="error-message">{error}</div>}
        </aside>
    );
};

export default Aside;
