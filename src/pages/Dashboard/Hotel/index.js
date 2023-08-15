import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import HotelCard from './hotelCard';
import Room from './room';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import useToken from '../../../hooks/useToken';
import { useNavigate } from 'react-router-dom';

export default function Hotel() {
  const [hotel, setHotel] = useState([]);
  const [includesHotel, setIncludesHotel] = useState(true);
  const [paid, setPaid] = useState(true);
  const [definedhotel, setDefinedHotel] = useState(false);
  const token = useToken();
  const [roomInfo, setRoomInfo] = useState([]);
  const [selectedroom, setselectedroom] = useState(false);
  const navigate = useNavigate();
  const [reserved, setReserved] = useState( { Room: { id: 1 } } );
  console.log('reserved room');
  console.log(reserved.Room);

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
    const response2 = axios.get(`${process.env.REACT_APP_API_BASE_URL}/booking`, config);
    response2
      .then((res) => {
        if(res.data) {
          let obj = { ...res.data };
          obj.status = true;
          setReserved(obj);
        }
        else{
          setReserved({ notyet: true, Room: { id: 1 } });
        }
      })
      .catch((e) => console.log(e));
  }, []);

  function selecthotel(h) {
    setDefinedHotel(h);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = axios.get(`${process.env.REACT_APP_API_BASE_URL}/hotels/${h.id}`, config);
    response
      .then((res) => {
        setRoomInfo(res.data.Rooms);
      })
      .catch((e) => console.log(e));
  }

  function selectroom(e) {
    if(!reserved.status) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const body = { roomId: selectedroom.id };
      const response = axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking`, body, config);
  
      response
        .then((res) => {
          console.log('Quarto escolhido');
          navigate('/dashboard/activities');
        })
        .catch((e) => console.log(e)); 
    }
    else{
      let obj = { ...reserved };
      obj.status = false;
      setReserved(obj);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const body = {
        roomId: selectedroom.id
      };
      const response = axios.put(`${process.env.REACT_APP_API_BASE_URL}/booking/${reserved.id}`, body, config);
      response.then((res) => {
        console.log('Quarto alterado');
        navigate('/dashboard/activities');
      })
        .catch((e) => console.log(e)); 
    }
  }

  function changeroom2() {
    let obj = { ...reserved };
    obj.status = false;
    setReserved(obj);
    console.log('Status é' + reserved.status);
  }

  return (
    <>
      <Title variant="h4"> Escolha de hotel e quarto </Title>

      {includesHotel ? (
        paid ?  (
          reserved.status ? 
            <>
              <Feed>
                {hotel.filter(
                  (h) => h.id === reserved?.Room.hotelId
                ).map((f) => <HotelCard
                  h={f}
                  setSelected={() => selecthotel(f)}
                  selected={JSON.stringify(definedhotel) === JSON.stringify(f)}
                  reserved = {reserved}
                  id={reserved.Room.id}
                  status={reserved.status}
                />)}
              </Feed>
              <FeedRoom>
                <ChangeRoomButton onClick={changeroom2}>TROCAR DE QUARTO</ChangeRoomButton>
              </FeedRoom>
            </> 
            :
            <>
              <SubTitle> Primeiro, escolha seu hotel </SubTitle>

              <Feed>
                {hotel.map((h) => {
                  return (
                    <HotelCard
                      h={h}
                      setSelected={() => selecthotel(h)}
                      selected={JSON.stringify(definedhotel) === JSON.stringify(h)}
                      reserved = {reserved}
                      id={reserved.Room.id}
                      status={reserved.status}
                    />
                  );
                })}
              </Feed>
              <>
                {
                  definedhotel?
                    <>
                      <SubTitle> Ótima pedida! Agora escolha seu quarto </SubTitle>
                      <FeedRoom>
                        {roomInfo.map((r) => {
                          return (
                            <Room
                              name={r.name}
                              capacity={r.capacity}
                              selected={JSON.stringify(selectedroom) === JSON.stringify(r)}
                              setSelected={() => setselectedroom(r)}
                              id={r.id}
                            />
                          );
                        })}
                      </FeedRoom>
                      <SelectRoomButton>
                        <button onClick={selectroom}  disabled={!selectedroom}>RESERVAR QUARTO</button>
                      </SelectRoomButton>
                    </> :
                    <></>
                }
              </>
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
  row-gap: 7px;
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

const SelectRoomButton = styled.div`
button{width: 182px;
height: 37px;
border-radius: 4px;
font-family: Roboto;
font-size: 14px;
font-weight: 400;
line-height: 16px;
letter-spacing: 0em;
text-align: center;
background: #E0E0E0;
border: none;
margin-top: 20px;
}
display: flex;
width: 100%;
justify-content: center;
`;

const ChangeRoomButton = styled.button`
width: 182px;
height: 37px;
border-radius: 4px;
font-family: Roboto;
font-size: 14px;
font-weight: 400;
line-height: 16px;
letter-spacing: 0em;
text-align: center;
background: #E0E0E0;
border: none;
margin-top: 20px;
`;
