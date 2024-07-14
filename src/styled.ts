import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
  ${reset}
  html, body {
    height: 100%;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 80px auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header header'
    'sidebar main';
  height: 100vh;
`;

export const Header = styled.header`
  grid-area: header;
  background-color: #192729;
  color: white;
  text-align: center;
  padding: 1em;
`;

export const Sidebar = styled.aside`
  grid-area: sidebar;
  background-color: #1f2e32;
  padding: 1em;
`;

export const Main = styled.main`
  grid-area: main;
  background: linear-gradient(
    90deg,
    rgba(152, 149, 140, 1) 0%,
    rgba(116, 121, 117, 1) 34%,
    rgba(106, 113, 110, 1) 56%,
    rgba(91, 100, 99, 1) 100%
  );
  padding: 1em;
`;
