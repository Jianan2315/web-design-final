import { useEffect, useState } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import '../css/resumeEditor.css';
import { useNavigate, useLocation } from 'react-router-dom';

const ResumeEditor = () => {
    const [invalidRequest, setInvalidRequest] = useState(false);
    const navigate = useNavigate();
    const userInfo = localStorage.getItem('userInfo');
    const role = localStorage.getItem('role');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const templateId = queryParams.get('template');
    const id = queryParams.get('id');

    useEffect(() => {
        if (!templateId || !id) {
            setInvalidRequest(true);
            setTimeout(() => {
                navigate('/user');
            }, 2000);
        }

        const iframe = document.getElementById("resume-iframe");
        if (iframe && templateId && id) {
            iframe.src = `/vanilla-client/edit.html?template=${templateId}&id=${id}`;

            // Adjust iframe height dynamically based on content
            const handleResize = (event) => {
                if (event.data?.height) {
                    iframe.style.height = `${event.data.height}px`;
                }
            };

            window.addEventListener("message", handleResize);
            return () => window.removeEventListener("message", handleResize);
        }
    }, [templateId, id]);

    return (
        <div style={{ width: '100%' }}>
            <h2>Create your resume</h2>
            {userInfo ? (
                role == "user" ? (
                    invalidRequest ? (
                        <p>Invalid request.</p>
                    ) : (
                        <iframe
                            id="resume-iframe"
                            src=""
                            style={{
                                width: '100%',
                                border: 'none',
                                display: 'block'
                            }}
                            title="Editor"
                        ></iframe>
                    )
                ) : (
                    <p>No Access.</p>
                )
            ) : (
                <p>Please login first.</p>
            )
            }
        </div>
    );
};

export default ResumeEditor;