import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import "./styles.css";

const NewPost = () => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { currentUser } = useContext(UserContext);

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
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <section className="upload-section">
            <form className="upload-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="file-input-label">
                        Upload Image
                        <img src="/icons/upload.svg" alt="upload" width={20} />
                        <input type="file" className="file-input" onChange={handleImageChange} />
                    </label>
                </div>
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Selected" className="preview-img" />
                    </div>
                )}
                <div className="form-group">
                    <input
                        type="text"
                        className="text-input"
                        placeholder="Enter caption..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </section>
    );
};

export default NewPost;
