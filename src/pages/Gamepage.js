import React, {useState} from 'react';
import {Grid, Button, Input} from 'semantic-ui-react';

const Gamepage = () => {
	const [player1, setPlayer1] = useState('');
	const [player2, setPlayer2] = useState('');
	const [isStart, setStart] = useState(true);
	const [isXPlayer, setXPlayer] = useState(true);
	const [cellsData, setCellsData] = useState([
		{key: 0, value: '', text: ''},
		{key: 1, value: '', text: ''},
		{key: 2, value: '', text: ''},
		{key: 3, value: '', text: ''},
		{key: 4, value: '', text: ''},
		{key: 5, value: '', text: ''},
		{key: 6, value: '', text: ''},
		{key: 7, value: '', text: ''},
		{key: 8, value: '', text: ''}
	]);
	const [result, setResult] = useState([
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	]);
	const [playerDisplay, setPlayerDisplay] = useState('X');
	const [xMoves, setXMoves] = useState([]);
	const [yMoves, setYMoves] = useState([]);
	const [xI, setXI] = useState(0);
	const [yI, setYI] = useState(0);
	const [isResult, setIsResult] = useState(false);
	const [resPlayer, setResPlayer] = useState('');
	const [stateTimer, setTimer] = useState(0);

	let timer = 0;
	setInterval(() => {
		if (timer === 5) {
			timer = 0;
		} else {
			timer = timer + 1;
			console.log('kajdamd', timer);
		}
	}, 1000);

	const handelClick = async index => {
		if (isXPlayer == null) {
			setXPlayer(true);
		} else {
			setXPlayer(!isXPlayer);
		}

		//Update cells
		const prevData = cellsData;

		if (isXPlayer != null) {
			prevData.map(item => {
				if (item.key == index && isXPlayer == true && cellsData[index].value === '') {
					prevData[index].value = 'X';
					prevData[index].text = 'X';
					setPlayerDisplay('O');
				}
				if (item.key == index && isXPlayer == false && cellsData[index].value === '') {
					prevData[index].value = 'O';
					prevData[index].text = 'O';
					setPlayerDisplay('X');
				}
			});
		}

		setCellsData(prevData);

		//X moves
		const prevXMoves = xMoves;
		let xCheck;
		if (playerDisplay === 'X') {
			console.log('xxxxxxx');
			for (let k = 0; k < prevXMoves.length; k++) {
				if (prevXMoves[k] == index) {
					xCheck = true;
					// break;
				}
			}
			if (!xCheck) {
				prevXMoves[xI] = index;

				setXI(xI + 1);
				setXMoves(prevXMoves);
			}
		}

		//Y moves
		const prevYMoves = yMoves;
		let yCheck;
		if (playerDisplay === 'O') {
			console.log('ooooooo');
			for (let k = 0; k < prevYMoves.length; k++) {
				if (prevYMoves[k] == index) {
					yCheck = true;
					// break;
				}
			}
			if (!yCheck) {
				prevYMoves[yI] = index;
				setYI(yI + 1);
				setYMoves(prevYMoves);
			}
		}

		//Result X Check
		{
			result.map(item => {
				const sortPrevXMoves = prevXMoves.sort();
				const sortPrevYMoves = prevYMoves.sort();

				const sortItem = item.sort();
				console.log('prevxmoves', sortPrevXMoves);
				console.log('item', sortItem);
				console.log('prevymoves', sortPrevYMoves);
				if (JSON.stringify(sortPrevXMoves) === JSON.stringify(sortItem)) {
					console.log('Result');
					// alert("X has won the game");
					setIsResult(true);
					setResPlayer(player1);
				}
			});

			//Result Y Check
			result.map(item => {
				const sortPrevYMoves = prevYMoves.sort();
				const sortItem = item.sort();
				if (JSON.stringify(sortPrevYMoves) === JSON.stringify(sortItem)) {
					// alert("O has won the game");
					setIsResult(true);
					setResPlayer(player2);
				}
			});
		}
	};

	return (
		<div>
			{console.log('agdjhad', timer)}
			<Grid style={{textAlign: 'center', marginTop: 20}}>
				<Grid.Column width={5}>
					<h3>Player 1 Name</h3>
					<Input
						placeholder="Enter Player Name"
						value={player1}
						disabled={!isStart}
						onChange={e => {
							setPlayer1(e.target.value);
						}}
					/>
				</Grid.Column>
				<Grid.Column width={6}>
					{isStart && (
						<Button
							color="green"
							disabled={player1 !== '' && player2 !== '' ? false : true}
							onClick={() => {
								setStart(false);
							}}
						>
							Start
						</Button>
					)}
					{!isStart && (
						<Button
							color="yellow"
							disabled={player1 !== '' && player2 !== '' ? false : true}
							onClick={() => {
								window.location.reload();
							}}
						>
							Reset
						</Button>
					)}
				</Grid.Column>
				<Grid.Column width={5}>
					<h3>Player 2 Name</h3>
					<Input
						placeholder="Enter Player Name"
						value={player2}
						disabled={!isStart}
						onChange={e => {
							setPlayer2(e.target.value);
						}}
					/>
				</Grid.Column>
			</Grid>
			{!isStart && (
				<Grid style={{textAlign: 'center', marginTop: 20}}>
					<Grid.Column width={4} />
					<Grid.Column width={8}>
						<Grid container>
							{cellsData.map((item, index) => (
								<Grid.Column
									style={{
										width: '150px',
										height: '180px',
										padding: '1px'
									}}
									width={5}
								>
									<Button
										disabled={item.value === '' && !isResult ? false : true}
										color="black"
										onClick={() => handelClick(index)}
										style={{
											width: '100%',
											height: '100%',
											borderRight: '5px solid white',
											borderBottom: '5px solid white',
											borderLeft: '5px solid white',
											borderTop: '5px solid white',
											fontSize: '50px',
											textAlign: 'center'
										}}
									>
										{isXPlayer != null ? item.text : ''}
									</Button>
								</Grid.Column>
							))}
						</Grid>
					</Grid.Column>
					<Grid.Column width={4} />
				</Grid>
			)}

			<Grid style={{textAlign: 'center'}}>
				{isResult && (
					<Grid.Column width={16}>
						<h1>{resPlayer} has Won the Game</h1>
					</Grid.Column>
				)}
			</Grid>
		</div>
	);
};

export default Gamepage;
