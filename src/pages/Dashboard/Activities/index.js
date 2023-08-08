import { Typography } from '@material-ui/core';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import EventInfoContext from '../../../contexts/EventInfoContext';

export default function Activities() {
  const [paid, setPaid] = useState(true);
  const [isNotRemote, setIsNotRemote] = useState(true);
  const [activitiesInfo, setActivitiesInfo] = useState([]);
  const token = useToken();
  //const { eventInfo } = useContext(EventInfoContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = axios.get(`${process.env.REACT_APP_API_BASE_URL}/activities/`, config);
    response.then((res) => {
      setActivitiesInfo(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <Title variant="h4"> Escolha de atividades </Title>
    </>
  );
}

const Title = styled(Typography)`
  font-family: 'Roboto', sans-serif;
  color: #000000;
`;
