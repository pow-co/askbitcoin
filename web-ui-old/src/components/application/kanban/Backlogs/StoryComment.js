import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// project imports
import Avatar from 'components/ui-component/extended/Avatar';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const avatarImage = '/assets/images/users';

// ==============================|| KANBAN BACKLOGS - STORY COMMENT ||============================== //

const StoryComment = ({ comment, profile }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        p: 1.5,
        mt: 1.25
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container wrap="nowrap" alignItems="center" spacing={1}>
            <Grid item>
              <Avatar
                sx={{ width: 24, height: 24 }}
                size="sm"
                alt="User 1"
                src={profile && profile.avatar && `${avatarImage}/${profile.avatar}`}
              />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography align="left" variant="h5" component="div">
                    {profile.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align="left" variant="caption">
                    <FiberManualRecordIcon sx={{ width: 10, height: 10, opacity: 0.5, my: 0, mx: 0.625 }} />
                    {profile.time}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: 1.5 } }}>
          <Typography align="left" variant="body2">
            {comment.comment}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

StoryComment.propTypes = {
  comment: PropTypes.object,
  profile: PropTypes.object
};

export default StoryComment;
