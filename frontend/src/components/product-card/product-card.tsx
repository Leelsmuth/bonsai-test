import { FC, ReactElement } from 'react';
import VariantCard from '../variant-card/variant-card'

import './product-card.styles.css';

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
  console.log(`Product Names`, product);

  return (
    <div className="product-card-container product-card-container--parent">
      <img src={defaultImage} className="product-card-image--parent" alt={name} />
      <div className="product-card-details">
        <span className="product-name">{name} </span>
        <span className="product-description"> {description} </span>
        {isDiscontinued && (<><h4 style={{color: 'red'}}>Out of Stock</h4></>)}
        <section style={{display: 'flex'}}>
        {variants.map((variantItem: any) => (
          <VariantCard key={variantItem.id} variant={variantItem} productDiscontinued={isDiscontinued} name={name}/>
        ))}
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
