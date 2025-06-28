import './despVar.css';
import iconMoney from './assets/money.png';
import iconUser from './assets/user.png';
import iconSearch from './assets/search.png'
import iconReturn from './assets/return.png'

function DespVar() {
    return (
        <div className="container">
            <div className="header">
                <div className="logo">
                    <button type="button">
                        <img src={iconMoney} alt="money" />
                    </button>
                </div>
                <div className="search">
                    <input type='text' placeholder="pesquisar" />
                    <img src={iconSearch} alt="search" />
                </div>
                <div className="user">
                    <button type="button">
                        <img src={iconUser} alt="user" />
                    </button>
                </div>
            </div>
            <div className="middle">
                <div>
                    <div className="return">
                        <button type="button">
                            <img src={iconReturn} alt="return" />
                        </button>
                    </div>
                    <div className="value">
                        {/* interação banco de dados */}
                    </div>
                </div>
                <div>
                    <div className="desp">
                        {/* banco de dados */}
                    </div>
                    <div className="data">
                        {/* banco de dados */}
                    </div>
                </div>
            </div>
            <div className="body">
                {/* vai ser feito com o banco de dados */}
                <div className='descri'>
                    <div className="nameDescri"></div>
                    <div className="textDescri"></div>
                </div>
            </div>
        </div>
    )
}

export default DespVar