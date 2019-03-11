import React from "react";
import Styled from './styled';
import { connect } from 'react-redux';

const  Header = (props) => (
    <Styled.Container> {props.country.data} </Styled.Container>
)

const mapState = state => ({
    country: state.country,
})
    
export default connect(mapState)(Header);