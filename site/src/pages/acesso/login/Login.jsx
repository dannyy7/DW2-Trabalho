import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Api from "../../../services/api";
import './Login.css';

import eyeIconOn from "../../../assets/images/view.png";
import eyeIconOff from "../../../assets/images/hide.png";

function Login() {
  // Estados para login
  const [UserName, setUserName] = useState('');
  const [eightPassword, setEightPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Estados para redefinir senha
  const [mostrarRedefinirSenha, setMostrarRedefinirSenha] = useState(false);
  const [usuarioParaRedefinir, setUsuarioParaRedefinir] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);

  const navigate = useNavigate();

  // Efeito parallax no fundo
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

  // Login com usuário/senha
  async function getUsers() {
    try {
      const response = await Api.get('/usuarios');
      const users = response.data;

      const filteredUsers = users.filter(
        user =>
          (user.name === UserName || user.email === UserName) &&
          user.password === eightPassword
      );

      if (filteredUsers.length > 0) {
        navigate(`/PaginaPrincipal/${filteredUsers[0].id}`);
      } else {
        alert('Usuário ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      alert('Erro ao fazer login. Verifique as informações.');
    }
  }

  // Login com Google
  async function loginComGoogle(credentialResponse) {
    const credential = credentialResponse.credential;

    try {
      const response = await Api.post('/auth/google', { token: credential });
      const { id } = response.data;
      navigate(`/PaginaPrincipal/${id}`);
    } catch (err) {
      console.error('Erro no login com Google:', err);
      alert('Erro ao logar com Google.');
    }
  }

  // Redefinir senha
  async function redefinirSenha() {
    try {
      const response = await Api.get('/usuarios');
      const usuarios = response.data;

      const usuario = usuarios.find(user =>
        user.name === usuarioParaRedefinir || user.email === usuarioParaRedefinir
      );

      if (!usuario) {
        alert("Usuário não encontrado.");
        return;
      }

      await Api.put(`/usuarios/${usuario.id}`, {
        ...usuario,
        password: novaSenha,
      });

      alert("Senha redefinida com sucesso!");
      setMostrarRedefinirSenha(false);
      setNovaSenha('');
      setUsuarioParaRedefinir('');
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      alert("Erro ao redefinir senha.");
    }
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
                <button id='MostrarSenhaConfig' onClick={() => setShowPassword(!showPassword)}>
                  <img
                    src={showPassword ? eyeIconOff : eyeIconOn}
                    alt={showPassword ? "Ocultar" : "Revelar"}
                    className='EyeIconConfig'
                  />
                </button>
              </div>

              <div id='EsqueciSenha'>
                <button onClick={() => setMostrarRedefinirSenha(true)} id="EsqueciMinhaSenha">
                  Esqueci Minha Senha
                </button>
              </div>
            </div>

            <button onClick={getUsers} className='LoginButton' id="firstbul">
              Entrar
            </button>

            <button onClick={() => navigate('/Register')} className='LoginButton'>
              Cadastrar-se
            </button>

            <GoogleLogin
              onSuccess={loginComGoogle}
              onError={() => alert("Erro ao tentar login com Google.")}
            />
          </div>
        </div>

        {/* Modal de redefinição de senha */}
        {mostrarRedefinirSenha && (
          <div className="modal-overlay">
            <div className="modal-redefinir">
              <h2>Redefinir Senha</h2>

              <label>Usuário ou Email</label>
              <input
                type="text"
                className="InputConfig"
                value={usuarioParaRedefinir}
                onChange={(e) => setUsuarioParaRedefinir(e.target.value)}
                placeholder="Digite seu usuário ou email"
              />

              <label>Nova Senha</label>
              <div className="EightPasswordConfig">
                <input
                  type={mostrarNovaSenha ? "text" : "password"}
                  className="InputConfig"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Digite a nova senha"
                />
                <button
                  id="MostrarSenhaConfig"
                  onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                >
                  <img
                    src={mostrarNovaSenha ? eyeIconOff : eyeIconOn}
                    alt={mostrarNovaSenha ? "Ocultar" : "Revelar"}
                    className='EyeIconConfig'
                  />
                </button>
              </div>

              <button className="LoginButton" onClick={redefinirSenha}>
                Salvar nova senha
              </button>
              <button className="LoginButton" onClick={() => setMostrarRedefinirSenha(false)}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
