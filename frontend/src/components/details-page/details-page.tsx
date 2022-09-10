import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CharacteristicsList } from '@components/characteristics-list/characteristics-list';
import { Carousel } from '@components/common/carousel/carousel';
import { PageContainer } from '@components/common/page-container/page-container';
import { CompleteSetTable } from '@components/complete-set-table/complete-set-table';
import { DetailsCarPanel } from '@components/details-car-panel/details-car-panel';
import { Header } from '@components/header/header';
import { objectToQueryString } from '@helpers/object-to-query';
import { CircularProgress } from '@mui/material';
import {
  useGetComplectationsQuery,
  useGetModelDetailsQuery,
} from '@store/queries/cars';

import { CollapseBlock } from './collapse-block/collapse-block';
import styles from './styles.module.scss';

export const DetailsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const modelId = (searchParams.get('model') as string) ?? '';
  const complectationId = (searchParams.get('complectation') as string) ?? '';

  const { data: model, isLoading: isModelLoading } =
    useGetModelDetailsQuery(modelId);
  const modelName = `${model?.brandName} ${model?.modelName}`;

  let idParams: string[][] = [];
  if (model) {
    idParams = objectToQueryString({
      'id': model?.complectationsId as string[],
    });
  }

  const { data: complectations = [], isLoading: isComplectationsLoading } =
    useGetComplectationsQuery(idParams, { skip: isModelLoading });

  if (isModelLoading || !model || isComplectationsLoading) {
    return <CircularProgress />;
  }

  const handleCompleteSetClick = (id: string): void => {
    const params = {
      model: modelId,
      complectation: id,
    };
    setSearchParams(params);
  };

  return (
    <>
      <Header />

      <PageContainer>
        <h3 className={styles.title}>{modelName}</h3>
        <div className={styles.headerPage}>
          <div className={styles.carouselWrapper}>
            <Carousel images={model.photoUrls} />
          </div>
          <div className={styles.detailsCarPanelWrapper}>
            <DetailsCarPanel
              modelId={!complectationId ? modelId : ''}
              complectationId={complectationId}
            />
          </div>
        </div>

        {complectations && (
          <CollapseBlock caption="Complete set" open={true}>
            <div className={styles.completeSetWrapper}>
              <CompleteSetTable
                data={complectations}
                onClick={handleCompleteSetClick}
                activeRowId={complectationId}
              />
            </div>
          </CollapseBlock>
        )}

        <CollapseBlock caption="Characteristics" open={!!complectationId}>
          {complectationId ? (
            <CharacteristicsList complectationId={complectationId} />
          ) : (
            <div className={styles.notification}>
              To view detailed information, please select the required set
            </div>
          )}
        </CollapseBlock>

        <div className={styles.footerPage}></div>
      </PageContainer>
    </>
  );
};
