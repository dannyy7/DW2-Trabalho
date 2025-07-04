import Api from "../../../services/api";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
    const inputName = useRef()
    const inputPhone = useRef()
    const inputEmail = useRef()
    const inputPassword = useRef()
    const navigate = useNavigate();

    async function createUsers() {

        try {
            const response = await Api.get('/usuarios');
            const users = response.data;
            const filteredUsers = users.filter(user => (user.name === inputName && user.email === inputEmail));
            var name = filteredUsers[0];
            const email = filteredUsers[1];
            const userId = filteredUsers[0].id;


            if (inputName != name && inputEmail != email) {
                await Api.post('/usuarios', {
                    name: inputName.current.value,
                    phone: inputPhone.current.value,
                    email: inputEmail.current.value,
                    password: inputPassword.current.value
                })
                navigate(`/PaginaPrincipal/${userId}`);
            } else {
                alert('email e nome precisam ser diferentes');
            }

        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            alert(name);
        }


    }

    return (
        <div className="container">
            <form action="">
                <div className="name">
                    <input name='name' type="text" ref={inputName} placeholder="name" />
                </div>
                <div className="email">
                    <input name='email' type="email" ref={inputEmail} placeholder="email" />
                </div>
                <div className="phone">
                    <input name='phone' type="text" ref={inputPhone} placeholder="phone" />
                </div>
                <div className="password">
                    <input name='password' type="text" ref={inputPassword} placeholder="password" />
                </div>
                <div className="button">
                    <button type="button" onClick={createUsers}>
                        clique
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register;