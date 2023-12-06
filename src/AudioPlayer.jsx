const playAudio = (data) => {
  let audioContext = new window.AudioContext();
  let gainNode = audioContext.createGain(); // Create a gain node
  // Your vector array of integers (scaled to between -1.0 and 1.0)
  let rawData = new Float32Array(data);
  // Create an empty stereo buffer at the sample rate of the AudioContext
  let myArrayBuffer = audioContext.createBuffer(1, rawData.length, 44_000);
  // Fill the buffer with your data
  myArrayBuffer.copyToChannel(rawData, 0);
  // Get an AudioBufferSourceNode.
  // This is the AudioNode to use when we want to play an AudioBuffer
  let source = audioContext.createBufferSource();
  source.buffer = myArrayBuffer;
  // Set the gain value
  gainNode.gain.value = 100;
  // connect the AudioBufferSourceNode to the destination
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);
  // start the source playing
  source.start();
};

const AudioPlayer = ({ data }) => {
  return (
    <div>
      AudioPlayer
      <button onClick={() => playAudio(data)}>play</button>
    </div>
  );
};

export default AudioPlayer;
