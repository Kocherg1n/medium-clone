import Routes from './routes';
import {BrowserRouter as Router} from "react-router-dom";
import TopBar from "./components/TopBar";
import {CurrentUserProvider} from "./contexts/CurrentUserContext";

const App = () => {
  return (
    <CurrentUserProvider>
      <Router>
        <TopBar/>
        <Routes/>
      </Router>
    </CurrentUserProvider>
  );
};

export default App;
