import { FC, ReactElement } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { decrement, increment, removeItem } from '../../state/actionCreator';
import './cart-item.styles.css';

export interface ICartItem {
  id: string;
  name: string;
  imageSrc: string;
  quantitySelected: number;
  price: number;
}

interface ICartItemProps {
  cartItem: ICartItem;
}

const CartItem: FC<ICartItemProps> = ({ cartItem }): ReactElement => {
  const dispatch = useDispatch();

  const { name, imageSrc, quantitySelected, price } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageSrc} />
      <div className="cart-item-details">
        <span>{name} </span>
        <span> Quantity: {quantitySelected} </span>
        <span> price: ${price.toFixed(2)} </span>
      </div>
      <div className="add-minus-quantity">
              <i className="fas fa-minus minus" 
              onClick={() => dispatch(decrement(cartItem))}></i>
              {/* <input type="text" placeholder={quantitySelected} disabled /> */}
              <i className="fas fa-plus add" onClick={() => dispatch(increment(cartItem))}></i>
            </div>

            <div className="remove-item">
              <i className="fas fa-trash-alt remove" 
              onClick={() => dispatch(removeItem(cartItem))}></i>
            </div>
    </div>
  );
};

export default CartItem;
