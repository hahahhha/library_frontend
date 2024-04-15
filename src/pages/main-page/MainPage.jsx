import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Admin from './Admin';
import Student from './Student';

import AuthError from '../../authError/AuthError';

function MainPage() {
    const [role, setRole] = useState("STUDENT")

    const [isAuthed, setIsAuthed] = useState(false);
    const [isServerErr, setIsServerErr] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem('access_token')
                const response = await axios.get(`http://localhost:5000/users/me/role/${token}`);

                const data = response.data;
                setRole(data.role);

                setIsAuthed(true);
            } catch (e) {
                console.log(e)
                if (e.response.status === 400) {
                    setIsAuthed(false);
                } else {
                    setIsServerErr(true);
                }
            }
        })();
    }, [])


    if (isServerErr) {
        return (
            <>
                <h1>Server error...</h1>
            </>
        )
    }
    if (!isAuthed) {
        return <AuthError />
    }

    if (role === "ADMIN") {
        return <Admin />
    } else {
        return <Student />
    }
}

export default MainPage