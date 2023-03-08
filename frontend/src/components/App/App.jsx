import ChatView from '../ChatView';
import Header from '../Header';
import Sidebar from '../Sidebar';

import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <ChatView />
      </div>
    </div>
  );
}

export default App;
