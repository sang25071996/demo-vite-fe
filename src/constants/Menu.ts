import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { SvgIconComponent } from '@mui/icons-material';

export type MenuItemType = {
  title: string;
  path: string;
  icon: SvgIconComponent;
  open: boolean;
  children: MenuItemType[];
};

export const menus: MenuItemType[] = [
  {
    title: 'Quản lí quy trình',
    path: '/quan-li-quy-trinh',
    icon: AssignmentIcon,
    open: false,
    children: [
      {
        title: 'Thiết lập quy trình',
        path: '/thiet-lap-quy-trinh',
        icon: AssignmentTurnedInIcon,
        open: false,
        children: [],
      },
      {
        title: 'Tiếp nhận',
        path: '/tiep-nhan',
        icon: ListAltIcon,
        open: false,
        children: [],
      },
    ],
  },
  {
    title: 'Dịch vụ hành chính',
    path: '/dich-vu-hanh-chinh',
    icon: AccountCircleIcon,
    open: false,
    children: [
      {
        title: 'Đăng kí',
        path: '/dang-ki',
        icon: NoteAddIcon,
        open: false,
        children: [],
      },
      {
        title: 'Lịch sử',
        path: '/lich-su',
        icon: ListAltIcon,
        open: false,
        children: [],
      },
    ],
  }
];
