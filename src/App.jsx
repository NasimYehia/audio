import { useState } from "react";
import "./App.css";
//import AudioPlayer from "./AudioPlayer";
import { useEffect } from "react";
import PlayChunks from "./PlayChuncks";
//import PlayChunks from  "./PlayChunks";

function App() {
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/recording.json");
      const data = await response.json();
      const element = data[0];
      const samples = element.samples;
      console.log(samples);
      setSamples(samples);
    };
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Audio Player Example</h1>
      <PlayChunks data={samples} />
    </div>
  );
}

export default App;
