import React, { useEffect, useState } from 'react';

import { ComplectationDetailsType } from '@autoline/shared/common/types/types';
import { CompleteSetPropsType } from '@common/types/types';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { CompleteSetTable } from './complete-set-table';
import styles from './styles.module.scss';

const CompleteSetTableCollapsed: React.FC<CompleteSetPropsType> = (props) => {
  const { className, data, onClick } = props;

  const initialRows = 5;
  const [carsDisplayed, setCarsDisplayed] = useState<
    ComplectationDetailsType[]
  >([]);
  const [rowsHidden, setRowsHidden] = useState(0);

  useEffect(() => {
    setCarsDisplayed(data?.slice(0, initialRows));
    if (data && data.length > initialRows) {
      setRowsHidden(data.length - initialRows);
    } else {
      setRowsHidden(0);
    }
  }, [data]);

  const [open, setOpen] = useState(false);
  const handleClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    open
      ? setCarsDisplayed(data?.slice(0, initialRows))
      : setCarsDisplayed(data);
    setOpen(!open);
  };

  return (
    <>
      {rowsHidden > 0 ? (
        <>
          <CompleteSetTable
            data={carsDisplayed}
            className={className}
            onClick={onClick}
          />
          <button className={styles.collapseButton} onClick={handleClick}>
            {open ? (
              <ExpandLess />
            ) : (
              <>
                <span>+ {rowsHidden}</span>
                <ExpandMore />
              </>
            )}
          </button>
        </>
      ) : (
        <CompleteSetTable
          data={carsDisplayed}
          className={className}
          onClick={onClick}
        />
      )}
    </>
  );
};

export { CompleteSetTableCollapsed };
