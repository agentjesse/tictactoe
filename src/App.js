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
    //mark spot
    this.boardArr[index1][index2] = this.playerToken;
    this.forceUpdate();

    this.checkPlayerWin();

    //---------tie check after PLAYER last move
    let emptySpaces = false;
    this.boardArr.forEach((element)=>{
      element.forEach((innerElement)=> {
        if(innerElement === ''){
          emptySpaces = true;
        }
      });
    });
    if(emptySpaces === false ){
      this.result();
      return;
    }
    this.pcTurn();
    this.checkPCWin();
    
    //-------tie check after COMPUTERS last move
    emptySpaces = false;
    this.boardArr.forEach((element)=>{
      element.forEach((innerElement)=> {
        if(innerElement === ''){
          emptySpaces = true;
        }
      });
    });
    if(emptySpaces === false ){
      this.result();
    }
    
  }

  markForPC(index1,index2){
    this.boardArr[index1][index2] = this.pcToken;
    this.forceUpdate();
    this.checkPCWin();
  }

  result(status){
    if (status === 'win'){
      alert('Winner Winner Chicken Dinner!');
    } else if (status === 'lose'){
      alert('you lost');
    } else {
      alert('tie game');
    }
    this.boardArr = [['','',''],['','',''],['','','']];
  }

  pcTurn(){
    
    //choose random spot on array
    let randRow = Math.floor(Math.random()*3);
    let randCol = Math.floor(Math.random()*3);

    //loop until free spot chosen. if the board is full escape loop.
    let usedSpot = false;
    // let emptySpaces = false;
    while (usedSpot === false){
      //check if free spot available. if not, invert usedSpot and break out of loop
      if(this.boardArr[randRow][randCol] === this.playerToken ||
         this.boardArr[randRow][randCol] === this.pcToken )
      {   
        randRow = Math.floor(Math.random()*3);
        randCol = Math.floor(Math.random()*3);
      }
      else { 
        this.markForPC(randRow,randCol);
        usedSpot = true;
      }
    }

  }

  checkPlayerWin(){
    //check for all winning lines
    //diagonals
         if( this.boardArr[0][0] === this.playerToken &&
             this.boardArr[1][1] === this.playerToken &&
             this.boardArr[2][2] === this.playerToken )
             { this.result('win') }
    else if( this.boardArr[0][2] === this.playerToken &&
             this.boardArr[1][1] === this.playerToken &&
             this.boardArr[2][0] === this.playerToken )
             { this.result('win') }
    //horizontals
    else if( this.boardArr[0][0] === this.playerToken &&
             this.boardArr[0][1] === this.playerToken &&
             this.boardArr[0][2] === this.playerToken )
             { this.result('win') }
    else if( this.boardArr[1][0] === this.playerToken &&
             this.boardArr[1][1] === this.playerToken &&
             this.boardArr[1][2] === this.playerToken )
             { this.result('win') }
    else if( this.boardArr[2][0] === this.playerToken &&
             this.boardArr[2][1] === this.playerToken &&
             this.boardArr[2][2] === this.playerToken )
             { this.result('win') }
    //verticals
    else if( this.boardArr[0][0] === this.playerToken &&
             this.boardArr[1][0] === this.playerToken &&
             this.boardArr[2][0] === this.playerToken )
             { this.result('win') }
    else if( this.boardArr[0][1] === this.playerToken &&
             this.boardArr[1][1] === this.playerToken &&
             this.boardArr[2][1] === this.playerToken )
             { this.result('win') }
    else if( this.boardArr[0][2] === this.playerToken &&
             this.boardArr[1][2] === this.playerToken &&
             this.boardArr[2][2] === this.playerToken )
             { this.result('win') }
  }

  checkPCWin(){
    //check for all winning lines
    //diagonals
         if( this.boardArr[0][0] === this.pcToken &&
             this.boardArr[1][1] === this.pcToken &&
             this.boardArr[2][2] === this.pcToken )
             { this.result('lose') }
    else if( this.boardArr[0][2] === this.pcToken &&
             this.boardArr[1][1] === this.pcToken &&
             this.boardArr[2][0] === this.pcToken )
             { this.result('lose') }
    //horizontals
    else if( this.boardArr[0][0] === this.pcToken &&
             this.boardArr[0][1] === this.pcToken &&
             this.boardArr[0][2] === this.pcToken )
             { this.result('lose') }
    else if( this.boardArr[1][0] === this.pcToken &&
             this.boardArr[1][1] === this.pcToken &&
             this.boardArr[1][2] === this.pcToken )
             { this.result('lose') }
    else if( this.boardArr[2][0] === this.pcToken &&
             this.boardArr[2][1] === this.pcToken &&
             this.boardArr[2][2] === this.pcToken )
             { this.result('lose') }
    //verticals
    else if( this.boardArr[0][0] === this.pcToken &&
             this.boardArr[1][0] === this.pcToken &&
             this.boardArr[2][0] === this.pcToken )
             { this.result('lose') }
    else if( this.boardArr[0][1] === this.pcToken &&
             this.boardArr[1][1] === this.pcToken &&
             this.boardArr[2][1] === this.pcToken )
             { this.result('lose') }
    else if( this.boardArr[0][2] === this.pcToken &&
             this.boardArr[1][2] === this.pcToken &&
             this.boardArr[2][2] === this.pcToken )
             { this.result('lose') }
  }

  render() {
    return (
      <div className="App">

        {/* options for player */}
        <div className='row colored-text'>
          <div>Choose your token: </div>
          <button
            onClick={()=>{ 
              this.playerToken = 'X';
              this.pcToken = 'O'; 
              this.boardArr = [['','',''],['','',''],['','','']];
            }}
          >X</button>
          <button
            onClick={()=>{ 
              this.playerToken = 'O';
              this.pcToken = 'X'; 
              this.boardArr = [['','',''],['','',''],['','','']];
            }}
          >O</button>
        </div>
      
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
