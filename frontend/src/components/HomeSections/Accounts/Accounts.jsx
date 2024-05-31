import './accounts.css'
import img11 from '../../../assets/11.jpeg'

const Accounts = () => {
    return (
        <div className="accounts">
            <span className="acc_name">
                Trending
            </span>
            <div className="trending__card">
                <div className="acc__card">
                    <div className="card__title">Accounts</div>
                    <div className="card__subtitle">Services</div>

                    <div className="c1">
                        <img src={img11} alt="" />
                        <a href="">Easy to use</a>
                    </div>

                    <div className="c1">
                        <img src={img11} alt="" />
                        <a href="">Easy to use</a>
                    </div>

                    <div className="c1">
                        <img src={img11} alt="" />
                        <a href="">Easy to use</a>
                    </div>

                </div>
                <div className="item__card">
                    <div className="card__title">Items</div>
                    <div className="card__subtitle">Services</div>

                    <div className="c1">
                        <img src={img11} alt="" />
                        <a href="">Easy to use</a>
                    </div>

                    <div className="c1">
                        <img src={img11} alt="" />
                        <a href="">Easy to use</a>
                    </div>

                    <div className="c1">
                        <img src={img11} alt="" />
                        <a href="">Easy to use</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accounts