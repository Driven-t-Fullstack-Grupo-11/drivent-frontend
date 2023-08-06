import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import HotelCard from './hotelCard';
import Room from './room';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const [hotel, setHotel] = useState([]);
  const [includesHotel, setIncludesHotel] = useState(true);
  const [paid, setPaid] = useState(true);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const token = useToken();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = axios.get(`${process.env.REACT_APP_API_BASE_URL}/hotels/`, config);
    response.then((res) => {
      setHotel(res.data);
    });
    response.catch((err) => {
      console.log(err.response.data);
      if (err.response && err.response.status === 402) {
        setPaid(false);
      } else if (err.response && err.response.status === 404) {
        setIncludesHotel(false);
      }
    });
  }, [token]);

  function handleHotel(hotelId) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = axios.get(`${process.env.REACT_APP_API_BASE_URL}/hotels/${hotelId}`, config);
    response.then((res) => {
      console.log(res.data);
    });
    response.catch((err) => {
      console.log(err.response.data);
    });
  }

  function handleContainerClick(hotelId) {
    if (selectedHotelId === hotelId) {
      setSelectedHotelId(null);
      console.log('selecthotel', selectedHotelId);
      console.log('hotelid', hotelId);
    } else {
      setSelectedHotelId(hotelId);
      console.log('selecthotel', selectedHotelId);
      handleHotel(hotelId);
      console.log('hotelid', hotelId);
    }
  }

  return (
    <>
      <Title variant="h4"> Escolha de hotel e quarto </Title>

      {includesHotel ? (
        paid ? (
          <>
            <SubTitle> Primeiro, escolha seu hotel </SubTitle>

            <Feed>
              {hotel.map((h) => {
                return (
                  <HotelCard
                    h={h}
                    handleContainerClick={() => handleContainerClick(h.id)}
                    selectedHotelId={selectedHotelId}
                  />
                );
              })}
            </Feed>

            <FeedRoom>
              <Room />
            </FeedRoom>
          </>
        ) : (
          <Container>
            <p>Você precisa ter confirmado pagamento antes</p>
            <p>de fazer a escolha de hospedagem</p>
          </Container>
        )
      ) : (
        <Container>
          <p>Sua modalidade de ingresso não inclui hospedagem </p>
          <p>Prossiga para a escolha de atividades</p>
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

const Feed = styled.div`
  width: 650px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 15px;
`;

const FeedRoom = styled.div`
  width: 790px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-top: 7px;
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
