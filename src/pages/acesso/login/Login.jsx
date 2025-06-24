import { useState } from 'react';
import './Login.css';
import eyeIconOn from "../../../assets/images/view.png";
import eyeIconOff from "../../../assets/images/hide.png";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [eightPassword, setEightPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [UserName, setUserName] = useState('');
  const navigate = useNavigate();  
  const entrar = () => {
    navigate('/PaginaPrincipal');  
  };

  function mostrarSenha() {
    setShowPassword(!showPassword);
  }

  function esqueciSenha() {
    alert('Recuperação de senha enviada para seu e-mail!'); // mudar depois
  }

  let password;
  if (showPassword) {
    password = 'text';
  } else {
    password = 'password';
  }

  let textoBotaoMostrarSenha;
  if (showPassword) {
    textoBotaoMostrarSenha = <img src={eyeIconOff} alt="Ocultar" className='EyeIconConfig'/>;
  } else {
    textoBotaoMostrarSenha = <img src={eyeIconOn} alt="Revelar" className='EyeIconConfig'/>;
  }

  return (
    <div className='PageContainer'>
      <div className="LoginContainer">
        <h1>Login</h1>
        <div className='InputContainer'>
          <label>Usuario</label>
          <input
            className='InputConfig'
            type={'text'} 
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Digite seu UserName"
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
            <button onClick={esqueciSenha}>Esqueci Minha Senha</button>
          </div>
        <button onClick={entrar} id='LoginButton'>Entrar</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
