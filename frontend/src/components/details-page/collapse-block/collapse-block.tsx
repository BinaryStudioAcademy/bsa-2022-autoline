import { FC, ReactNode, useEffect, useState } from 'react';

import { Collapse } from '@mui/material';

import styles from './styles.module.scss';

interface CollapseBlockProps {
  caption: string;
  children: ReactNode;
  open: boolean;
  id?: string;
}

export const CollapseBlock: FC<CollapseBlockProps> = (props) => {
  const { caption, children, open, id } = props;
  const [collapseOpen, setCollapseOpen] = useState(open);

  useEffect(() => {
    setCollapseOpen(open);
  }, [open]);

  const toggleCollapse = (): void => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <>
      <div className={styles.captionRow} onClick={toggleCollapse} id={id}>
        <div className={styles.toggle}> {collapseOpen ? '–' : '+'} </div>
        <h4>{caption}</h4>
      </div>
      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};
