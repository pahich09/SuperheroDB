import React, {useEffect} from 'react';

const App = () => {
  useEffect(() => {
    fetch('/api/').then(res=>res.json()).then(res=>console.log(res));
  }, []);
  return (
    <div>
      app
    </div>
  );
};

export default App;
