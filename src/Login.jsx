import { useState } from 'react';
import './Login.css';

function Login() {
  const [eightPassword, setEightPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function mostrarSenha() {
    setShowPassword(!showPassword);
  }

  function esqueciSenha() {
    alert('Recuperação de senha enviada para seu e-mail!'); // mudar depois
  }

  function entrar() {
    alert(`Tentando entrar com senha: ${eightPassword}`); // mudar depois
  }

  let tipoInput;
  if (showPassword) {
    tipoInput = 'text';
  } else {
    tipoInput = 'password';
  }

  let textoBotaoMostrarSenha;
  if (showPassword) {
    textoBotaoMostrarSenha = 'Ocultar Senha';
  } else {
    textoBotaoMostrarSenha = 'Revelar Senha';
  }

  return (
    <div className="LoginContainer">
      <input
        type={tipoInput}
        value={eightPassword}
        onChange={(e) => setEightPassword(e.target.value)}
        placeholder="Digite sua senha de 8 dígitos"
      />
      <br />
      <button onClick={mostrarSenha}>{textoBotaoMostrarSenha}</button>
      <button onClick={esqueciSenha}>Esqueci Minha Senha</button>
      <button onClick={entrar}>Entrar</button>
    </div>
  );
}

export default Login;