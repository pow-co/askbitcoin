import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'Link';

// material-ui
import { Box, Grid, Tab, Tabs } from '@mui/material';
import { getUserStory, getUserStoryOrder, getProfiles, getComments, getItems, getColumns, getColumnsOrder } from 'store/slices/kanban';

// project imports
import { useDispatch } from 'store';
import { openDrawer } from 'store/slices/menu';
import MainCard from 'components/ui-component/cards/MainCard';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| APPLICATION - KANBAN ||============================== //

function KanbanPage({ children }) {
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  let selectedTab = 0;
  switch (pathname) {
    case '/app/kanban/backlogs':
      selectedTab = 1;
      break;
    case '/app/kanban/board':
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // hide left drawer when email app opens
    dispatch(openDrawer(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getItems());
    dispatch(getColumns());
    dispatch(getColumnsOrder());
    dispatch(getProfiles());
    dispatch(getComments());
    dispatch(getUserStory());
    dispatch(getUserStoryOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container>
        <Grid item xs={12}>
          <MainCard contentSX={{ p: 2 }}>
            <Tabs
              value={value}
              variant="scrollable"
              onChange={handleChange}
              sx={{
                px: 1,
                pb: 2,
                '& a': {
                  minWidth: 10,
                  px: 1,
                  py: 1.5,
                  mr: 2.25,
                  color: 'grey.600',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                '& a.Mui-selected': {
                  color: 'primary.main'
                },
                '& a > svg': {
                  marginBottom: '0px !important',
                  mr: 1.25
                }
              }}
            >
              <Tab
                sx={{ textTransform: 'none' }}
                component={Link}
                href="/app/kanban/board"
                label={value === 0 ? 'Board' : 'View as Board'}
                {...a11yProps(0)}
              />
              <Tab
                sx={{ textTransform: 'none' }}
                component={Link}
                href="/app/kanban/backlogs"
                label={value === 1 ? 'Backlogs' : 'View as Backlog'}
                {...a11yProps(1)}
              />
            </Tabs>
            {children}
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}

KanbanPage.propTypes = {
  children: PropTypes.node
};

KanbanPage.Layout = 'authGuard';
export default KanbanPage;
