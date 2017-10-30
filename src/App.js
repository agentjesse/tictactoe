import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

class App extends Component {
  //constructor function
  constructor(props) {
    //make a call to super
    super(props);
    //local variables
    this.boardArr = [['','',''],['','',''],['','','']];
    this.playerToken = 'X';
    this.pcToken = 'O';
    //set the state, this app doesn't use anything in a state object
    // this.state = {
    // };
  }

  mark(index1,index2){
    // debugger
    //mark players spot in state and render it also
    this.boardArr[index1][index2] = this.playerToken;
    this.forceUpdate();
    //check if player won
    let status = this.isGameOver(this.boardArr);
    if (status === this.playerToken){
      this.result('win');
      return;//return early
    }
    //---------tie check after PLAYERS last move
    else if(status === null){
      this.result();
      return;//return early or pcturn will overload looking for a space
    }
   
    //decide a spot for ai and place it on board...use minmax
    this.pcTurn();

    status = this.isGameOver(this.boardArr);
    if (status === this.pcToken){
      this.result('lose');
      return;
    }
    //---------tie check after PC last move
    else if(status === null){
      this.result();
      return;//return early or pcturn will overload looking for a space
    }
    
  }

  result(status){
    if (status === 'win'){
      alert('Winner Winner Chicken Dinner!');
    } else if (status === 'lose'){
      alert('you lost');
    } else if (status === 'cleanup'){
      this.boardArr = [['','',''],['','',''],['','','']];
      this.forceUpdate();
    }else {
      alert('tie game');
    }
    this.boardArr = [['','',''],['','',''],['','','']];
  }

  pcTurn(){
    //make an object using the minmax function that has indexes to use to mark the board
    let moveObj = this.minMax(this.boardArr,0,this.pcToken);
    //mark the board
    this.boardArr[moveObj.index1][moveObj.index2] = this.pcToken;
    this.forceUpdate();
  }

  minMax(board,depth,player){
    //get state of the current board
    const gameState = this.isGameOver(board);

    if(gameState === false){
      const values = [];

      for(var i = 0; i<3 ; i++){
        for(var j = 0; j<3 ; j++){

          //clone the board array, how to do it is up to you.
          // const gridCopy = _.cloneDeep(board);
          // const gridCopy = board.map( (arr)=> arr.slice() );
          let gridCopy = [];
          for (var k = 0; k < 3; k++) {
            gridCopy[k] = board[k].slice();
          }
          
          if (gridCopy[i][j] !== ''){
            continue;
          }
          gridCopy[i][j] = player;
          const value = this.minMax(gridCopy, depth+1, (player === this.playerToken)? this.pcToken : this.playerToken );
          values.push({
            cost:value,
            cell:{
              index1:i,
              index2:j
            }
          });
        }
      }

      if (player === this.pcToken){
        //grab the element in the array of greatest value according to a function
        const max = _.maxBy(values, (v)=>{
          return v.cost;
        });
        if (depth === 0){
          return max.cell;
        } else {
          return max.cost;
        }
      }
      else {
          //grab the element in the array of lowest value according to a function
          const min = _.minBy(values, (v)=>{
            return v.cost;
          });
          if (depth === 0){
            return min.cell;
          } else {
            return min.cost;
          }
      }

    }
    else if(gameState === null){
      return 0;
    }//next line might cause errors, with this maybe not referring to this class anymore? 
    else if(gameState === this.playerToken){
      return depth - 10;
    }
    else if(gameState === this.pcToken){
      return 10 - depth;
    }

  }

  //function to check game state. returns: the winning token, false for an empty space available, or null for tie game
  isGameOver(board){
    //check for all winning lines
    //diagonals
    if( board[0][0] !== '' && board[0][0] === board[1][1] && 
        board[1][1] === board[2][2] )
    { //if the checked line is found, return the winning token from any point on that line
      return board[0][0]; 
    }
    else if( board[0][2] !== '' && board[0][2] === board[1][1] && 
             board[1][1] === board[2][0] )
    { return board[0][2] }
    //horizontals
    else if( board[0][0] !== '' && board[0][0] === board[0][1] && 
             board[0][1] === board[0][2] )
    { return board[0][0] }
    else if( board[1][0] !== '' && board[1][0] === board[1][1] && 
             board[1][1] === board[1][2] )
    { return board[1][0] }
    else if( board[2][0] !== '' && board[2][0] === board[2][1] && 
             board[2][1] === board[2][2] )
    { return board[2][0] }
    //verticals
    else if( board[0][0] !== '' && board[0][0] === board[1][0] && 
             board[1][0] === board[2][0] )
    { return board[0][0] }
    else if( board[0][1] !== '' && board[0][1] === board[1][1] && 
             board[1][1] === board[2][1] )
    { return board[0][1] }
    else if( board[0][2] !== '' && board[0][2] === board[1][2] && 
             board[1][2] === board[2][2] )
    { return board[0][2] }

    //no winner yet? check for empty spaces, return false if one is found, game is not over
    let found = false;
    board.forEach((element)=>{
      element.forEach((innerElement)=> {
        if(innerElement === ''){
          found = true;
        }
      });
    });
    if (found){ return false }

    //no winner and no empty spaces? return null indicating tie
    return null;

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
              this.result('cleanup');
            }}
          >X</button>
          <button
            onClick={()=>{ 
              this.playerToken = 'O';
              this.pcToken = 'X'; 
              this.result('cleanup');
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
