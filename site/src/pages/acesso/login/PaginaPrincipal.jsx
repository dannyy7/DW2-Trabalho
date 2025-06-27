import { useState } from "react"

export default function PaginaPrincipal(){
    const[PaginaCriarTarefa, setPaginaCriarTarefa] = useState(false)
    const[CategoriaTarefa, setCategoriaTarefa] = useState(false)
    const[TipoTarefa, setTipoTarefa] = useState(false)
    const[PaginaCriarCategoria, setPaginaCriarCategoria] = useState(false)
    const [NomeCategoria, setNomeCategoria] = useState("");
    const [Categorias, setCategorias] = useState([])

    function CriarTarefa(){
        setPaginaCriarTarefa(true)
    }
    function EscolherCategoriaTarefa(){
        setCategoriaTarefa(true)
    }
    function EscolherTipoTarefa(){
        setTipoTarefa(true)
    }
    function CriarCategoria(){
        setPaginaCriarCategoria(true)
    }
    let Tipo = null
    let Categoria = null
    let TarefaCriar = null
    let CategoriaCriar = null
    if (PaginaCriarTarefa){
        TarefaCriar = 
        <>
        <input type="text" id="NomeTarefa"/>
        <button onClick={EscolherCategoriaTarefa}>EscolherCategoria</button>
        <button onClick={EscolherTipoTarefa}>EscolherTipo</button>
        </>


        if (CategoriaTarefa){
            Categoria = 
            <>
                <button onClick={CriarCategoria}>Novo</button>
                <button>{NomeCategoria}</button>
            </>


        }
        if (TipoTarefa){
            Tipo = 
            <>
            <button>Fixo</button>
            <button>Variavel</button>
            </>
        }
        if (PaginaCriarCategoria){
            CategoriaCriar = 
            <>
            <input type="text" value={NomeCategoria} onChange={(e) => setNomeCategoria(e.target.value)}/>
            <button>adicionar</button>
            </>
        }
    }
    function EditarTarefa(){

    }
    function ExcluirTarefa(){

    }
    function Filtro(){

    }
    return(
        <>
        <input type="text" name="BarraPesquisa" id="Pesquisar" placeholder="pesquisar"/>
        <button onClick={CriarTarefa}>+</button>
        <button onClick={Filtro}>Filtrar</button>
        {TarefaCriar}
        {Categoria}
        {Tipo}
        {CategoriaCriar}
        </>
    )

}

//<button onClick={EditarTarefa}>editar</button>
//<button onClick={ExcluirTarefa}>excluir</button>