import ToolBox from './toolbox/ToolBox';
import Workspace from './workspace/Workspace';


import './css/App.css';



function App() {
  

  return (
    <div className="App">
      <div className='Development Workspace'>
        <Workspace></Workspace>
      </div>

      <div className='Development ToolBox'>
        <ToolBox></ToolBox>
      </div>
    </div>
  );
}

export default App;
