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

        const iframe = document.querySelector('iframe');
        if (iframe && templateId && id) {
            iframe.src = `/vanilla-client/edit.html?template=${templateId}&id=${id}`;
        }
    }, [templateId, id]);

    return (
        <div>
            <h2>Create your resume</h2>
            {userInfo ? (
                role == "user" ? (
                    invalidRequest ? (
                        <p>Invalid request.</p>
                        ) : (
                            <div>
                                <iframe
                                    src={`/vanilla-client/edit.html?template=${templateId}&id=${id}`}
                                    style={{width: '100%', height: '100vh', border: 'none'}}
                                    title="Editor"
                                ></iframe>
                            </div>
                        )
                    ) : (
                        <p>No Access.</p>
                    )
                ) : (
                    <p>Please login in first.</p>
                )
            }
        </div>
    );
};

export default ResumeEditor;