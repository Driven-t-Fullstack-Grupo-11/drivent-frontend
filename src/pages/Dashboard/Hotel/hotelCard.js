import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { useState } from 'react';

export default function HotelCard(props) {
  const token = useToken();
  const h = props.h;
  const id = props.id;
  const [roomInfo, setRoomInfo] = useState([]);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [uniqueAccommodations, setUniqueAccommodations] = useState([]);
  const [quantitypeople, setQuantityPeople] = useState(0);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = axios.get(`${process.env.REACT_APP_API_BASE_URL}/hotels/${h.id}`, config);
    response.then((res) => {
      setRoomInfo(res.data.Rooms);

      const vagasTotal = res.data.Rooms.reduce((acc, room) => acc + room.capacity, 0);
      setTotalCapacity(vagasTotal);
      console.log(res.data.Rooms);

      const uniqueTypes = new Set();
      res.data.Rooms.forEach((room) => {
        const type = getAccommodationType(room.capacity);
        uniqueTypes.add(type);
      });
      setUniqueAccommodations(Array.from(uniqueTypes));
    });
    response.catch((err) => {
      console.log(err.response.data);
    });
  }, [h.id]);

  useEffect(() => {
    if(props.reserved.id) {
      console.log('O reservado em hotelCard é');
      console.log(props.reserved);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = axios.get(`${process.env.REACT_APP_API_BASE_URL}/booking/${id}`, config);
      response.then((response) => {
        let l = response.data.length;
        setQuantityPeople(l - 1);
      });
      response.catch((err) => {
        console.log(err.response.data);
      });
    }
  }, [props.reserved]);

  function getAccommodationType(capacity) {
    if (capacity === 1) {
      return 'Single';
    } else if (capacity === 2) {
      return 'Double';
    } else if (capacity === 3) {
      return 'Triple';
    } else {
      return 'Family';
    }
  }

  return (
    <Container onClick={props.setSelected} selected={props.selected}>
      <Card selected={props.selected}>
        <img src={h.image} />
        <Title>{h.name}</Title>
        {!props.reserved.status ? 
          (<>
            <SubTitle>Tipos de acomodação:</SubTitle>
            {uniqueAccommodations.map((type, index) => (
              <Frag>
                <TextCapacity>{type}</TextCapacity>
                {index !== uniqueAccommodations.length - 1 && ','}
              </Frag>
            ))}
            <SubTitle>Vagas disponíveis:</SubTitle>
            <p>{totalCapacity}</p>
          </>) 
          : 
          <>
            <SubTitle>Quarto reservado</SubTitle>
            <p>{`${h.name} (${getAccommodationType(props.reserved.Room.capacity)})`}</p>
            <SubTitle>Pessoas no seu quarto</SubTitle>
            <p>{`Você e mais ${quantitypeople}`}</p>
          </>
        }
      </Card>
    </Container>
  );
}

const Container = styled.div`
background-color: ${({ selected }) => (selected ? '#ffeed2' : '#ebebeb')};
  padding: 20px;
  width: 196px;
  border-radius: 10px;
  margin-bottom: 20px;

  img {
    width: 155px;
    height: 110px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
`;

const Card = styled.div`
  background-color: ${({ selected }) => (selected ? '#ffeed2' : '#ebebeb')};
  color: #343434;

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 23.44px;
    color: #343434;
  }
`;

const TextCapacity = styled.div`
  display: flex;
  
  color: #3b3b3b;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 23.44px;
`;
const Frag = styled.div`
  display: flex;
  width: 150px;
  color: #3b3b3b;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 23.44px;
`;
const Title = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 23.44px;
  color: #343434;
`;

const SubTitle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #343434;
  margin-top: 10px;
`;
