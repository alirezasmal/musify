import React, { useState } from 'react';
import skipIcon from '../styles/icons/icon-skip.svg';
import playIcon from '../styles/icons/icon-play.svg';
import pauseIcon from '../styles/icons/icon-pause.svg';
const Player = ({
  setCurrentSong,
  songs,
  audioRef,
  currentSong,
  setIsPlaying,
  isPlaying,
}) => {
  //* states
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  //* Event Handlers
  const songEndedHandler = () => {
    console.log('ended');
    skipTrackHandler('forward');
  };
  const skipTrackHandler = async (direction) => {
    // console.log('hey');
    let currentIndex = songs.findIndex((songs) => songs.id === currentSong.id);
    if (direction === 'forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === 'backward') {
      if (currentIndex - 1 === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return null;
      }
      await setCurrentSong(songs[currentIndex - 1]);
    }
    if (isPlaying) audioRef.current.play();
  };
  const timeHpdateHandler = (e) => {
    // console.log(e.target.duration);
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const animationPercentage = Math.round((currentTime / duration) * 100);
    setSongInfo({ ...songInfo, currentTime, duration, animationPercentage });
    // console.log(animationPercentage);
  };
  const playSongHandler = () => {
    // console.log(audioRef);
    // audioRef.current.play();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const getTime = (time) => {
    return (
                      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHanlder = (e) => {
    // console.log(e);
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  // Custom Input Styling
  const animateTrack = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  const trackRangeColor = {
    background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={trackRangeColor} className="track">
          <input
            value={songInfo.currentTime}
            min={0}
            max={songInfo.duration || 0}
            type="range"
            onChange={dragHanlder}
          />
          <div style={animateTrack} className="animate-track"></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className="play-control">
        <img
          height="40px"
          style={{ transform: 'scaleX(-1)' }}
          src={skipIcon}
          alt="Previous-Song-Icon"
          onClick={() => skipTrackHandler('backward')}
        />
        {isPlaying ? (
          <img
            onClick={playSongHandler}
            className="icon"
            src={pauseIcon}
            alt=""
          />
        ) : (
          <img
            onClick={playSongHandler}
            className="icon"
            src={playIcon}
            alt="playIcon"
          />
        )}
        <img
          onClick={() => skipTrackHandler('forward')}
          className="icon"
          src={skipIcon}
          alt="Previous-Song-Icon"
        />
      </div>
      <audio
        onEnded={songEndedHandler}
        onTimeUpdate={timeHpdateHandler}
        onLoadedData={timeHpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};
export default Player;
