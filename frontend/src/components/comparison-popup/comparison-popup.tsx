import { FC, useState } from 'react';

import CrossIcon from '@assets/images/edit-profile/cross.svg';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { SelectFieldForm } from '@components/edit-profile/select-field-form/select-field-form';
import { useAppForm } from '@hooks/hooks';
import { Modal, Button, Box, MenuItem } from '@mui/material';
import {
  useGetBrandsQuery,
  useGetModelsOfBrandQuery,
  useGetComplectationsOfModelQuery,
} from '@store/queries/cars';
import {
  useGetComparisonsPreviewCarsQuery,
  useDeleteCarFromComparisonMutation,
} from '@store/queries/comparisons';
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
  const [itemToRemove, setItemToRemove] = useState<string[]>([]);
  const { data: brands } = useGetBrandsQuery();

  const { control, handleSubmit, watch } =
    useAppForm<SelectingComplactationData>({
      defaultValues: {
        type: '',
        brand: '',
        model: '',
        complectation: '',
      },
    });
  const { data: models } = useGetModelsOfBrandQuery(watch('brand'));
  const { data: complectations } = useGetComplectationsOfModelQuery(
    watch('model'),
  );

  const { data } = useGetComparisonsPreviewCarsQuery();
  const [deleteCarFromComparison] = useDeleteCarFromComparisonMutation();

  const onSubmit = (): void => {
    itemToRemove.forEach((complectationId) => {
      deleteCarFromComparison({ complectationId });
    });
    handleClose();
  };

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => {
    setOpen(false);
    setItemToRemove([]);
  };
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
                {data &&
                  data.map((item) => {
                    if (itemToRemove.includes(item.id)) return null;
                    return (
                      <li key={item.id}>
                        <CarCard
                          data={item}
                          setItemToRemove={setItemToRemove}
                        />
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={styles.comparisonRight}>
              <h3 className={styles.comparisonTitle}>
                Select a complectation from the drop-down list
              </h3>
              <div className={styles.comparisonForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <SelectFieldForm
                    id="brand"
                    name="brand"
                    required={false}
                    control={control}
                    label="Select a brand"
                    defaultValue="not_appliable"
                  >
                    {brands?.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </SelectFieldForm>
                  <SelectFieldForm
                    id="model"
                    name="model"
                    required={false}
                    control={control}
                    label="Select a model"
                    defaultValue="not_appliable"
                    disabled={!watch('brand')}
                  >
                    {models?.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </SelectFieldForm>
                  <SelectFieldForm
                    id="complectation"
                    name="complectation"
                    required={false}
                    control={control}
                    label="Select a complectation"
                    defaultValue="not_appliable"
                    disabled={!watch('model')}
                  >
                    {complectations?.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
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
