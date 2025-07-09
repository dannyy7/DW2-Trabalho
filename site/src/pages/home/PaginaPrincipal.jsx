import { useEffect, useState } from "react";
import './PaginaPrincipal.css';
import logo from '../../assets/images/image.png';
import { useParams } from 'react-router-dom';
import Api from "../../services/api";

export default function PaginaPrincipal() {
    const [PaginaCriarGasto, setPaginaCriarGasto] = useState(false);
    const [CategoriaGasto, setCategoriaGasto] = useState(false);
    const [TipoGasto, setTipoGasto] = useState(false);
    const [PaginaCriarCategoria, setPaginaCriarCategoria] = useState(false);
    const [NomeCategoria, setNomeCategoria] = useState("");
    const [ErroCategoria, setErroCategoria] = useState("");
    const [Categorias, setCategorias] = useState([]);
    const [MostrarAdicionarCategoria, setMostrarAdicionarCategoria] = useState(true);
    const [MostrarCategorias, setMostrarCategorias] = useState(false);
    const [MostrarTipoGasto, setMostrarTipoGasto] = useState(false);

    const [NomeGasto, setNomeGasto] = useState("");
    const [ValordoTipo, setValordoTipo] = useState("");
    const [CategoriaDoGasto, setCategoriaDoGasto] = useState("");
    const [ValorGasto, setValorGasto] = useState("");
    const [DescricaoGasto, setDescricaoGasto] = useState("");
    const [DataGasto, setDataGasto] = useState("");

    const [ArrayDeGastos, setArrayDeGastos] = useState([]);

    const [GastoSelecionado, setGastoSelecionado] = useState(null);

    const [EditarNome, setEditarNome] = useState("");
    const [EditarValor, setEditarValor] = useState("");
    const [EditarDescricao, setEditarDescricao] = useState("");
    const [EditarData, setEditarData] = useState("");
    const [EditarCategoria, setEditarCategoria] = useState("");
    const [EditarTipo, setEditarTipo] = useState("");
    const [MostrarCategoriasEdicao, setMostrarCategoriasEdicao] = useState(false);
    const [MostrarTipoGastoEdicao, setMostrarTipoGastoEdicao] = useState(false);

    function CriarGasto() {
        setPaginaCriarGasto(true);
    }

    function LimparAdicionarCategoria() {
        setMostrarAdicionarCategoria(false);
    }

    function EscolherCategoriaGasto() {
        setCategoriaGasto(true);
        setMostrarCategorias(!MostrarCategorias);
    }

    function EscolherTipoGasto() {
        setTipoGasto(true);
        setMostrarTipoGasto(!MostrarTipoGasto);
    }

    function CriarCategoria() {
        setPaginaCriarCategoria(true);
        setMostrarAdicionarCategoria(true);
    }

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
        setPaginaCriarGasto(false);
        setNomeGasto("");
        setDescricaoGasto("");
        setValordoTipo("");
        setCategoriaDoGasto("");
        setValorGasto("");
        setDataGasto("");


        createSpent();

    }

    function EscolherCategoria(z) {
        setMostrarCategorias(!MostrarCategorias);
        setCategoriaDoGasto(z);
    }

    function AdicionarArrayCategorias() {
        const nomeTrimado = NomeCategoria.trim();
        if (Categorias.includes(nomeTrimado) || nomeTrimado === "") {
            return;
        }
        setCategorias([...Categorias, nomeTrimado]);
        setNomeCategoria("");
        LimparAdicionarCategoria();
    }

    function AbrirEdicao(gasto, index) {
        setGastoSelecionado({ ...gasto, index });
        setEditarNome(gasto.name);
        setEditarValor(gasto.value);
        setEditarData(gasto.date);
        setEditarDescricao(gasto.description);
        setEditarCategoria(gasto.category);   // <- CORRETO
        setEditarTipo(gasto.type);
        buscarCategoriaDoGastoSelecionado(gasto.id);
    }

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

    function ExcluirGasto() {
        const gastosAtualizados = ArrayDeGastos.filter((_, i) => i !== GastoSelecionado.index);
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
                                <button className="botoes" onClick={EscolherCategoriaGasto}>Escolher Categoria</button>
                                {CategoriaGasto && MostrarCategorias && (
                                    <div className="categorias">
                                        <button className="botoes" onClick={CriarCategoria}>Novo</button>
                                        {Categorias.map(x => (
                                            <button className="botoes" key={x} onClick={() => EscolherCategoria(x)}>{x}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="criacategoria">
                                <button className="botoes" onClick={EscolherTipoGasto}>Escolher Tipo</button>

                                {TipoGasto && MostrarTipoGasto && (
                                    <div className="tipo-gasto">
                                        <button className="botoes" onClick={() => setValordoTipo("Fixo")}>Fixo</button>
                                        <button className="botoes" onClick={() => setValordoTipo("Variável")}>Variável</button>
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
                                    <button id="namebu" onClick={AdicionarArrayCategorias}>Adicionar</button>
                                </div>
                            )}
                        </div>
                    )}

                    <button id="criar" onClick={Gastos}>Criar</button>
                </div>
            </div>
        );
    }

    const { id } = useParams();

    async function createSpent() {
        try {
            await Api.post('/spent', {
                name: NomeGasto,
                value: parseFloat(ValorGasto),      // converte para float
                description: DescricaoGasto,
                category: CategoriaDoGasto,
                date: DataGasto,                    // string no formato 'YYYY-MM-DD'
                type: ValordoTipo,
                userId: id,                        // id vindo do useParams
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
            const response = await Api.get(`/spent/${gastoId}`); // 👈 passo 3
            const gasto = response.data;

            const categoria = gasto.category; // 👈 passo 4

            if (categoria && !Categorias.includes(categoria)) {
                setCategorias((prev) => [...prev, categoria]); // 👈 passo 5
            }
        } catch (error) {
            console.error("Erro ao buscar categoria do gasto:", error);
        }
    }


    useEffect(() => {
        getSpents(); // já chama os gastos também 
    }, []);

    return (
        <>
            <div className="Cabecalho">
                <img src={logo} alt="Logo da empresa" id="logo" />
                <div className="BoxPesquisa">
                    <input type="text" name="BarraPesquisa" id="Pesquisar" placeholder="🔍︎Pesquisar" />
                    <button onClick={CriarGasto} id="CriarGasto">+</button>
                </div>
            </div>

            <div className="boxbarra"></div>
            {GastoCriar}

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
                                    onChange={e => setEditarNome(e.target.value)}
                                    placeholder="Digite o nome do gasto"
                                />
                                <label>Valor do Gasto</label>
                                <input
                                    className="linha"
                                    type="number"
                                    value={EditarValor}
                                    onChange={e => setEditarValor(e.target.value)}
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
                                    onChange={e => setEditarData(e.target.value)}
                                />
                                <div className="row">
                                    <p>Categoria: {EditarCategoria}</p>
                                    <p>Tipo: {EditarTipo}</p>
                                </div>
                            </div>

                            <div className="Colum2">
                                <div className="criacategoria">
                                    <button className="botoes" onClick={() => setMostrarCategoriasEdicao(!MostrarCategoriasEdicao)}>Escolher Categoria</button>
                                    {MostrarCategoriasEdicao && (
                                        <div className="categorias">
                                            <button className="botoes" onClick={CriarCategoria}>Novo</button>
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
                                </div>

                                <div className="criacategoria">
                                    <button className="botoes" onClick={() => setMostrarTipoGastoEdicao(!MostrarTipoGastoEdicao)}>Escolher Tipo</button>
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
                            <button className="modal-btn-salvar" onClick={SalvarEdicao}>Salvar</button>
                            <button className="modal-btn-excluir" onClick={ExcluirGasto}>Excluir</button>
                        </div>
                        <button className="modal-btn-cancelar" onClick={() => setGastoSelecionado(null)}>Cancelar</button>
                    </div>
                </div>
            )}

            {
                ArrayDeGastos.map((spent) => (
                    <div key={spent.id}>
                        <button
                            id="Gastoss"
                            onClick={() => AbrirEdicao(spent, spent.id)}
                        >
                            <strong>Nome:</strong> {spent.name} <br />
                            <strong>Descrição:</strong>{spent.description}<br />
                            <strong>Valor:</strong> R$ {spent.value} <br />
                            <strong>Tipo:</strong> {spent.type} <br />
                            <strong>Categoria:</strong> {spent.category} <br />
                            <strong>Data:</strong> {spent.date}
                        </button>
                    </div>
                ))
            }

        </>
    );
}