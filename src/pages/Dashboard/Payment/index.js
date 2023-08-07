import { useState } from 'react';
import styled from 'styled-components';
import Chip from '../../../assets/images/pngwing.com.png';
import Check from '../../../assets/images/checkicon.png';
import useToken from '../../../hooks/useToken';
import axios from 'axios';

export default function Payment() {
  const [card, setCard] = useState('');
  const [name, setName] = useState('Nome Impresso no Cartão');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('••');
  const [year, setYear] = useState('••');
  const [cvc, setCvc] = useState('');
  const [show, setShow] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [card1, setCard1] = useState('••••');
  const [card2, setCard2] = useState('••••');
  const [card3, setCard3] = useState('••••');
  const [card4, setCard4] = useState('••••');
  const token = useToken();

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
    <InfosContainer>
      <h1>Ingresso e pagamento</h1>

      <TicketsInfoContainer show={showPreview}>
        <h2>Ingresso escolhido</h2>
        <div>aaaa</div>
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
  );
}

const InfosContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: blue; */

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

const TicketsInfoContainer = styled.div`
  width: 100%;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  margin: 35px 0;

  div {
    width: 290px;
    height: 108px;
    background-color: #ffeed2;
    border-radius: 20px;
    display: flex;
    justify-content: center;
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
    width: 70px;
    height: 70px;
    margin-left: 20px;
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
