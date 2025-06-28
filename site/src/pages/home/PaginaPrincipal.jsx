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
    }

    function CriarCategoria() {
        setPaginaCriarCategoria(true)
        setMostrarAdicionarCategoria(true)
    }

    function EscolherCategoria(z) {
        setMostrarCategorias(!MostrarCategorias)
        setCategoriaDoGasto(z)
    }

    function AdicionarArrayCategorias() {
        if (Categorias.includes(NomeCategoria.trim())) {
            setErroCategoria("Essa Categoria já existe")
            return
        }
        if (NomeCategoria === "") {
            setErroCategoria("Não é possível adicionar uma categoria vazia!")
            return
        }
        let CloneArrayCategorias = [...Categorias]
        CloneArrayCategorias.push(NomeCategoria)
        setCategorias(CloneArrayCategorias)
        LimparAdicionarCategoria()
    }

    let Tipo = null
    let Categoria = null
    let GastoCriar = null
    let CategoriaCriar = null

    if (PaginaCriarGasto) {
        GastoCriar =
            <>
                <input type="text" id="NomeGasto" />
                <button onClick={EscolherCategoriaGasto}>EscolherCategoria</button>
                <button onClick={EscolherTipoGasto}>EscolherTipo</button>
            </>

        if (CategoriaGasto) {
            MostrarCategorias && (
                Categoria =
                    <>
                        <button onClick={CriarCategoria}>Novo</button>
                        {Categorias.map(x => <button key={x} onClick={() => EscolherCategoria(x)}>{x}</button>)}
                    </>
            )
        }

        if (TipoGasto) {
            Tipo =
                <>
                    <button>Fixo</button>
                    <button>Variável</button>
                </>
        }

        if (PaginaCriarCategoria) {
            CategoriaCriar =
                <>
                    {
                        (ErroCategoria !== "") ?
                            <>
                                <p>{ErroCategoria}</p>
                                <button onClick={() => { setErroCategoria("") }}>x</button>
                            </>
                            : ""
                    }
                    {
                        MostrarAdicionarCategoria && (
                            <>
                                <input
                                    type="text"
                                    value={NomeCategoria}
                                    onChange={(e) => setNomeCategoria(e.target.value)}
                                />
                                <button onClick={AdicionarArrayCategorias}>Adicionar</button>
                            </>
                        )
                    }
                </>
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
            <input type="text" name="BarraPesquisa" id="Pesquisar" placeholder="pesquisar" />
            <button onClick={CriarGasto}>+</button>
            <button onClick={Filtro}>Filtrar</button>
            <p>Categoria:{CategoriaDoGasto}</p> 
            {GastoCriar}
            {Categoria}
            {Tipo}
            {CategoriaCriar}
        </>
    )
}

// <button onClick={EditarGasto}>editar</button>
// <button onClick={ExcluirGasto}>excluir</button>
