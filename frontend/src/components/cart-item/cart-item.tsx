import { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { formatter } from '../../utils/currencyFormatter';
import { decrement, increment, removeItem } from '../../state/actionCreator';
import './cart-item.styles.css';

export interface ICartItem {
  id: string;
  name: string;
  imageSrc: string;
  quantitySelected: number;
  price: number;
  options: []
}

interface ICartItemProps {
  cartItem: ICartItem;
}

const CartItem: FC<ICartItemProps> = ({ cartItem }): ReactElement => {
  const dispatch = useDispatch();

  const { name, imageSrc, quantitySelected, price, options } = cartItem;
  const varType = options.map((option: any) => option.value).join(" - ");
  return (
    <div className="cart-item-container">
      <img src={imageSrc} alt={name} title={name} />
      <div className="cart-item-details">
        <div className='cart-item-details--name'>{name} </div>
        <div className='cart-item-details--group'> Quantity:<span> {quantitySelected}</span> </div>
        <div className='cart-item-details--group'> Price: <span>{formatter.format(price / 100)}</span> </div>
        <div className='cart-item-details--group'> Type: <span className='type'>{varType}</span> </div>
      </div>
      <div className="add-minus-quantity">
        <i
          className="fas fa-minus minus"
          aria-label="Click to reduce item quantity"
          title="Click to reduce item quantity"
          onClick={() => dispatch(decrement(cartItem))}
        ></i>
        <i
          className="fas fa-plus add"
          aria-label="Click to increase item quantity"
          title="Click to increase item quantity"
          onClick={() => dispatch(increment(cartItem))}
        ></i>
      </div>

      <div className="remove-item">
        <i className="fas fa-trash-alt remove" aria-label="Click to delete item from cart"
          title="Click to delete item from cart" onClick={() => dispatch(removeItem(cartItem))}></i>
      </div>
    </div>
  );
};

export default CartItem;
