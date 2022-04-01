import { useContext } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { formatter } from '../../utils/currencyFormatter';
import CartItem from '../cart-item/cart-item';
import { CartContext } from '../../cart-context';

import './cart.styles.css';

const Cart = () => {
  const cart = useSelector((state: RootStateOrAny) => state.cart);

  const { items } = cart;
  const { setIsOpen } = useContext(CartContext);

  const closeCart = () => setIsOpen(false);
  const totalPrice = items
    .reduce((acc: number, item: any) => acc + item.quantitySelected * item.price, 0)
    .toFixed(2);

  return (
    <div className="cart-modal">
      <div className="cart-container">
        <button className="close-button" onClick={closeCart}>
          →
        </button>
        <div className="cart-items-container">
          {items.map((item: any) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </div>
        <div className="total-container">
          <span>Total: {formatter.format(totalPrice / 100)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
