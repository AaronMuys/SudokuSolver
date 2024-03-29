document.addEventListener('DOMContentLoaded', function(){
  const gridsize = 9;
  const resetButton =document.getElementById('resetButton');
  const button = document.getElementById('solveButton');
  const grid = document.getElementById('Grid');

  //making the sudoku grid
  for(let i = 0; i<gridsize; i++){
    let gridrow = document.createElement('tr')
    for(let x = 0 ; x < gridsize ; x++){
      let cell = document.createElement('td');
      let input = document.createElement('input');
      cell.appendChild(input);
      input.id = `${i} ${x}`;
      gridrow.appendChild(cell);
    }
    grid.appendChild(gridrow);
  }


  // effect when selecting a cell
  const cells = document.querySelectorAll('td');

  cells.forEach(cell => {
      cell.addEventListener('focusin', () => {
          cell.classList.add('focus');
      });
      
      cell.addEventListener('focusout', () => {
          cell.classList.remove('focus');
      });
  });


  button.addEventListener('click', solve);
  resetButton.addEventListener("click", function() {

    for(let x = 0 ; x < gridsize ; x++){
      for(let y = 0 ; y < gridsize ; y++) {
        let cell = document.getElementById(`${x} ${y}`);
        cell.value = "";
        cell.classList = [];
      }
    }
    
  });

});


async function solve(){

  const size = 9;
  let board = [];

  //indentify the user input
  for(let x = 0 ; x < size ; x++){

    board[x] = [];
    for(let y = 0 ; y < size ; y++) {
      let cell = document.getElementById(`${x} ${y}`);
      board[x][y] = cell.value === "" ? 0 : parseInt(cell.value);

      if(cell.value !== "") {
        cell.classList.add('user');
      }

    }
  }

  if(boardSolver(board)) {


    console.log(board);

    for(let x = 0 ; x < size ; x++){
      for(let y = 0 ; y < size ; y++){
        let cell = document.getElementById(`${x} ${y}`);

        if(!cell.classList.contains('user')){
          cell.value = board[x][y];
          console.log(cell.id + " : " + board[x][y]);
          cell.classList.add('solved');
          await sleep(30)
        }

      }
    }

  } else{
    alert('This sudoku is not solvable')
  }
}


function boardSolver(board) {

  const gridSize = 9;

  for(let x = 0 ; x < gridSize ; x++){
    for(let y = 0 ; y < gridSize ; y++){
      if(board[x][y] === 0) {
        for(let z = 1 ; z <= 9 ; z++){
          if(validMove(board, x, y, z)){
            board[x][y] = z

            if(boardSolver(board)){
              return true;
            }
  
            board[x][y] = 0;
          }

        }

        return false;

      }
    }
  }

  return true;

}

function validMove(board, x, y, z) {
  const gridSize = 9;

  for(let i = 0 ; i < gridSize ; i++){
    if(board[x][i] === z || board[i][y] === z) {
      return false;
    }
  }

  const firstRow = Math.floor(x/3) * 3;
  const firstCol = Math.floor(y/3) * 3;

  for(let i = firstRow ; i < firstRow + 3; i++){
    for(let j = firstCol ; j < firstCol + 3; j++){
      if(board[i][j] == z){
        return false
      }
    }
  }

  return true;
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}