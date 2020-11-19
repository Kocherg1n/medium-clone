import Routes from './routes';
import {BrowserRouter as Router} from "react-router-dom";
import TopBar from "./components/TopBar";
import {CurrentUserProvider} from "./contexts/CurrentUserContext";
import CurrentUserChecker from "./components/CurrentUserChecker";

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar/>
          <Routes/>
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};

export default App;
