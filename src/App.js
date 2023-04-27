import React, { useState, useRef, useEffect } from 'react';
import Song from './components/Song';
import Player from './components/Player';
import './styles/app.scss';
import data from './utils/util';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
  //* refs
  const audioRef = useRef(null);

  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libStatus, setLibStatus] = useState(false);

  // UseEffects
  useEffect(() => {
    // console.log('UseEffect Called!');
    setSongs((prevState) =>
      prevState.map((el) => {
        if (el.id === currentSong.id) {
          return { ...el, active: true };
        }
        return { ...el, active: false };
      })
    );
  }, [currentSong]);
  return (
    <div className={`App ${libStatus ? 'active-library-mode' : ''}`}>
      <Nav setLibStatus={setLibStatus} />
      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
      <Library
        libStatus={libStatus}
        setSongs={setSongs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setCurrentSong={setCurrentSong}
        songs={songs}
      />
    </div>
  );
}

export default App;
