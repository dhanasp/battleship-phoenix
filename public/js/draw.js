const createGrid = function(tableName,prefix,rowSize,colSize) {
  let table = document.getElementById(tableName);
  for (let rowIndex = 0; rowIndex < rowSize; rowIndex++) {
    let row = document.createElement('tr');
    row = createRow(row,colSize,rowIndex,prefix);
    table.appendChild(row);
  }
};

const createRow = function(row,colSize,rowIndex,prefix){
  for (let colIndex = 0; colIndex < colSize; colIndex++) {
    let cell = document.createElement('td');
    cell.id = `${prefix}_${rowIndex}_${colIndex}`;
    cell.style.border = "1px solid black";
    row.appendChild(cell);
  }
  return row;
};

let drawGrid = function(){
  createGrid('targetGrid','tg',10,10);
  createGrid('oceanGrid','og',10,10);
  addClickListener();
};

window.onload = drawGrid;
