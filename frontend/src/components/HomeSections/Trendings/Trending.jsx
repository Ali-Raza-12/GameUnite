import './trending.css';
import img4 from '../../../assets/td1.png';
import img5 from '../../../assets/td2.png';
import img6 from '../../../assets/td3.png';
import img7 from '../../../assets/td4.png';
import img8 from '../../../assets/td5.png';
import img9 from '../../../assets/td6.png';

const Trending = () => {
  return (
    <div className="trending-container">
      <div className="trending-section">
        <span className='trending-head'>Trending Games</span>
        <div className="trending-games">
          <img src={img4} alt="" />
          <img src={img5} alt="" />
          <img src={img6} alt="" />
          <img src={img7} alt="" />
          <img src={img8} alt="" />
          <img src={img9} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Trending;
