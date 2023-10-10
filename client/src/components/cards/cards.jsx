import './cards.css'
import Card from '../card/card';

const Cards = ({allDrivers}) => {
    const driverList = allDrivers;

  return (
    <div className='card-list'>
      {driverList?.map((driver, id) => (<Card key = {id} driver={driver} />) )}
    </div>
  )
}

export default Cards;

