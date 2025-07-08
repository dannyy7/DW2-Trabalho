import { useEffect, useState } from "react";
import './Login.css';
import eyeIconOn from "../../../assets/images/view.png";
import eyeIconOff from "../../../assets/images/hide.png";
import { useNavigate } from 'react-router-dom';
import Api from "../../../services/api";

function Login() {
  const [eightPassword, setEightPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [UserName, setUserName] = useState('');
  const navigate = useNavigate();

  // Parallax effect
  useEffect(() => {
    const container = document.querySelector('.parallax-container');
    const background = document.querySelector('.parallax-background');

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      if (background) {
        background.style.setProperty('--offset-x', `${x}px`);
        background.style.setProperty('--offset-y', `${y}px`);
      }
    };

    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Login handler
  async function getUsers() {
    try {
      const response = await Api.get('/usuarios');
      const users = response.data;
      const filteredUsers = users.filter(
        user => (user.name === UserName || user.email === UserName) && user.password === eightPassword
      );

      if (filteredUsers.length > 0) {
        const userId = filteredUsers[0].id;
        navigate(`/PaginaPrincipal/${userId}`);
      } else {
        alert('Usuário ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      alert('Erro ao fazer login. Verifique as informações.');
    }
  }

  // Password toggle
  function mostrarSenha() {
    setShowPassword(!showPassword);
  }

  // Register navigation
  function clique() {
    navigate(`/Register`);
  }

  // Esqueci minha senha
  function esqueci() {
    alert("Função de recuperação de senha ainda não implementada.");
  }

  return (
    <div className="parallax-container">
      <div className='PageContainer'>
        <div className="LoginContainer">
          <h1>Login</h1>
          <div className='InputContainer'>
            <div className="bugfix">
              <label>Usuário</label>
              <input
                className='InputConfig'
                type="text"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Digite seu UserName ou email"
              />
              <div id='PasswordConfig'>
                <label>Senha</label>
              </div>
              <div className='EightPasswordConfig'>
                <input
                  className='InputConfig'
                  type={showPassword ? 'text' : 'password'}
                  value={eightPassword}
                  onChange={(e) => setEightPassword(e.target.value)}
                  placeholder="Digite sua senha de 8 dígitos"
                />
                <button id='MostrarSenhaConfig' onClick={mostrarSenha}>
                  <img
                    src={showPassword ? eyeIconOff : eyeIconOn}
                    alt={showPassword ? "Ocultar" : "Revelar"}
                    className='EyeIconConfig'
                  />
                </button>
              </div>
              <div id='EsqueciSenha'>
                <button onClick={esqueci} id="EsqueciMinhaSenha">Esqueci Minha Senha</button>
              </div>
            </div>
            <button onClick={getUsers} className='LoginButton' id="firstbul">Entrar</button>
            <button onClick={clique} className='LoginButton'>Cadastrar-se</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
