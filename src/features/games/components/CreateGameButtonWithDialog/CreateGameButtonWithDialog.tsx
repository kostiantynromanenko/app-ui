import { FC, useState } from 'react';
import { Button } from '@mui/material';
import { CreateGameDialog } from '../CreateGameDialog';

export const CreateGameButtonWithDialog: FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateButtonClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Button onClick={handleCreateButtonClick} variant="contained">
        Create Game
      </Button>
      <CreateGameDialog open={dialogOpen} onClose={handleDialogClose} />
    </>
  );
};
