import { Typography } from '@material-ui/core';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import EventInfoContext from '../../../contexts/EventInfoContext';
import EachDate from './EachDate';
import EachLocal from './EachLocal';

import styled from 'styled-components';
import SVG from '../../../components/EnterSVG';
import { CloseCircleOutlined } from '@ant-design/icons';

export default function Activities() {
  const [paid, setPaid] = useState(true);
  const [isNotRemote, setIsNotRemote] = useState(true);
  const [activitiesInfo, setActivitiesInfo] = useState([]);
  const [selectDate, setSelectDate] = useState(null);
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

  const uniquesDates = [...new Set(activitiesInfo.map((activity) => activity.date))];

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
                />
              ))}
            </ContainerDate>
            <ContainerLocal>
              <EachLocal />
              <EachLocal />
              <EachLocal />
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
  display: grid;
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
