import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProcessingManagement from '../pages/processing-management';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/" />,
  },
  {
    path: '/dich-vu-hanh-chinh/dang-ky',
    element: <ProcessingManagement />,
  },
]);

export default router;
