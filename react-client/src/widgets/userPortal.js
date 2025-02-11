import { useEffect, useState } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import '../css/userPortal.css';
import { useNavigate } from 'react-router-dom';

const UserPortal = () => {
    const [resumes, setResumes] = useState(null);
    const userInfo = localStorage.getItem('userInfo');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const responseResumes = await axios.get(`${BACKEND_URL}/get/resumes`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setResumes(responseResumes.data.resumes);
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        if (resumes) {
            localStorage.setItem('resumes', JSON.stringify(resumes));
        }
    }, [resumes]);

    const navigate = useNavigate();
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== window.location.origin) return;
            const { templateId, id } = event.data;
            if (templateId && id) {
                // window.location.href = `/edit?template=${templateId}&id=${id}`;
                navigate(`/edit?template=${templateId}&id=${id}`);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);


    return (
        <div>
            <h2>User Portal</h2>
            {userInfo ? (
                <div>
                    <iframe
                        src="/vanilla-client/profile.html"
                        style={{width: '100%', height: '100vh', border: 'none'}}
                        title="Profile"
                    ></iframe>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
};

export default UserPortal;
