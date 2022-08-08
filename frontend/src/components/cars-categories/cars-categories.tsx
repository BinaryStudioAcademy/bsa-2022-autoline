import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { mockBrands } from '@components/cars-categories/mockBrands';

import { Brand } from '../../types/brand.type';
import styles from './styles.module.scss';

const CarsCategories: FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [activeId, setActiveId] = useState<number>();

  useEffect(() => {
    if (mockBrands.length) {
      setBrands(mockBrands);
    }
  }, []);

  return (
    <div className={styles.container}>
      {brands.map((brand) => (
        <div
          key={brand.marka_id}
          className={
            brand.marka_id === activeId
              ? styles.linkWrapper + ' ' + styles.active
              : styles.linkWrapper
          }
        >
          <Link
            to="#"
            onClick={(): void => setActiveId(brand.marka_id)}
            className={styles.navLink}
          >
            <img className={styles.logo} src={brand.logo} alt={brand.name} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export { CarsCategories };
