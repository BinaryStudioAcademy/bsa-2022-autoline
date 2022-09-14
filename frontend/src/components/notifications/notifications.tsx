import { HeartIcon } from '@components/common/icons/icons';
import { Notification } from '@components/common/notification/notification';
import { CompareToast } from '@components/compare-toast/compare-toast';
import { uuid4 } from '@sentry/utils';

import { useCompareNotifications } from '../../contexts/compare-context';
import { useWishlistNotifications } from '../../contexts/wishlist-context';

export const Notifications = (): React.ReactElement => {
  const {
    notifications: wishlistNotifications,
    clearNotification: clearWishlistNotification,
    undoDelete,
  } = useWishlistNotifications();
  const {
    notifications: compareNotifications,
    clearNotification: clearCompareNotification,
  } = useCompareNotifications();

  return (
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        bottom: '2rem',
        right: '2rem',
        zIndex: '10000',
      }}
    >
      {wishlistNotifications?.map((n) => (
        <Notification
          key={n.modelId ?? n.complectationId}
          clearNotification={(): void =>
            clearWishlistNotification(n.modelId || n.complectationId || uuid4())
          }
          icon={<HeartIcon />}
          undo={(): void =>
            undoDelete({
              modelId: n.modelId,
              complectationId: n.complectationId,
              createdAt: n.createdAt,
              carName: n.carName,
            })
          }
        >
          You removed {n.carName ?? 'car'} from wishlist
        </Notification>
      ))}
      {compareNotifications?.map((n) => (
        <CompareToast
          key={n.complectationId}
          carName={n.carName}
          clearNotification={(): void =>
            clearCompareNotification(n.complectationId)
          }
        />
      ))}
    </div>
  );
};
