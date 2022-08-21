import React, { FC, useEffect, useState } from 'react';

import { AutoRiaOption } from '@autoline/shared/common/types/cars/options';
import { CheckboxListDataType } from '@common/types/cars/checkbox-list-data.type';
import { CustomCheckbox, CustomChecked } from '@components/common/icons/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FormControlLabel, Checkbox, FormControl } from '@mui/material';

import styles from './styles.module.scss';

type Props = {
  title: string;
  list: AutoRiaOption[] | undefined;
  listLimit?: number;
  onListCheck: (data: CheckboxListDataType) => void;
};

const CheckboxList: FC<Props> = ({
  title,
  list = [],
  listLimit = 4,
  onListCheck,
}) => {
  const [data, setData] = useState<Array<string>>([]);
  const [limit, setLimit] = useState(listLimit);

  const limitedList = list?.slice(0, limit);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (data.includes(value)) {
      return setData(data.filter((item) => item !== value));
    }
    setData([...data, value]);
  };

  const showAll = (): void => {
    setLimit(list.length);
  };

  useEffect(() => {
    onListCheck({
      title: title,
      data: data,
    });
  }, [data]);

  if (!list) return <p>Loading...</p>;

  return (
    <FormControl onChange={handleChange}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.listContainer}>
        {limitedList.map((item) => (
          <FormControlLabel
            className={styles.label}
            key={item.id}
            value={item.id}
            label={item.name}
            control={
              <Checkbox
                value={item.id}
                icon={<CustomCheckbox />}
                checkedIcon={<CustomChecked />}
              />
            }
          />
        ))}
      </div>
      {listLimit === limitedList.length && (
        <p onClick={showAll} className={styles.seeAll}>
          See All
          <ArrowDropDownIcon />
        </p>
      )}
    </FormControl>
  );
};

export { CheckboxList };
