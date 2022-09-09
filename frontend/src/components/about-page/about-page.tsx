import { PageContainer } from '@components/common/page-container/page-container';
import { Title } from '@components/common/title/title';
import { Header } from '@components/header/header';
import { Grid } from '@mui/material';

import styles from './styles.module.scss';
import { teamMembers } from './teamMembers';

const AboutPage: React.FC = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Title element="h3">About</Title>
        <Grid container spacing={2} className={styles.aboutContent}>
          <Grid item xs={12}>
            <p>
              Autoline is a multifunctional automobile-centric service. It
              allows searching by filters, detailed comparing, and reviewing,
              but also it picks up the available options on the market to choose
              the best price.
            </p>
            <p>
              Our task is to help the buyer quickly and conveniently find the
              best offer. For those who are determined by the choice, in each
              section, there is a selection by parameters and an opportunity to
              compare products with each other. Available and convenient text
              search allows you to search both the desired sections and specific
              products by name. And on the page of each model, there is detailed
              information that will help you make a decision: description,
              technical characteristics, photos and videos, useful links, and
              reviews. There is also a block "Where to buy?" with a list of
              online stores, prices, and direct links to the purchase page.
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={4} className={styles.team}>
          {teamMembers.map((person) => (
            <Grid item xs={12} sm={4} md={2}>
              <div className={styles.teamMember}>
                <div className={styles.avatar}>
                  <img src={person.image} alt={person.name} />
                </div>
                <p className={styles.name}>{person.name}</p>
                <p className={styles.position}>{person.position}</p>
              </div>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </>
  );
};

export { AboutPage };
