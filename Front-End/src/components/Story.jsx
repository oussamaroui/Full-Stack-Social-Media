import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Story = () => {
    const { currentUser } = useContext(UserContext);
    const [story, setStory] = useState();
    const [stories, setStories] = useState();
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/stories');
                setStories(response.data);
            } catch (error) {
                console.log('Error fetching posts: ' + error.message);
            }
        };

        fetchStories();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user_id', currentUser.id);
        formData.append('story', story);

        axios.post('http://localhost:8000/api/new-story', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log(response.data);
                setStory(null);
                setFileName("");
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setStory(file);
            setFileName(file.name);
        }
    };

    const handleDivClick = () => {
        document.getElementById('file-input').click();
    };

    return (
        <aside style={{ padding: '0px 12px' }} className="fixed">
            <h1>Stories</h1>
            <form id="story-form" onSubmit={handleSubmit}>
                <div className="add-story" onClick={handleDivClick} style={{ cursor: 'pointer' }}>
                    <span>Add Story</span> +
                </div>
                <input
                    id="file-input"
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />

                {fileName && (
                    <div style={{ marginTop: '10px' }}>
                        <p>Selected file: {fileName}</p>
                        <button type="submit" className="submitStory">Submit</button>
                    </div>
                )}
            </form>

            <div>
                {stories && stories.map(stori => (
                    <div key={stori.id} className="story">
                        <Link to={`story/${stori.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <div>
                                <img loading="lazy" width={50} height={50} style={{ borderRadius: '50px' }} src={`http://localhost:8000/storage/${stori.story}`} alt="" />
                                <p>{stori.user.first_name} {stori.user.last_name}</p>
                            </div>
                            {/* <p>{stori.created_at}</p> */}
                        </Link>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Story;
