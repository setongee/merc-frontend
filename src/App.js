import './global/global.scss'
import Login from './pages/login/login';
import './App.css'
import RouterClass from './routes/router';
import './global/global.scss'
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';

function App() {


  return (

    <div className="App">


      <Header/>
      <Sidebar/>
      
      <RouterClass/>
    
    </div>

     
  );

  
}

export default App;
