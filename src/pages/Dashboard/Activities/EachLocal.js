import styled from 'styled-components';
import SVG from '../../../components/EnterSVG';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function EachLocal({ local, activities }) {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const handleActivityClick = (activity) => {
    if (activity.capacity > 0) {
      setSelectedActivities((prevSelectedActivities) => ({
        ...prevSelectedActivities,
        [activity.id]: true,
      }));
    }
  };
  return (
    <ContainerLocal>
      {local}
      <ContainerAtividades>
        {activities.map((activity) => (
          <ContainerActivities 
            key={activity.id}
            duration={calculateDuration(activity.timeStart, activity.timeEnds)}
            onClick={() => handleActivityClick(activity)}
            isSelectedActivity={selectedActivities[activity.id]}
          >
            <ContainerInfoActivities>
              <div>{activity.name}</div>
              <div>{formatTime(activity.timeStart)} - {formatTime(activity.timeEnds)}</div>
            </ContainerInfoActivities>
            <VerticaLine></VerticaLine>
            <ContainerIcon>
              {activity.capacity === 0 ? (
                <StatusIconWrapper red={true}>
                  <CloseCircleOutlined style={{ fontSize: '18px', color: 'red' }} />
                  <span>Esgotado</span>
                </StatusIconWrapper>
              ) : (
                <StatusIconWrapper red={false}>
                  {selectedActivities[activity.id] ? (
                    <>
                      <CheckCircleOutlined style={{ fontSize: '19px', color: 'green' }} />
                      <span>Inscrito</span>
                    </>
                  ):(
                    <>
                      <span><SVG /></span>
                      <span>{activity.capacity} vagas</span>
                    </>
                  )}
                </StatusIconWrapper>
              )}
            </ContainerIcon>
          </ContainerActivities>
        ))}
      </ContainerAtividades>
    </ContainerLocal>
  );
}

function formatTime(timeString) {
  const date = new Date(timeString);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${hours}:${minutes}`;
}

function calculateDuration(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationInHours = (end - start) / (1000 * 60 * 60);
  return durationInHours === 1 ? 1 : durationInHours === 2 ? 2 : 0;
}

const ContainerLocal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #7B7B7B;
`;

const ContainerAtividades = styled.div`
  width: 285px;
  height: 400px;
  border: 1px solid #d7d7d7;
  margin-top: 10px;
  padding: 10px;
`;

const ContainerActivities = styled.div`
  background-color: ${(props) => (props.isSelectedActivity ? '#D0FFDB' : '#F1F1F1')};
  width: 260px;
  height: ${({ duration }) => (duration === 1 ? '79px' : duration === 2 ? '158px' : '260px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  color: #343434;
  padding: 15px;
  margin-bottom: 10px;
`;

const ContainerInfoActivities = styled.div`
  width: 170px;
  height: 55px;
  display: flex;
  flex-direction: column;
  div {
    margin-bottom: 6px;
  }
`;

const VerticaLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: #CFCFCF;
`;

const ContainerIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  span {
    margin: 2px 0;
  }
`;

const StatusIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  span {
    color: ${(props) => (props.red === true ? 'red' : 'green')};
  }
`;
