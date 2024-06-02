import { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import CircleProfile from './CircleProfile';
import './styles.css';

const Aside = () => {
    const { users, error } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter(user =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const liStyles = {
        display: "flex",
        alignItems: "center",
        gap: "13px",
        marginBottom: '10px'
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <aside style={{ padding: '0px 12px' }} className='fixed'>
            <div style={{ marginBottom: '10px', width: '100%', height: '40px', padding: '0px 8px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', borderRadius: '5px' }}>
                <img src="/icons/search.svg" width={20} alt="" />
                <input
                    type="text"
                    placeholder="Search users"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{width: '100%', height: '100%', padding: '0px 8px', border: 'none', outline: 'none'}}
                />
            </div>
            <ul>
                {filteredUsers.map((user) => (
                    <li key={user.id} style={liStyles}>
                        <CircleProfile pic={user.profile_pic} first_name={user.first_name} last_name={user.last_name} />
                        <div style={{ fontWeight: '500', flex: '1 1 0', fontSize: '14px' }}>
                            {user.first_name} {user.last_name}
                        </div>
                        <a href={`/profile/${user.id}`}>
                            <button id="profileButton">
                                View Profile
                            </button>
                        </a>
                    </li>
                ))}
            </ul>
            {error && <div className="error-message">{error}</div>}
        </aside>
    );
};

export default Aside;
