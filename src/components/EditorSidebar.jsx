import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentEditContent, clearCurrentEdit, liveUpdate } from '../features/editor/editorSlice';
import { useState, useEffect } from 'react';
import Input from './Input';

const API_URL = 'https://admin.reactcms.ct8.pl/content';

export default function EditorSidebar() {
    const dispatch = useDispatch();
    const currentEdit = useSelector((state) => state.editor.currentEdit);
    const [formData, setFormData] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (currentEdit?.content) {
            setFormData(currentEdit.content);
        }
    }, [currentEdit]);

    useEffect(() => {
        if (currentEdit) {
            dispatch(liveUpdate({ uid: currentEdit.uid, content: formData }));
        }
    }, [formData]);

    if (!currentEdit) return null;

    const handleSave = async () => {
        setSaving(true);

        const token = localStorage.getItem('token'); // lub z redux/useContext
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ uid: currentEdit.uid, content: formData }),
        });

        const data = await res.json();

        if (data.success) {
            dispatch(updateCurrentEditContent(formData));
            setFormData(formData);
            dispatch(clearCurrentEdit());
        }

        setSaving(false);
    };



    const handleCancel = () => {
        dispatch(clearCurrentEdit());
    };

    const textMapping = (text) => ({ text: "Tekst", href: "Link", alt: "Opis zdjęcia (alt)", src: "Źródło (src)" }[text] || text);

    return (
        <div className="fixed top-0 right-0 w-80 h-full bg-white p-6 z-50 border-l border-[#eee]">
            <h2 className="text-lg font-bold mb-4">Edycja elementu: {currentEdit.tagName.toUpperCase()}</h2>
            {currentEdit.editableFields.map((field) => {
                if (field === 'items') {
                    return (
                        <div key={field}>
                            <label className="block mb-2 font-semibold">Elementy listy:</label>
                            {(formData.items || []).map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 mb-2">
                                    <input
                                        className="border px-2 py-1 rounded w-full"
                                        value={item}
                                        onChange={e => {
                                            const updated = [...formData.items];
                                            updated[idx] = e.target.value;
                                            setFormData({ ...formData, items: updated });
                                        }}
                                    />
                                    <button
                                        onClick={() =>
                                            setFormData({ ...formData, items: formData.items.filter((_, i) => i !== idx) })
                                        }
                                        className="text-red-500"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() =>
                                    setFormData({ ...formData, items: [...(formData.items || []), ''] })
                                }
                            >
                                + Dodaj
                            </button>
                        </div>
                    );
                }

                return (
                    <div key={field} className="mb-4">
                        <label className="block mb-1 font-semibold">{textMapping(field)}</label>
                        <Input
                            type="text"
                            value={formData[field] || ''}
                            onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                            className="w-full p-4 outline"
                        />
                    </div>
                );
            })}

            <div className="flex justify-end gap-2 mt-4">
                <button onClick={handleSave} disabled={saving} className="w-full bg-stone-800 hover:bg-stone-900 text-white cursor-pointer p-4">
                    {saving ? 'Zapisywanie...' : 'Zapisz'}
                </button>
                <button onClick={handleCancel} className="w-full bg-gray-200 hover:bg-gray-300 text-black cursor-pointer p-4">
                    Anuluj
                </button>
            </div>
        </div>
    );
}
