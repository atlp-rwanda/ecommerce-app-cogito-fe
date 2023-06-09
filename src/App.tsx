import './styles.scss';
import InitialMessage from './components/index';

function App() {
  return (
    <>
      <div></div>
      <div className="bg-primary text-warningColor p-6 text-center">
        <InitialMessage />
      </div>
      <div className="container">E-commerce App</div>
    </>
  );
}
export default App;
