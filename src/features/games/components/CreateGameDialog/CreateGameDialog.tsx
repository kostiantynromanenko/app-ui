import { ChangeEvent, FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  TextField,
} from '@mui/material';
import { useCreateGameMutation } from '@features/games/api';
import { useNotification } from '@features/notifications/hooks';

export interface CreateGameDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateGameDialog: FC<CreateGameDialogProps> = ({
  open,
  onClose,
}) => {
  const { showSuccessNotification } = useNotification();

  const [createGame, result] = useCreateGameMutation();
  const [gameName, setGameName] = useState('');
  const [error, setError] = useState('');

  const isSaveButtonDisabled = !gameName || !!error || result.isLoading;

  const handleCreateButtonClick = () => {
    createGame({ name: gameName })
      .unwrap()
      .then(() => {
        handleClose();
        showSuccessNotification('Game created successfully');
      })
      .catch((rejected) => {
        setError(rejected.data);
      });
  };

  const validateGameName = (name: string) => {
    if (!name) {
      setError('Game name is required');
      return;
    }

    setError('');
  };

  const handleGameNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGameName(event.target.value);
    validateGameName(event.target.value);
  };

  const handleClose = () => {
    setGameName('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <form>
          <FormControl error={!!error}>
            <TextField
              id="game-name"
              value={gameName}
              onChange={handleGameNameChange}
              label="Game Name"
              placeholder="Enter game name"
              error={!!error}
              helperText={error}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCreateButtonClick}
          disabled={isSaveButtonDisabled}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
