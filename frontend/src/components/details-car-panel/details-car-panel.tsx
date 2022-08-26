import { FC } from 'react';

import {
  WishlistInput,
  DeleteWishlistInput,
} from '@autoline/shared/common/types/types';
import { DetailsCarPanelPropsType } from '@common/types/types';
import { HeartIcon } from '@components/common/icons/icons';
import { useGetComplectationsQuery } from '@store/queries/details-panel';
import {
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
} from '@store/queries/preferences/wishlist';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const DetailsCarPanel: FC<DetailsCarPanelPropsType> = ({ complectationId }) => {
  const { data, isLoading } = useGetComplectationsQuery(complectationId);
  const [createWishlist] = useCreateWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();

  const handleCreateWishlist = async (): Promise<void> => {
    const inputData: WishlistInput = {
      complectationId: '05b3a09b-fcb9-45fa-8871-60b89a851fae',
    };

    await createWishlist(inputData);
  };

  const handleDeleteWishlist = async (): Promise<void> => {
    const inputData: DeleteWishlistInput = {
      wishlistId: data?.complectation?.users_wishlists[0].id as string,
    };
    await deleteWishlist(inputData);
  };

  const handleLikeClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    data?.complectation?.users_wishlists.length != 0
      ? handleDeleteWishlist()
      : handleCreateWishlist();
  };
  if (isLoading) return null;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.price}>$ {data?.price}</div>
        <div className={styles.priceUah}>UAH 1 554 000 - 1 945 450</div>
        <div className={styles.icons}>
          <button
            className={clsx(
              styles.button,
              styles.iconButton,
              data?.complectation?.users_wishlists.length != 0 &&
                styles.isLiked,
            )}
            onClick={handleLikeClick}
          >
            <HeartIcon />
          </button>
        </div>
      </div>
      <div className={styles.lables}>
        {data?.options.important.map((option) => (
          <div key={option} className={styles.label}>
            {option}
          </div>
        ))}
      </div>
      <div className={styles.complectation}>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Motor</div>
          <div className={styles.complectationValue}>
            {data?.complectation?.engine_displacement} l.
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Engine Power</div>
          <div className={styles.complectationValue}>
            {data?.complectation?.engine_power} h.p.
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Color</div>
          <div className={styles.complectationValue}>
            {data?.complectation?.color.name}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Drivetrain</div>
          <div className={styles.complectationValue}>
            {data?.complectation?.drivetrain.name}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Fuel type</div>
          <div className={styles.complectationValue}>
            {data?.complectation?.fuel_type.name}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Transmission</div>
          <div className={styles.complectationValue}>
            {data?.complectation?.transmission_type.name}
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
