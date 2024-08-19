const gameBoard = () => {
    let board = []

    for(let i = 0;i<3;i++){
        board[i] = []
        for(let j =0;j<3;j++){
            board[i].push(cell())
        }
    }

    const getBoard = () => board
    
    return {
        getBoard
    }
}

const cell = () => {
    let value = '';

    const addPlayer = (player) =>{
        value = player
    }
    const getValue = () => value
    return {
        getValue,addPlayer
    }
}

const Controller = (() =>{
    const game = gameBoard()
    const players = [
        playerOne = {
            name:'',
            token:'X'
        },playerTwo = {
           name:'',
           token:'O'
        }
    ]
    const playersName = (name1,name2) => {
        players[0].name = name1
        players[1].name = name2
    }
    let playerOneScore = 0
    let playerTwoScore = 0
    let msg = ''
    let activePlayer = players[0]
    let board = game.getBoard()
    const controlBoard = () => board
    const getActivePlayer = () => activePlayer
    const getplayerOneScore = () => playerOneScore
    const getplayerTwoScore = () => playerTwoScore
    const getMsg = () => msg

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }
    const addToBoard = (row,column,token) =>{
        board[row][column].addPlayer(token)
        
    }
    const boardValue = () =>{
        let newBoardValue = board.map(((row) => row.map((j) =>  j.getValue() )));
        return newBoardValue
    }
    const newBoard = () => {
        let newgame = gameBoard()
        board =  newgame.getBoard()
        activePlayer = activePlayer === players[0]  ? players[1] : players[1]   
    }
    const CheckEnd =(num) => {
        return num !== ''
    }
    const newEndGame = () => {
        if(boardValue()[0].every(CheckEnd) && boardValue()[1].every(CheckEnd)
             && boardValue()[2].every(CheckEnd)){
            msg ='Tie'
            console.log(msg)
            newBoard()

        }
    }
    const printBoard = () =>{
        console.table(boardValue())
        console.log(`${activePlayer.name}'s turn`)
    }
    const addScore = () =>{
        if(activePlayer.token === 'X' ){
           playerOneScore++
           }else{
            playerTwoScore++
           }
    }
    const checkWinner = () => {
        if(boardValue()[0][0] === activePlayer.token && boardValue()[0][1]=== activePlayer.token
            && boardValue()[0][2]=== activePlayer.token)
            {
            msg = `${activePlayer.name} won the round `
            addScore()
            newBoard()
        }else if(boardValue()[1][0] === activePlayer.token && boardValue()[1][1]=== activePlayer.token
            && boardValue()[1][2]=== activePlayer.token)
            {
            msg = `${activePlayer.name} won the round `
            addScore()
            newBoard()
        }else if(boardValue()[2][0] === activePlayer.token && boardValue()[2][1]=== activePlayer.token
            && boardValue()[2][2]=== activePlayer.token)
            {
            msg = `${activePlayer.name} won the round `
            addScore()
            newBoard()
        }else if(boardValue()[0][0] === activePlayer.token && boardValue()[1][0]=== activePlayer.token
            && boardValue()[2][0]=== activePlayer.token)
            {
            msg = `${activePlayer.name} won the round `
            addScore()
            newBoard()
        }else if(boardValue()[0][1] === activePlayer.token && boardValue()[1][1]=== activePlayer.token
            && boardValue()[2][1]=== activePlayer.token)
            {
            msg = `${activePlayer.name} won the round `
            addScore()
            newBoard()
        }else if(boardValue()[0][2] === activePlayer.token && boardValue()[1][2] === activePlayer.token
            && boardValue()[2][2]=== activePlayer.token)
            {
            msg = `${activePlayer.name} won the round `
            addScore()
            newBoard()
        }else if(boardValue()[0][0] === activePlayer.token && boardValue()[1][1]=== activePlayer.token
            && boardValue()[2][2]=== activePlayer.token)
            {
            msg = `${activePlayer.name} won the round `
            addScore()
            newBoard()
        }else if(boardValue()[0][2] === activePlayer.token && boardValue()[1][1]=== activePlayer.token
            && boardValue()[2][0]=== activePlayer.token)
            {
            msg = `${activePlayer.name} won the round `
            addScore()
            newBoard()
            } 
    }

    const playRound = (row,column) => {
        if(boardValue()[row][column] === ''){
            addToBoard(row,column,activePlayer.token)
            checkWinner()
            newEndGame()
            switchPlayer()
            printBoard() 
        }else{
            console.log('Position Taken')
            printBoard()
        }
    }
    printBoard()
    
    return{
        playRound,getActivePlayer,controlBoard,getplayerOneScore,getplayerTwoScore,newBoard,switchPlayer,playersName,getMsg
    }
    
})()
const screencontroller = (() => {
    const turndiv = document.querySelector('.turn')
    const boardDiv = document.querySelector('.board')
    const winnerDiv = document.querySelector('.winner')
    const playerOneScoreDiv = document.querySelector('.playeronescores')
    const playerTwoScoreDiv = document.querySelector('.playertwoscores')
    const start = document.querySelector('.start')
    const end = document.querySelector('.end')
    const dialog = document.querySelector('dialog')
    const playerNameOne = dialog.querySelector('#playerone')
    const playerNameTwo = dialog.querySelector('#playertwo')
    const versus = document.querySelector('.versus')
    const closedialog = document.querySelector('.close')
    const playToStart = document.querySelector('.play-to-start')
    let playCheck = false
    let activePlayer = Controller.getActivePlayer()

    const updateScreen = () => {
        let screenBoard = Controller.controlBoard()
        boardDiv.textContent = ''
        screenBoard.forEach((x,ind) => x.forEach((j,index) => {
            const button = document.createElement('button')
            button.classList.add('cell')
            button.dataset.row = ind
            button.dataset.column = index
            button.textContent = j.getValue()
            boardDiv.appendChild(button)
            
        }))
    }

    const clickHandler = (e) =>{  
        if(playCheck){
            const row = e.target.dataset.row
            const column = e.target.dataset.column
            
            if(!row && !column) return 
            Controller.playRound(row,column)

            let playerOneScore = Controller.getplayerOneScore()
            let playerTwoScore = Controller.getplayerTwoScore()
            activePlayer = Controller.getActivePlayer()
            let msg = Controller.getMsg()
            winnerDiv.textContent = msg
            turndiv.textContent = `${activePlayer.name}'s turn`
            playerOneScoreDiv.textContent = `${playerNameOne.value} score : ${playerOneScore}`
            playerTwoScoreDiv.textContent = `${playerNameTwo.value} score :  ${playerTwoScore}`
            updateScreen()     
        }
    }

    const startGame = () =>{
        if(playerNameOne.value !== '' && playerNameTwo.value !== ''){
            playToStart.textContent = ''
            playCheck = true
            start.disabled = true
            Controller.playersName(playerNameOne.value,playerNameTwo.value)
            versus.textContent = `${playerNameOne.value} vs ${playerNameTwo.value}`
            turndiv.textContent = `${activePlayer.name}'s turn`
        }

    }
    const endGame = () => {
        playCheck = false
        Controller.newBoard()
        Controller.switchPlayer()
        updateScreen()
        turndiv.textContent = ''
        playerOneScoreDiv.textContent = ''
        versus.textContent = ''
        winnerDiv.textContent = ''
        playerTwoScoreDiv.textContent = ''
        start.disabled = false
        playToStart.textContent = `Hit play to start `
        playerNameOne.value = ''
        playerNameTwo.value = ''
    }

    boardDiv.addEventListener('click',clickHandler) 
    dialog.addEventListener('close',startGame)
    closedialog.addEventListener('click',() =>{

        if(playerNameOne.value !== '' && playerNameTwo.value !== ''){
            dialog.close()
        }else{
            alert('Enter You name to continue')
        } 
    })

    end.addEventListener('click',endGame)
    start.addEventListener('click',() => dialog.showModal())
    updateScreen()
})()

    



