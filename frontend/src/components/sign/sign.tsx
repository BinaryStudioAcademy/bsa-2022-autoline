import { useLocation, Link } from 'react-router-dom';

import Container from '@mui/material/Container';

import Logo from '../../assets/images/logo.svg';
import BgImage from '../../assets/images/sign-bg.jpg';
import { AppRoute } from '../../common/enums/app/app';
import { SignInForm } from './components/components';
import styles from './styles.module.scss';

export const Sign = (): React.ReactElement => {
  const { pathname } = useLocation();

  const getScreen = (path: string): React.ReactElement | null => {
    switch (path) {
      case AppRoute.SIGN_IN: {
        return <SignInForm />;
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
    <Container style={sectionStyle} className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className={styles.content}>
          <Link to={AppRoute.ROOT}>
            <img className={styles.logo} src={Logo} alt="Autoline" />
          </Link>
          {getScreen(pathname)}
        </div>
      </div>
    </Container>
  );
};
