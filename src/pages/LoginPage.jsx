import React, { useState } from 'react';
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import { setUserAuthState } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [form, setForm] = useState({ login: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                throw new Error('Błąd logowania');
            }

            const data = await res.json();
            console.log(data)
            dispatch(setUserAuthState({
                userId: data.userId,
                userToken: data.token,
            }));
            localStorage.setItem('token', data.token)
            navigate("/");
        } catch (error) {
            console.error('Błąd:', error.message);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            {/* Lewa strona */}
            <div className="hidden md:flex flex-col items-center justify-center text-center p-8 bg-stone-900 ">
                <h1 className="text-5xl font-bold text-white tracking-wide">domena.pl</h1>
                <p className="text-stone-300 mt-4 text-lg">Panel Administracyjny</p>
            </div>

            {/* Prawa strona */}
            <div className="flex flex-col items-center justify-center p-8 bg-white">
                <div className="w-full max-w-sm space-y-6">
                    <h2 className="text-3xl font-semibold text-stone-800 text-center">Zaloguj się</h2>
                    <p className="text-stone-500 text-center">Uzyskaj dostęp do panelu</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            type="text"
                            onChange={(e) => setForm({ ...form, login: e.target.value })}
                            placeholder="Login"
                        />
                        <Input
                            type="password"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder="Hasło"
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
