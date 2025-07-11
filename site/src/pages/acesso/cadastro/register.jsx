import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../services/api";
import "../login/Login.css";          // já contém .parallax‑container & .parallax-background

function Register() {
  const inputName = useRef();
  const inputPhone = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const navigate = useNavigate();

  /* ---------- PARALLAX (mesma lógica do login) ---------- */
  useEffect(() => {
    const container = document.querySelector(".parallax-container");
    const bg = document.querySelector(".parallax-background");

    const MAX_OFFSET = 120; // intensidade

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

  /* ---------- CRIAR USUÁRIO ---------- */
  async function createUsers() {
    try {
      const { data } = await Api.get("/usuarios");

      const name = inputName.current.value;
      const email = inputEmail.current.value;

      const exists = data.some((u) => u.name === name && u.email === email);
      if (exists) return alert("Já existe um usuário com este nome ou email");

      const { data: created } = await Api.post("/usuarios", {
        name,
        phone: inputPhone.current.value,
        email,
        password: inputPassword.current.value,
      });

      navigate(`/PaginaPrincipal/${created.id}`);
    } catch (err) {
      console.error(err);
      alert("Erro ao criar usuário. Tente novamente.");
    }
  }

  /* ---------- JSX ---------- */
  return (
    <div className="parallax-container">
      {/* fundo animado */}
      <div className="parallax-background" />

      {/* conteúdo */}
      <div className="PageContainer">
        <div className="LoginContainer">
          <h1>Cadastro</h1>

          <div className="InputContainer">
            <form>
                <div className="bugfix">
                    <label>Usuário</label>
                    <input
                    name="name"
                    ref={inputName}
                    placeholder="Digite seu usuário"
                    className="InputConfig"
                    />

                    <label>Email</label>
                    <input
                    name="email"
                    type="email"
                    ref={inputEmail}
                    placeholder="Digite seu email"
                    className="InputConfig"
                    />

                    <label>Telefone</label>
                    <input
                    name="phone"
                    ref={inputPhone}
                    placeholder="Digite seu telefone"
                    className="InputConfig"
                    />

                    <label>Senha</label>
                    <input
                    name="password"
                    ref={inputPassword}
                    placeholder="Crie sua senha"
                    className="InputConfig"
                    />
                </div>

              <button
                type="button"
                onClick={createUsers}
                className="LoginButton"
                id="firstbuc"
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
