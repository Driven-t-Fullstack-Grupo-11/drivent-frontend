import styled from 'styled-components';
import EachLocal from './EachLocal';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone.js';

export default function EachDate({ date, onClick, isSelected }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale('pt-br');

  const formattedDate = dayjs.utc(date).format('dddd, DD/MM');

  return (
    <>
      <ContainerDate 
        onClick={onClick}
        isSelected={isSelected}
      >
        {formattedDate}
      </ContainerDate>
    </>
  );
}

const ContainerDate = styled.div`
  margin-top: 15px;
  padding: 10px;
  width: 132px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px 0px #00000040;
  background-color: ${(props) => (props.isSelected ? '#FFD37D' : '#e0e0e0')};

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16.41px;
  color: #000000;
`;
