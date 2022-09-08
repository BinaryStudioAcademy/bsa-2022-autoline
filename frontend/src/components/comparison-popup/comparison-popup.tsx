import { FC, useState } from 'react';

import CrossIcon from '@assets/images/edit-profile/cross.svg';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { SelectFieldForm } from '@components/edit-profile/select-field-form/select-field-form';
import { useAppForm } from '@hooks/hooks';
import { Modal, Button, Box, MenuItem } from '@mui/material';
import { clsx } from 'clsx';

import { CarCard } from './car-card/car-card';
import styles from './styles.module.scss';

interface SelectingComplactationData {
  type: string;
  brand: string;
  model: string;
  complectation: string;
}

const ComparisonPopup: FC = () => {
  const [open, setOpen] = useState(false);

  const { control } = useAppForm<SelectingComplactationData>({
    defaultValues: {
      type: '',
      brand: '',
      model: '',
      complectation: '',
    },
  });

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen}>click</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.popup}>
          <h2 className={styles.mainTitle}>Add complectation to comparison</h2>
          <span className={styles.cross}>
            <img
              src={CrossIcon}
              alt="cross"
              onClick={(): void => handleClose()}
            />
          </span>
          <div className={styles.comparison}>
            <div className={styles.comparisonLeft}>
              <h3 className={styles.comparisonTitle}>
                Complectation in comparison
              </h3>
              <ul className={clsx(styles.comparisonList, 'styledScrollbar')}>
                {[...Array(6)].map((_, index) => (
                  <li key={index}>
                    <CarCard />
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.comparisonRight}>
              <h3 className={styles.comparisonTitle}>
                Select a complectation from the drop-down list
              </h3>
              <div className={styles.comparisonForm}>
                <form>
                  <SelectFieldForm
                    id="type"
                    name="type"
                    required={false}
                    control={control}
                    label="Select a type"
                    defaultValue="not_appliable"
                  >
                    <MenuItem value="sedan">Sedan</MenuItem>
                  </SelectFieldForm>
                  <SelectFieldForm
                    id="brand"
                    name="brand"
                    required={false}
                    control={control}
                    label="Select a brand"
                    defaultValue="not_appliable"
                  >
                    <MenuItem value="mazda">Mazda</MenuItem>
                  </SelectFieldForm>
                  <SelectFieldForm
                    id="model"
                    name="model"
                    required={false}
                    control={control}
                    label="Select a model"
                    defaultValue="not_appliable"
                  >
                    <MenuItem value="3">3</MenuItem>
                  </SelectFieldForm>
                  <SelectFieldForm
                    id="complectation"
                    name="complectation"
                    required={false}
                    control={control}
                    label="Select a complectation"
                    defaultValue="not_appliable"
                  >
                    <MenuItem value="TOURING">TOURING</MenuItem>
                  </SelectFieldForm>
                  <div className={styles.btnWrapper}>
                    <ButtonOutline
                      text="Cancel"
                      className={styles.cancel}
                      onClick={handleClose}
                    />
                    <ButtonFill text="Save" type="submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export { ComparisonPopup };
