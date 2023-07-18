


// import { BrowserRouter as Router } from 'react-router-dom';
// import './App.css';
// import { useDispatch } from 'react-redux';
// import Topbar from './pages/Media/Topbar/Topbar';
// import Navbar from './components/Navbar/Navbar';
// import AllRoutes from './AllRoutes';
// import { useEffect , useState} from 'react';
// import { fetchAllQuestions } from './actions/question';
// import { fetchAllUsers } from './actions/users';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAllQuestions());
//     dispatch(fetchAllUsers());
//   }, [dispatch]);
//   const [slideIn, setSlideIn] = useState(true);

//   useEffect(() => {
//     if (window.innerWidth <= 780) {
//       setSlideIn(false);
//     }
//   }, []);

//   const handleSlideIn = () => {
//     if (window.innerWidth <= 780) {
//       setSlideIn((state) => !state);
//     }
//   };


//   return (
//     <div className="App">
//       <Router>
//         {window.location.pathname === ['/media/login', '/home','/media/profile/:name','/media/profileupdate/:name'] ? (
//           <Topbar handleSlideIn={handleSlideIn}/>
//         ) : (
//           <Navbar  handleSlideIn={handleSlideIn} />
//         )}
//         <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn}/>
//       </Router>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import Topbar from './pages/Media/Topbar/Topbar';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';
import { useEffect , useState} from 'react';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 780) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 780) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div className="App">
      <Router>
        {window.location.pathname === window.location.pathname === '/home' || window.location.pathname.startsWith('/media/profile/') || window.location.pathname.startsWith('/media/profileupdate/') ? (
          <Topbar handleSlideIn={handleSlideIn} />
        ) : (
          <Navbar handleSlideIn={handleSlideIn} />
        )}
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}

export default App;
