import * as React from 'react';
import styled from 'styled-components';
import { Component } from 'react';

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const Header = styled.header`
  background: #D4C635;
  color: #2D3DA0;
  padding: 25px;
`;

class Home extends Component {
  public render() {
    return (<Header><Title>X-Men</Title></Header>);
  }
}

export default Home;
