import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import { useState, useContext } from 'react';
import TicketsTypeInfoContext from '../../../contexts/TyckesTypeContext';
export default function Payment() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showTicket, setShowTicket] = useState('block');
  const [showHotel, setShowHotel] = useState('none');
  const [showResume, setShowResume] = useState('none');
  const { ticketsTypeInfo, ticketsTypeInfoError } = useContext(TicketsTypeInfoContext);
  const [totalPrice, setTotalPrice] = useState(0);
  let hotelPrice = 0;
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setSelectedHotel(null);
    if(ticket.name === 'online' || ticket.name === 'Online') {
      setShowHotel('none');
      setShowResume('block');
      calculateTotal();
    } else if(ticket.name === 'presencial' || ticket.name === 'Presencial') {
      setShowHotel('block');
      setShowResume('none');
    }
  };
  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
    setShowResume('block');
    calculateTotal();
  };
  const handleButtonClick = () => {
    setShowTicket('none');
  };
  const calculateTotal = () => {
    let ticketPrice = selectedTicket ? selectedTicket.price : 0;
    hotelPrice = selectedHotel === 'Com Hotel' ? 350 : 0;
    const totalPrice = ticketPrice + hotelPrice;
    setTotalPrice(totalPrice);
  };
  if (ticketsTypeInfoError) {
    return <div>Error: {ticketsTypeInfoError}</div>;
  }
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Container display={showTicket}>
        <>
          <StyledSubtitle variant='h6'>Primeiro, escolha sua modalidade de ingresso</StyledSubtitle>
          <BoxContainer>
            {ticketsTypeInfo.map((ticket) => (
              <StyledBox 
                onClick={() => handleTicketClick(ticket)} 
                backgroundColor={selectedTicket === ticket ? '#FFEED2' : 'white'}
                key={ticket.id}
              >
                <div>{ticket.name}</div>
                <div>{ticket.price}</div>
              </StyledBox>
            ))}
          </BoxContainer>
        </>
        <Container display={showHotel}>
          <StyledSubtitle variant='h6'>
            Ótimo! Agora escolha sua modalidade de hospedagem
          </StyledSubtitle>
          <BoxContainer>
            <StyledBox onClick={() => handleHotelClick('Sem Hotel')} backgroundColor={selectedHotel === 'Sem Hotel' ? '#FFEED2' : 'white'}>
              <div>Sem Hotel;</div>
              <div>+ R$ 0;</div>
            </StyledBox>
            <StyledBox onClick={() => handleHotelClick('Com Hotel')} backgroundColor={selectedHotel === 'Com Hotel' ? '#FFEED2' : 'white'}>
              <div>Com Hotel;</div>
              <div>+ R$ 350;</div>
            </StyledBox>
          </BoxContainer>
        </Container>
        <Container display={showResume}>
          <StyledSubtitle variant='h6'>
          Fechado! O total ficou em R$ { totalPrice.toString() }. Agora é só confirmar:
          </StyledSubtitle>
          <Button onClick={handleButtonClick}>
            RESERVAR INGRESSO
          </Button>
        </Container>
      </Container>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const StyledSubtitle = styled(Typography)`
  color: #8E8E8E;
`;

const Container = styled.div`
  display: ${props => props.display};
`;

const BoxContainer = styled.div`
  width: 314px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 17px;
`;

const StyledBox = styled.div`
  width: 145px;
  height: 145px;
  background-color: ${props => props.backgroundColor};
  border-radius: 20px;
  border: 1px solid #CECECE;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 17px;
  div{
    display: flex;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    color: #454545;
  }
`;
