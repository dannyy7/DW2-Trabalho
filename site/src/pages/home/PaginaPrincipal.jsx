import { useState } from "react"

export default function PaginaPrincipal(){
    const[PaginaCriarTarefa, setPaginaCriarTarefa] = useState(false)
    const[CategoriaTarefa, setCategoriaTarefa] = useState(false)
    const[TipoTarefa, setTipoTarefa] = useState(false)
    const[PaginaCriarCategoria, setPaginaCriarCategoria] = useState(false)
    const [NomeCategoria, setNomeCategoria] = useState("");
    const[ErroCategoria, setErroCategoria] = useState("")
    const [Categorias, setCategorias] = useState([])
    const[MostrarAdicionarCategoria, setMostrarAdicionarCategoria] = useState(true)
    const[MostrarCategoria, setMostrarCategoria] = useState(true) 

    function CriarTarefa(){
        setPaginaCriarTarefa(true)
    }
    function LimparAdicionarCategoria(){
        setMostrarAdicionarCategoria(false)

    }
    function EscolherCategoriaTarefa(){
        setCategoriaTarefa(true)
    }
    function EscolherTipoTarefa(){
        setTipoTarefa(true)
    }
    function CriarCategoria(){
        setPaginaCriarCategoria(true)
        setMostrarAdicionarCategoria(true)
    }
    function EscolherCategoria(z){
        {MostrarCategoria &&(<p>{z}</p>)}
        
    }
    function AdicionarArrayCategorias (){
        if (Categorias.includes(NomeCategoria.trim())){
            setErroCategoria("Essa Categoria ja existe")
            return
        }
        if(NomeCategoria === ""){
            setErroCategoria("Não é possivel adicionar uma categoria vazia!")
            return
        }   
            let CloneArrayCategorias = [...Categorias]
            CloneArrayCategorias.push(NomeCategoria)
            setCategorias(CloneArrayCategorias)
            LimparAdicionarCategoria()
            
            
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
                {Categorias.map(x => <button onClick={y => EscolherCategoria(x)}>{x}</button>)}
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
            {
                (ErroCategoria !== "") ?
                <>
                <p>{ErroCategoria}</p>
                <button onClick={()=>{setErroCategoria("")}}>x</button>
                </>
                 :""
            }
            {
            MostrarAdicionarCategoria &&(
            <>
            <input type="text" value={NomeCategoria} onChange={(e) => setNomeCategoria(e.target.value)}/>
            <button onClick={AdicionarArrayCategorias}>adicionar</button>
            </>
            )
            }

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