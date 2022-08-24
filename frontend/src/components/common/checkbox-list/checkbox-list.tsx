import React, { FC, useState } from 'react';

import { AutoRiaOption } from '@autoline/shared/common/types/cars/options';
import { FiltersNames } from '@common/enums/cars/filters-names.enum';
import { CheckboxListDataType } from '@common/types/cars/checkbox-list-data.type';
import { CustomCheckbox, CustomChecked } from '@components/common/icons/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FormControlLabel, Checkbox, FormControl } from '@mui/material';

import styles from './styles.module.scss';

type Props = {
  title: string;
  list: AutoRiaOption[] | undefined;
  checkedList: string[];
  listLimit?: number;
  onListCheck: (data: CheckboxListDataType) => void;
  filterName: FiltersNames;
};

const CheckboxList: FC<Props> = ({
  title,
  list = [],
  checkedList = [],
  listLimit = 4,
  onListCheck,
  filterName,
}) => {
  const [limit, setLimit] = useState(listLimit);

  const limitedList = list?.slice(0, limit);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;

    const data = checkedList.includes(value)
      ? checkedList.filter((item) => item !== value)
      : [...checkedList, value];

    onListCheck({ filterName, data });
  };

  const showAll = (): void => {
    setLimit(list.length);
  };

  if (!list) return <p>Loading...</p>;

  return (
    <div className={styles.listContainer}>
      <FormControl onChange={handleChange}>
        <h5 className={styles.title}>{title}</h5>
        <div className={styles.labelsContainer}>
          {limitedList.map((item) => (
            <FormControlLabel
              className={styles.label}
              key={item.id}
              value={item.id}
              label={item.name}
              control={
                <Checkbox
                  checked={checkedList.includes(item.id)}
                  value={item.id}
                  icon={<CustomCheckbox />}
                  checkedIcon={<CustomChecked />}
                />
              }
            />
          ))}
        </div>
        {listLimit === limitedList.length && (
          <h6 onClick={showAll} className={styles.seeAll}>
            See All
            <ArrowDropDownIcon />
          </h6>
        )}
      </FormControl>
    </div>
  );
};

export { CheckboxList };
