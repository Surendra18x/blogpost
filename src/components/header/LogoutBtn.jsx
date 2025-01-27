import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authservice from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    
    const dispatch = useDispatch();
    const handleLogout = () => {
        authservice.logout().then(() => {
            dispatch(logout())
    })
    useNavigate("/")
    }

    return (
        <button
        onClick={handleLogout}
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        >Logout</button>
    )
}

export default LogoutBtn

