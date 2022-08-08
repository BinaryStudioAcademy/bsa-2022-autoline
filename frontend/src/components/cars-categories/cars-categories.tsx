import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { mockBrands } from '@components/cars-categories/mockBrands';

import { Brand } from '../../types/brand.type';
import styles from './styles.module.scss';

const CarsCategories: FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    if (mockBrands.length) {
      setBrands(mockBrands);
    }
  }, []);

  return (
    <div className={styles.container}>
      {brands.map((brand) => (
        <NavLink key={brand.marka_id} to="#">
          <img className={styles.logo} src={brand.logo} alt={brand.name} />
        </NavLink>
      ))}
    </div>
  );
};

export { CarsCategories };
