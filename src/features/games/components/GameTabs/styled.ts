import { css, styled } from '@mui/material';

export const GameTabsContainer = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    padding: ${theme.spacing(2)};
    background-color: #f5f5f5;
  `
);
