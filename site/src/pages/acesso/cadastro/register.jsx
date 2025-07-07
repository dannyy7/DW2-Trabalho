import Api from "../../../services/api";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import '../login/Login.css';

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
        <div className='PageContainer'>
        <div className="LoginContainer">
            <h1>Cadastro</h1>
            <div className='InputContainer'>
                <form action="">
                    <div className="bugfix">
                            <label>Usuario</label>
                            <input name='name' type="text" ref={inputName} placeholder="Digite seu nome de usuário" className='InputConfig' />

                        <div className="email">
                            <label>Email</label>
                            <input name='email' type="email" ref={inputEmail} placeholder="Digite seu email" className='InputConfig'/>
                        </div>
                        <div className="phone">
                            <label>Telefone</label>
                            <input name='phone' type="text" ref={inputPhone} placeholder="Digite seu telefone" className='InputConfig'/>
                        </div>
                            <label>Senha</label>
                            <input name='password' type="text" ref={inputPassword} placeholder="Crie sua senha" className='InputConfig'/>
                    </div>
                    <div className="button">
                        <button type="button" onClick={createUsers} className="LoginButton" id="firstbuc">
                            clique
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div >
    )
}

export default Register;