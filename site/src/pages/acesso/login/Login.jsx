import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Api from "../../../services/api";

import eyeIconOn from "../../../assets/images/view.png";
import eyeIconOff from "../../../assets/images/hide.png";

import "./Login.css";

function Login() {
  /* ---------------- ESTADOS ---------------- */
  const [UserName, setUserName] = useState("");
  const [eightPassword, setEightPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [mostrarRedefinirSenha, setMostrarRedefinirSenha] = useState(false);
  const [usuarioParaRedefinir, setUsuarioParaRedefinir] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);

  const navigate = useNavigate();

  /* ---------------- PARALLAX ---------------- */
  useEffect(() => {
    const container = document.querySelector(".parallax-container");
    const bg = document.querySelector(".parallax-background");

    const MAX_OFFSET = 70; // intensidade do parallax (px)

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * MAX_OFFSET;
      const y = (e.clientY / innerHeight - 0.5) * MAX_OFFSET;
      bg?.style.setProperty("--offset-x", `${x}px`);
      bg?.style.setProperty("--offset-y", `${y}px`);
    };

    container?.addEventListener("mousemove", handleMouseMove);
    return () => container?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ---------------- LOGIN / API ------------- */
  async function getUsers() {
    try {
      const { data } = await Api.get("/usuarios");
      const user = data.find(
        (u) =>
          (u.name === UserName || u.email === UserName) &&
          u.password === eightPassword,
      );
      user ? navigate(`/PaginaPrincipal/${user.id}`) : alert("Usuário/senha inválidos.");
    } catch {
      alert("Erro ao fazer login.");
    }
  }

  async function loginComGoogle(res) {
    try {
      const { data } = await Api.post("/auth/google", { token: res.credential });
      navigate(`/PaginaPrincipal/${data.id}`);
    } catch {
      alert("Erro ao logar com Google.");
    }
  }

  async function redefinirSenha() {
    try {
      const { data } = await Api.get("/usuarios");
      const usuario = data.find(
        (u) => u.name === usuarioParaRedefinir || u.email === usuarioParaRedefinir,
      );
      if (!usuario) return alert("Usuário não encontrado.");

      await Api.put(`/usuarios/${usuario.id}`, { ...usuario, password: novaSenha });
      setMostrarRedefinirSenha(false);
      setNovaSenha("");
      setUsuarioParaRedefinir("");
      alert("Senha redefinida!");
    } catch {
      alert("Erro ao redefinir senha.");
    }
  }

  /* ---------------- JSX --------------------- */
  return (
    <div className="parallax-container">
      <div className="parallax-background" />
      <div className="PageContainer">
        <div className="LoginContainer">
          <h1>Login</h1>

          <div className="InputContainer">
            <div className="bugfix">
              <label>Usuário</label>
              <input
                className="InputConfig"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Digite seu UserName ou email"
              />
              <div id="PasswordConfig">
                <label>Senha</label>
              </div>
              <div className="EightPasswordConfig">
                <input
                  className="InputConfig"
                  type={showPassword ? "text" : "password"}
                  value={eightPassword}
                  onChange={(e) => setEightPassword(e.target.value)}
                  placeholder="Digite sua senha"
                />
                <button
                  id="MostrarSenhaConfig"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? eyeIconOff : eyeIconOn}
                    alt={showPassword ? "Ocultar" : "Mostrar"}
                    className="EyeIconConfig"
                  />
                </button>
              </div>

              <div id="EsqueciSenha">
                <button
                  onClick={() => setMostrarRedefinirSenha(true)}
                  id="EsqueciMinhaSenha"
                >
                  Esqueci Minha Senha
                </button>
              </div>
            </div>
            <button onClick={getUsers} className="LoginButton" id="firstbul">
              Entrar
            </button>
            <button
              onClick={() => navigate("/Register")}
              className="LoginButton"
            >
              Cadastrar-se
            </button>
            <div className="googlecss">
              <GoogleLogin
                onSuccess={loginComGoogle}
                onError={() => alert("Erro ao tentar login com Google.")}
              />
            </div>
          </div>
        </div>
        {mostrarRedefinirSenha && (
          <div className="modal-overlay">
            <div className="modal-redefinir">
              <h2>Redefinir Senha</h2>

              <label>Usuário ou Email</label>
              <input
                className="InputConfig"
                value={usuarioParaRedefinir}
                onChange={(e) => setUsuarioParaRedefinir(e.target.value)}
                placeholder="Digite usuário ou email"
              />

              <label>Nova Senha</label>
              <div className="EightPasswordConfig">
                <input
                  className="InputConfig"
                  type={mostrarNovaSenha ? "text" : "password"}
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
                    alt={mostrarNovaSenha ? "Ocultar" : "Mostrar"}
                    className="EyeIconConfig"
                  />
                </button>
              </div>

              <button className="LoginButton" onClick={redefinirSenha}>
                Salvar nova senha
              </button>
              <button
                className="LoginButton"
                onClick={() => setMostrarRedefinirSenha(false)}
              >
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
