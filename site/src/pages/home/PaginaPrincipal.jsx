import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Api from "../../services/api";

import logo from "../../assets/images/image.png";
import user from "../../assets/images/user.png";
import eyeIconOn from "../../assets/images/view.png";
import eyeIconOff from "../../assets/images/hide.png";

import "./PaginaPrincipal.css";


export default function PaginaPrincipal() {
    // Estados para controle de telas e visibilidade
    const [PaginaCriarGasto, setPaginaCriarGasto] = useState(false);
    const [CategoriaGasto, setCategoriaGasto] = useState(false);
    const [TipoGasto, setTipoGasto] = useState(false);
    const [PaginaCriarCategoria, setPaginaCriarCategoria] = useState(false);

    const [MostrarAdicionarCategoria, setMostrarAdicionarCategoria] = useState(true);
    const [MostrarCategorias, setMostrarCategorias] = useState(false);
    const [MostrarTipoGasto, setMostrarTipoGasto] = useState(false);
    const [MostrarCategoriasEdicao, setMostrarCategoriasEdicao] = useState(false);
    const [MostrarTipoGastoEdicao, setMostrarTipoGastoEdicao] = useState(false);

    const [MostrarSidebarUsuario, setMostrarSidebarUsuario] = useState(false);
    const [EditarUsuario, setEditarUsuario] = useState(false);
    const [MostrarSenha, setMostrarSenha] = useState(false);

    // Estados para categorias e erros
    const [NomeCategoria, setNomeCategoria] = useState("");
    const [ErroCategoria, setErroCategoria] = useState("");
    const [Categorias, setCategorias] = useState([]);

    // Estados para o termo de pesquisa
    const [termoPesquisa, setTermoPesquisa] = useState("");

    // Estados para usuário
    const [Usuario, setUsuario] = useState("");

    // Estados para criação de gasto
    const [NomeGasto, setNomeGasto] = useState("");
    const [ValordoTipo, setValordoTipo] = useState("");
    const [CategoriaDoGasto, setCategoriaDoGasto] = useState("");
    const [ValorGasto, setValorGasto] = useState("");
    const [DescricaoGasto, setDescricaoGasto] = useState("");
    const [DataGasto, setDataGasto] = useState("");

    // Estados para lista e seleção de gastos
    const [ArrayDeGastos, setArrayDeGastos] = useState([]);
    const [GastoSelecionado, setGastoSelecionado] = useState(null);

    // Estados para edição de gasto
    const [EditarNome, setEditarNome] = useState("");
    const [EditarValor, setEditarValor] = useState("");
    const [EditarDescricao, setEditarDescricao] = useState("");
    const [EditarData, setEditarData] = useState("");
    const [EditarCategoria, setEditarCategoria] = useState("");
    const [EditarTipo, setEditarTipo] = useState("");


    // Controle de criação e manipulação do modal de criar gasto
    function CriarGasto() {
        setPaginaCriarGasto(true);
    }

    // Controle da sidebar do usuário
    function functionUser() {
        const novoEstado = !MostrarSidebarUsuario;
        setMostrarSidebarUsuario(novoEstado);
        if (novoEstado) {
            getUser(id);
        }
    }

    // Controle para limpar a seção de adicionar categoria
    function LimparAdicionarCategoria() {
        setMostrarAdicionarCategoria(false);
    }

    // Controle de escolha de categoria e tipo para criação de gasto
    function EscolherCategoriaGasto() {
        setCategoriaGasto(true);
        setMostrarCategorias(!MostrarCategorias);
    }

    function EscolherTipoGasto() {
        setTipoGasto(true);
        setMostrarTipoGasto(!MostrarTipoGasto);
    }

    // Controle para abrir tela de criar nova categoria
    function CriarCategoria() {
        setPaginaCriarCategoria(true);
        setMostrarAdicionarCategoria(true);
    }

    // Função para adicionar novo gasto à lista e enviar para API
    function Gastos() {
        const novoGasto = {
            NomeGastoObjeto: NomeGasto,
            TipoGastoObjeto: ValordoTipo,
            CategoriaGastoObjeto: CategoriaDoGasto,
            ValorGastoObjeto: ValorGasto,
            DescricaoGasto: DescricaoGasto,
            DataGastoObjeto: DataGasto,
            UserIdGastoObjeto: ""
        };

        setArrayDeGastos([...ArrayDeGastos, novoGasto]);

        // Resetar formulário
        setPaginaCriarGasto(false);
        setNomeGasto("");
        setDescricaoGasto("");
        setValordoTipo("");
        setCategoriaDoGasto("");
        setValorGasto("");
        setDataGasto("");

        createSpent();
    }

    // Seleção da categoria para o gasto
    function EscolherCategoria(z) {
        setMostrarCategorias(!MostrarCategorias);
        setCategoriaDoGasto(z);
    }

    // Adicionar categoria ao array de categorias
    function AdicionarArrayCategorias() {
        const nomeTrimado = NomeCategoria.trim();
        if (Categorias.includes(nomeTrimado) || nomeTrimado === "") {
            return;
        }
        setCategorias([...Categorias, nomeTrimado]);
        setNomeCategoria("");
        LimparAdicionarCategoria();
    }

    // Abrir modal de edição de gasto, carregando os dados atuais
    function AbrirEdicao(gasto, index) {
        setGastoSelecionado({ ...gasto, index });
        setEditarNome(gasto.name);
        setEditarValor(gasto.value);
        setEditarData(gasto.date);
        setEditarDescricao(gasto.description);
        setEditarCategoria(gasto.category);
        setEditarTipo(gasto.type);
        buscarCategoriaDoGastoSelecionado(gasto.id);
    }

    // Salvar edição do gasto
    function SalvarEdicao() {
        const gastosAtualizados = [...ArrayDeGastos];
        gastosAtualizados[GastoSelecionado.index] = {
            name: EditarNome,
            value: EditarValor,
            date: EditarData,
            description: EditarDescricao,
            category: EditarCategoria,
            type: EditarTipo,
            userId: id,
        };
        setArrayDeGastos(gastosAtualizados);
        setGastoSelecionado(null);
        putSpent();
    }

    // Excluir gasto selecionado
    function ExcluirGasto() {
        const gastosAtualizados = ArrayDeGastos.filter(
            (_, i) => i !== GastoSelecionado.index
        );
        setArrayDeGastos(gastosAtualizados);
        setGastoSelecionado(null);
        deleteSpents(GastoSelecionado.id);
    }


    let GastoCriar = null;

    if (PaginaCriarGasto) {
        GastoCriar = (
            <div className="boxall">
                <div className="boxcriargasto">
                    <p className="titulo">Crie Seu Gasto</p>
                    <div className="boxColum">
                        <div className="Colum1">
                            <label>Nome do Gasto</label>
                            <input
                                className="linha"
                                type="text"
                                value={NomeGasto}
                                onChange={(e) => setNomeGasto(e.target.value)}
                                placeholder="Digite o nome do gasto"
                            />
                            <label>Valor do Gasto</label>
                            <input
                                className="linha"
                                type="number"
                                value={ValorGasto}
                                onChange={(e) => setValorGasto(e.target.value)}
                            />
                            <label id="bugDescricao">Descrição</label>
                            <input
                                className="linha"
                                type="text"
                                value={DescricaoGasto}
                                onChange={(e) => setDescricaoGasto(e.target.value)}
                            />
                            <input
                                id="data"
                                className="linha"
                                type="date"
                                value={DataGasto}
                                onChange={(e) => setDataGasto(e.target.value)}
                            />
                            <div className="row">
                                <p>Categoria: {CategoriaDoGasto}</p>
                                <p>Tipo: {ValordoTipo}</p>
                            </div>
                        </div>

                        <div className="Colum2">
                            <div className="criacategoria">
                                <button className="botoes" onClick={EscolherCategoriaGasto}>
                                    Escolher Categoria
                                </button>
                                {CategoriaGasto && MostrarCategorias && (
                                    <div className="categorias">
                                        <button className="botoes" onClick={CriarCategoria}>
                                            Novo
                                        </button>
                                        {Categorias.map((x) => (
                                            <button
                                                className="botoes"
                                                key={x}
                                                onClick={() => EscolherCategoria(x)}
                                            >
                                                {x}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="criacategoria">
                                <button className="botoes" onClick={EscolherTipoGasto}>
                                    Escolher Tipo
                                </button>

                                {TipoGasto && MostrarTipoGasto && (
                                    <div className="tipo-gasto">
                                        <button
                                            className="botoes"
                                            onClick={() => setValordoTipo("Fixo")}
                                        >
                                            Fixo
                                        </button>
                                        <button
                                            className="botoes"
                                            onClick={() => setValordoTipo("Variável")}
                                        >
                                            Variável
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {PaginaCriarCategoria && (
                        <div className="criar-categoria">
                            {ErroCategoria !== "" && <p>{ErroCategoria}</p>}

                            {MostrarAdicionarCategoria && (
                                <div id="criacategoria">
                                    <input
                                        id="namecat"
                                        type="text"
                                        value={NomeCategoria}
                                        onChange={(e) => setNomeCategoria(e.target.value)}
                                        placeholder="Nome da nova categoria"
                                    />
                                    <button id="namebu" onClick={AdicionarArrayCategorias}>
                                        Adicionar
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <button id="criar" onClick={Gastos}>
                        Criar
                    </button>
                </div>
            </div>
        );
    }


    const { id } = useParams();

    async function createSpent() {
        try {
            await Api.post('/spent', {
                name: NomeGasto,
                value: parseFloat(ValorGasto), // converte para float
                description: DescricaoGasto,
                category: CategoriaDoGasto,
                date: DataGasto, // string no formato 'YYYY-MM-DD'
                type: ValordoTipo,
                userId: id, // id vindo do useParams
            });
            getSpents();
        } catch (error) {
            console.error("Erro ao criar gasto:", error);
        }
    }

    async function getSpents() {
        try {
            const response = await Api.get(`/spent?userId=${id}`);
            const gastosTratados = response.data.map(spent => ({
                ...spent,
                date: spent.date ? spent.date.split('T')[0] : ''
            }));
            setArrayDeGastos(gastosTratados);
        } catch (error) {
            console.error("Erro ao buscar gastos:", error);
        }
    }

    async function putSpent() {
        try {
            await Api.put(`/spent/${GastoSelecionado.id}`, {
                name: EditarNome,
                value: parseFloat(EditarValor),
                description: EditarDescricao,
                category: EditarCategoria,
                date: EditarData,
                type: EditarTipo,
                userId: id,
            });
            getSpents();
        } catch (error) {
            console.error("Erro ao alterar gasto:", error);
        }
    }

    async function deleteSpents(id) {
        await Api.delete(`/spent/${id}`);
        getSpents();
    }

    async function buscarCategoriaDoGastoSelecionado(gastoId) {
        try {
            const response = await Api.get(`/spent/${gastoId}`);
            const gasto = response.data;
            const categoria = gasto.category;

            if (categoria && !Categorias.includes(categoria)) {
                setCategorias((prev) => [...prev, categoria]);
            }
        } catch (error) {
            console.error("Erro ao buscar categoria do gasto:", error);
        }
    }

    async function Pesquisar() {
        try {
            if (!termoPesquisa.trim()) {
                getSpents(); // mostra todos se a busca estiver vazia
                return;
            }

            const response = await Api.get(`/spent/search?userId=${id}&name=${encodeURIComponent(termoPesquisa)}`);
            const resultados = response.data.map(spent => ({
                ...spent,
                date: spent.date ? spent.date.split('T')[0] : ''
            }));

            if (resultados.length === 0) {
                alert("Nenhum gasto com esse nome foi encontrado no banco de dados.");
            }

            setArrayDeGastos(resultados);
            setTermoPesquisa("");
        } catch (error) {
            console.error("Erro ao buscar despesa:", error);
            alert("Erro ao buscar despesa. Verifique a conexão ou tente novamente.");
        }
    }

    async function Return() {
        getSpents();
        return;
    }

    function handleDeletarConta() {
        if (window.confirm("Tem certeza que deseja deletar sua conta?")) {
            Api.delete(`/usuarios/${id}`) // supondo que você tenha essa rota
                .then(() => {
                    alert("Conta deletada com sucesso.");
                    window.location.href = "/";
                })
                .catch(() => alert("Erro ao deletar conta."));
        }
    }

    function handleSair() {
        window.location.href = "/";
    }

    async function getUser(id) {
        try {
            var response = await Api.get(`/usuarios/${id}`);
            var user = response.data;

            setUsuario({
                name: user.name,
                phone: user.phone,
                email: user.email,
                password: user.password,
            });

        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            alert("erro erro");
        }
    }

    async function putUser(id) {
        try {
            await Api.put(`/usuarios/${id}`, {
                name: Usuario.name,
                phone: Usuario.phone,
                email: Usuario.email,
                password: Usuario.password
            });
            getUser(id);
        } catch (error) {
            console.error("Erro ao alterar usuario:", error);
        }
    }

    function Ordenar() {
        // Função para implementar ordenação futuramente
    }

    useEffect(() => {
        getSpents();
    }, []);



    return (
        <>
            <div className="Cabecalho">
                <img src={logo} alt="Logo da empresa" id="logo" onClick={Return} />
                <div className="BoxPesquisa">
                    <input
                        type="text"
                        name="BarraPesquisa"
                        id="Pesquisar"
                        placeholder="Pesquisar"
                        value={termoPesquisa}
                        onChange={(e) => setTermoPesquisa(e.target.value)}
                    />
                    <button onClick={Pesquisar} id="iconPesquisar">
                        🔍︎
                    </button>
                    <button onClick={CriarGasto} id="CriarGasto">
                        +
                    </button>
                </div>
                <img src={user} alt="usuario" id="logo" onClick={functionUser} />
            </div>

            <div className="boxbarra"></div>

            {GastoCriar}

            {MostrarSidebarUsuario && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setMostrarSidebarUsuario(false)}
                >
                    <div
                        className="sidebar-usuario"
                        onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro da sidebar
                    >
                        <button
                            className="fechar-sidebar"
                            onClick={() => setMostrarSidebarUsuario(false)}
                        >
                            ×
                        </button>

                        <h2>Dados do Usuário</h2>

                        <label>Nome</label>
                        <input
                            type="text"
                            disabled={!EditarUsuario}
                            value={Usuario.name || ""}
                            onChange={(e) =>
                                setUsuario({ ...Usuario, nome: e.target.value })
                            }
                        />

                        <label>Telefone</label>
                        <input
                            type="text"
                            disabled={!EditarUsuario}
                            value={Usuario.phone || ""}
                            onChange={(e) =>
                                setUsuario({ ...Usuario, phone: e.target.value })
                            }
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            disabled={!EditarUsuario}
                            value={Usuario.email || ""}
                            onChange={(e) =>
                                setUsuario({ ...Usuario, email: e.target.value })
                            }
                        />

                        <label>Senha</label>
                        <div className="input-senha">
                            <input
                                type={MostrarSenha ? "text" : "password"}
                                disabled={!EditarUsuario}
                                value={Usuario.password || ""}
                                onChange={(e) =>
                                    setUsuario({ ...Usuario, password: e.target.value })
                                }
                            />
                            <button
                                type="button"
                                className="btn-olho"
                                onClick={() => setMostrarSenha(!MostrarSenha)}
                            >
                                <img
                                    src={MostrarSenha ? eyeIconOff : eyeIconOn}
                                    alt={MostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                                />
                            </button>
                        </div>

                        <div className="botoes-sidebar">
                            <button
                                onClick={() => {
                                    if (EditarUsuario) {
                                        alert("Dados salvos!");
                                        putUser(id);
                                        getUser(id);
                                    }
                                    setEditarUsuario(!EditarUsuario);
                                }}
                            >
                                {EditarUsuario ? "Salvar" : "Alterar Dados"}
                            </button>

                            <button onClick={handleDeletarConta}>Deletar Conta</button>
                            <button onClick={handleSair}>Sair</button>
                        </div>
                    </div>
                </div>
            )}

            {GastoSelecionado && (
                <div className="boxall">
                    <div className="modal-editar">
                        <p className="modal-titulo">Editar Gasto</p>
                        <div className="boxColum">
                            <div className="Colum1">
                                <label>Nome do Gasto</label>
                                <input
                                    className="linha"
                                    type="text"
                                    value={EditarNome}
                                    onChange={(e) => setEditarNome(e.target.value)}
                                    placeholder="Digite o nome do gasto"
                                />

                                <label>Valor do Gasto</label>
                                <input
                                    className="linha"
                                    type="number"
                                    value={EditarValor}
                                    onChange={(e) => setEditarValor(e.target.value)}
                                />

                                <label id="bugDescricao">Descrição</label>
                                <input
                                    className="linha"
                                    type="text"
                                    value={EditarDescricao}
                                    onChange={(e) => setEditarDescricao(e.target.value)}
                                />

                                <input
                                    id="data"
                                    className="linha"
                                    type="date"
                                    value={EditarData}
                                    onChange={(e) => setEditarData(e.target.value)}
                                />

                                <div className="row">
                                    <p>Categoria: {EditarCategoria}</p>
                                    <p>Tipo: {EditarTipo}</p>
                                </div>
                            </div>

                            <div className="Colum2">
                                <div className="criacategoria">
                                    <button
                                        className="botoes"
                                        onClick={() =>
                                            setMostrarCategoriasEdicao(!MostrarCategoriasEdicao)
                                        }
                                    >
                                        Escolher Categoria
                                    </button>

                                    {MostrarCategoriasEdicao && (
                                        <div className="categorias">
                                            <button className="botoes" onClick={CriarCategoria}>
                                                Novo
                                            </button>
                                            {Categorias.map((cat) => (
                                                <button
                                                    className="botoes"
                                                    key={cat}
                                                    onClick={() => {
                                                        setEditarCategoria(cat);
                                                        setMostrarCategoriasEdicao(false);
                                                    }}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {PaginaCriarCategoria && (
                                        <div className="criar-categoria">
                                            {ErroCategoria !== "" && <p>{ErroCategoria}</p>}
                                            {MostrarAdicionarCategoria && (
                                                <div id="criacategoria">
                                                    <input
                                                        id="namecat"
                                                        type="text"
                                                        value={NomeCategoria}
                                                        onChange={(e) => setNomeCategoria(e.target.value)}
                                                        placeholder="Nome da nova categoria"
                                                    />
                                                    <button id="namebu" onClick={AdicionarArrayCategorias}>
                                                        Adicionar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="criacategoria">
                                    <button
                                        className="botoes"
                                        onClick={() =>
                                            setMostrarTipoGastoEdicao(!MostrarTipoGastoEdicao)
                                        }
                                    >
                                        Escolher Tipo
                                    </button>

                                    {MostrarTipoGastoEdicao && (
                                        <div className="tipo-gasto">
                                            <button
                                                className="botoes"
                                                onClick={() => {
                                                    setEditarTipo("Fixo");
                                                    setMostrarTipoGastoEdicao(false);
                                                }}
                                            >
                                                Fixo
                                            </button>

                                            <button
                                                className="botoes"
                                                onClick={() => {
                                                    setEditarTipo("Variável");
                                                    setMostrarTipoGastoEdicao(false);
                                                }}
                                            >
                                                Variável
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="modal-row">
                            <button className="modal-btn-salvar" onClick={SalvarEdicao}>
                                Salvar
                            </button>
                            <button className="modal-btn-excluir" onClick={ExcluirGasto}>
                                Excluir
                            </button>
                        </div>

                        <button
                            className="modal-btn-cancelar"
                            onClick={() => setGastoSelecionado(null)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {ArrayDeGastos.map((spent) => (
                <div key={spent.id}>
                    <button id="Gastoss" onClick={() => AbrirEdicao(spent, spent.id)}>
                        <strong>Nome:</strong> {spent.name} <br />
                        <strong>Descrição:</strong> {spent.description} <br />
                        <strong>Valor:</strong> R$ {spent.value} <br />
                        <strong>Tipo:</strong> {spent.type} <br />
                        <strong>Categoria:</strong> {spent.category} <br />
                        <strong>Data:</strong> {spent.date}
                    </button>
                </div>
            ))}
        </>
    );
}