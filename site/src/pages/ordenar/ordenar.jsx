import './ordenar.css';
import iconMoney from './assets/money.png';

function Ordenar() {
    return (
        <div className="container">
            <div className="header">
                <div className="logo">
                    <button type="button">
                        <img src={iconMoney} alt="money" />
                    </button>
                </div>
                <div className="close">
                    <button type="button">x</button>
                </div>
            </div>
            <div className="body">
                {/* vai ser feito com o banco de dados */}
                <div className='order'>
                    <div className="nameOrder">
                        <h1>Ordenar por</h1>
                    </div>
                    <div className="nameOrder">
                        <h1>Data inicial:</h1>
                        <input type="date" />
                    </div>
                    <div className="nameOrder">
                        <h1>Data final:</h1>
                        <input type="date" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ordenar