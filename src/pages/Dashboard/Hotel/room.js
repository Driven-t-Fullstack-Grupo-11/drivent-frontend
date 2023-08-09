import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Room(props) {
  const token = useToken();
  const [black, setBlack] = useState([]);
  const [white, setWhite] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = axios.get(`${process.env.REACT_APP_API_BASE_URL}/booking/${props.id}`, config);
    response.then((res) => {
      let arblack = [];
      for(let i = 0; i < res.data.length; i++) {
        arblack.push(<ion-icon name="person"></ion-icon>);
      }
      setBlack([...arblack]);
      let arwhite = [];
      for(let i = 0; i < props.capacity - res.data.length; i++) {
        arwhite.push(<ion-icon name="person-outline"></ion-icon>);
      }
      setWhite([...arwhite]);
    });
    response.catch((err) => {
      console.log(err.response.data);
    });
  }, [props.id]);

  return (
    <>
      <RoomCard>
        <h1>{props.name}</h1>
        <div>
          {white}
          {black}
        </div>
      </RoomCard>
    </>
  );
}
const RoomCard = styled.div`
  width: 190px;
  height: 45px;
  top: 490px;
  left: 762px;
  border-radius: 10px;
  border: 1px solid gray;
  display: flex;
  padding-left: 7px;
  padding-right: 7px;
  align-items: center;
  justify-content: space-between;

  div{
    display: flex;
    gap: 5px;
  }
`;
