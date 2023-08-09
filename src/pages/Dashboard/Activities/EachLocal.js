import styled from 'styled-components';
import EachActivities from './EachActivities';

export default function EachLocal() {
  return (
    <>
      <ContainerLocal>
        Auditório principal
        <ContainerAtividades>
          <EachActivities />
        </ContainerAtividades>
      </ContainerLocal>
    </>
  );
}

const ContainerLocal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContainerAtividades = styled.div`
  width: 285px;
  height: 400px;
  border: 1px solid #d7d7d7;
  margin-top: 10px;
  padding: 10px;
`;
