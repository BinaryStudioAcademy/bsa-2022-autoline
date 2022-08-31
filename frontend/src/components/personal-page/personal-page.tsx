import { PageContainer } from '@components/common/page-container/page-container';
import { Title } from '@components/common/title/title';
import { Header } from '@components/header/header';
import { UserInfoPanel } from '@components/user-info-panel/user-info-panel';
import { Wishlist } from '@components/wishlist/wishlist';
import { Grid } from '@mui/material';

const PersonalPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <PageContainer>
        <Title element="h3">Personal page</Title>
        <UserInfoPanel />
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Wishlist />
          </Grid>
          <Grid item xs={12} md={3}>
            {/* TODO: Profile info */}
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export { PersonalPage };
