import styled from "styled-components";

export const WrappeSpin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: absolute;
    background: ${(props) => props.background };
    width: 100%;
    z-index: 999;
    `;