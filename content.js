let currentLanguage = 'en';

chrome.storage.sync.get(['lang'], function (result) {
    if (result.lang) {
        currentLanguage = result.lang;
    }
});

if ('speechSynthesis' in window) {
    console.log('speech is supported');
} else {
    console.log('speech is not supported');
}

function parseChessMove(move) {
    const pieceMapEN = {
        '': 'pawn',
        'N': 'knight',
        'B': 'bishop',
        'R': 'rook',
        'Q': 'queen',
        'K': 'king'
    };

    const pieceMapFR = {
        '': 'Pion',
        'C': 'Cavalier',
        'F': 'Fou',
        'T': 'Tour',
        'D': 'Dame',
        'R': 'Roi'
    };

    if (move === 'O-O') {
        return 'Kingside castle';
    }
    if (move === 'O-O-O') {
        return 'Queenside castle';
    }

    if (move.length === 2) {
        const targetColumn = move[0];
        const targetRow = move[1];

        if (currentLanguage === 'en') {
            return (`Pawn move on ${targetColumn} ${targetRow}`);
        } else if (currentLanguage === 'fr') {
            return (`Pion se déplace en ${targetColumn} ${targetRow}`);
        } else {
            return ('The extension cannot find the lang picked');
        }
    }

    if (move.length === 3) {
        if (move.includes('+')|| move.includes('#')) {
            const targetColumn = move[0];
            const targetRow = move[1];

            if (currentLanguage === 'en') {
                return (`Pawn move on ${targetColumn} ${targetRow} ${move.includes('+') ? 'check' : move.includes('#') ? 'checkmate' : ''}`);
            } else if (currentLanguage === 'fr') {
                return (`Pion se déplace en ${targetColumn} ${targetRow} ${move.includes('+') ? 'check' : move.includes('#') ? 'checkmate' : ''}`);
            } else {
                return ('The extension cannot find the lang picked');
            }
        } else {
            console.log('piece move on');
            const piece = currentLanguage === 'fr' ? pieceMapFR[move[0].toUpperCase()] : pieceMapEN[move[0].toUpperCase()];
            const targetColumn = move[1];
            const targetRow = move[2];

            if (currentLanguage === 'en') {
                return (`${piece} move on ${targetColumn} ${targetRow}`);
            } else if (currentLanguage === 'fr') {
                return (`${piece} se déplace en ${targetColumn} ${targetRow}`);
            } else {
                return ('The extension cannot find the lang picked');
            }
        }
    }

    if (move.length === 4) {
        if (move.includes('x') && move[0] === move[0].toLowerCase()) {
            const fromCase = move[0];
            const targetColumn = move[2];
            const targetRow = move[3];

            if (currentLanguage === 'en') {
                return (`Pawn capture from ${fromCase} on ${targetColumn} ${targetRow}`);
            } else if (currentLanguage === 'fr') {
                return (`Pion capture depuis ${fromCase} en ${targetColumn} ${targetRow}`);
            } else {
                return ('The extension cannot find the lang picked');
            }
        } else if (move.includes('x') && move[0] !== move[0].toLowerCase()) {
            const piece = currentLanguage === 'fr' ? pieceMapFR[move[0].toUpperCase()] : pieceMapEN[move[0].toUpperCase()];
            const targetColumn = move[2];
            const targetRow = move[3];

            if (currentLanguage === 'en') {
                return (`${piece} capture on ${targetColumn} ${targetRow}`);
            } else if (currentLanguage === 'fr') {
                return (`${piece} capture en ${targetColumn} ${targetRow}`);
            } else {
                return ('The extension cannot find the lang picked');
            }
        } else if (move.includes('+')|| move.includes('#')) {
            const piece = currentLanguage === 'fr' ? pieceMapFR[move[0].toUpperCase()] : pieceMapEN[move[0].toUpperCase()];
            const targetColumn = move[1];
            const targetRow = move[2];

            if (currentLanguage === 'en') {
                return (`${piece} move on ${targetColumn} ${targetRow} ${move.includes('+') ? 'check' : move.includes('#') ? 'checkmate' : ''}`);
            } else if (currentLanguage === 'fr') {
                return (`${piece} se déplace en ${targetColumn} ${targetRow} ${move.includes('+') ? 'check' : move.includes('#') ? 'checkmate' : ''}`);
            } else {
                return ('The extension cannot find the lang picked');
            }
        } else if (move[0] !== move[0].toLowerCase()) {
            const fromCase = move[1];
            const targetColumn = move[2];
            const targetRow = move[3];

            if (currentLanguage === 'en') {
                return (`Pawn move from ${fromCase} on ${targetColumn} ${targetRow}`);
            } else if (currentLanguage === 'fr') {
                return (`Pion se déplace depuis ${fromCase} en ${targetColumn} ${targetRow}`);
            } else {
                return ('The extension cannot find the lang picked');
            }
        } else {
            const piece = currentLanguage === 'fr' ? pieceMapFR[move[0].toUpperCase()] : pieceMapEN[move[0].toUpperCase()];
            const fromCase = move[0];
            const targetColumn = move[1];
            const targetRow = move[2];

            if (currentLanguage === 'en') {
                return (`${piece} move from ${fromCase} on ${targetColumn} ${targetRow}`);
            } else if (currentLanguage === 'fr') {
                return (`${piece} se déplace depuis ${fromCase} en ${targetColumn} ${targetRow}`);
            } else {
                return ('The extension cannot find the lang picked');
            }
        }
    }

    if (move.length === 5) {
        if (move[0] === move[0].toLowerCase()) {
            const fromCase = move[0];
            const targetColumn = move[2];
            const targetRow = move[3];

            if (currentLanguage === 'en') {
                return (`Pawn capture from ${fromCase} on ${targetColumn} ${targetRow} ${move.includes('+') ? 'check' : move.includes('#') ? 'checkmate' : ''}`);
            } else if (currentLanguage === 'fr') {
                return (`Pion capture depuis ${fromCase} en ${targetColumn} ${targetRow} ${move.includes('+') ? 'check' : move.includes('#') ? 'checkmate' : ''}`);
            } else {
                return ('The extension cannot find the lang picked');
            }
        } else {
            const piece = currentLanguage === 'fr' ? pieceMapFR[move[0].toUpperCase()] : pieceMapEN[move[0].toUpperCase()];
            const targetColumn = move[2];
            const targetRow = move[3];

            if (currentLanguage === 'en') {
                return (`${piece} capture on ${targetColumn} ${targetRow} ${move.includes('+') ? 'check' : move.includes('#') ? 'checkmate' : ''}`);
            } else if (currentLanguage === 'fr') {
                return (`${piece} capture en ${targetColumn} ${targetRow} ${move.includes('+') ? 'check' : move.includes('#') ? 'checkmate' : ''}`);
            } else {
                return ('The extension cannot find the lang picked');
            }
        }
    }

    return 'Move not found';
}

function spellChessMove(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    currentLanguage === 'fr' ? utterance.lang = "fr-FR" : utterance.lang = "en-EN";
    window.speechSynthesis.speak(utterance);
}

function handleChessMoves() {
    const processedMoves = new Set();
    const newMoves = [];
    
    function processMoves() {
        const moveElements = document.querySelectorAll('.move');

        moveElements.forEach(moveElement => {
            const whiteMoveElement = moveElement.querySelector('.white.node.selected');
            const blackMoveElement = moveElement.querySelector('.black.node.selected');

            if (whiteMoveElement) {
                const whiteMove = whiteMoveElement.textContent.trim();
                if (newMoves.length === 0) {
                    newMoves.push(whiteMove);
                    const spelledMove = parseChessMove(whiteMove);
                    spellChessMove(spelledMove);
                } else if (whiteMove !== newMoves[newMoves.length - 1]) {
                    newMoves.push(whiteMove);
                    const spelledMove = parseChessMove(whiteMove);
                    spellChessMove(spelledMove);
                }
            }

            if (blackMoveElement) {
                const blackMove = blackMoveElement.textContent.trim();
                if (newMoves.length === 0) {
                    newMoves.push(blackMove);
                    const spelledMove = parseChessMove(blackMove);
                    spellChessMove(spelledMove);
                } else if (blackMove !== newMoves[newMoves.length - 1]) {
                    newMoves.push(blackMove);
                    const spelledMove = parseChessMove(blackMove);
                    spellChessMove(spelledMove);
                }
            }

            processedMoves.add(moveElement);
        });
    }

    setInterval(processMoves, 1000);
}

if (window.location.hostname === 'www.chess.com' && (window.location.pathname.startsWith('/play') || window.location.pathname.startsWith('/fr/play') || window.location.pathname.startsWith('/game'))) {
    handleChessMoves();
}

