// App.js

import React, { useState } from 'react';
import A1_48 from './A1_48';
import ExcelReader from './ExcelReader';

function App() {
  const [file, setFile] = useState(null);

  const handleFile = (file) => {
    setFile(file);
  };

  return (
    <div>
      <A1_48/>
    </div>
  );
}

export default App;
