import Api from "../../../services/api";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
    const inputName = useRef();
    const inputPhone = useRef();
    const inputEmail = useRef();
    const inputPassword = useRef();
    const navigate = useNavigate();

    async function createUsers() {
        try {
            const response = await Api.get('/usuarios');
            const users = response.data;

            // Pegando os valores dos inputs
            const nameValue = inputName.current.value;
            const emailValue = inputEmail.current.value;

            // Verifica se já existe usuário com mesmo nome ou email
            const alreadyExists = users.some(user =>
                user.name === nameValue && user.email === emailValue
            );

            if (!alreadyExists) {
                const createResponse = await Api.post('/usuarios', {
                    name: nameValue,
                    phone: inputPhone.current.value,
                    email: emailValue,
                    password: inputPassword.current.value
                });

                const createdUser = createResponse.data;

                // Redireciona usando o ID retornado
                navigate(`/PaginaPrincipal/${createdUser.id}`);
            } else {
                alert('Já existe um usuário com este nome ou email');
            }

        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            alert("Erro ao criar usuário. Tente novamente. Trocando email ou nome");
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