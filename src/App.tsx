import { FC } from 'react';
import { Provider } from 'react-redux';
import {
  AppBar,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { store } from './store';
import appTheme from './theme';
import {
  CreateGameButtonWithDialog,
  GameTabs,
} from '@features/games/components';
import { NotificationSnackbar } from '@features/notifications/components';
import { StyledActionsContainer, StyledCard, StyledMain } from './styled';

const App: FC = () => (
  <ThemeProvider theme={appTheme}>
    <Provider store={store}>
      <Stack>
        <AppBar position="absolute">
          <Toolbar>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Application
            </Typography>
          </Toolbar>
        </AppBar>
        <StyledMain>
          <Toolbar />
          <Stack alignItems="center">
            <StyledActionsContainer>
              <CreateGameButtonWithDialog />
            </StyledActionsContainer>
            <StyledCard>
              <GameTabs />
            </StyledCard>
          </Stack>
        </StyledMain>
      </Stack>
      <NotificationSnackbar />
    </Provider>
  </ThemeProvider>
);

export default App;
