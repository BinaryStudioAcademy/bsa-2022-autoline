import { FC, useContext } from 'react';

import {
  ComplectationReturnedData,
  WishlistInput,
} from '@autoline/shared/common/types/types';
import { DetailsCarPanelPropsType } from '@common/types/types';
import { HeartIcon } from '@components/common/icons/icons';
import { WishlistContext } from '@contexts/wishlist-context';
import { formatPrice } from '@helpers/helpers';
import { convertPrice } from '@helpers/utils/convert-price';
import {
  useGetComplectationsForPanelQuery,
  useGetRateQuery,
} from '@store/queries/details-panel';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const DetailsCarPanel: FC<DetailsCarPanelPropsType> = ({
  complectationId = '',
  modelId = '',
}) => {
  const { likedCars, handleLikeClick } = useContext(WishlistContext);
  const { data, isLoading } = useGetComplectationsForPanelQuery({
    complectationId,
    modelId,
  });

  const likeClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    const data: WishlistInput = modelId ? { modelId } : { complectationId };
    handleLikeClick(data);
  };

  const { data: rate } = useGetRateQuery();

  let complectationName = '';
  if (!modelId && complectationId && !isLoading) {
    const complectationData = data as ComplectationReturnedData;
    complectationName = `${complectationData.brand} ${complectationData.model} ${complectationData.name}`;
  }

  if (isLoading) return null;

  return (
    <div className={styles.container}>
      {complectationName && (
        <h4 className={styles.complectationHeader}>{complectationName}</h4>
      )}
      <div className={styles.header}>
        <div className={styles.price}>{`${formatPrice(data?.minPrice as number)}
          - ${formatPrice(data?.maxPrice as number)}
          `}</div>
        <div className={styles.priceUah}>
          {`${convertPrice(rate as string, data?.minPrice as number)}
          - ${convertPrice(rate as string, data?.maxPrice as number)}
          `}
        </div>
        <div className={styles.icons}>
          <button
            className={clsx(
              styles.button,
              styles.iconButton,
              likedCars?.includes(modelId ? modelId : complectationId)
                ? styles.isLiked
                : '',
            )}
            onClick={likeClick}
          >
            <HeartIcon />
          </button>
        </div>
      </div>
      <div className={styles.lables}>
        {data?.options.important.map((option: string) => (
          <div key={option} className={styles.label}>
            {option}
          </div>
        ))}
      </div>
      <div className={styles.complectation}>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Motor</div>
          <div className={styles.complectationValue}>
            {data?.engineDisplacements.join(' / ')} l.
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Engine Power</div>
          <div className={styles.complectationValue}>
            {data?.enginePowers.join(' / ')} h.p.
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Color</div>
          <div className={styles.complectationValue}>
            {data?.colors.join(' / ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Drivetrain</div>
          <div className={styles.complectationValue}>
            {data?.drivetrains.join(' / ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Fuel type</div>
          <div className={styles.complectationValue}>
            {data?.fuelTypes.join(' / ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Transmission</div>
          <div className={styles.complectationValue}>
            {data?.transmissionTypes.join(' / ')}
          </div>
        </div>
        {data?.options.multimedia.length != 0 && (
          <div className={styles.complectationRow}>
            <div className={styles.complectationName}>Multimedia</div>
            <div className={styles.complectationValue}>
              {data?.options.multimedia.join(', ')}
            </div>
          </div>
        )}
        {data?.options.security.length != 0 && (
          <div className={styles.complectationRow}>
            <div className={styles.complectationName}>Security</div>
            <div className={styles.complectationValue}>
              {data?.options.security.join(', ')}
            </div>
          </div>
        )}
        {data?.options.optics.length != 0 && (
          <div className={styles.complectationRow}>
            <div className={styles.complectationName}>Optics</div>
            <div className={styles.complectationValue}>
              {data?.options.optics.join(', ')}
            </div>
          </div>
        )}
        {data?.options.upholstery.length != 0 && (
          <div className={styles.complectationRow}>
            <div className={styles.complectationName}>Upholstery</div>
            <div className={styles.complectationValue}>
              {data?.options.upholstery.join(', ')}
            </div>
          </div>
        )}
        {data?.options.sound.length != 0 && (
          <div className={styles.complectationRow}>
            <div className={styles.complectationName}>Sound</div>
            <div className={styles.complectationValue}>
              {data?.options.sound.join(', ')}
            </div>
          </div>
        )}
        {data?.options.design.length != 0 && (
          <div className={styles.complectationRow}>
            <div className={styles.complectationName}>Design</div>
            <div className={styles.complectationValue}>
              {data?.options.design.join(', ')}
            </div>
          </div>
        )}
        {data?.options.comfort.length != 0 && (
          <div className={styles.complectationRow}>
            <div className={styles.complectationName}>Comfort</div>
            <div className={styles.complectationValue}>
              {data?.options.comfort.join(', ')}
            </div>
          </div>
        )}
        {data?.options.auxiliary.length != 0 && (
          <div className={styles.complectationRow}>
            <div className={styles.complectationName}>Auxiliary</div>
            <div className={styles.complectationValue}>
              {data?.options.auxiliary.join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { DetailsCarPanel };
