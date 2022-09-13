import React, { useEffect, useState, useContext } from 'react';
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
import { WishlistContext } from '@contexts/wishlist-context';
import { formatPrice } from '@helpers/helpers';
import { objectToQueryArr } from '@helpers/object-to-query';
import { convertPrice } from '@helpers/utils/convert-price';
import { Grid } from '@mui/material';
import { uuid4 } from '@sentry/utils';
import {
  useGetComplectationsQuery,
  useGetModelDetailsQuery,
} from '@store/queries/cars';
import { useGetRateQuery } from '@store/queries/details-panel';
import { useAddViewedCarMutation } from '@store/queries/history-viewed-cars';
import { clsx } from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.module.scss';

const CarListItem: React.FC<CarListItemProps> = (props) => {
  const { model_id, complectations_id } = props;

  const idParams = objectToQueryArr({ 'id': complectations_id });

  const { data: complectations = [], isLoading: isComplectationsLoading } =
    useGetComplectationsQuery(idParams);
  const { data: model, isLoading: isModelLoading } =
    useGetModelDetailsQuery(model_id);

  const [addCarToViewed] = useAddViewedCarMutation();

  const modelName = `${model?.brandName} ${model?.modelName}`;
  const [modelPrice, setModelPrice] = useState<string>();
  const [modelOptions, setModelOptions] = useState<string[]>();
  const [modelEngine, setModelEngine] = useState<string>();
  const [modelEnginePower, setModelEnginePower] = useState<string>();
  const [modelFuelType, setModelFuelType] = useState<string>();
  const [modelTransmission, setModelTransmission] = useState<string>();
  const { likedCars, handleLikeClick } = useContext(WishlistContext);
  const isLiked = likedCars?.includes(model_id);

  const { data: rate } = useGetRateQuery();

  const likeClick = (event?: React.MouseEvent): void => {
    event?.stopPropagation();
    const data: WishlistInput = { modelId: model_id };
    handleLikeClick(data);
  };

  useEffect(() => {
    if (model?.priceStart && model?.priceEnd) {
      setModelPrice(
        `${formatPrice(model.priceStart)} - ${formatPrice(model.priceEnd)}`,
      );
    }
  }, [model]);

  useEffect(() => {
    const options = complectations
      .map((car: ComplectationDetailsType) => car.options)
      .flat();
    const optionsNames = [...new Set(options.map((option) => option.name))];
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

    setModelOptions(optionsNames);
    setModelEngine(engines);
    setModelEnginePower(enginePowers);
    setModelFuelType(fuelTypes);
    setModelTransmission(transmissions);
  }, [complectations]);

  const navigate = useNavigate();
  const handleCompleteSetClick = (id: string): void => {
    addCarToViewed({
      complectationId: id,
      modelId: model_id,
    });
    navigate({
      pathname: AppRoute.DETAILS,
      search: `?model=${model_id}&complectation=${id}`,
    });
  };

  const handleCarModelClick = (): void => {
    navigate({ pathname: AppRoute.DETAILS, search: `?model=${model_id}` });
    scrollTo(0, 0);
  };

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
            <h4 className={styles.carTitle} onClick={handleCarModelClick}>
              {modelName}
            </h4>
            <div className={styles.buttonsWrapper}>
              <LikeButtton onClick={likeClick} isLiked={isLiked} />
            </div>
          </div>
          <div className={styles.priceBlock}>
            <h4 className={styles.primaryPrice}>{modelPrice}</h4>

            <span className={styles.secondaryPrice}>
              {`UAH ${convertPrice(rate as string, model?.priceStart as number)}
          - ${convertPrice(rate as string, model?.priceEnd as number)}
          `}
            </span>
          </div>
          <div className={clsx(styles.options, 'styledScrollbar')}>
            {modelOptions?.map((optionName) => (
              <button className={styles.pillButton} key={uuid4()}>
                {optionName}
              </button>
            ))}
          </div>
          {complectations && (
            <div className={styles.tableWrapper}>
              <CompleteSetTableCollapsed
                data={complectations}
                className={clsx(styles.table, 'styledScrollbar')}
                onClick={handleCompleteSetClick}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export { CarListItem };
