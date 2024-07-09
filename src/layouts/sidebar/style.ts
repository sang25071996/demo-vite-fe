import { styled } from '@mui/system';
import { Colors } from '../../constants/colors.ts';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

export const WhiteIcon = styled('span')({
  fill: 'white',
});

export const StyledGrid = styled(Grid)(() => ({
  display: 'flex',
  '& .MuiPaper-elevation4': {
    boxShadow: '0px 1px 0px 0px rgb(0 0 0 / 12%)',
  },
  backgroundColor: '#ffffff',
  minHeight: '100%',
  '& .MuiButtonBase-root': {
    textTransform: 'none',
  },
}));
export const StyledListItem = styled(ListItem)(() => ({
  width: '100%',
  padding: '0px !important',
  '&:hover': {
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: '#1976d2',
    '& p': {
      color: Colors.primary,
      fontWeight: 600,
    },
  },
}));
export const StyledListItemText = styled(ListItemText)(() => ({
  '& span': {
    fontSize: '0.9rem'
  }
}));
export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: '#fff !important',
  marginLeft: theme.spacing(2),
  width: 40,
  height: 40,
  borderRadius: 50,
  '&:hover': {
    backgroundColor: '#1976d2',
  },
}));