import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function PaginaPrincipal() {
    const navigate = useNavigate();
    const { id } = useParams();
    function clique() {
        navigate(`/Create/${id}`)
    }

    return (
        <>
            <div className="container">
                <div className="header">
                    <div className="logo">logo</div>
                    <div className="search">
                        <input type="search" placeholder="pesquise" />
                    </div>
                    <div className="user">user</div>
                </div>
                <div className="middle">
                    <div className="value">value</div>
                    <div className="create">
                        <button type="button" onClick={clique}>+</button>
                    </div>
                    <div className="order">
                        <button type="button">...</button>
                    </div>
                </div>
                <div className="body">

                </div>
            </div>
        </>
    )

}
