import { Typography } from '@material-ui/core';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import EventInfoContext from '../../../contexts/EventInfoContext';
import EachDate from './EachDate';
import EachLocal from './EachLocal';

export default function Activities() {
  const [paid, setPaid] = useState(true);
  const [isNotRemote, setIsNotRemote] = useState(true);
  const [activitiesInfo, setActivitiesInfo] = useState([]);
  const [selectDate, setSelectDate] = useState(null);
  const [showEachActivities, setShowEachActivities] = useState(true);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [activitiesByLocal, setActivitiesByLocal] = useState({
    'Auditório Principal': [],
    'Auditório Lateral': [],
    'Sala de Workshop': [],
  });
  const token = useToken();
  const { eventInfo } = useContext(EventInfoContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = axios.get(`${process.env.REACT_APP_API_BASE_URL}/activities/${eventInfo.id}`, config);
    response.then((res) => {
      setActivitiesInfo(res.data);
      console.log(res.data);
    });
    response.catch((err) => {
      if (err.response && err.response.status === 402) {
        setPaid(false);
      } else if (err.response && err.response.status === 204) {
        setIsNotRemote(true);
      }
    });
    console.log(isNotRemote);
  }, []);

  const uniquesDates = activitiesInfo.length > 0 ? [...new Set(activitiesInfo.map((activity) => activity.timeStart))] : [];

  const handleDateClick = (date) => {
    setSelectDate(date);
    const filteredActivities = activitiesInfo.filter(
      (activity) => activity.timeStart === date
    );

    const updatedActivitiesByLocal = {
      'Auditório Principal': [],
      'Auditório Lateral': [],
      'Sala de Workshop': [],
    };

    filteredActivities.forEach((activity) => {
      if (updatedActivitiesByLocal.hasOwnProperty(activity.local)) {
        updatedActivitiesByLocal[activity.local].push(activity);
      }
    });

    setFilteredActivities(filteredActivities);
    setShowEachActivities(false);
    setActivitiesByLocal(updatedActivitiesByLocal);
    console.log(updatedActivitiesByLocal);
  };

  return (
    <>
      <Title variant="h4"> Escolha de atividades </Title>

      {paid ? (
        isNotRemote ? (
          <>
            <SubTitle> Primeiro, filtre pelo dia do evento </SubTitle>
            <ContainerDate>
              {uniquesDates.map((date) => (
                <EachDate 
                  key={date}
                  date={date}
                  onClick={() => handleDateClick(date)}
                  isSelected={date === selectDate}
                />
              ))}
            </ContainerDate>
            <ContainerLocal show={showEachActivities}>
              <EachLocal 
                local='Auditório Principal' 
                activities={activitiesByLocal['Auditório Principal']}              
              />
              <EachLocal 
                local='Auditório Lateral' 
                activities={activitiesByLocal['Auditório Lateral']}              
              />
              <EachLocal 
                local='Sala de Workshop' 
                activities={activitiesByLocal['Sala de Workshop']}             
              />
            </ContainerLocal>
          </>
        ) : (
          <Container>
            <p>Sua modalidade de ingresso não necessita escolher</p>
            <p>atividade. Você terá acesso a todas as atividades.</p>
          </Container>
        )
      ) : (
        <Container>
          <p>Você precisa ter confirmado pagamento antes</p>
          <p>de fazer a escolha de atividades</p>
        </Container>
      )}
    </>
  );
}

const Title = styled(Typography)`
  font-family: 'Roboto', sans-serif;
  color: #000000;
`;

const SubTitle = styled.div`
  margin-top: 22px;
  color: #8e8e8e;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 23.44px;
`;

const ContainerDate = styled.div`
  width: 640px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const ContainerLocal = styled.div`
  margin-top: 50px;
  width: 840px;
  display: ${(props) => (props.show ? 'none' : 'grid')};
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 60vh;
  color: #8e8e8e;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 23.44px;
`;
