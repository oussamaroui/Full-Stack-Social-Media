import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

const NewPost = () => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const { currentUser } = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user_id', currentUser.id);
        formData.append('caption', caption);
        if (image) {
            formData.append('image', image);
        }

        axios.post('http://localhost:8000/api/new-post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
                <br />
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default NewPost;
