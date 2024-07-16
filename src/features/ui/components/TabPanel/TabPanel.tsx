import { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/material';

export interface TabPanelProps {
  open: boolean;
  id: string;
}

export const TabPanel: FC<PropsWithChildren<TabPanelProps>> = ({
  children,
  open,
  id,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={!open}
      id={`vertical-tabpanel-${id}`}
      aria-labelledby={`vertical-tab-${id}`}
      {...other}
    >
      {open && <Box sx={{ px: 3, pb: 5 }}>{children}</Box>}
    </div>
  );
};
