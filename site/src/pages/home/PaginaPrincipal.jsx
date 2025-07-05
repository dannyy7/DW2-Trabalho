import { useState } from "react"
import './PaginaPrincipal.css';
import logo from '../../assets/images/image.png';

export default function PaginaPrincipal() {
    const [PaginaCriarGasto, setPaginaCriarGasto] = useState(false)
    const [CategoriaGasto, setCategoriaGasto] = useState(false)
    const [TipoGasto, setTipoGasto] = useState(false)
    const [PaginaCriarCategoria, setPaginaCriarCategoria] = useState(false)
    const [NomeCategoria, setNomeCategoria] = useState("")
    const [ErroCategoria, setErroCategoria] = useState("")
    const [Categorias, setCategorias] = useState([])
    const [MostrarAdicionarCategoria, setMostrarAdicionarCategoria] = useState(true)
    const [MostrarCategorias, setMostrarCategorias] = useState(false)
    const [CategoriaDoGasto, setCategoriaDoGasto] = useState("")
    const [MostrarTipoGasto, setMostrarTipoGasto] = useState(false)
    const [ValordoTipo, setValordoTipo] = useState("")
    const [NomeGasto, setNomeGasto] = useState("")
    const [ValorGasto, setValorGasto] = useState(0)
    const [DataGasto, setDataGasto] = useState("")
    const [ArrayDeGastos, setArrayDeGastos] = useState([])

    function CriarGasto() {
        setPaginaCriarGasto(true)
    }

    function LimparAdicionarCategoria() {
        setMostrarAdicionarCategoria(false)
    }

    function EscolherCategoriaGasto() {
        setCategoriaGasto(true)
        setMostrarCategorias(!MostrarCategorias)
    }

    function EscolherTipoGasto() {
        setTipoGasto(true)
        setMostrarTipoGasto(!MostrarTipoGasto)
    }

    function CriarCategoria() {
        setPaginaCriarCategoria(true)
        setMostrarAdicionarCategoria(true)
    }

    function Gastos() {
        const novoGasto = {
            NomeGastoObjeto: NomeGasto,
            TipoGastoObjeto: ValordoTipo,
            CategoriaGastoObjeto: CategoriaDoGasto,
            ValorGastoObjeto: ValorGasto,
            DataGastoObjeto: DataGasto,
            UserIdGastoObjeto: ""
        }

        setArrayDeGastos([...ArrayDeGastos, novoGasto])
        setPaginaCriarGasto(false)

        // Limpar campos
        setNomeGasto("")
        setValordoTipo("")
        setCategoriaDoGasto("")
        setValorGasto(0)
        setDataGasto("")
    }

    function EscolherCategoria(z) {
        setMostrarCategorias(!MostrarCategorias)
        setCategoriaDoGasto(z)
    }

    function AdicionarArrayCategorias() {
        const nomeTrimado = NomeCategoria.trim()
        if (Categorias.includes(nomeTrimado)) {
            setErroCategoria("Essa Categoria já existe")
            return
        }
        if (nomeTrimado === "") {
            setErroCategoria("Não é possível adicionar uma categoria vazia!")
            return
        }
        setCategorias([...Categorias, nomeTrimado])
        setNomeCategoria("")
        LimparAdicionarCategoria()
    }

    let Tipo = null
    let Categoria = null
    let GastoCriar = null
    let CategoriaCriar = null

    if (PaginaCriarGasto) {
        GastoCriar = (
            <>
            <div className="boxall">
                <div className="boxcriargasto">
                    <input
                        type="text"
                        id="NomeGasto"
                        value={NomeGasto}
                        onChange={(e) => setNomeGasto(e.target.value)}
                        placeholder="Digite o nome do gasto"
                    />
                    <button onClick={EscolherCategoriaGasto}>Escolher Categoria</button>
                    <button onClick={EscolherTipoGasto}>Escolher Tipo</button>
                    <input type="number" value={ValorGasto}
                        onChange={(e) => setValorGasto(e.target.value)} />
                    <input type="date" value={DataGasto}
                        onChange={(e) => setDataGasto(e.target.value)} />
                    <button onClick={Gastos}>Criar</button>
                </div>
            </div>
            </>
        )

        if (CategoriaGasto && MostrarCategorias) {
            Categoria = (
                <>
                    <button onClick={CriarCategoria}>Novo</button>
                    {Categorias.map(x =>
                        <button key={x} onClick={() => EscolherCategoria(x)}>{x}</button>
                    )}
                </>
            )
        }

        if (TipoGasto && MostrarTipoGasto) {
            Tipo = (
                <>
                    <button onClick={() => {
                        setValordoTipo("Fixo")
                    }}>
                        Fixo
                    </button>
                    <button onClick={() => {
                        setValordoTipo("Variável")
                    }}>
                        Variável
                    </button>
                </>
            )
        }

        if (PaginaCriarCategoria) {
            CategoriaCriar = (
                <>
                    {ErroCategoria !== "" &&
                        <>
                            <p>{ErroCategoria}</p>
                            <button onClick={() => { setErroCategoria("") }}>x</button>
                        </>
                    }

                    {MostrarAdicionarCategoria &&
                        <>
                            <input
                                type="text"
                                value={NomeCategoria}
                                onChange={(e) => setNomeCategoria(e.target.value)}
                                placeholder="Nome da nova categoria"
                            />
                            <button onClick={AdicionarArrayCategorias}>Adicionar</button>
                        </>
                    }
                </>
            )
        }
    }

    function EditarGasto() {
        // Lógica futura
    }

    function ExcluirGasto() {
        // Lógica futura
    }


    return (
        <>
            <div className="Cabecalho">
                <img src={logo} alt="Logo da empresa" id="logo"/>
                <div className="BoxPesquisa">
                    <input type="text" name="BarraPesquisa" id="Pesquisar" placeholder="🔍︎Pesquisar" />
                    <button onClick={CriarGasto} id="CriarGasto">+</button>
                </div>

            </div>
            <div className="boxbarra"></div>
            {GastoCriar}
            {Categoria}
            {Tipo}
            {CategoriaCriar}

            <div>
                {ArrayDeGastos.map((gasto, index) => (
                    <button
                        key={index}
                        style={{ display: "block", margin: "10px 0", padding: "10px" }}
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
    )
}


// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// export default function PaginaPrincipal() {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     function clique() {
//         navigate(`/Create/${id}`)
//     }

//     return (
//         <>
//             <div className="container">
//                 <div className="header">
//                     <div className="logo">logo</div>
//                     <div className="search">
//                         <input type="search" placeholder="pesquise" />
//                     </div>
//                     <div className="user">user</div>
//                 </div>
//                 <div className="middle">
//                     <div className="value">value</div>
//                     <div className="create">
//                         <button type="button" onClick={clique}>+</button>
//                     </div>
//                     <div className="order">
//                         <button type="button">...</button>
//                     </div>
//                 </div>
//                 <div className="body">

//                 </div>
//             </div>
//         </>
//     )

// }