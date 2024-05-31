import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            try {
                const usersResponse = await axios.get('http://localhost:8000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(usersResponse.data);

                const userResponse = await axios.get('http://localhost:8000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCurrentUser(userResponse.data);

            } catch (error) {
                setError('Error fetching users data: ' + (error.response?.data?.message || 'An error occurred'));
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ users, currentUser, error }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
