var table = [];
var difficultyCounter = 0;
$(document).ready(function () {
   table = initialTable();
   initialPosition(table);
    // console.log(solubleTable(table));
   $("#shuffle").on("click", function () {
       // console.log(table);
       table = randomNb(table);
       initialPosition(table);
       // console.log(table);
   });

   $("#ordered").on("click", function () {
       table = initialTable();
       initialPosition(table);
   });

   $("#resolve").on("click", function () {
    moveCell(table);
   });
});

function initialPosition(table) {
    var nbTable = table;
    var chosenNb;
    var i = 1;

    while (i <= nbTable.length) {
        nbInTable(nbTable, i);
        i++;
    }
}

function randomNb (table) {
    var nbTable = randomed(table);
    difficultyCounter = solubleTable(nbTable);

    while (difficultyCounter % 2 !== 0) {
        nbTable = randomed(nbTable);
        difficultyCounter = solubleTable(nbTable);
    }
    return nbTable;

}

function randomed(table) {
    var initialTable = table;
    var randomedTable = [];
    var chosenNb;
    var randomNb;

    while (initialTable.length > 0) {
        randomNb = Math.floor(Math.random() * (initialTable.length));
        chosenNb = initialTable.splice(randomNb, 1);
        randomedTable.push(chosenNb[0]);
    }
    return randomedTable;
}

function nbInTable(table, i) {
    var tableNb = table;
    var j = i;
    if (tableNb[j - 1] === 0) {
        $(".cell"+j).text("").attr('id', 'empty');
    } else {
        $(".cell"+j).text(tableNb[j - 1]).removeAttr('id', 'empty');
    }
}

function solubleTable(table) {
    var testedTable = table;
    difficultyCounter = 0;

    difficultyCounter = selectionsort(testedTable);
    console.log(difficultyCounter);

    return difficultyCounter;
}

function selectionsort(table) {
    var nbTable = table;
    var difficultyCounter = 0;

    for (i = 0 ; i < nbTable.length ; i++) {
        for (j = i + 1; j < nbTable.length; j++) {
            if (nbTable[i] > nbTable[j] && nbTable[i] !== 0 && nbTable[j] !== 0) {
                difficultyCounter ++;
            }
        }
    }
    return  difficultyCounter;

}

function initialTable() {
    var table = [];

    for (var i = 1; i < $('td').length; i++) {
        table.push(i);
    }
    table.push(0);
    return table;
}

function moveCell() {
    var nbTable = table;
    var emptyCellIndex = nbTable.indexOf(0);
    var tmpTable = [];
    if (nbTable.indexOf(0) - 3 >= 0) {
        tmpTable = nbTable;
        tmpTable[emptyCellIndex] = tmpTable[emptyCellIndex - 3];
        tmpTable[emptyCellIndex - 3] = 0;

        if (difficultyCounter < solubleTable(tmpTable)) {

        }

        difficultyCounter = solubleTable(nbTable);
        // initialPosition(nbTable);
    } else {
        nbTable[emptyCellIndex] = nbTable[emptyCellIndex + 3];
        nbTable[emptyCellIndex + 3] = 0;
        difficultyCounter = solubleTable(nbTable);
        // initialPosition(nbTable);
    }
    console.log(difficultyCounter);
}