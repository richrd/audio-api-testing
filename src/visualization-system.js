
function initBarAnalyzer(audioCtx, source, canvas) {
	console.log("initAnalyzer")
	const analyser = audioCtx.createAnalyser();
	analyser.fftSize = 256;
	analyser.smoothingTimeConstant = 0.8


	// Connect the source to be analyzed
	source.connect(analyser);

	// Get a canvas defined with ID "oscilloscope"
	const canvasCtx = canvas.getContext("2d");
	const bufferLength = analyser.frequencyBinCount; // equal to half of fftSize
	canvasCtx.fillStyle = "#fff";

	const dataArray = new Uint8Array(bufferLength); // creates an array of unsigned 8 bit integers, with a length of 1024

	const drawAnalyzer = () => {
		analyser.getByteFrequencyData(dataArray);
		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
		const barWidth = (canvas.width / bufferLength) * 2.5;
		let barHeight;
		let x = 0;

		for(var i = 0; i < bufferLength; i++) {
			barHeight = dataArray[i];
			canvasCtx.fillRect(x, canvas.height-barHeight/2, barWidth, barHeight);
			x += barWidth + 1;
		}
	};

	return drawAnalyzer;
}


function initAnalyzer(audioCtx, source, canvas) {
	console.log("initAnalyzer")
	const analyser = audioCtx.createAnalyser();
	analyser.fftSize = 256;
	analyser.smoothingTimeConstant = 0.8


	// Connect the source to be analyzed
	source.connect(analyser);

	// Get a canvas defined with ID "oscilloscope"
	const canvasCtx = canvas.getContext("2d");
	const bufferLength = analyser.frequencyBinCount; // equal to half of fftSize

	const dataArray = new Uint8Array(bufferLength); // creates an array of unsigned 8 bit integers, with a length of 1024


	canvasCtx.lineWidth = 2;
	canvasCtx.strokeStyle = "rgb(255, 255, 255)";
	canvasCtx.fillStyle = "#fff";


	const drawAnalyzer = () => {
		canvasCtx.beginPath();
		analyser.getByteFrequencyData(dataArray);
		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
		const barWidth = (canvas.width / bufferLength) * 2.5;
		let barHeight;
		let x = 0;

		for(var i = 0; i < bufferLength; i++) {
			barHeight = dataArray[i];
			canvasCtx.lineTo(x, canvas.height-barHeight/2, barWidth, barHeight);
			x += barWidth + 1;
		}
		canvasCtx.stroke();
	};

	return drawAnalyzer;
}

function initScope(audioCtx, source, canvas) {
	const analyser = audioCtx.createAnalyser();
	analyser.fftSize = 2048;

	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Uint8Array(bufferLength);
	analyser.getByteTimeDomainData(dataArray);

	// Connect the source to be analyzed
	source.connect(analyser);

	// Get a canvas defined with ID "oscilloscope"
	const canvasCtx = canvas.getContext("2d");

	// draw an oscilloscope of the current audio source
	const drawScope = () => {
		//console.log("drawScope");
		analyser.getByteTimeDomainData(dataArray);

		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

		canvasCtx.lineWidth = 2;
		canvasCtx.strokeStyle = "rgb(255, 255, 255)";

		canvasCtx.beginPath();

		const sliceWidth = canvas.width * 1.0 / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			const v = dataArray[i] / 128.0;
			const y = v * canvas.height / 2;

			if (i === 0) {
				canvasCtx.moveTo(x, y);
			} else {
				canvasCtx.lineTo(x, y);
			}

			x += sliceWidth;
		}
		canvasCtx.stroke();
	}

	return drawScope;
}
