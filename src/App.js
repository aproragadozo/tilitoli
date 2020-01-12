import React from 'react';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
/* probably won't need the Cell component here
import Cell from './Cell.js';
*/
import Table from './Table.js';

class Tilitoli extends React.Component{
  render() {
    return(
      <div className = "wrapper">
        <Table rows={4} cols={4}/>
      </div>
    )
  }
}

export default Tilitoli;
