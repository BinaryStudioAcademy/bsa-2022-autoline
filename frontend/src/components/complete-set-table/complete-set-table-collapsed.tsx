import { useEffect, useState } from 'react';

import { ComplectationDetailsType } from '@autoline/shared/common/types/types';
import { CompleteSetPropsType } from '@common/types/types';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';

import { CompleteSetTable } from './complete-set-table';
import styles from './styles.module.scss';

const CompleteSetTableCollapsed: React.FC<CompleteSetPropsType> = (props) => {
  const { className, data } = props;

  const initialRows = 5;
  const [carsDisplayed, setCarsDisplayed] = useState<
    ComplectationDetailsType[]
  >([]);
  const [rowsHidden, setRowsHidden] = useState(0);

  useEffect(() => {
    setCarsDisplayed(data?.slice(0, initialRows));
    if (data && data.length > initialRows) {
      setRowsHidden(data.length - initialRows);
    }
  }, [data]);

  const [open, setOpen] = useState(false);
  const handleClick = (): void => {
    open
      ? setCarsDisplayed(data?.slice(0, initialRows))
      : setCarsDisplayed(data);
    setOpen(!open);
  };

  return (
    <>
      {rowsHidden > 0 ? (
        <>
          <Collapse in={open} timeout="auto" collapsedSize="215px">
            <CompleteSetTable data={carsDisplayed} className={className} />
          </Collapse>
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
        <CompleteSetTable data={carsDisplayed} className={className} />
      )}
    </>
  );
};

export { CompleteSetTableCollapsed };
