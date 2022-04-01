import { useContext } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { formatter } from '../../utils/currencyFormatter';
import CartItem from '../cart-item/cart-item';
import { CartContext } from '../../cart-context';

import './cart.styles.css';

// REPLACE WITH YOUR OWN CART ITEMS & SOLUTION
// const TEMPORARY_ITEMS = [
//   {
//     id: 1,
//     name: 'Hat',
//     imageSrc:
//       'https://media.istockphoto.com/photos/hat-on-white-background-picture-id526131500?b=1&k=20&m=526131500&s=170667a&w=0&h=TVhckgzmxLZ6b1V74eel7XbFy73tldESzBcH0ZG6g0c=',
//     price: 15,
//     quantity: 1,
//   },
//   {
//     id: 2,
//     name: 'Shirt',
//     imageSrc:
//       'https://media.istockphoto.com/photos/blank-white-tshirt-front-with-clipping-path-picture-id482948743?b=1&k=20&m=482948743&s=170667a&w=0&h=DetzN8rTsgQDTyBDSWvc7gUNz0gae0CUQecM-KNN3WY=',
//     price: 10,
//     quantity: 3,
//   },
// ];

const Cart = () => {
  // get photos state
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
