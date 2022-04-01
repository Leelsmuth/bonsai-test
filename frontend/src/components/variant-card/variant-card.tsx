import { FC, ReactElement, useEffect, useState } from 'react';

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
  variantInfo: Function;
}

const VariantCard: FC<IVariantCardProps> = ({
  variant,
  productDiscontinued,
  name,
  variantInfo,
}): ReactElement => {
  const { quantity, image, isDiscontinued, id } = variant;

  const [variantArray, setVariantArray] = useState({});

  const getVariantArray = () => {
    const optionArray: { type: any; value: any }[] = [];

    if (variant.selectableOptions) {
      variant.selectableOptions.map((selectableOption: any) => {
        const option = {
          type: selectableOption.type,
          value: selectableOption.value,
        };
        optionArray.push(option);
      });
    }
    setVariantArray({
      id: variant.id,
      name,
      price: variant.priceCents,
      qty: variant.quantity,
      options: optionArray,
      imageSrc: image,
      quantitySelected: 1,
      isDiscontinued: variant.isDiscontinued
    });
  };

  useEffect(() => {
    getVariantArray();
  }, []);

  return (
    <>
      {productDiscontinued === false && isDiscontinued === false && quantity > 0 && (
        <div className="variant-image" id={id}>
          <img src={image} alt={name} title={name} onClick={() => variantInfo(variantArray)} />
        </div>
      )}
    </>
  );
};

export default VariantCard;
