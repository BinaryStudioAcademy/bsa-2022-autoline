import { useLocation, Link } from 'react-router-dom';

import Container from '@mui/material/Container';

import Logo from '../../assets/images/logo.svg';
import BgImage from '../../assets/images/sign-bg.jpg';
import { AppRoute } from '../../common/enums/app/app';
import { SignInForm } from './components/components';
import { SignUpForm } from './components/sign-up-form/sign-up-form';
import styles from './styles.module.scss';

export const Sign = (): React.ReactElement => {
  const { pathname } = useLocation();

  const getScreen = (path: string): React.ReactElement | null => {
    switch (path) {
      case AppRoute.SIGN_IN: {
        return <SignInForm />;
      }
      case AppRoute.SIGN_UP: {
        return <SignUpForm />;
      }
      default: {
        return null;
      }
    }
  };

  const sectionStyle = {
    backgroundImage: `url(${BgImage})`,
  };

  return (
    <div style={sectionStyle} className={styles.bgImage}>
      <div className={styles.scrollBar}>
        <Container className={styles.wrapper}>
          <div className={styles.wrapperInner}>
            <div className={styles.content}>
              <Link to={AppRoute.ROOT}>
                <img className={styles.logo} src={Logo} alt="Autoline" />
              </Link>
              {getScreen(pathname)}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
