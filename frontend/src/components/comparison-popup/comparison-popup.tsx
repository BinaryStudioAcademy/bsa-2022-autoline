import { FC, useEffect, useState, Dispatch } from 'react';

import CrossIcon from '@assets/images/edit-profile/cross.svg';
import {
  ComplectationOfModelResponse,
  ComlectationShortInfoResponse,
  CarPreview,
} from '@autoline/shared';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { SelectFieldForm } from '@components/edit-profile/select-field-form/select-field-form';
import { formatComparisonShortData } from '@helpers/helpers';
import { useAppForm } from '@hooks/hooks';
import { Modal, Box, MenuItem } from '@mui/material';
import {
  useGetBrandsQuery,
  useLazyGetModelsOfBrandQuery,
  useLazyGetComplectationsOfModelQuery,
} from '@store/queries/cars';
import {
  useGetComparisonCarsQuery,
  useDeleteCarFromComparisonMutation,
  useAddCarToComparisonMutation,
} from '@store/queries/comparisons';
import { useLazyGetComplectationByIdQuery } from '@store/queries/details-panel';
import { useGetWishlistsQuery } from '@store/queries/preferences/wishlist';
import { clsx } from 'clsx';

import { CarCard } from './car-card/car-card';
import styles from './styles.module.scss';
import { WishlistCard } from './wishlist-card/wishlist-card';

interface SelectingComplactationData {
  brand: string;
  model: string;
  complectation: string;
}

interface ComparisonPopupProps {
  isOpen: boolean;
  setPopupState: Dispatch<boolean>;
}

const ComparisonPopup: FC<ComparisonPopupProps> = ({
  isOpen,
  setPopupState,
}: ComparisonPopupProps) => {
  const { data, isLoading: comparisonIsLoading } = useGetComparisonCarsQuery();
  const [comparisonList, setComparisonList] = useState<
    ComlectationShortInfoResponse[]
  >([]);
  const [availableComplectation, setAvailableComplectation] = useState<
    ComplectationOfModelResponse[]
  >([]);
  const [availableWhishlist, setAvailableWhishlist] = useState<CarPreview[]>(
    [],
  );
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  const { data: brands } = useGetBrandsQuery();
  const { control, handleSubmit, watch, reset } =
    useAppForm<SelectingComplactationData>({
      defaultValues: {
        brand: '',
        model: '',
        complectation: '',
      },
    });
  const [getModelsOfBrand, models] = useLazyGetModelsOfBrandQuery();
  const [getComplectationsOfModel, complectations] =
    useLazyGetComplectationsOfModelQuery();
  const [getComplectationById, complectationInfo] =
    useLazyGetComplectationByIdQuery();
  const { data: wishlist } = useGetWishlistsQuery();

  useEffect(() => {
    comparisonIsLoading ||
      setComparisonList(formatComparisonShortData(data || []));
  }, [data]);

  useEffect(() => {
    watch('brand') && getModelsOfBrand(watch('brand'));
  }, [watch('brand')]);

  useEffect(() => {
    watch('model') && getComplectationsOfModel(watch('model'));
  }, [watch('model')]);

  useEffect(() => {
    if (watch('complectation')) {
      getComplectationById(watch('complectation'));
    }
  }, [watch('complectation')]);

  useEffect(() => {
    if (!complectationInfo.isFetching) {
      setComparisonList((state) =>
        complectationInfo.data ? [complectationInfo.data, ...state] : [],
      );
      reset && reset({ brand: '', model: '', complectation: '' });
    }
  }, [complectationInfo.isFetching]);

  useEffect(() => {
    if (wishlist?.complectations) {
      const list = wishlist?.complectations.filter(
        (complectation) =>
          !comparisonList.find((item) => item.id === complectation.id),
      );
      setAvailableWhishlist(list);
    }
  }, [wishlist, comparisonList]);

  useEffect(() => {
    if (complectations.data) {
      const list = complectations.data?.filter(
        (complectation) =>
          !comparisonList.find((item) => item.id === complectation.id),
      );
      setAvailableComplectation(list);
    }
  }, [comparisonList, complectations]);

  const [deleteCarFromComparison] = useDeleteCarFromComparisonMutation();
  const [addCarToComparison] = useAddCarToComparisonMutation();

  const onSubmit = (): void => {
    const carsToRemove = data?.filter(
      (carInComparison) =>
        !comparisonList.find((carInUi) => carInComparison.id === carInUi.id),
    );
    const carsToAdd = comparisonList.filter(
      (carInUi) =>
        !data?.find((carInComparison) => carInComparison.id === carInUi.id),
    );
    carsToRemove?.forEach(({ id }) => {
      deleteCarFromComparison({ complectationId: id });
    });
    addCarToComparison({ complectationId: carsToAdd.map((i) => i.id) });

    handleClose();
  };

  const handleClose = (): void => {
    setPopupState(false);
    setComparisonList(data || []);
    reset && reset({ brand: '', model: '', complectation: '' });
  };
  return (
    <>
      <Modal
        open={isOpen}
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
                {comparisonList.map((item) => (
                  <li key={item.id}>
                    <CarCard data={item} setItemToRemove={setComparisonList} />
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.comparisonRight}>
              <div className="comparisonRightHeader">
                <h3 className={styles.comparisonTitle}>
                  Select a complectation from:
                </h3>
                <ButtonOutline
                  text="all models"
                  className={clsx(
                    styles.button,
                    !isWishlistActive && styles.active,
                  )}
                  onClick={(): void => setIsWishlistActive(false)}
                />
                <ButtonOutline
                  text="wishlist"
                  className={clsx(
                    styles.button,
                    isWishlistActive && styles.active,
                  )}
                  onClick={(): void => setIsWishlistActive(true)}
                />
              </div>
              <div className={styles.comparisonForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={isWishlistActive ? '' : styles.displayNone}>
                    {availableWhishlist.length === 0 ? (
                      <p className={styles.wishlistText}>
                        No complectations available
                      </p>
                    ) : (
                      <ul className={clsx(styles.wishlist, 'styledScrollbar')}>
                        {availableWhishlist.map((item) => (
                          <li key={item.id}>
                            <WishlistCard
                              carData={item}
                              addItem={setComparisonList}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className={isWishlistActive ? styles.displayNone : ''}>
                    <SelectFieldForm
                      id="brand"
                      name="brand"
                      required={false}
                      control={control}
                      label="Select a brand"
                      defaultValue="not_appliable"
                    >
                      {brands?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
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
                      {models.data?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </SelectFieldForm>
                    <SelectFieldForm
                      id="complectation"
                      name="complectation"
                      required={false}
                      control={control}
                      label="Select a complectation"
                      defaultValue="not_appliable"
                      disabled={!watch('model') || !watch('brand')}
                    >
                      {availableComplectation.length ? (
                        availableComplectation.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))
                      ) : (
                        <li className={styles.noOptions}>No options</li>
                      )}
                    </SelectFieldForm>
                  </div>
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
