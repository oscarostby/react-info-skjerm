import React from 'react';
import styled from 'styled-components';
import LaughingManImage from '../../video/lol.png';

const Container = styled.div`
  text-align: center;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 34px;
  z-index: 10;
`;

const Stortitle = styled.h1`
  font-size: 104px;
  z-index: 10;
`;

const LaughingMan = styled.img`
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
`;

const Skillissue = () => {
  return (
    <Container>
      <Title>Du trodde du kunne skippe login?</Title>
      <Stortitle>Noob</Stortitle>
      <LaughingMan src={LaughingManImage} alt="Laughing Man" />
    </Container>
  );
};

export default Skillissue;
