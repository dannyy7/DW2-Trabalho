import { useState } from "react";
import './PaginaPrincipal.css';
import logo from '../../assets/images/image.png';

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
    const [DataGasto, setDataGasto] = useState("");

    const [ArrayDeGastos, setArrayDeGastos] = useState([]);

    const [GastoSelecionado, setGastoSelecionado] = useState(null);

    const [EditarNome, setEditarNome] = useState("");
    const [EditarValor, setEditarValor] = useState("");
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
            DataGastoObjeto: DataGasto,
            UserIdGastoObjeto: ""
        };

        setArrayDeGastos([...ArrayDeGastos, novoGasto]);
        setPaginaCriarGasto(false);
        setNomeGasto("");
        setValordoTipo("");
        setCategoriaDoGasto("");
        setValorGasto("");
        setDataGasto("");
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
        setEditarNome(gasto.NomeGastoObjeto);
        setEditarValor(gasto.ValorGastoObjeto);
        setEditarData(gasto.DataGastoObjeto);
        setEditarCategoria(gasto.CategoriaGastoObjeto);
        setEditarTipo(gasto.TipoGastoObjeto);
        setMostrarCategoriasEdicao(false);
        setMostrarTipoGastoEdicao(false);
    }

    function SalvarEdicao() {
        const gastosAtualizados = [...ArrayDeGastos];
        gastosAtualizados[GastoSelecionado.index] = {
            NomeGastoObjeto: EditarNome,
            ValorGastoObjeto: EditarValor,
            DataGastoObjeto: EditarData,
            CategoriaGastoObjeto: EditarCategoria,
            TipoGastoObjeto: EditarTipo,
            UserIdGastoObjeto: ""
        };
        setArrayDeGastos(gastosAtualizados);
        setGastoSelecionado(null);
    }

    function ExcluirGasto() {
        const gastosAtualizados = ArrayDeGastos.filter((_, i) => i !== GastoSelecionado.index);
        setArrayDeGastos(gastosAtualizados);
        setGastoSelecionado(null);
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

            <div>
                {ArrayDeGastos.map((gasto, index) => (
                    <button
                        id="Gastoss"
                        key={index}
                        onClick={() => AbrirEdicao(gasto, index)}
                    >
                        <strong>Nome:</strong> {gasto.NomeGastoObjeto} <br />
                        <strong>Valor:</strong> R$ {gasto.ValorGastoObjeto} <br />
                        <strong>Tipo:</strong> {gasto.TipoGastoObjeto} <br />
                        <strong>Categoria:</strong> {gasto.CategoriaGastoObjeto} <br />
                        <strong>Data:</strong> {gasto.DataGastoObjeto}
                    </button>
                ))}
            </div>
        </>
    );
}
