import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
width: 100%;
height: 100%;
min-height: 300px;
display: flex;
align-items: center;
justify-content: center;`

const Loader = (props) => (
	<LoaderContainer>
		<div className="loading loading-lg"></div>
	</LoaderContainer>
)
export default Loader;