import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Room(props) {
  const token = useToken();
  const [black, setBlack] = useState([]);
  const [white, setWhite] = useState([]);
  const [pink, setPink] = useState([]);

  useEffect(() => {
    if(props.selected) {
      let newar = [...white];
      newar.pop();
      setWhite(newar);
      let newar2 = [...pink];
      newar2.push(<ion-icon name="person" style={ { color: '#FF4791' } }></ion-icon>);
      setPink(newar2);
    }
    else{
      let newar = [...pink];
      newar.pop();
      setPink(newar);
      let newar2 = [...white];
      newar2.push(<ion-icon name="person-outline"></ion-icon>);
      setWhite(newar2);
    }
  }, [props.selected]);

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
      console.log(props.capacity - res.data.length);
    });
    response.catch((err) => {
      console.log(err.response.data);
    });
  }, [props.id]);

  return (
    <>
      <RoomCard onClick={props.capacity - black.length === 0 ? () => {console.log('a');} : props.setSelected} disabled={props.capacity - black.length === 0} selected={props.selected} full={props.capacity - black.length === 0}>
        <h1>{props.name}</h1>
        <div>
          {white}
          {pink}
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
  background: ${props => props.full ? '#cecece' : (props.selected ? '#FFEED2' : 'white')};

  div{
    display: flex;
    gap: 5px;
  }
`;

