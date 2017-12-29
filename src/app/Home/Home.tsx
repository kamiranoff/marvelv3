import * as React from 'react';
import styled from 'styled-components';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getCharacters } from '../redux/modules/characters/characters';

// import { ICharacters } from '../redux/modules/characters/index';

export interface IHomeProps {
  getCharacters: () => any;
  characters: any;
}

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const Header = styled.header`
  background: #D4C635;
  color: #2D3DA0;
  padding: 25px;
`;

class Home extends Component<IHomeProps> {

  public static defaultProps = {
    characters: {
      character: [],
    },
  };

  public componentWillMount() {
    this.props.getCharacters();
  }

  public render() {
    return (
      <div>
        <Header>
          <Title>X-Men</Title>
        </Header>
        <section>{this.props.characters.character &&
        this.props.characters.character.map((char, i) => (
          <h3 key={i}>{char.character.name}</h3>))}
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ characters }) => ({
  characters,
});

export default connect(mapStateToProps, { getCharacters })(Home);
