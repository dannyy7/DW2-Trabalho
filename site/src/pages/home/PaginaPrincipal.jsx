import { useState } from "react"

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
    const [CriarGastoTarefa, setCriarGastoTarefa] = useState({
        NomeGastoObjeto: "Você ainda não inseriu um nome",
        TipoGastoObjeto: "Você ainda não inseriu o tipo do gasto",
        CategoriaGastoObjeto: "Sem categoria",
        ValorGastoObjeto: "Você ainda não inseriu um valor",
        DataGastoObjeto: "Você ainda não inseriu uma data",
        UserIdGastoObjeto: ""
    })

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

    function EscolherCategoria(z) {
        setMostrarCategorias(!MostrarCategorias)
        setCategoriaDoGasto(z)
        setCriarGastoTarefa({ ...CriarGastoTarefa, CategoriaGastoObjeto: z })
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
                <input
                    type="text"
                    id="NomeGasto"
                    value={NomeGasto}
                    onChange={(e) => setNomeGasto(e.target.value)}
                    placeholder="Digite o nome do gasto"
                />
                <button onClick={EscolherCategoriaGasto}>Escolher Categoria</button>
                <button onClick={EscolherTipoGasto}>Escolher Tipo</button>
                <button onClick={() =>
                    setCriarGastoTarefa({ ...CriarGastoTarefa, NomeGastoObjeto: NomeGasto })
                }>
                    Criar
                </button>
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
                        setCriarGastoTarefa({ ...CriarGastoTarefa, TipoGastoObjeto: 'fixo' })
                        setValordoTipo("Fixo")
                    }}>
                        Fixo
                    </button>
                    <button onClick={() => {
                        setCriarGastoTarefa({ ...CriarGastoTarefa, TipoGastoObjeto: 'variavel' })
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

    function Filtro() {
        // Lógica futura
    }

    return (
        <>
            <input type="text" name="BarraPesquisa" id="Pesquisar" placeholder="Pesquisar" />
            <button onClick={CriarGasto}>+</button>
            <button onClick={Filtro}>Filtrar</button>
            <p>Categoria: {CategoriaDoGasto}</p>
            <p>Tipo: {ValordoTipo}</p>
            {GastoCriar}
            {Categoria}
            {Tipo}
            {CategoriaCriar}

            {/* 
            <button onClick={EditarGasto}>editar</button>
            <button onClick={ExcluirGasto}>excluir</button> 
            */}
            
        </>
    )
}
