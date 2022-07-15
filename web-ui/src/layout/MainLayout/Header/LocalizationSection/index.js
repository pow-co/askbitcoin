import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ClickAwayListener,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material';

// project imports
import Transitions from 'components/ui-component/extended/Transitions';

// assets
import TranslateTwoToneIcon from '@mui/icons-material/TranslateTwoTone';
import useConfig from 'hooks/useConfig';

import { FormattedMessage } from 'react-intl';

// ==============================|| LOCALIZATION ||============================== //

const LocalizationSection = () => {
  const { borderRadius, locale, onChangeLocale } = useConfig();

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [language, setLanguage] = useState(locale);

  const handleListItemClick = (event, lng) => {
    setLanguage(lng);
    onChangeLocale(lng);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    setLanguage(locale);
  }, [locale]);

  return (
    <>
      <Box
        sx={{
          ml: 2,
          [theme.breakpoints.down('md')]: {
            ml: 1
          }
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
            color: theme.palette.primary.dark,
            transition: 'all .2s ease-in-out',
            '&[aria-controls="menu-list-grow"],&:hover': {
              borderColor: theme.palette.primary.main,
              background: theme.palette.primary.main,
              color: theme.palette.primary.light
            }
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        >
          {language !== 'en' && (
            <Typography variant="h5" sx={{ textTransform: 'uppercase' }} color="inherit">
              {language}
            </Typography>
          )}
          {language === 'en' && <TranslateTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
        </Avatar>
      </Box>

      <Popper
        placement={matchesXs ? 'bottom-start' : 'bottom'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 0 : 0, 20]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions position={matchesXs ? 'top-left' : 'top'} in={open} {...TransitionProps}>
              <Paper elevation={16}>
                {open && (
                  <List
                    component="nav"
                    sx={{
                      width: '100%',
                      minWidth: 200,
                      maxWidth: 280,
                      bgcolor: theme.palette.background.paper,
                      borderRadius: `${borderRadius}px`,
                      [theme.breakpoints.down('md')]: {
                        maxWidth: 250
                      }
                    }}
                  >
                    <ListItemButton selected={language === 'en'} onClick={(event) => handleListItemClick(event, 'en')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">American</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (<FormattedMessage id="language-en" />)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton selected={language === 'fr'} onClick={(event) => handleListItemClick(event, 'fr')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">Français</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (<FormattedMessage id="language-fr" />)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton selected={language === 'ja'} onClick={(event) => handleListItemClick(event, 'zh')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">日本語</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (<FormattedMessage id="language-ja" />)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton selected={language === 'ro'} onClick={(event) => handleListItemClick(event, 'ro')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">Română</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (<FormattedMessage id="language-ro" />)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton selected={language === 'zh'} onClick={(event) => handleListItemClick(event, 'zh')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">中国人</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (<FormattedMessage id="language-zh" />)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton selected={language === 'ar'} onClick={(event) => handleListItemClick(event, 'zh')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">عربي</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (<FormattedMessage id="language-ar" />)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton selected={language === 'la'} onClick={(event) => handleListItemClick(event, 'zh')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">Latinus</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (<FormattedMessage id="language-la" />)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton selected={language === 'ru'} onClick={(event) => handleListItemClick(event, 'zh')}>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">Русский</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                              (<FormattedMessage id="language-ru" />)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                  </List>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default LocalizationSection;
