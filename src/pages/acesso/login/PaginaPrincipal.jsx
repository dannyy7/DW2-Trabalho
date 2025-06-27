import { useState } from "react"

export default function PaginaPrincipal(){
    const[PaginaCriarTarefa, setPaginaCriarTarefa] = useState(false)
    const[CategoriaTarefa, setCategoriaTarefa] = useState(false)
    function CriarTarefa(){
        setPaginaCriarTarefa(true)
    }
    function EscolherCategoria(){
        setCategoriaTarefa(true)
    }
    let Categoria = null
    let NomedaTarefa = null
    if (PaginaCriarTarefa){
        NomedaTarefa = 
        <>
        <input type="text" id="NomeTarefa"/>
        <button onClick={EscolherCategoria}>EscolherCategoria</button>
        </>


        if (CategoriaTarefa){
            Categoria = 
            <>            
            <button>Fixo</button>
            <button>Variavel</button>
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
        {NomedaTarefa}
        {Categoria}
        </>
    )

}

//<button onClick={EditarTarefa}>editar</button>
//<button onClick={ExcluirTarefa}>excluir</button>