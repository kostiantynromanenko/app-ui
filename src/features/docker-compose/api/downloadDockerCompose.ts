export const downloadDockerCompose = async (gameId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/v1/docker-compose/${gameId}/download`
  );

  if (!response.ok) {
    throw new Error('Failed to download docker-compose file');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = 'docker-compose.yaml';

  document.body.appendChild(a);

  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
};
