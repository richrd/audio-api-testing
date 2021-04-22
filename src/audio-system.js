
class AudioNode {
    constructor() {

    }
}

class Output {
    constructor(parent, connector) {
        this.parent = parent;
        this.connector = connector;
        this.connections = [];
    }

    connect(input) {
        const target = input.getDestination();
        this.connector.connect(target);
        this.connections.push(input);
    }

    disconnect(input) {
        const target = input.getDestination();
        this.connector.disconnect(target);
        this.connections.push(target);
    }

    disconnectAll() {
        this.connections.forEach((input) => this.disconnect(input));
    }
}

class Input {
    constructor(parent, connector) {
        this.parent = parent;
        this.connector = connector;
    }

    getDestination() {
        return this.connector;
    }
}

class AudioOutput extends AudioNode {
    constructor(audioContext) {
        super();
        this.audioContext = audioContext;
        this.inputs = {
            main: new Input(this, this.audioContext.destination),
        }
    }
}

class Oscillator extends AudioNode {
    constructor(audioContext) {
        super();
        this.audioContext = audioContext;

        this.actorNode = this.audioContext.createOscillator();
        this.actorNode.start();

        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = 1;

        // Oscillator -> Gain
        this.actorNode.connect(this.gainNode);

        this.outputs = {
            main: new Output(this, this.gainNode),
        }

        this.inputs = {
            frequency: new Input(this, this.actorNode.frequency),
        }
    }
    setType(value) {
        console.log("setType", value);
        this.actorNode.type = value;
    }
    setFrequency(value) {
        console.log("setFrequency", value);
        this.actorNode.frequency.value = value;
    }
    setGain(value) {
        console.log("setGain", value);
        this.gainNode.gain.value = value;
    }
}
