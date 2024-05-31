import './topgames.css';
import img1 from '../../../assets/tg1.png';
import img2 from '../../../assets/tg2.png';
import img3 from '../../../assets/tg3.png';

const Topgames = () => {
  return (
    <section className="top-games-container">
      <div className="top-games-wrapper">
        <div className="top-game">
          <img src={img1} alt="" />
          <a href="#">Top UP Games</a>
        </div>
        <div className="top-game">
          <img src={img2} alt="" />
          <a href="#">Accounts</a>
        </div>
        <div className="top-game">
          <img src={img3} alt="" />
          <a href="#">Items</a>
        </div>
      </div>
    </section>
  );
};

export default Topgames;
