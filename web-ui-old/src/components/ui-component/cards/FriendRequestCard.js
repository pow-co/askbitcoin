import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, Card, Grid, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';

// project import
import { gridSpacing } from 'store/constant';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';

const avatarImage = '/assets/images/profile';

// ==============================|| SOCIAL PROFILE - FRIEND REQUEST CARD ||============================== //

const FriendRequestCard = ({ avatar, name, mutual }) => {
  const theme = useTheme();
  const avatarProfile = `${avatarImage}/${avatar}`;

  const btnSX = {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
    background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.background.paper
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        p: 2,
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
        '&:hover': {
          border: `1px solid${theme.palette.primary.main}`
        }
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item>
              <Avatar alt="User 1" src={avatarProfile} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography variant="h5" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                {name}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
              >
                {mutual} mutual friends
              </Typography>
            </Grid>
            <Grid item>
              <IconButton size="small" onClick={handleClick} sx={{ mt: -0.75, mr: -0.75 }}>
                <MoreHorizOutlinedIcon
                  fontSize="small"
                  color="primary"
                  aria-controls="menu-friend-card"
                  aria-haspopup="true"
                  sx={{ opacity: 0.6 }}
                />
              </IconButton>
              <Menu
                id="menu-friend-card"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                variant="selectedMenu"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <FavoriteTwoToneIcon fontSize="small" />
                  </ListItemIcon>
                  Favorites
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <GroupTwoToneIcon fontSize="small" />
                  </ListItemIcon>
                  Edit Friend List
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <DeleteTwoToneIcon fontSize="small" />
                  </ListItemIcon>
                  Unfriend
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth sx={btnSX}>
                Confirm
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth color="error" sx={btnSX}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

FriendRequestCard.propTypes = {
  avatar: PropTypes.string,
  mutual: PropTypes.number,
  name: PropTypes.string
};

export default FriendRequestCard;
