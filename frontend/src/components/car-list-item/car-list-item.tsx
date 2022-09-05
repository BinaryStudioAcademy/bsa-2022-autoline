import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ComplectationDetailsType,
  WishlistInput,
} from '@autoline/shared/common/types/types';
import { AppRoute } from '@common/enums/enums';
import { CarListItemProps } from '@common/types/types';
import { SliderNavButton } from '@components/car-list-item/slider-nav-button/slider-nav-button';
import { swiperParams } from '@components/car-list-item/swiper-params';
import { LikeButtton } from '@components/common/like-button/like-button';
import { Spinner } from '@components/common/spinner/spinner';
import { CompleteSetTableCollapsed } from '@components/complete-set-table/complete-set-table-collapsed';
import { formatPrice } from '@helpers/helpers';
import { objectToQueryString } from '@helpers/object-to-query';
import { useAppSelector } from '@hooks/hooks';
import { Grid } from '@mui/material';
import { uuid4 } from '@sentry/utils';
import {
  useGetComplectationsQuery,
  useGetModelDetailsQuery,
} from '@store/queries/cars';
import {
  useGetWishlistsLikedItemQuery,
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
} from '@store/queries/preferences/wishlist';
import { clsx } from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.module.scss';

const CarListItem: React.FC<CarListItemProps> = (props) => {
  const { model_id, complectations_id } = props;
  const authToken = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const idParams = objectToQueryString({ 'id': complectations_id });

  const { data: complectations = [], isLoading: isComplectationsLoading } =
    useGetComplectationsQuery(idParams);
  const { data: model, isLoading: isModelLoading } =
    useGetModelDetailsQuery(model_id);
  const { data: isLikedModel } = useGetWishlistsLikedItemQuery({
    modelId: model_id,
  });
  const modelName = `${model?.brandName} ${model?.modelName}`;
  const [modelPrice, setModelPrice] = useState<string>();
  const [modelOptions, setModelOptions] = useState<{ name: string }[]>();
  const [modelEngine, setModelEngine] = useState<string>();
  const [modelEnginePower, setModelEnginePower] = useState<string>();
  const [modelFuelType, setModelFuelType] = useState<string>();
  const [modelTransmission, setModelTransmission] = useState<string>();
  const [createWishlist] = useCreateWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();

  const handleCreateWishlist = async (data: WishlistInput): Promise<void> => {
    await createWishlist(data);
  };

  const handleDeleteWishlist = async (data: WishlistInput): Promise<void> => {
    await deleteWishlist(data);
  };

  const handleLikeClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    const data: WishlistInput = { modelId: model_id };

    if (!authToken) {
      navigate(AppRoute.SIGN_IN);
      return;
    }

    isLikedModel ? handleDeleteWishlist(data) : handleCreateWishlist(data);
  };

  useEffect(() => {
    if (model?.priceStart && model?.priceEnd) {
      setModelPrice(
        `${formatPrice(model.priceStart)} - ${formatPrice(model.priceEnd)}`,
      );
    }
  }, [model]);

  useEffect(() => {
    const options = [
      ...new Set(
        complectations
          .map((car: ComplectationDetailsType) => car.options)
          .flat(),
      ),
    ];
    const engines = [
      ...new Set(
        complectations
          .map((car: ComplectationDetailsType) => car.engineDisplacement)
          .sort(),
      ),
    ].join(' / ');
    const enginePowers = [
      ...new Set(
        complectations
          .map((car: ComplectationDetailsType) => car.enginePower)
          .sort(),
      ),
    ].join(' / ');
    const fuelTypes = [
      ...new Set(
        complectations.map((car: ComplectationDetailsType) => car.fuelTypeName),
      ),
    ].join(' / ');
    const transmissions = [
      ...new Set(
        complectations.map(
          (car: ComplectationDetailsType) => car.transmissionTypeName,
        ),
      ),
    ].join(' / ');

    setModelOptions(options);
    setModelEngine(engines);
    setModelEnginePower(enginePowers);
    setModelFuelType(fuelTypes);
    setModelTransmission(transmissions);
  }, [complectations]);

  if (isComplectationsLoading || isModelLoading) return <Spinner />;

  return (
    <div className={styles.listCard}>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <Swiper
            className={styles.swiperWrapper}
            {...swiperParams}
            slidesPerView={1}
          >
            <SliderNavButton direction="prev" />
            <SliderNavButton direction="next" />

            {model?.photoUrls.map((photoUrl) => (
              <SwiperSlide className={styles.slide} key={uuid4()}>
                <img src={photoUrl} alt="car" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.carInfo}>
            <div className={styles.infoRow}>
              <p className={styles.title}>Engine</p>
              <p className={styles.option}>{modelEngine} l.</p>
            </div>
            <div className={styles.infoRow}>
              <p className={styles.title}>Engine power</p>
              <p className={styles.option}>{modelEnginePower} h.p.</p>
            </div>
            <div className={styles.infoRow}>
              <p className={styles.title}>Fuel type</p>
              <p className={styles.option}>{modelFuelType}</p>
            </div>
            <div className={styles.infoRow}>
              <p className={styles.title}>Transmission</p>
              <p className={styles.option}>{modelTransmission}</p>
            </div>
          </div>
        </Grid>
        <Grid item sm={8}>
          <div className={styles.titleWrapper}>
            <h4 className={styles.carTitle}>{modelName}</h4>
            <div className={styles.buttonsWrapper}>
              <LikeButtton onClick={handleLikeClick} isLiked={isLikedModel} />
            </div>
          </div>
          <div className={styles.priceBlock}>
            <h4 className={styles.primaryPrice}>{modelPrice}</h4>
            {/* TODO: USD-UAH convertation
            <span className={styles.secondaryPrice}>
              UAH 1 554 000 - 1 945 450
            </span> */}
          </div>
          <div className={clsx(styles.options, 'styledScrollbar')}>
            {modelOptions?.map((option) => (
              <button className={styles.pillButton} key={uuid4()}>
                {option.name}
              </button>
            ))}
          </div>
          {complectations && (
            <div className={styles.tableWrapper}>
              <CompleteSetTableCollapsed
                data={complectations}
                className={clsx(styles.table, 'styledScrollbar')}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export { CarListItem };
