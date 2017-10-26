import React, { Component } from 'react';
import './App.css';

class App extends Component {
  //constructor function
  constructor(props) {
    //make a call to super
    super(props);
    //local variables
    this.boardArr = [['','',''],['','',''],['','','']];
    this.playerToken = 'X';
    this.pcToken = 'O';
    //set the state
    this.state = {
      playerToken: this.playerToken,//default to capital letters X or O
      boardArr: this.boardArr
    };
  }

  mark(index1,index2){
    this.boardArr[index1][index2] = this.playerToken;
    this.forceUpdate();
    this.checkPlayerWin();
    this.checkPCWin();
    this.pcTurn();
  }
  markForPC(index1,index2){
    this.boardArr[index1][index2] = this.pcToken;
    this.forceUpdate();
    this.checkPCWin();
  }

  pcTurn(){
    //random number between 0-inclusive and multiplier-exclusive
    // Math.floor(Math.random()*9);

    //choose random spot on array
    let randRow = Math.floor(Math.random()*3);
    let randCol = Math.floor(Math.random()*3);
    //check if it is empty and:
    if(this.boardArr[randRow][randCol] !== this.playerToken &&
       this.boardArr[randRow][randCol] !== this.pcToken )
      {
        this.markForPC(randRow,randCol);
        // console.log(randRow,randCol);
      } 
    else {
      // console.log(randRow,randCol);
      alert('pc chose a used spot');
      console.log(randRow,randCol);
    }
  }

  checkPlayerWin(){
    //check for all winning lines
    //diagonals
         if( this.boardArr[0][0] === this.playerToken &&
             this.boardArr[1][1] === this.playerToken &&
             this.boardArr[2][2] === this.playerToken )
             { alert('Winner Winner Chicken Dinner!') }
    else if( this.boardArr[0][2] === this.playerToken &&
             this.boardArr[1][1] === this.playerToken &&
             this.boardArr[2][0] === this.playerToken )
             { alert('Winner Winner Chicken Dinner!') }
    //horizontals
    else if( this.boardArr[0][0] === this.playerToken &&
             this.boardArr[0][1] === this.playerToken &&
             this.boardArr[0][2] === this.playerToken )
             { alert('Winner Winner Chicken Dinner!') }
    else if( this.boardArr[1][0] === this.playerToken &&
             this.boardArr[1][1] === this.playerToken &&
             this.boardArr[1][2] === this.playerToken )
             { alert('Winner Winner Chicken Dinner!') }
    else if( this.boardArr[2][0] === this.playerToken &&
             this.boardArr[2][1] === this.playerToken &&
             this.boardArr[2][2] === this.playerToken )
             { alert('Winner Winner Chicken Dinner!') }
    //verticals
    else if( this.boardArr[0][0] === this.playerToken &&
             this.boardArr[1][0] === this.playerToken &&
             this.boardArr[2][0] === this.playerToken )
             { alert('Winner Winner Chicken Dinner!') }
    else if( this.boardArr[0][1] === this.playerToken &&
             this.boardArr[1][1] === this.playerToken &&
             this.boardArr[2][1] === this.playerToken )
             { alert('Winner Winner Chicken Dinner!') }
    else if( this.boardArr[0][2] === this.playerToken &&
             this.boardArr[1][2] === this.playerToken &&
             this.boardArr[2][2] === this.playerToken )
             { alert('Winner Winner Chicken Dinner!') }
  }

  checkPCWin(){
    //check for all winning lines
    //diagonals
         if( this.boardArr[0][0] === this.pcToken &&
             this.boardArr[1][1] === this.pcToken &&
             this.boardArr[2][2] === this.pcToken )
             { alert('you lost') }
    else if( this.boardArr[0][2] === this.pcToken &&
             this.boardArr[1][1] === this.pcToken &&
             this.boardArr[2][0] === this.pcToken )
             { alert('you lost') }
    //horizontals
    else if( this.boardArr[0][0] === this.pcToken &&
             this.boardArr[0][1] === this.pcToken &&
             this.boardArr[0][2] === this.pcToken )
             { alert('you lost') }
    else if( this.boardArr[1][0] === this.pcToken &&
             this.boardArr[1][1] === this.pcToken &&
             this.boardArr[1][2] === this.pcToken )
             { alert('you lost') }
    else if( this.boardArr[2][0] === this.pcToken &&
             this.boardArr[2][1] === this.pcToken &&
             this.boardArr[2][2] === this.pcToken )
             { alert('you lost') }
    //verticals
    else if( this.boardArr[0][0] === this.pcToken &&
             this.boardArr[1][0] === this.pcToken &&
             this.boardArr[2][0] === this.pcToken )
             { alert('you lost') }
    else if( this.boardArr[0][1] === this.pcToken &&
             this.boardArr[1][1] === this.pcToken &&
             this.boardArr[2][1] === this.pcToken )
             { alert('you lost') }
    else if( this.boardArr[0][2] === this.pcToken &&
             this.boardArr[1][2] === this.pcToken &&
             this.boardArr[2][2] === this.pcToken )
             { alert('you lost') }
  }

  render() {
    return (
      <div className="App">
        {/* board rows with play spaces */}
        <div className='row'>
          <div className='square' onClick={()=>{ this.mark(0,0) }}>{this.boardArr[0][0]}</div>
          <div className='square' onClick={()=>{ this.mark(0,1) }}>{this.boardArr[0][1]}</div>
          <div className='square' onClick={()=>{ this.mark(0,2) }}>{this.boardArr[0][2]}</div>
        </div>
        <div className='row'>
          <div className='square' onClick={()=>{ this.mark(1,0) }}>{this.boardArr[1][0]}</div>
          <div className='square' onClick={()=>{ this.mark(1,1) }}>{this.boardArr[1][1]}</div>
          <div className='square' onClick={()=>{ this.mark(1,2) }}>{this.boardArr[1][2]}</div>
        </div>
        <div className='row'>
          <div className='square' onClick={()=>{ this.mark(2,0) }}>{this.boardArr[2][0]}</div>
          <div className='square' onClick={()=>{ this.mark(2,1) }}>{this.boardArr[2][1]}</div>
          <div className='square' onClick={()=>{ this.mark(2,2) }}>{this.boardArr[2][2]}</div>
        </div>

      </div>
    );
  }
}

export default App;
