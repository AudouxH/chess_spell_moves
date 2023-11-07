function parseChessMove(move) {
    console.log("move:", move);

    const pieceMap = {
        '': 'pawn',
        'N': 'knight',
        'B': 'bishop',
        'R': 'rook',
        'Q': 'queen',
        'K': 'king'
    };

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    if (move === 'O-O') {
        return 'Kingside castle';
    }
    if (move === 'O-O-O') {
        return 'Queenside castle';
    }

    if (move.length > 2 && move[0] === move[0].toLowerCase()) {
        const targetFile = move[2];
        const targetRank = move[3];
        const spokenMove = `Pawn captures on ${targetFile} ${targetRank}`;
        return spokenMove;
    }

    if (move.length === 2) {
        const targetFile = move[0];
        const targetRank = move[1];
        const spokenMove = `Pawn moves to ${files[targetFile.charCodeAt(0) - 'a'.charCodeAt(0)]} ${targetRank}`;
        return spokenMove;
    }

    if (move.length === 3 && move[1] !== 'x') {
        const piece = pieceMap[move[0].toUpperCase()] || 'pawn';
        const targetFile = move[1];
        const targetRank = move[2];
        const spokenMove = `${piece} moves to ${files[targetFile.charCodeAt(0) - 'a'.charCodeAt(0)]} ${targetRank}`;
        return spokenMove;
    }

    if (move.length === 4 && move[1] === 'x') {
        const piece = pieceMap[move[0].toUpperCase()] || 'pawn';
        const targetFile = move[2];
        const targetRank = move[3];
        const spokenMove = `${piece} captures on ${files[targetFile.charCodeAt(0) - 'a'.charCodeAt(0)]} ${targetRank}`;
        return spokenMove;
    }

    if (move.endsWith('+')) {
        const sanitizedMove = move.substring(0, move.length - 1);
        return `${spellChessMove(sanitizedMove)} check`;
    }

    if (move.endsWith('#')) {
        const sanitizedMove = move.substring(0, move.length - 1);
        return `${spellChessMove(sanitizedMove)} checkmate`;
    }

    return move;
}

function spellChessMove(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    console.log('spelled move:', text);
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

if (window.location.hostname === 'www.chess.com' && window.location.pathname.startsWith('/play')) {
    handleChessMoves();
}

if ('speechSynthesis' in window) {
    console.log('speech is supported');
} else {
    console.log('speech is not supported');
}