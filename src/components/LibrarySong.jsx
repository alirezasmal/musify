import React from 'react';
const LibrarySong = ({ isPlaying, setCurrentSong, song, audioRef }) => {
  const songSelectedHandler = async () => {
    // console.log(song);
    await setCurrentSong(song);
    if (isPlaying) {
      audioRef.current.play();
    }
    // console.log('songSlected called');
    // setSongs((prevState) =>
    //   prevState.map((el) => {
    //     if (el.id === song.id) {
    //       return { ...el, active: true };
    //     }
    //     return { ...el, active: false };
    //   })
    // );
  };
  return (
    <div
      onClick={songSelectedHandler}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      {/* <h1>Picture</h1> */}
      <img src={song.cover} alt="" />
      <div className="song-descrition">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};
export default LibrarySong;
