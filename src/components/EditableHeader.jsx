import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditMode } from '../features/editor/editorSlice';

import edit_icon from '../assets/icons/edit_icon.svg';
import close_icon from '../assets/icons/close_icon.svg';
import user_icon from '../assets/icons/user_icon.svg';

import { logout } from "../features/auth/authSlice";
import { useNavigate } from 'react-router-dom';

const EditableHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const editMode = useSelector((state) => state.editor.editMode);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const userToken = useSelector((state) => state.auth.userToken);

    if (!userToken) {
        return null;
    }
    const toggleAdminMenu = () => {
        setIsAdminOpen(prev => !prev);
    };
    const handleLogout = () => {
        navigate('/logout');

    };

    return (
        <>
            <div className="bg-stone-800 fixed left-0 right-0 flex flex-row justify-between z-50">
                <div>
                    <button
                        onClick={() => dispatch(toggleEditMode())}
                        className="p-2 h-10 flex items-center justify-center cursor-pointer hover:bg-stone-700"
                    >
                        {editMode ? (
                            <>
                                <img className="h-8" src={close_icon} alt="Edit icon" />
                                <span className='text-white text-xs'>Zakończ edycje</span>
                            </>
                        ) : (
                            <>
                                <img className="h-8" src={edit_icon} alt="Edit icon" />
                                <span className='text-white text-xs'>Edytuj strone</span>
                            </>
                        )}
                    </button>
                </div>
                <div className="relative">
                    <button
                        onClick={toggleAdminMenu}
                        className="p-2 h-10 flex items-center justify-center cursor-pointer hover:bg-stone-700"
                    >
                        <span className='text-white text-xs mr-1'>Admin</span>
                        <img className="h-8" src={user_icon} alt="User icon" />
                    </button>

                    {isAdminOpen && (
                        <nav className="absolute right-2 bg-stone-800 shadow-lg w-40 text-white text-sm" role="menu">
                            <ul>
                                <li role="none">
                                    <button
                                        onClick={handleLogout}
                                        role="menuitem"
                                        className="cursor-pointer w-full text-left px-4 py-2 hover:bg-stone-600 border-b border-stone-700"
                                    >
                                        Wyloguj
                                    </button>
                                </li>
                            </ul>
                        </nav>

                    )}
                </div>
            </div>
            <div className="pb-[40px]"></div>
        </>
    );
};

export default EditableHeader;
