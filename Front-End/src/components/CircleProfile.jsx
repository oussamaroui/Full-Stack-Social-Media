import PropTypes from 'prop-types';
import './styles.css';

const CircleProfile = ({ pic = '', first_name = '', last_name = '', style }) => {

    const firstLetterFirstName = first_name.charAt(0).toUpperCase();
    const firstLetterLastName = last_name.charAt(0).toUpperCase();

    return (
        <div className="circle-profile" style={style}>
            {
                pic !== null ?
                    <img src={`http://localhost:8000/storage/${pic}`} alt="" />
                    :
                    <>
                        {firstLetterFirstName}
                        {firstLetterLastName}
                    </>
            }
        </div>
    );
};

CircleProfile.propTypes = {
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    style: PropTypes,
    pic: PropTypes,
};

export default CircleProfile;
