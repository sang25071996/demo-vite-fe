import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { LayoutProvider } from './LayoutProvider.tsx';
import { Collapse, Grid } from '@mui/material';
import { Colors } from '../../constants/colors.ts';
import { StyledGrid, StyledIconButton, StyledListItem, StyledListItemText, WhiteIcon } from './style.ts';
import { MenuItemType, menus } from '../../constants/Menu.ts';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Profile } from '../profile/index.tsx';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    backgroundColor: `${Colors.primary} !important`,
  },
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      borderRight: 'none',
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      borderRight: 'none',
    },
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const closeNestedMenu = (menus: MenuItemType[]) => {
  menus.forEach((menu) => {
    menu.open = false;
    if (menu.children.length) {
      closeNestedMenu(menu.children);
    }
  });
};

export const Sidebar: React.FC = () => {
  // const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuItemType[]>(menus);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(!open);
    closeNestedMenu(menu);
  };

  function onclickMenuItem(menuItem: MenuItemType, menuIndex: number) {
    if (menuItem.children && menuItem.children.length > 0) {
      const _menu = [...menus];
      _menu[menuIndex].open = !_menu[menuIndex].open;
      setMenu(_menu);
    }
  }

  return (
    <LayoutProvider value={{ open }}>
      <StyledGrid>
        <AppBar position="fixed" style={{ paddingLeft: open ? '240px' : '65px', transition: '225ms' }}>
          <Toolbar>
            <Grid container direction="row" alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  style={{
                    height: 65,
                  }}
                >
                  <Typography style={{ transition: '225ms' }} variant="h6" noWrap component="div" className="">
                    <img style={{ height: '60px' }} src={Logo} alt="logo" />
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Profile />
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} style={{ width: open ? '254px' : '65px', zIndex: 5000 }}>
          <Grid container alignItems="center">
            <DrawerHeader>
              <StyledIconButton onClick={() => open ? handleDrawerOpen() : handleDrawerClose()}>
                {open ? <ChevronLeftIcon style={{ fill: 'white' }} /> : <MenuIcon style={{ fill: 'white' }} />}
              </StyledIconButton>
            </DrawerHeader>
          </Grid>
          <Divider />
          <List>
            {menu.map((menuItem, menuIndex) => (
              <Grid key={`${menuItem.title}-${menuIndex}`}>
                <StyledListItem key={`${menuItem.title}-${menuIndex}`} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => onclickMenuItem(menuItem, menuIndex)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <menuItem.icon style={{ fill: 'whitesmoke' }} />
                    </ListItemIcon>
                    <StyledListItemText
                      style={{ color: '#E2E8F0', fontSize: '0.928571rem' }}
                      primary={menuItem.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                    {menuItem.open ? (
                      <WhiteIcon as={ExpandLessIcon} />
                    ) : (
                      menuItem.children.length > 0 && <WhiteIcon as={ExpandMoreIcon} />
                    )}
                  </ListItemButton>
                </StyledListItem>
                <Collapse in={menuItem.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menuItem.children.map((item, key) => (
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                        key={`${item.title}-${key}`}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 2 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          <WhiteIcon as={item.icon} />
                        </ListItemIcon>
                        <StyledListItemText
                          style={{ color: '#E2E8F0', fontSize: '0.928571rem' }}
                          primary={item.title}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Grid>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ backgroundColor: '#F7F9FA', marginTop: '65px' }}
          style={{
            width: open ? 'calc(100% - 254px)' : 'calc(100% - 65px)',
            borderRight: 'none'
          }}
        >
          <Grid
            style={{
              margin: '7px 7px 20px 7px',
              padding: '16px 20px',
              backgroundColor: 'white',
              width: 'initial !important',
              height: 'calc(100% - 27px)',
              border: '1px solid #E9E9E9',
              borderRadius: 4,
            }}
          >
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices
              mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis
              tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
              Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa
              tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at
              consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie
              ac.
            </Typography>
          </Grid>
        </Box>
      </StyledGrid>
    </LayoutProvider>
  );
};
