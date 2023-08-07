import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import { useState, useContext, useEffect } from 'react';
import TicketsTypeInfoContext from '../../../contexts/TyckesTypeContext';
import useToken from '../../../hooks/useToken';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import { createTicket } from '../../../services/ticketTypeApi';
import Chip from '../../../assets/images/pngwing.png';
import Check from '../../../assets/images/checkicon.png';
import axios from 'axios';

export default function Payment() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showTicket, setShowTicket] = useState('block');
  const [showHotel, setShowHotel] = useState('none');
  const [showResume, setShowResume] = useState('none');
  const [hasEnrollment, setHasEnrollment] = useState(false);
  const { ticketsTypeInfo, ticketsTypeInfoError } = useContext(TicketsTypeInfoContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showTickets, setShowTickets] = useState(true);

  const [card, setCard] = useState('');
  const [name, setName] = useState('Nome Impresso no Cartão');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('••');
  const [year, setYear] = useState('••');
  const [cvc, setCvc] = useState('');
  const [show, setShow] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [showPayments, setShowPayments] = useState(false);
  const [card1, setCard1] = useState('••••');
  const [card2, setCard2] = useState('••••');
  const [card3, setCard3] = useState('••••');
  const [card4, setCard4] = useState('••••');
  const token = useToken();
  let hotelPrice = 0;

  useEffect(() => {
    getPersonalInformations(token)
      .then((data) => {
        if (data) {
          setHasEnrollment(true);
        } else {
          setHasEnrollment(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching personal information:', error);
      });
  }, [token]);
  useEffect(() => {
    calculateTotal();
  }, [selectedTicket, selectedHotel]);
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setSelectedHotel(null);
    if (ticket.name.toLowerCase() === 'online') {
      setShowHotel('none');
      setShowResume('block');
      calculateTotal();
    } else if (ticket.name.toLowerCase() === 'presencial') {
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
    setShowTickets(false);
    setShowPayments(true);
    /* if (selectedTicket) {
      try {
        const ticketId = selectedTicket.id;
        const body = { ticketTypeId: ticketId };
        const createdTicket = await createTicket(body, token);
        setShowTicket('none');
      } catch (error) {
        console.error('Erro ao reservar ingresso:', error);
      }
    } */
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

  function click() {
    setShow(!show);
  }

  function button() {
    setCard1('1234');
  }

  function changeNumber(value) {
    setCard(value);

    if (value.length >= 4) {
      setCard1(value.slice(0, 4));
    } else {
      setCard1('••••');
    }

    if (value.length >= 8) {
      setCard2(value.slice(4, 8));
    } else {
      setCard2('••••');
    }

    if (value.length >= 12) {
      setCard3(value.slice(8, 12));
    } else {
      setCard3('••••');
    }

    if (value.length === 16) {
      setCard4(value.slice(12, 16));
    } else {
      setCard4('••••');
    }

    if (isNaN(Number(value))) {
      setCard('');
      setCard1('••••');
      setCard2('••••');
      setCard3('••••');
      setCard4('••••');
      alert('Cuidado ao digitar os números do cartão!');
    }
  }

  function cardName(value) {
    if (value.length < 1) {
      setName('Nome Impresso no Cartão');
    } else {
      setName(value.toUpperCase());
    }
  }

  function cardDate(value) {
    setDate(value);

    if (value.length === 2) {
      setMonth(value.slice(0, 2));
      setDate(value + '/');
    }
    if (value.length === 5) setYear(value.slice(date.length - 1));

    if (value.length < 1) {
      setMonth('••');
      setYear('••');
    }
  }

  function submitPayment() {
    /* const ticketId = 123;
    const payment = {
      issuer: 'VISA',
      number: card,
      name: name,
      expirationDate: date,
      cvv: cvc,
    };
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = { ticketId, cardDate: payment };

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/payments`, config, body); */
    if (card.length < 16) return alert('Confira os números do cartão');
    if (name === 'Nome Impresso no Cartão') return alert('Nome impresso no cartão é obrigatório');
    if (date.length < 5) return alert('Confira a data de expiração do cartão');
    if (cvc.length < 3) return alert('Confira o código de segurança do cartão');

    setShow(!show);
  }

  return (
    <>
      <TicketsContainer show={showTickets}>
        <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
        {hasEnrollment === true ? (
          <Container display={showTicket}>
            <StyledSubtitle variant="h6">Primeiro, escolha sua modalidade de ingresso</StyledSubtitle>
            <BoxContainer>
              {ticketsTypeInfo.map((ticket) => (
                <StyledBox
                  onClick={() => handleTicketClick(ticket)}
                  backgroundColor={selectedTicket === ticket ? '#FFEED2' : 'white'}
                  key={ticket.id}
                >
                  <div>{ticket.name}</div>
                  <div>R$ {ticket.price},00</div>
                </StyledBox>
              ))}
            </BoxContainer>
            <Container display={showHotel}>
              <StyledSubtitle variant="h6">Ótimo! Agora escolha sua modalidade de hospedagem</StyledSubtitle>
              <BoxContainer>
                <StyledBox
                  onClick={() => handleHotelClick('Sem Hotel')}
                  backgroundColor={selectedHotel === 'Sem Hotel' ? '#FFEED2' : 'white'}
                >
                  <div>Sem Hotel</div>
                  <div>+ R$ 0</div>
                </StyledBox>
                <StyledBox
                  onClick={() => handleHotelClick('Com Hotel')}
                  backgroundColor={selectedHotel === 'Com Hotel' ? '#FFEED2' : 'white'}
                >
                  <div>Com Hotel</div>
                  <div>+ R$ 350,00</div>
                </StyledBox>
              </BoxContainer>
            </Container>
            <Container display={showResume}>
              <StyledSubtitle variant="h6">
                Fechado! O total ficou em R$ {totalPrice.toString()}. Agora é só confirmar:
              </StyledSubtitle>
              <Button onClick={handleButtonClick}>RESERVAR INGRESSO</Button>
            </Container>
          </Container>
        ) : (
          <MessageContainer>
            <StyledSubtitle variant="h6">Você precisa completar sua inscrição antes</StyledSubtitle>
            <StyledSubtitle variant="h6">de prosseguir pra escolha de ingresso</StyledSubtitle>
          </MessageContainer>
        )}
      </TicketsContainer>

      <InfosContainer show={showPayments}>
        <h1>Ingresso e pagamento</h1>

        <TicketsInfoContainer show={showPreview}>
          <h2>Ingresso escolhido</h2>
          <div>
            {selectedTicket?.name} {selectedTicket?.name === 'online' ? '' : '+'} {selectedHotel} <br />
            <span>R$ {totalPrice}</span>
          </div>
        </TicketsInfoContainer>
        <PaymentContainer show={show}>
          <h2>Pagamento</h2>
          <CreditCardPaymentInfoContainer>
            <CreditCardImageContainer>
              <ChipContainer>
                <img src={Chip} alt="" />
              </ChipContainer>
              <NumbersContainer>
                <span>{card1}</span>
                <span>{card2}</span>
                <span>{card3}</span>
                <span>{card4}</span>
              </NumbersContainer>
              <NameContainer>
                <span>{name}</span>
                <div>
                  <p>valid thru</p>
                  <p>
                    {month}/{year}
                  </p>
                </div>
              </NameContainer>
            </CreditCardImageContainer>
            <PaymentInputsContainer>
              <CardNumberContainer>
                <input
                  placeholder="Card Number"
                  maxLength={16}
                  value={card}
                  onChange={(e) => changeNumber(e.target.value)}
                ></input>
                <span>E.g.: 49..., 51..., 36..., 37....</span>
              </CardNumberContainer>
              <input placeholder="Name" onChange={(e) => cardName(e.target.value)}></input>
              <div>
                <ValidThruContainer>
                  <input
                    placeholder="Valid Thru"
                    maxLength={5}
                    value={date}
                    onChange={(e) => cardDate(e.target.value)}
                  ></input>
                </ValidThruContainer>
                <CvcContainer>
                  <input placeholder="CVC" maxLength={3} onChange={(e) => setCvc(e.target.value)}></input>
                </CvcContainer>
              </div>
            </PaymentInputsContainer>
          </CreditCardPaymentInfoContainer>
          <button onClick={submitPayment}>FINALIZAR PAGAMENTO</button>
        </PaymentContainer>
        <PaymentConfirmationContainer show={show}>
          <h2>Pagamento</h2>
          <PaymentConfirmationContentContainer>
            <img src={Check} alt="" />
            <div>
              <h3>Pagamento Confirmado!</h3>
              <p>Prossiga para a escolha de hospedagem e atividades</p>
            </div>
          </PaymentConfirmationContentContainer>
        </PaymentConfirmationContainer>
      </InfosContainer>
    </>
  );
}

const InfosContainer = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.show ? 'visible' : 'none')}; /* background-color: blue; */
  h1 {
    font-size: 2vw;
  }

  h2 {
    font-size: 1.5vw;
    margin-bottom: 18px;
  }

  button {
    width: 185px;
    height: 38px;
    margin: 25px 0;
    border-radius: 5px;
    border: none;
  }
`;

const TicketsContainer = styled.div`
  display: ${(props) => (props.show ? 'visible' : 'none')};
`;

const TicketsInfoContainer = styled.div`
  width: 100%;
  display: ${(props) => (props.show ? 'visible' : 'none')};
  flex-direction: column;
  margin: 35px 0;

  div {
    width: 290px;
    height: 108px;
    background-color: #ffeed2;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

const PaymentContainer = styled.div`
  width: 100%;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
`;

const PaymentConfirmationContainer = styled.div`
  width: 100%;
  display: ${(props) => (props.show ? 'none' : 'flex')};
  flex-direction: column;
`;

const PaymentConfirmationContentContainer = styled.div`
  width: 100%;
  display: flex;

  div {
    width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
  }
`;

const CreditCardPaymentInfoContainer = styled.div`
  width: 100%;
  height: 200px;
  /* background-color: green; */
  display: flex;
`;

const CreditCardImageContainer = styled.div`
  width: 40%;
  height: 100%;
  border-radius: 15px;
  background-color: #929292;
  margin-right: 25px;
`;

const PaymentInputsContainer = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    display: flex;
  }

  input {
    height: 45px;
    font-size: 22px;
    padding-left: 10px;
    border: 1px solid gray;
    border-radius: 6px;
  }
`;

const CardNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin-top: 5px;
    color: gray;
    font-size: 17px;
  }
`;

const ValidThruContainer = styled.div`
  width: 60%;
  margin-right: 5%;
  input {
    width: 100%;
  }
`;

const CvcContainer = styled.div`
  width: 35%;
  input {
    width: 100%;
  }
`;

const ChipContainer = styled.div`
  width: 100%;
  height: 28%;

  img {
    width: 50px;

    margin: 15px 20px;
  }
`;

const NumbersContainer = styled.div`
  width: 100%;
  height: 40%;
  /* background-color: blue; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 15px;

  span {
    font-size: 20px;
    letter-spacing: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }
`;

const NameContainer = styled.div`
  width: 100%;
  height: 32%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* background-color: green; */

  span {
    margin-bottom: 25px;
    color: #ffffff;
  }

  div {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #ffffff;
  }

  p {
    padding-top: 4px;
    letter-spacing: 1px;
  }
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const StyledSubtitle = styled(Typography)`
  color: #8e8e8e;
`;

const Container = styled.div`
  display: ${(props) => props.display};
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
  background-color: ${(props) => props.backgroundColor};
  border-radius: 20px;
  border: 1px solid #cecece;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 17px;
  div {
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

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 100%;
`;

