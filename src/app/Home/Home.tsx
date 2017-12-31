import * as React from 'react';
import styled from 'styled-components';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getCharactersSaga } from '../redux/modules/characters/charactersSaga';

// import { ICharacters } from '../redux/modules/characters/index';

export interface IHomeProps {
  getCharactersSaga: () => any;
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

const Image = styled.img`
  width: 100%;
`;

class Home extends Component<IHomeProps> {

  public static defaultProps = {
    characters: {
      character: [],
    },
  };

  public componentWillMount() {
    this.props.getCharactersSaga();
  }

  public render() {
    return (
      <div>
        <Header>
          <Title>X-Men</Title>
        </Header>
        <section>{this.props.characters.character &&
        this.props.characters.character.map((char, i) => {
          return (
            <div key={`${char.character.name}_${i}`}>
              <h3>{char.character.name}</h3>
              <Image src={`${char.character.thumbnail.path}.${char.character.thumbnail.extension}`} /></div>);
        })}
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ characters }) => ({
  characters,
});

export default connect(mapStateToProps, { getCharactersSaga })(Home);
