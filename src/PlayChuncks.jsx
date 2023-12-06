import React, { useState } from "react";

const PlayChunks = ({ data }) => {
  const [intervalId, setIntervalId] = useState(null);

  const stopPlayback = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };
  const playDataChunk = (data) => {
    let chunk_size = 2200;
    let current_index = 0;
    let audioContext = new window.AudioContext();
    let gainNode = audioContext.createGain();
    gainNode.gain.value = 0.0001; // Adjusted gain value for audibility

    const interval = setInterval(() => {
      if (current_index < data.length) {
        const chunk = data.slice(current_index, current_index + chunk_size);
        let rawData = new Float32Array(chunk);
        let myArrayBuffer = audioContext.createBuffer(
          1,
          rawData.length,
          44_000
        );
        myArrayBuffer.copyToChannel(rawData, 0);

        let source = audioContext.createBufferSource();
        source.buffer = myArrayBuffer;
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        source.start(); // Starting the buffer source

        current_index += chunk_size;
        gainNode.gain.value += 0.0001;
      } else {
        console.log("DONE! clearInterval");
        clearInterval(interval);
      }
    }, 50);

    setIntervalId(interval);
  };

  return (
    <div>
      AudioPlayer
      <button onClick={() => playDataChunk(data)}>Play</button>
      <button onClick={stopPlayback}>Stop</button>
    </div>
  );
};

export default PlayChunks;
