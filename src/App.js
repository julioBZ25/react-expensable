import AuthenticatedApp from "./AuthenticatedApp";
import InputFilter from "./components/InputFilter";
import { useAuth } from "./context/auth-context";
import UnauthenticatedApp from "./UnauthenticatedApp";

function App() {
  const { user } = useAuth();

  //return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
  return (
    <form>
      <InputFilter label="from" type="date" />
      <InputFilter label="to" type="date" />
    </form>
  )
}

export default App;
