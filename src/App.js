import AuthenticatedApp from "./AuthenticatedApp";
import Filter from "./components/Filter";
import { useAuth } from "./context/auth-context";
import UnauthenticatedApp from "./UnauthenticatedApp";

function App() {
  const { user } = useAuth();

  //return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
  return <Filter />

}

export default App;
