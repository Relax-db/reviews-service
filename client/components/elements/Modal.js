import styled from 'styled-components';

const Modal = styled.div`
display: ${props => props.show ? 'inline' : 'none'};
position: fixed;
background-color: rgba(0,0,0,0.5);
z-index: 3;
left: 0;
top: 0;
height: 100%;
width: 100%;
align-content: center;
overflow:auto;


`

export default Modal;