/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import './App.css';
import { HorizontalBar } from './components/horizontalChart';
import { StackChart } from './components/stackChart.js';
import SupersetChart from './components/superset';


function App() {

  
  return (
    <div>
{/* Superset Charts and iframe embeed */}
      {/* <SupersetChart /> */}

{/* Horizontal bar chart */}
      <HorizontalBar />

{/* Stack box chart */}
      <StackChart />
    </div>
  );
}

export default App;
