import { FC } from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledContainer } from './styled.ts';

export interface DockerComposeConfigActionsProps {
  onDownload: () => void;
  onDelete: () => void;
}

export const DockerComposeConfigActions: FC<
  DockerComposeConfigActionsProps
> = ({ onDownload, onDelete }) => (
  <StyledContainer>
    <Button onClick={onDownload} startIcon={<DownloadIcon />}>
      Download
    </Button>
    <Button onClick={onDelete} color="error" startIcon={<DeleteIcon />}>
      Delete
    </Button>
  </StyledContainer>
);
