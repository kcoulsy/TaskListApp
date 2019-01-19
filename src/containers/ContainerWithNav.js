import React from 'react'
import styled from 'styled-components';

import NavBar from '../components/NavBar';

const Container = styled.div`
width: 800px;
margin: 40px auto auto auto;
`;
const ContainerWithNav = (props) => (
	<div>
	<NavBar />
	<Container>
		{props.children}
	</Container>
	</div>
)

export default ContainerWithNav;