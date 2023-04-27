import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({
  libStatus,
  setSongs,
  audioRef,
  isPlaying,
  setCurrentSong,
  songs,
}) => {
  return (
    <div className={`library ${libStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            setSongs={setSongs}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setCurrentSong={setCurrentSong}
            song={song}
          />
        ))}
      </div>
    </div>
  );
};
export default Library;
