import styled from 'styled-components';
import SVG from '../../../components/EnterSVG';
import { CloseCircleOutlined } from '@ant-design/icons';
export default function EachActivities({ activity }) {
  console.log(activity);
  return (
    <>
      <ContainerActivities>
        <ContainerInfoActivities>
          {activity.name}
        </ContainerInfoActivities>
        <VerticaLine></VerticaLine>
        <SVG />
      </ContainerActivities>
    </>
  );
}

const ContainerActivities = styled.div`
  background-color: #F1F1F1;
  width: 260px;
  height: 79px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  color: #343434;
  padding: 15px;
`;

const ContainerInfoActivities = styled.div`
  width: 170px;
  height: 55px;
`;

const VerticaLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: #CFCFCF;
`;
