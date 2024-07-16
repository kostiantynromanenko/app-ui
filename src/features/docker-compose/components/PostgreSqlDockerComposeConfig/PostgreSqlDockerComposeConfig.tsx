import { FC } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import {
  downloadDockerCompose,
  useDeleteDockerComposeMutation,
  useGetDockerComposeConfigQuery,
} from '@features/docker-compose/api';
import { PostgreSqlDockerComposeForm } from '@features/docker-compose/components';
import { isNotFoundError } from '@features/utils';
import {
  DockerComposeFileMissingAlert,
  PostreSqlConfigMissingAlert,
  UnexpectedErrorAlert,
} from '../alerts';
import { DockerComposeConfigActions } from '../DockerComposeConfigActions';
import { useNotification } from '@features/notifications/hooks';
import { StyledContainer, StyledDescription } from './styled';

export interface PostgreSqlDockerComposeConfigProps {
  gameId: string;
  gameName: string;
}

export const PostgreSqlDockerComposeConfig: FC<
  PostgreSqlDockerComposeConfigProps
> = ({ gameId, gameName }) => {
  const { showErrorNotification, showSuccessNotification } = useNotification();

  const {
    data: dockerComposeConfig,
    error,
    isError,
    isFetching,
  } = useGetDockerComposeConfigQuery(gameId);
  const [deleteDockerCompose] = useDeleteDockerComposeMutation();

  const isDockerComposeFileMissing = isNotFoundError(error);
  const postgreSqlConfig = dockerComposeConfig?.services.postgresql;

  const handleDownload = () => {
    downloadDockerCompose(gameId).catch(() =>
      showErrorNotification('Failed to download docker-compose file')
    );
  };

  const handleDelete = () => {
    deleteDockerCompose(gameId)
      .unwrap()
      .then(() => showSuccessNotification('Docker compose file deleted'))
      .catch(() =>
        showErrorNotification('Failed to delete docker compose file')
      );
  };

  const renderContent = () => {
    if (isFetching) {
      return <CircularProgress />;
    }

    if (isError && !isDockerComposeFileMissing) {
      return <UnexpectedErrorAlert />;
    }

    if (!postgreSqlConfig && !isDockerComposeFileMissing) {
      return <PostreSqlConfigMissingAlert />;
    }

    return (
      <>
        {!isDockerComposeFileMissing && (
          <DockerComposeConfigActions
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        )}
        <PostgreSqlDockerComposeForm
          gameId={gameId}
          config={!isDockerComposeFileMissing ? postgreSqlConfig : undefined}
        />
      </>
    );
  };

  return (
    <StyledContainer>
      <Typography>
        PostreSQL configuration for <b>{gameName}</b>
      </Typography>
      <StyledDescription>
        This configuration will be used to create a docker-compose.yaml file to
        run a PostgreSQL database for the game.
      </StyledDescription>
      {isDockerComposeFileMissing && <DockerComposeFileMissingAlert />}
      {renderContent()}
    </StyledContainer>
  );
};
