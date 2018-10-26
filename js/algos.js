// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};


function distanceFromAnnecy(city) {
    var annecyPos = [45.9, 6.116667];
    var cityPos = [city.latitude, city.longitude];

    var latKm = 111.11;
    var longKm = calcLongKm(annecyPos[0]);

    var distLat = (annecyPos[0] - cityPos[0]) * latKm;
    var distLng = (annecyPos[1] - cityPos[1]) * longKm;

    var distance = calcHypotenuse(distLat, distLng);

    return distance;
}

function calcHypotenuse(a, b) {
    return(Math.sqrt((a * a) + (b * b)));
}

function calcLongKm(latitude) {
    var latKm = 111.11;
    var longKm = latKm * Math.cos(latitude);
    return longKm;
}

function swap(i, j) // Swap the values in array csvData
{
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)

    var swap = csvData[i];
    csvData[i] = csvData[j];
    csvData[j] = swap;
}

function isLess(A, B) {
    displayBuffer.push(['compare', A, B]); // Do not delete this line (for display)

    return distanceFromAnnecy(csvData[A]) < distanceFromAnnecy(csvData[B])

}

function insertsort() {
    for (i = 1 ; i < csvData.length ; i++) {
        var j = i;
        while (j > 0 && isLess(j,j-1)) {
            swap(j,j-1);
            j--;
        }
    }
}

function selectionsort() {
    for (i = 0 ; i < csvData.length ; i++) {
        for (j = i + 1; j < csvData.length; j++) {
            if (isLess(j, i)) {
                swap(j, i);
            }
        }
    }
}

function bubblesort() {
    var i = csvData.length - 1;
    while (i > 0) {
        var k = 0;
        for (j = 0 ; j < i ; j++) {
            if (isLess(j+1,j)) {
                swap(j+1,j);
                k = j;
            }
        }
        i = k;
    }
}

function shellsort() {
    console.log("implement me !");
}

function mergesort(data) {
    console.log("implement me !");
}

function heapsort(data) {
    console.log("implement me !");
}

function quicksort() {
    quicksortin(csvData, 'median', 0, csvData.length - 1);
}

function quicksortin(aa, pivot_type, left, right) {
    if (typeof(left) === 'undefined') left = 0;
    if (typeof(right) === 'undefined') left = aa.length - 1;

    if (left >= right) return;

    var pivot = partition(aa, pivot_type, left, right);
    quicksortin(aa, pivot_type, left, pivot - 1);
    quicksortin(aa, pivot_type, pivot + 1, right);
}

function partition(aa, pivot_type, left, right) {
    var pivot = choose_pivot(aa, pivot_type, left, right);
    swap(pivot, right);

    pivot = left;
    for (var i = left; i < right; i++) {
        if (isLess(i, right)) {
            if (i !== pivot) {
                swap(i, pivot)
            }
            pivot += 1;
        }
    }
    swap(right, pivot);

    return pivot;
}

function choose_pivot(aa, pivot_type, left, right) {
    if (typeof(left) === 'undefined') left = 0;
    if (typeof(right) === 'undefined') left = aa.length - 1;
    var pivot = null;

    if (pivot_type === 'random') {
        pivot = Math.floor(Math.random() * (right - left)) + left;
    } else if (pivot_type === 'first') {
        pivot = left;
    } else if (pivot_type === 'last') {
        pivot = right;
    } else if (pivot_type === 'middle') {
        pivot = Math.round((left + right) / 2)
    } else if (pivot_type === 'median') {
        if (left === right - 1) {
            pivot = 0;
        } else {
            var list1 = [];
            for (var i = left; i < right; i++) {
                list1.push(distanceFromAnnecy(csvData[i]));
            }

            console.log(list1);

            var index = list1.findIndex(function(number) {
                return number > median(list1);
            });
            pivot = index;
        }

        console.log(pivot);
    } else {
        throw 'invalid pivot_type ' + pivot_type;
    }

    return pivot;
}

// function findPivotPosition(pivot, j, k) {
//     var top = pivot;
//     var pivot = top;
//     var j = j;
//     for (i = k; i > top; i--) {
//         var tmp;
//         if (pivot < j) {
//             if (isLess(j, pivot)) {
//                 swap(pivot, j);
//                 tmp = pivot;
//                 pivot = j;
//                 j = tmp + 1;
//             } else {
//                 j--;
//             }
//             // console.log('une passe');
//         }
//         if (pivot > j) {
//             if (isLess(pivot, j)) {
//                 swap(pivot, j);
//                 tmp = pivot;
//                 pivot = j;
//                 j = tmp - 1;
//             } else {
//                 j++;
//             }
//             // console.log('une passe');
//         }
//     }
//     return pivot;
// }

function quick3sort(data) {
    console.log("implement me !");

}

function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}


var algorithms = {
    'insert': insertsort,
    'select': selectionsort,
    'bubble': bubblesort,
    'shell': shellsort,
    'merge': mergesort,
    'heap': heapsort,
    'quick': quicksort,
    'quick3': quick3sort
}

function sort(algo) {
    if (!algorithms.hasOwnProperty(algo)) {
        throw 'Invalid algorithm ' + algo;
    }
    var sort_fn = algorithms[algo];
    sort_fn();
}
