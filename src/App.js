import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import PersistLogin from "./components/auth/PersistLogin";
import AuthPage from "./pages/AuthPage";
import SettingsPage from "./pages/SettingsPage";
import BoardListPage from "./pages/BoardListPage";
import BoardPage from "./pages/BoardPage";
import "./styles/index.scss";
import "./styles/common.scss";
import "./styles/navigation.scss"
import "./styles/pages.scss";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<AuthPage />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<BoardListPage />} />
            <Route path="/boards" element={<BoardListPage />} />
            <Route path="/board/:boardId" element={<BoardPage />} />
            <Route path="/board/edit/:boardId" element={<BoardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
