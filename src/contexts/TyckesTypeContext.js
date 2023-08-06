import { createContext } from 'react';
import Splash from '../components/Splash';
import useTicketsType from '../hooks/api/useTickestType';

const TicketsTypeInfoContext = createContext();
export default TicketsTypeInfoContext;

export function TicketsTypeInfoProvider({ children }) { 
  const { ticketsType, ticketsTypeLoading, ticketsTypeError } = useTicketsType();

  if(ticketsTypeLoading) {
    return (
      <Splash loading />
    );
  }

  if(ticketsTypeError) {
    let message = ticketsTypeError.response ? ticketsTypeError.response.data.message: 'Could not connect to server. Please try again later.';
    return (
      <Splash message={ message } />
    );
  }
  const ticketsTypeInfo = ticketsType || [];
  return (
    <TicketsTypeInfoContext.Provider value={ { ticketsTypeInfo, ticketsTypeInfoError: ticketsTypeError } } >
      { children }
    </TicketsTypeInfoContext.Provider>
  );
}
