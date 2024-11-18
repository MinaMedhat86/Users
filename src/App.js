import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Notfound from './Componants/Notfound/Notfound';
import UserListing from './Componants/UserListing/UserListing';
import UserDetail from './Componants/UserDetail/UserDetail';
import Layout from './Componants/Layout/Layout';


function App() {


  const router = createBrowserRouter([
    {
      path: '/users',
      element: <Layout/>,
      children: [
        { path: '', element: <UserListing /> },
        { path: ':id', element: <UserDetail /> },
      ],
    },
    { path : "*" , element : <Notfound/>}
    
  ]);
  
  return <>
  
  <RouterProvider router={router} />

  </>
}

export default App;
