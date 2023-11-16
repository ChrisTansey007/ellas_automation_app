// App.tsx
import Banner from './components/Banner/Banner';
import ContainerComponent from './components/ContainerComponent/ContainerComponent';
import './App.module.css';

const App: React.FC = () => {
 

  return (
    <div className="App">
      <div className="App-header">
        <Banner />
      </div>
      <ContainerComponent /> 
     
    </div>
  );
}

export default App;
