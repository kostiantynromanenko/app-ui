import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { CircularProgress, Tab, Tabs } from '@mui/material';
import { TabPanel } from '@features/ui/components';
import { GameTabsContainer } from './styled';
import { PostgreSqlDockerComposeConfig } from '@features/docker-compose/components';
import { useGetAllGamesQuery } from '@features/games/api';

const a11yProps = (id: string) => ({
  id: `game-tab-${id}`,
  'aria-controls': `game-tabpanel-${id}`,
});

export const GameTabs: FC = () => {
  const { data, isLoading } = useGetAllGamesQuery();
  const [selectedGameId, setSelectedGameId] = useState('');

  useEffect(() => {
    if (data?.length) {
      setSelectedGameId(data[0].id);
    }
  }, [data]);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setSelectedGameId(newValue);
  };

  if (isLoading || !data) {
    return <CircularProgress />;
  }

  return (
    <GameTabsContainer>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedGameId || false}
        onChange={handleChange}
        aria-label="Game tabs"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {data?.map(({ id, name }) => (
          <Tab
            label={name}
            value={id}
            key={`game-tag-${id}`}
            sx={{ textTransform: 'none' }}
            {...a11yProps(id)}
          />
        ))}
      </Tabs>
      {data?.map(({ id, name }) => (
        <TabPanel
          id={id}
          key={`game-tab-panel-${id}`}
          open={id === selectedGameId}
        >
          <PostgreSqlDockerComposeConfig gameId={id} gameName={name} />
        </TabPanel>
      ))}
    </GameTabsContainer>
  );
};
