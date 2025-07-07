import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Api from "../../services/api";

function Create() {
    const inputValue = useRef();
    const inputName = useRef();
    const inputCategory = useRef();
    const inputDescription = useRef();
    const inputDate = useRef()
    const navigate = useNavigate();
    const { id } = useParams();
    const [inputType, setInputType] = useState("");

    async function createSpent() {

        await Api.post('/spent', {
            name: inputName.current.value,
            value: inputValue.current.value,
            description: inputDescription.current.value,
            category: inputCategory.current.value,
            date: inputDate.current.value,
            type: inputType,
            userId: id,
        })

        navigate(`/PaginaPrincipal/${id}`);
    }


    return (
        <>
            <div className="container">
                <div className="header">
                    <div className="logo">logo</div>
                    <div className="name">
                        <input type="text" placeholder="Digite o nome do gasto" ref={inputName} />
                    </div>
                    <div className="user">fechar</div>
                </div>
                <div className="middle">
                    <div className="top">
                        <div className="value">
                            <input type="number" placeholder="R$ 00" ref={inputValue} />
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="type">
                            <label htmlFor="opcao1">Despesa fixa</label>
                            <input
                                type="radio"
                                id="opcao1"
                                name="escolha"
                                value="Despesa fixa"
                                onChange={(e) => setInputType(e.target.value)}
                            />
                            <label htmlFor="opcao2">Despesa variável</label>
                            <input
                                type="radio"
                                id="opcao2"
                                name="escolha"
                                value="Despesa variável"
                                onChange={(e) => setInputType(e.target.value)}
                            />
                        </div>
                        <div className="category">
                            <input type="text" placeholder="Digite a categoria do gasto" ref={inputCategory} />
                        </div>
                        <div className="concluido">
                            <button type="button" onClick={createSpent}>concluido</button>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <div className="descName">Descrição</div>
                    <div className="descText">
                        <input type="text" placeholder="Digite uma  descrição do gasto" ref={inputDescription} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Create;


