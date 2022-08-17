import { Link } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app-route.enum';
import Container from '@mui/material/Container';

import Logo from '../../../assets/images/logo.svg';
import BgImage from '../../../assets/images/sign-bg.jpg';
import styles from './styles.module.scss';

export const AuthWrapper = (props: {
  children: React.ReactElement;
}): React.ReactElement => {
  const { children } = props;
  const sectionStyle = {
    backgroundImage: `url(${BgImage})`,
  };

  return (
    <div style={sectionStyle} className={styles.bgImage}>
      <Container className={styles.wrapper}>
        <div className={styles.wrapperInner}>
          <div className={styles.content}>
            <Link to={AppRoute.ROOT}>
              <img className={styles.logo} src={Logo} alt="Autoline" />
            </Link>
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
};
