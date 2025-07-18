import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuthState } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [form, setForm] = useState({ login: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userToken = useSelector((state) => state.auth.userToken);
    const [error, setError] = useState("")

    useEffect(() => {
        if (userToken) {
            navigate('/');
        }
    }, [userToken, navigate]); // navigate is stable but it's good practice to include it

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://admin.reactcms.ct8.pl/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: form.login,
                    password: form.password,
                }),
            });

            if (!res.ok) {
                setError("Błędne dane logowania");
                throw new Error('Błąd logowania');
            }

            const data = await res.json();
            dispatch(setUserAuthState({
                userId: data.userId,
                userToken: data.token,
            }));
            localStorage.setItem('token', data.token);
            navigate("/");
        } catch (error) {
            console.error('Błąd:', error.message);
        }
    };

    return (
        <div className="grid grid-cols-1 min-h-screen relative">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg aria-hidden="true" className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200">
                    <defs>
                        <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
                        <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth="0" />
                    </svg>
                    <rect width="100%" height="100%" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" strokeWidth="0" />
                </svg>
            </div>

            <div className="flex flex-col items-center justify-center p-8">
                <span className='text-red-500 px-2 mb-8'>{error}</span>
                <div className="w-full max-w-sm space-y-6">
                    <h2 className="text-3xl font-semibold text-stone-800 text-center">Zaloguj się</h2>
                    <p className="text-stone-500 text-center">Uzyskaj dostęp do panelu</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            type="text"
                            onChange={(e) => setForm({ ...form, login: e.target.value })}
                            placeholder="Login"
                            className={`bg-white ${error ? "outline-red-500" : ""}`}
                        />
                        <Input
                            type="password"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder="Hasło"
                            className={`bg-white ${error ? "outline-red-500" : ""}`}
                        />
                        <button
                            className="w-full bg-stone-800 hover:bg-stone-900 text-white cursor-pointer p-4"
                            type="submit"
                        >
                            Zaloguj się
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
