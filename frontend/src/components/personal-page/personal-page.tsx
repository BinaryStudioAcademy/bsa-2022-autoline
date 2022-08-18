import { Title } from '@components/common/title/title';
import { Header } from '@components/header/header';
import { Container, Grid } from '@mui/material';

const PersonalPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Container>
        <Title element="h3">Personal page</Title>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            {/* TODO: Models list */}
          </Grid>
          <Grid item xs={12} md={3}>
            {/* TODO: Profile info */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export { PersonalPage };