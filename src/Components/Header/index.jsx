import { BiBasket } from "react-icons/bi"
import { useSelector } from "react-redux"




const Header = () => {
  const totalPrice = useSelector(
    (state) => state.persistReducers.basket.totalPrice
  );
  const totalAmount = useSelector(
    (state) => state.persistReducers.basket.totalAmount
  );
  return (
    <div className="navBar">
      <h1>
        <span>Sum</span> : {totalPrice}
      </h1>
      <div className="Bskt">
        <span className="bskt">
          <BiBasket />
        </span>
        <span className=" bskt-count">{totalAmount}</span>
      </div>
    </div>
  )
}

export default Header