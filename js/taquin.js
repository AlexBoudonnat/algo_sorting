// var table = [];
var difficultyCounter = 0;
$(document).ready(function () {
    var table = initialTable();
    let count = 0;
    initialPosition(table);

    $("#shuffle").on("click", function () {
        table = randomNb(table);
        initialPosition(table);
        count = 0;
    });

    $("#ordered").on("click", function () {
        table = initialTable();
        initialPosition(table);
    });

    $("#resolve").on("click", function () {
        var winTable = [];
        // moveCell(table);
        // autoResolved(table);
        // console.log(table);
        DFS(table, 20);
        // console.log(isWinPosition(table));
    });

    $("#up").on("click", function () {
        table = down(table);
        initialPosition(table);
    });

    $("#down").on("click", function () {
        table = up(table);
        initialPosition(table);
    });

    $("#left").on("click", function () {
        table = right(table);
        initialPosition(table);
    });

    $("#right").on("click", function () {
        table = left(table);
        initialPosition(table);
    });

    $('body').keydown(function(e) {
        if (e.keyCode === 37) {
            table = right(table);
            count++;
            console.log(count);
            initialPosition(table);
        }
        if (e.keyCode === 39) {
            table = left(table);
            // console.log(table);
            count++;
            console.log(count);
            initialPosition(table);
        }
        if (e.keyCode === 38) {
            // console.log(possibleMoves(table));
            table = down(table);
            // console.log(table);
            count++;
            console.log(count);
            initialPosition(table);
        }
        if (e.keyCode === 40) {
            table = up(table);
            // console.log(table);
            count++;
            console.log(count);
            initialPosition(table);
        }
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
    // console.log(difficultyCounter);
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
    if (tableNb[j - 1] === 9) {
        $(".cell"+j).text("").attr('id', 'empty');
    } else {
        $(".cell"+j).text(tableNb[j - 1]).removeAttr('id', 'empty');
    }
}

function solubleTable(table) {
    var testedTable = table;
    var thisCounter = 0;

    thisCounter = selectionsort(testedTable);
    // console.log(difficultyCounter);

    return thisCounter;
}

function selectionsort(table) {
    var nbTable = table;
    var difficultyCounter = 0;

    for (i = 0 ; i < nbTable.length ; i++) {
        for (j = i + 1; j < nbTable.length; j++) {
            if (nbTable[i] > nbTable[j] && nbTable[i] !== 9 && nbTable[j] !== 9) {
                difficultyCounter ++;
            }
        }
    }
    return  difficultyCounter;

}

function initialTable() {
    var table = [];

    for (var i = 1; i <= $('td').length; i++) {
        table.push(i);
    }
    return table;
}

// function moveCell() {
//     var nbTable = table;
//     var emptyCellIndex = nbTable.indexOf(9);
//     if (emptyCellIndex - 3 >= 0) {
//         tmpTable = nbTable;
//         tmpTable[emptyCellIndex] = tmpTable[emptyCellIndex - 3];
//         tmpTable[emptyCellIndex - 3] = 9;
//
//         if (difficultyCounter < solubleTable(tmpTable)) {
//
//         }
//
//         difficultyCounter = solubleTable(nbTable);
//         // initialPosition(nbTable);
//     } else {
//         nbTable[emptyCellIndex] = nbTable[emptyCellIndex + 3];
//         nbTable[emptyCellIndex + 3] = 9;
//         difficultyCounter = solubleTable(nbTable);
//         // initialPosition(nbTable);
//     }
//     console.log(difficultyCounter);
// }

function autoResolved(table) {
    var tmpTable = table;
    var emptyCellIndex = tmpTable.indexOf(9);
    var r = false;
    if (difficultyCounter - 2 === solubleTable(tmpTable)) {
        tmpTable = down(tmpTable);
        // console.log(tmpTable);
        // console.log('down');
        initialPosition(tmpTable);
        // return tmpTable;
        if (difficultyCounter > 0) {
            setTimeout(function(){
                autoResolved(tmpTable);
            }, 1000);
        }
    }
    if (difficultyCounter - 2 === solubleTable(tmpTable)) {
        tmpTable = up(tmpTable);
        // console.log(tmpTable);
        // console.log('up');
        initialPosition(tmpTable);
        // return tmpTable;
        if (difficultyCounter > 0) {
            setTimeout(function(){
                autoResolved(tmpTable);
            }, 1000);
        }
    }
    if (emptyCellIndex !== 2 && emptyCellIndex !== 5 && emptyCellIndex !== 8) {
        if (!r) {
            r = true;
            tmpTable = right(tmpTable);
            initialPosition(tmpTable);
            if (difficultyCounter > 0) {
                setTimeout(function(){
                    autoResolved(tmpTable);
                }, 1000);
            }
        } else {
            r = false;
            if (emptyCellIndex < tmpTable.length - 3) {
                tmpTable = down(tmpTable);
                // console.log(tmpTable);
                // console.log('down');
                initialPosition(tmpTable);
                // return tmpTable;
                if (difficultyCounter > 0) {
                    setTimeout(function(){
                        autoResolved(tmpTable);
                    }, 1000);
                }
            } else {
                tmpTable = up(tmpTable);
                // console.log(tmpTable);
                // console.log('up');
                initialPosition(tmpTable);
                // return tmpTable;
                if (difficultyCounter > 0) {
                    setTimeout(function(){
                        autoResolved(tmpTable);
                    }, 1000);
                }
            }
        }
    } else {
        tmpTable = left(tmpTable);
        initialPosition(tmpTable);
        if (difficultyCounter > 0) {
            setTimeout(autoResolved(tmpTable), 1000);
        }
    }
}

/**
 * @return {boolean}
 */
function DFS(table, maxDepth) {
    var solutionTable = [];
    solutionTable.push(table.concat());
    const MAX_DEPTH = maxDepth;
    let bestDepth = MAX_DEPTH;
    let depth = 0;
    var route = [];

    testMove(depth, solutionTable, bestDepth, route);






    // for (let depth = 0; depth < MAX_DEPTH; depth++) {
    //     var moves = possibleMoves(solutionTable[depth]);
    //
    //     for (let i = 0; i < moves.length; i++) {
    //         let stop = false;
    //         if (moves[i]) {
    //             if (i === 0 && depth < 2 || i === 0 && down(solutionTable[depth]).indexOf(9) !== solutionTable[depth-1].indexOf(9)) {
    //                 solutionTable.push(down(solutionTable[depth]))
    //             } else  if (i === 1 && depth < 2 || i === 1 && up(solutionTable[depth]).indexOf(9) !== solutionTable[depth-1].indexOf(9) ) {
    //                 solutionTable.push(up(solutionTable[depth]))
    //             } else  if (i === 2 && depth < 2 || i === 2 && left(solutionTable[depth]).indexOf(9) !== solutionTable[depth-1].indexOf(9)) {
    //                 solutionTable.push(left(solutionTable[depth]))
    //             } else  if (i === 3 && depth < 2 || i === 3 && right(solutionTable[depth]).indexOf(9) !== solutionTable[depth-1].indexOf(9)) {
    //                 solutionTable.push(right(solutionTable[depth]))
    //             }
    //             stop = true;
    //         }
    //         if (stop) {
    //             break;
    //         }
    //     }
    //
    //     if (!isWinPosition(solutionTable[depth + 1])) {
    //         console.log('non');
    //     } else {
    //         console.log('oui');
    //         bestDepth = depth;
    //         break;
    //     }
    //     console.log(solutionTable);
    // }

}

function testMove(depth, table, bestDepth, route) {
    var solutionTable = table.concat();

    if (isWinPosition(solutionTable[depth])) {
        // console.log(solutionTable);
        return solutionTable;
    }

    if (depth >= bestDepth) {
        return false;
    } else {
        var moves = possibleMoves(solutionTable[depth]);

        // if (solutionTable.length > (depth + 1)) {
        //     var spliceNb = solutionTable.length - depth - 1;
        //     solutionTable.splice(solutionTable[depth], spliceNb);
        // }

        if (solutionTable.length > 1) {
            if (moves.indexOf("down") > -1 && down(solutionTable[depth]).indexOf(9) === solutionTable[(depth - 1)].indexOf(9)) {
                moves.splice(moves.indexOf("down"), 1);
            } else if (moves.indexOf("up") > -1 && up(solutionTable[depth]).indexOf(9) === solutionTable[(depth - 1)].indexOf(9)) {
                moves.splice(moves.indexOf("up"), 1);
            } else if (moves.indexOf("left") > -1 && left(solutionTable[depth]).indexOf(9) === solutionTable[(depth - 1)].indexOf(9)) {
                moves.splice(moves.indexOf("left"), 1);
            } else if (moves.indexOf("right") > -1 && right(solutionTable[depth]).indexOf(9) === solutionTable[(depth - 1)].indexOf(9)) {
                moves.splice(moves.indexOf("right"), 1);
            }
        }
        for (let i = 0; i < moves.length; i++) {
            if (moves[i] === "down") {
                route.push("D");
                solutionTable = down(solutionTable[depth]).concat();
            } else  if (moves[i] === "up") {
                route.push("U");
                solutionTable = up(solutionTable[depth]).concat();
            } else  if (moves[i] === "left") {
                route.push("L");
                solutionTable = left(solutionTable[depth]).concat();
            } else  if (moves[i] === "right") {
                route.push("R");
                solutionTable = right(solutionTable[depth]).concat();
            }

            if (isWinPosition(solutionTable)) {
                // console.log(route);
                return route;
            } else {
                // console.log(solutionTable);
                // console.log(depth);
                testMove(depth+1, solutionTable, bestDepth);
            }
        }
    }
}

function up(table) {
    var tmpTable = table.concat();
    var emptyCellIndex = tmpTable.indexOf(9);
    if (emptyCellIndex > 2){
        tmpTable[emptyCellIndex] = tmpTable[emptyCellIndex - 3];
        tmpTable[emptyCellIndex - 3] = 9;
        // console.log(solubleTable(tmpTable));
    }
    return tmpTable;
}

function down(table) {
    var tmpTable = table.concat();
    var emptyCellIndex = tmpTable.indexOf(9);
    if (emptyCellIndex < tmpTable.length - 3) {
        tmpTable[emptyCellIndex] = tmpTable[emptyCellIndex + 3];
        tmpTable[emptyCellIndex + 3] = 9;
        // console.log(solubleTable(tmpTable));
    }
    return tmpTable;
}

function left(table) {
    var tmpTable = table.concat();
    var emptyCellIndex = tmpTable.indexOf(9);
    if (emptyCellIndex !== 0 && emptyCellIndex !== 3 && emptyCellIndex !== 6) {
        tmpTable[emptyCellIndex] = tmpTable[emptyCellIndex - 1];
        tmpTable[emptyCellIndex - 1] = 9;
        // console.log(solubleTable(tmpTable));
    }
    return tmpTable;
}

function right(table) {
    var tmpTable = table.concat();
    var emptyCellIndex = tmpTable.indexOf(9);
    if (emptyCellIndex !== 2 && emptyCellIndex !== 5 && emptyCellIndex !== 8) {
        tmpTable[emptyCellIndex] = tmpTable[emptyCellIndex + 1];
        tmpTable[emptyCellIndex + 1] = 9;
        // console.log(solubleTable(tmpTable));
    }
    return tmpTable;
}

function possibleMoves(table) {
    var tmpTable = table.concat();
    var moves = [];
    var emptyCellIndex = tmpTable.indexOf(9);

    if (emptyCellIndex < tmpTable.length - 3) {
        moves.push("down");
    }

    if (emptyCellIndex > 2){
        moves.push("up");
    }

    if (emptyCellIndex !== 0 && emptyCellIndex !== 3 && emptyCellIndex !== 6) {
        moves.push("left");
    }

    if (emptyCellIndex !== 2 && emptyCellIndex !== 5 && emptyCellIndex !== 8) {
        moves.push("right");
    }
    return moves;
}

function isWinPosition(table) {
    var thisTable = table.concat();
    var winTable = initialTable();
    var win = true;

    for (var i = 0; i < winTable.length; i++) {
        if (thisTable[i] !== winTable[i]) {
            win = false;
            break;
        }
    }
    return win;
}