import { FC, ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import VariantCard from '../variant-card/variant-card';
import { addToCart } from '../../state/actionCreator';

import './product-card.styles.css';
import { formatter } from '../../utils/currencyFormatter';

export type SelectionOption = {
  type: string;
  value: string;
};

export type Variant = {
  id: string;
  quantity: number;
  image: string;
  isDiscontinued: boolean;
  priceCents: number;
  selectableOptions: SelectionOption[];
};

export type IProduct = {
  id: string;
  name: string;
  isDiscontinued: boolean;
  variants: Variant[];
  description: string;
  defaultImage: string;
};

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = ({ product }): ReactElement => {
  const { name, defaultImage, description, isDiscontinued, variants } = product;

  const [showInfo, setShowInfo] = useState(false);
  const [showAddCart, setShowAddCart] = useState(false);
  const [variantPrice, setVariantPrice] = useState(0);
  const [variantQuantity, setVariantQuantity] = useState(0);
  const [variantType, setVariantType] = useState('');
  const [cartItems, setCartItems] = useState({});

  const getVariantInfo = (info: any) => {
    setShowInfo(true);
    setShowAddCart(true);
    setVariantPrice(info.price);
    setVariantQuantity(info.qty);
    const varType = info.options.map((option: any) => option.value).join(' - ');
    setVariantType(varType);
    setCartItems(info);

    const elementParent = document.getElementById(info.id)?.parentElement;
    const variantList = elementParent?.querySelectorAll('.variant-image');

    variantList?.forEach((element) => {
      element.classList.remove('selected');
    });

    document.getElementById(info.id)?.classList.add('selected');
  };

  const dispatch = useDispatch();

  return (
    <div className="product-card-container product-card-container--parent">
      <img src={defaultImage} className="product-card-image--parent" alt={name} title={name} />
      <div className="product-card-details">
        <span className="product-name">{name} </span>
        <span className="product-description"> {description} </span>
        {isDiscontinued ||
        variants.every((variant: any) => variant.isDiscontinued) ||
        variants.every((variant: any) => variant.quantity < 1) ? (
          <>
            <h4 style={{ color: 'red' }}>Out of Stock</h4>
          </>
        ) : (
          ''
        )}
        {showInfo && (
          <div className="variant-info">
            <div className="variant-info--price">
              Price: <span>{formatter.format(variantPrice / 100)}</span>
            </div>
            <div className="variant-info--qty">
              <span>{variantQuantity}</span> available
            </div>
            <div className="variant-info--type">
              <span>{variantType}</span>
            </div>
          </div>
        )}
        <div style={{ display: 'flex' }}>
          {variants.map((variantItem: any) => (
            <VariantCard
              key={variantItem.id}
              variant={variantItem}
              productDiscontinued={isDiscontinued}
              name={name}
              variantInfo={getVariantInfo}
            />
          ))}
        </div>
      </div>
      {showAddCart && (
        <button className="add-to-cart" onClick={() => dispatch(addToCart(cartItems))}>
          Add to cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
