import { FC, ReactElement, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { addToCart } from '../../state/actionCreator';

import './variant-card.styles.css';

export type SelectionOption = {
  type: string;
  value: string;
};

export type Variant = {
  id: string;
  quantity: any;
  image: string;
  isDiscontinued: boolean;
  priceCents: number;
  selectableOptions: SelectionOption[];
};

interface IVariantCardProps {
  variant: Variant;
  productDiscontinued: boolean;
  name: string;
}

interface SomeVariantCardProps {
  someVariant: Variant;
  cartItems: {};
}

const VariantCard: FC<IVariantCardProps> = ({
  variant,
  productDiscontinued,
  name,
}): ReactElement => {
  const [toggle, setToggle] = useState(false);

  // get cart state
  const cart = useSelector((state: RootStateOrAny) => state.cart);

  const { items } = cart;

  console.log('What is Item', items);

  const { quantity, image, selectableOptions, isDiscontinued, priceCents, id } = variant;
  console.log(`Selectable Options`, selectableOptions);

  const cartItems = {
    id,
    name,
    price: priceCents,
    imageSrc: image,
    quantitySelected: 1,
  };

  return (
    <>
      {productDiscontinued === false && isDiscontinued === false && quantity > 0 && (
        <div className="product-card-container">
          <img src={image} alt="" onClick={() => setToggle(!toggle)} />
          {toggle && <App someVariant={variant} cartItems={cartItems} />}
        </div>
      )}
    </>
  );
};

const App: FC<SomeVariantCardProps> = ({ someVariant, cartItems }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="product-card-details">
        <span className="product-name">Price: {someVariant.priceCents} </span>
        {someVariant.quantity > 0 && (
          <span className="product-description">Quantity: {someVariant.quantity} </span>
        )}
        {someVariant.selectableOptions &&
          someVariant.selectableOptions.map((selectableOption: any) => (
            <>
              <span>Type: {selectableOption.type}</span>
              <h6>value: {selectableOption.value}</h6>
            </>
          ))}
      </div>
      <button onClick={() => dispatch(addToCart(cartItems))}>Add to cart</button>
    </>
  );
};

export default VariantCard;
