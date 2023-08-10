import styled from 'styled-components';
import SVG from '../../../components/EnterSVG';
import { CloseCircleOutlined } from '@ant-design/icons';

export default function Activities() {
  return (
    <>
      <ContainerStages>
        <DivStage data-title={'Auditório Principal'}>
          <ActivitiesCard>
            <VerticaLine></VerticaLine><SVG />
          </ActivitiesCard>
          <ActivitiesCard>
            <CloseCircleOutlined style={{ color: 'red' }}/>
          </ActivitiesCard>
        </DivStage>
        <DivStage data-title={'Auditório Lateral'}></DivStage>
        <DivStage data-title={'Sala de Workshop'}></DivStage>
      </ContainerStages>
    </>
  );
}

const ContainerStages = styled.div`
  width: 864px;
  height: 400px;
  display: flex;
`;

const DivStage = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 1px solid #D7D7D7;
  margin-right: -1px;
  &::before {
  content: attr(data-title);
  position: absolute;
  top: -33px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  color: #7B7B7B;
  }
`;

const ActivitiesCard = styled.div`
  width: 265px;
  height: 79px;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: #F1F1F1;
  border-radius: 5px;
  margin-top: 10px;
`;

const VerticaLine = styled.div`
  width: 1px;
  height: 75%;
  position: absolute;
  top: 10px;
  right: 66px;
  background-color: #CFCFCF;
`;
