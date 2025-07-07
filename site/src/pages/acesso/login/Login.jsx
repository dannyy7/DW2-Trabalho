import { useEffect, useState, useRef } from "react";
import './Login.css';
import eyeIconOn from "../../../assets/images/view.png";
import eyeIconOff from "../../../assets/images/hide.png";
import { useNavigate } from 'react-router-dom';
import Api from "../../../services/api";

function Login() {
  async function getUsers() {
    try {
      const response = await Api.get('/usuarios');
      const users = response.data;
      const filteredUsers = users.filter(user => (user.name === UserName || user.email === UserName) && user.password === eightPassword);
      const userId = filteredUsers[0].id;

      if (filteredUsers.length > 0) {
        navigate(`/PaginaPrincipal/${userId}`);
      } else {
        alert('Usuário ou senha incorretos.');
      }

    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      alert('Erro ao fazer login. Verifique as informações.');
    }
  }

  const [eightPassword, setEightPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [UserName, setUserName] = useState('');
  const navigate = useNavigate();
  const entrar = () => {
    getUsers()
  };

  function mostrarSenha() {
    setShowPassword(!showPassword);
  }

  let password;
  if (showPassword) {
    password = 'text';
  } else {
    password = 'password';
  }

  let textoBotaoMostrarSenha;
  if (showPassword) {
    textoBotaoMostrarSenha = <img src={eyeIconOff} alt="Ocultar" className='EyeIconConfig' />;
  } else {
    textoBotaoMostrarSenha = <img src={eyeIconOn} alt="Revelar" className='EyeIconConfig' />;
  }

  function clique() {
    navigate(`/Register`)
  }

  function esqueci2(){
    <>
    <button type="button"></button>
    </>
  }

  function esqueci(){
    alert(esqueci2())
  }

  return (
    <div className='PageContainer'>
      <div className="LoginContainer">
        <h1>Login</h1>
        <div className='InputContainer'>
          <div className="bugfix">
            <label>Usuario</label>
            <input
              className='InputConfig'
              type={'text'}
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Digite seu UserName ou seu email"
            />
            <div id='PasswordConfig'>
              <label>Senha</label>
            </div>
            <div className='EightPasswordConfig'>
              <input
                className='InputConfig'
                type={password}
                value={eightPassword}
                onChange={(e) => setEightPassword(e.target.value)}
                placeholder="Digite sua senha de 8 dígitos"
              />
              <button id='MostrarSenhaConfig' onClick={mostrarSenha}>{textoBotaoMostrarSenha}</button>
            </div>
            <div id='EsqueciSenha'>
              <button onClick={esqueci} id="EsqueciMinhaSenha">Esqueci Minha Senha</button>
            </div >
            </div>
          <button onClick={entrar} className='LoginButton' id="firstbul">Entrar</button>
          <button onClick={clique} className='LoginButton'>Cadastrar-se</button>
        </div>
      </div>
    </div >
  );
}

export default Login;
