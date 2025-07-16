import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditMode } from '../features/editor/editorSlice';

import edit_icon from '../assets/icons/edit_icon.svg';
import close_icon from '../assets/icons/close_icon.svg';
import user_icon from '../assets/icons/user_icon.svg';

const EditableHeader = () => {
    const dispatch = useDispatch();
    const editMode = useSelector((state) => state.editor.editMode);
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    const toggleAdminMenu = () => {
        setIsAdminOpen(prev => !prev);
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
                        <div className="absolute right-2 bg-stone-800 shadow-lg w-40 text-white text-sm">
                            <ul>
                                <li className="px-4 py-2 hover:bg-stone-600 cursor-pointer border-b border-stone-700">Wyloguj</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="pb-[40px]"></div>
        </>
    );
};

export default EditableHeader;
