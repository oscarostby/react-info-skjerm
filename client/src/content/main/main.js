import React, { useState, useEffect } from 'react';
import './main.css'; // Importer CSS-fil for styling
import styled from 'styled-components';
import axios from 'axios';

const Toptext = styled.div`
  font-size: 50px;
  top: 35px;
  left: 40px;
  position: absolute;
  color: white;
  font-weight: 700;
`;

const TeksTemp = styled.div`
  font-size: 140px;
  top: -10px;
  left: 80px;
  position: absolute;
  color: white;
`;

const DagsDate = styled.div`
  font-size: 25px;
  bottom: 30px;
  left: 100px;
  position: absolute;
  color: white;
  display: inline;
  padding: 10px;
  padding-top: 2px;
  padding-right: 35px;
  padding-bottom: 2px;
  padding-left: 20px;
  background: rgba(0, 0, 0, 0.1);
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const Litentext = styled.div`
  font-size: 15px;
  bottom: 35px;
  left: 125px;
  top: 5px;
  position: absolute;
  color: white;
  display: inline;
`;



const VindSpeed = styled.div`
  font-size: 35px;
  bottom: 25px;
  left: 320px;
  position: absolute;
  color: white;
  display: inline;
  width: 200px;

`;

const Litentext2 = styled.div`
  font-size: 25px;
  left: 20px;
  top: 10px;
  position: absolute;
  color: white;
  display: inline;
`;

const Slash = styled.div`
  font-size: 25px;;
  left: 420px;
  bottom: 30px;
  position: absolute;
  color: white;
  display: inline;
  color: rgba(255, 255, 255, 0.5);
`;

const Rainsnow = styled.div`
  font-size: 35px;
  bottom: 25px;
  left: 450px;
  position: absolute;
  color: white;
  display: inline;
  width: 200px;

`;


const Box = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/texts'); // Endre URLen her
        const texts = response.data.texts;
        if (texts.length > 0) {
          setText(texts[0].content);
        }
      } catch (error) {
        console.error('Error fetching text:', error);
      }
    };

    fetchText();
  }, []);

  return (
    <div className="container">
      <div className="top-box">
        <Toptext>{text}</Toptext>
      </div>
      <div className="bottom-box">
        <div className="bottom-item">
          <TeksTemp>-22°</TeksTemp>
          <DagsDate>Torsdag 8<Litentext><b>nd</b></Litentext></DagsDate>
          <div className="Ikonbilde">
          </div>
           <VindSpeed>4<Litentext2>km/h</Litentext2></VindSpeed>
            <Slash>/</Slash>
            <Rainsnow>2<Litentext2>mm</Litentext2></Rainsnow>
        </div>

        <div className="bottom-item">2
        </div>
        <div className="bottom-item">3
        </div>
        <div className="bottom-item">4
        </div>
        <div className="bottom-item">5
        </div>
        <div className="bottom-item">6
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Box />
    </div>
  );
};

export default App;
