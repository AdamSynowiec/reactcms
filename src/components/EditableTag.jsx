import { useDispatch, useSelector } from 'react-redux';
import { setCurrentEdit, collectUID } from '../features/editor/editorSlice';
import { useEffect } from 'react';
import Skeleton from './Skeleton';
import { getString } from '../utils/getString';

const DUMMY_VALUES = {
    text: getString('edit.content.noContent'),
    href: '#',
    alt: getString('edit.content.noDescription'),
    src: '#',
    items: ['Brak elementów']
};

export default function EditableTag({ tagName, className, uid, editableFields, isVoid = false }) {
    const dispatch = useDispatch();
    const editMode = useSelector((state) => state.editor.editMode);
    const liveUpdates = useSelector((state) => state.editor.liveUpdates);

    useEffect(() => {
        if (uid) {
            dispatch(collectUID(uid));
        }
    }, [uid, dispatch]);

    const liveContent = liveUpdates[uid];
    const Tag = tagName;

    const handleClick = () => {
        if (editMode) {
            dispatch(setCurrentEdit({ uid, tagName, editableFields, content: liveContent || {} }));
        }
    };

    if (!liveContent) {
        return editMode ? (
            <button
                onClick={() => {
                    const empty = {};
                    editableFields.forEach(f => (empty[f] = f === 'items' ? [] : ''));
                    dispatch(setCurrentEdit({ uid, tagName, editableFields, content: empty }));
                }}
                className="block w-full text-left p-4 border border-dashed cursor-pointer border-slate-300 text-slate-600 text-sm hover:bg-slate-50"
            >
                {getString('edit.content.noTag')}
            </button>
        ) : <div className=''>{getString('edit.content.noContent')}</div>;
    }

    if (isVoid) {
        const props = editableFields.reduce((acc, f) => {
            acc[f] = liveContent[f] || DUMMY_VALUES[f] || '';
            return acc;
        }, {});

        return <Tag
            className={`${className || ''} ${editMode ? 'outline outline-2 outline-blue-400 cursor-pointer hover:bg-blue-400/[0.1]' : ''}`}
            uid={uid}
            {...props}
            onClick={(e) => {
                if (editMode) {
                    e.preventDefault();
                    handleClick();
                }
            }}
        />;
    }

    if (tagName === 'ul' || tagName === 'ol') {
        const items = liveContent.items?.length ? liveContent.items : DUMMY_VALUES.items;
        return <Tag
            className={`${className || ''} ${editMode ? 'outline outline-2 outline-blue-400 cursor-pointer hover:bg-blue-400/[0.1]' : ''}`}
            uid={uid}
            onClick={(e) => {
                if (editMode) {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            {items.map((item, i) => <li key={i}>{item}</li>)}
        </Tag>;
    }

    return <Tag
        className={`${className || ''} ${editMode ? 'outline outline-2 outline-blue-400 cursor-pointer hover:bg-blue-400/[0.1]' : ''}`}
        uid={uid}
        href={liveContent.href || DUMMY_VALUES.href}
        onClick={(e) => {
            if (editMode) {
                e.preventDefault();
                handleClick();
            }
        }}
    >
        {liveContent.text || DUMMY_VALUES.text}
    </Tag>;
}
