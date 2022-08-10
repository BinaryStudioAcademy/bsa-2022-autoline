import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { mockBrands } from '@components/cars-categories/mock-brands';

import { Brand } from '../../types/brand.type';
import styles from './styles.module.scss';

const CarsCategories: FC = () => {
  const [brands] = useState<Brand[]>(mockBrands);

  return (
    <div className={styles.container}>
      {brands.map((brand) => (
        <Link to="#" key={brand.id} className={styles.navLink}>
          <img className={styles.logo} src={brand.logo_url} alt={brand.name} />
        </Link>
      ))}
    </div>
  );
};

export { CarsCategories };
