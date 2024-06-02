import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";
import CircleProfile from "./CircleProfile";

const ShowStory = () => {
    const [stories, setStories] = useState([]);
    const { storyId } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(-1);
        }, 10000);

        return () => clearTimeout(timer); 
    }, [navigate]);

    const currentStory = stories.find(story => story.id == storyId);

    return (
        <div className="story-container">
            {currentStory ? (
                <>
                    <div className="progress-bar">
                        <div className="progress-bar-fill"></div>
                    </div>
                    <div className="story-header">
                        <CircleProfile pic={currentStory.user.profile_pic} first_name={currentStory.user.first_name} last_name={currentStory.user.last_name} />

                        <span className="user-name">{currentStory.user.first_name} {currentStory.user.last_name}</span>
                    </div>
                    <img
                        src={`http://localhost:8000/storage/${currentStory.story}`}
                        alt="Story"
                        className="story-image"
                    />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShowStory;
