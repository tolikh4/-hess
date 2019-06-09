// Матрица для растановки фигур
let chess = [
    ['rook_white rook white', 'knight knight_white white', 'bishop bishop_white white', 'queen queen_white white', 'king king_white white', 'bishop bishop_white white', 'knight knight_white white', 'rook_white rook white'],
    ['pawn_white white', 'pawn_white white', 'pawn_white white', 'pawn_white white', 'pawn_white white', 'pawn_white white', 'pawn_white white', 'pawn_white white'],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    ['pawn_black black', 'pawn_black black', 'pawn_black black', 'pawn_black black', 'pawn_black black', 'pawn_black black', 'pawn_black black', 'pawn_black black'],
    ['rook_black rook black', 'knight knight_black black', 'bishop bishop_black black', 'queen queen_black black', 'king king_black black', 'bishop bishop_black black', 'knight knight_black black', 'rook_black rook black'],
];
// Создание сетки
function draw() {
    document.querySelector('.wrap').innerHTML = '';
    let m = 0;
    for (let i = 0; i < chess.length; i++) {
        let arr = chess[i];
        for (let k = 0; k < arr.length; k++) {
            document.querySelector('.wrap').innerHTML += `<div class="exel${ m % 2 ? ' bg-black' : ''} ${arr[k]}" data-x="${k}" data-y="${i}"></div>`;
            m++;
        }
        m++;
    }
};
draw();
let move_item;
let change = true;
let step = 1;
let saveArr = [];
document.querySelector('.panel').addEventListener('click', function(e) {
    if (e.target == document.querySelector('.new_game')) {
        if (document.querySelector('#black').checked) {
            step = 0;
        } else {
            step = 1;
        };
        draw();
    };
    if (e.target == document.querySelector('.save')) {
        // document.querySelectorAll('.exel').forEach( item => {
        //     saveArr.push(item.classList);
        // })
        localStorage.setItem('save_game', saveArr);
        localStorage.setItem('step', step);
        setTimeout(function() {
            alert('Расстановка фигур сохранена');
        }, 0);
    }
    if (e.target == document.querySelector('.load')) {
        load_game();
        setTimeout(function() {
            alert('Расстановка фигур загружена');
        }, 0);
    }
    
})
function load_game() {
    // saveArr = localStorage.getItem('save_game').split(',');
    saveArr = JSON.parse(localStorage.getItem('save_game'));
    document.querySelectorAll('.exel').forEach( function(item, i) {
        // item.classList = saveArr[i];
        item.classList = '';
        for (const key in saveArr[i]) {
            item.classList.add(saveArr[i][key]);
        }
        
    })
    step = localStorage.getItem('step');

}

// Массивы с логикой ходов для фигур
const horseMove = [[1,2],[-1,2],[1,-2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]];
const rookMove = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
    [0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7],
    [1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],
    [-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]
];
let bishopMove = [
    [1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],
    [-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7],
    [-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7],
    [1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7],
];
// for (let i = -7; i <= 7; i++) {
//     for (let k = -7; k <= 7; k++) {
//         let arr = [];
//         if (i/k == 1 || i/k == -1) {
//             arr.push(i, k);
//             bishopMove.push(arr);
//         }
//     }
// };
const pawn_whiteMove = [
    [0, 1],[0, 2]
    // [1, 1],[-1, 1]
];
const pawn_blackMove = [
    [0, -1],[0, -2]
    // [-1, -1],[1, -1]
]
const queenMove = queen();
function queen() {
    let arr=[];
    rookMove.forEach(function(item) {
        arr.push(item);
    })
    bishopMove.forEach(function(item) {
        arr.push(item);
    })
    return arr
}
const kingMove = [
    [0,1],[0,-1],[1,0],[-1,0],
    [1,1],[1,-1],[-1,1],[-1,-1]
]


document.querySelector('.wrap').addEventListener('click', function(e) {

    // Проверка очередности хода
    if(e.target.classList.contains('white') && step%2 == 0) {
        change = false;
    } else if (e.target.classList.contains('black') && step%2) {
        change = false;
    } else {
        change = true;
    }
     

    if (e.target.classList.contains('knight') && change) {
        console.log('horse');
        move_item = e.target;
        change = false;
        setMove(e.target, horseMove);
    }
    if (e.target.classList.contains('rook') && change) {
        console.log('rook');
        move_item = e.target;
        change = false;
        setMove(e.target, rookMove);
    }
    if (e.target.classList.contains('bishop') && change) {
        console.log('bishob');
        move_item = e.target;
        change = false;
        setMove(e.target, bishopMove);
    }
    if (e.target.classList.contains('pawn_white') && change) {
        console.log('pawn');
        move_item = e.target;
        change = false;
        setMove(e.target, pawn_whiteMove);
        checkPawn(e, 1, 'black');

    }
    if (e.target.classList.contains('pawn_black') && change) {
        console.log('pawn');
        move_item = e.target;
        change = false;
        setMove(e.target, pawn_blackMove);
        checkPawn(e, -1, 'white');

    }
    if (e.target.classList.contains('queen') && change) {
        console.log('queen');
        move_item = e.target;
        change = false;
        setMove(e.target, queenMove);
    }
    if (e.target.classList.contains('king') && change) {
        console.log('king');
        move_item = e.target;
        change = false;
        setMove(e.target, kingMove);
    }
    if (e.target.classList.contains('active')) {
        moves(e.target)
    }
})
// Проверка на удар пешкой
function checkPawn(e, coef, color) {
    let step1, step2, left, right;
    if ((+e.target.dataset.y +1) < 8 ) {
        step1 = document.querySelector(`[data-x="${+e.target.dataset.x}"][data-y="${+e.target.dataset.y+1*coef}"]`);
        step2 = document.querySelector(`[data-x="${+e.target.dataset.x}"][data-y="${+e.target.dataset.y+2*coef}"]`);
        if (step2.classList.contains(color) ) {
            step2.classList.remove('active');
        }
        if (!step1.classList.contains('0')) {
            step1.classList.remove('active');
            step2.classList.remove('active');
        }
    }
    if ((+e.target.dataset.x +1) < 8 || (+e.target.dataset.x - 1) > 0 ) {
        left = document.querySelector(`[data-x="${+e.target.dataset.x-1}"][data-y="${+e.target.dataset.y+1*coef}"]`);
        right = document.querySelector(`[data-x="${+e.target.dataset.x+1}"][data-y="${+e.target.dataset.y+1*coef}"]`);
        if (left && left.classList.contains(color)) {
            left.classList.add('active');
            step2.classList.remove('active');
        }
        if (right && right.classList.contains(color)) {
            right.classList.add('active');
            step2.classList.remove('active');
        }
    }
}


// Построение возможных ходов
function setMove(e, move) {
    document.querySelectorAll('.exel').forEach(function (element) {
        element.classList.remove('active');
        element.classList.remove('move_item');
    });
    let x = e.dataset.x;
    let y = e.dataset.y;
    
    e.classList.toggle('move_item');
    
    let thisCoord = [parseInt(x), parseInt(y)]
    const moves = move.filter(value => {
        if (  thisCoord[0] + value[0] >= 0  && thisCoord[0] + value[0] < 8 &&
        thisCoord[1] + value[1] >= 0  && thisCoord[1] + value[1] < 8) {
        return value
        }   
    })
    
    moves.forEach(value => {
        if (e.classList.contains('white') && !document.querySelector(`[data-x="${thisCoord[0] + value[0]}"][data-y="${thisCoord[1] + value[1]}"]`).classList.contains('white')) {
            document.querySelector(`[data-x="${thisCoord[0] + value[0]}"][data-y="${thisCoord[1] + value[1]}"]`).classList.toggle('active');
        }
        if (e.classList.contains('black') && !document.querySelector(`[data-x="${thisCoord[0] + value[0]}"][data-y="${thisCoord[1] + value[1]}"]`).classList.contains('black')) {
            document.querySelector(`[data-x="${thisCoord[0] + value[0]}"][data-y="${thisCoord[1] + value[1]}"]`).classList.toggle('active');
        }
    })
    if (e.classList.contains('rook')) {
        for (let l = 0; l < 4; l++ ) {
            rookCheck(l*7, l*7+7, rookMove);
        }
    };
    if (e.classList.contains('bishop')) {
        console.log(bishopMove);
        for (let l = 0; l < 4; l++ ) {
            rookCheck(l*7, l*7+7, bishopMove);
        }
    };
    if (e.classList.contains('queen')) {
        console.log(bishopMove);
        for (let l = 0; l < 8; l++ ) {
            rookCheck(l*7, l*7+7, queenMove);
        }
    };




    // Проверка хода
    function rookCheck(i, i_max, arrMove) {
        for ( i; i < i_max; i++) {
            if (  thisCoord[0] + arrMove[i][0] >= 0  && thisCoord[0] + arrMove[i][0] < 8 &&
                thisCoord[1] + arrMove[i][1] >= 0  && thisCoord[1] + arrMove[i][1] < 8) {
                    
                if ((e.classList.contains('white') && document.querySelector(`[data-x="${thisCoord[0] + arrMove[i][0]}"][data-y="${thisCoord[1] + arrMove[i][1]}"]`).classList.contains('white')) ||
                    (e.classList.contains('black') && document.querySelector(`[data-x="${thisCoord[0] + arrMove[i][0]}"][data-y="${thisCoord[1] + arrMove[i][1]}"]`).classList.contains('black')) ||
                    (e.classList.contains('white') && document.querySelector(`[data-x="${thisCoord[0] + arrMove[i][0]}"][data-y="${thisCoord[1] + arrMove[i][1]}"]`).classList.contains('black')) ||
                    (e.classList.contains('black') && document.querySelector(`[data-x="${thisCoord[0] + arrMove[i][0]}"][data-y="${thisCoord[1] + arrMove[i][1]}"]`).classList.contains('white'))) {
                    console.log('0-7');
                    for (let k = i+1; k < i_max; k++) {
                        let item = document.querySelector(`[data-x="${thisCoord[0] + arrMove[k][0]}"][data-y="${thisCoord[1] + arrMove[k][1]}"]`);
                        if (item) {
                            item.classList.remove('active');
                        }
                        
                    }
                }
            }            
        };
    }

}

// Перемещение фигуры
function moves(e) {
    if(move_item.classList.contains('bg-black') && e.classList.contains('bg-black')) {
        e.classList = move_item.classList;
        move_item.classList = '';
        move_item.classList.add('exel', 'bg-black', '0');
    }
    if(!move_item.classList.contains('bg-black') && e.classList.contains('bg-black')) {
        e.classList = move_item.classList;
        e.classList.add('bg-black');
        move_item.classList = '';
        move_item.classList.add('exel', '0');
    }
    if(!move_item.classList.contains('bg-black') && !e.classList.contains('bg-black')) {
        e.classList = move_item.classList;
        move_item.classList = '';
        move_item.classList.add('exel', '0');
    }
    if(move_item.classList.contains('bg-black') && !e.classList.contains('bg-black')) {
        e.classList = move_item.classList;
        e.classList.remove('bg-black');
        move_item.classList = '';
        move_item.classList.add('exel','bg-black', '0');
    }
    document.querySelectorAll('.exel').forEach(function (element) {
        element.classList.remove('active');
        element.classList.remove('green');
    })

    document.querySelectorAll('.exel').forEach(function (element) {
        element.classList.remove('active');
        element.classList.remove('move_item');
    });

    change = true;
    step++;
    // Сохранение расстановки фигур после каждого шага
    saveArr = [];
    document.querySelectorAll('.exel').forEach( item => {
        saveArr.push(item.classList);
        
    })
    saveArr = JSON.stringify(saveArr);
}