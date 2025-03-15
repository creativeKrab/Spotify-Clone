document.addEventListener('DOMContentLoaded', () => {
  const audio = new Audio();
  const songList = document.querySelectorAll('.song div');
  const songBanner = document.querySelector('.songBanner');
  const playButton = document.querySelector('.play');
  const progressBar = document.getElementById('myProgressBar');
  const volumeBar = document.getElementById('myVolume');
  const modal = document.createElement('div');
  const overlay = document.createElement('div');
  const body = document.body;
  const container = document.querySelector('.container');
  const currentSongName = document.getElementById('currentSongName');
  const currentTimeDisplay = document.getElementById('currentTime');
  const totalTimeDisplay = document.getElementById('totalTime');


  modal.className = 'modal';
  overlay.className = 'overlay';
  body.appendChild(modal);
  body.appendChild(overlay);

  let currentSongIndex = 0;
  const songs = [
    {
      name: 'Open Hearts',
      artist: 'The Weeknd',
      src: 'openHearts.mp3',
      image: 'weeknd.jpg'
    },
    {
      name: 'Dynamite',
      artist: 'BTS',
      src: 'dynamite.mp3',
      image: 'bts.jpg'
    },
    {
      name: 'Lust for Life (with The Weeknd)',
      artist: 'Lana Del Rey',
      src: 'lustforLife.mp3',
      image: 'lana.jpg'
    },
    {
      name: 'Birds of a feather',
      artist: 'Billie Eilish',
      src: 'birdsofaFeather.mp3',
      image: 'billie.jpg'
    },
    {
      name: 'We can\'t be Friends',
      artist: 'Ariana Grande',
      src: 'wecantbeFriends.mp3',
      image: 'ariana.jpg'
    },
    {
      name: 'Scientist',
      artist: 'Coldplay',
      src: 'scientist.mp3',
      image: 'coldplay.jpg'
    },
  ];

  function playSong(index) {
    const song = songs[index];
    audio.src = song.src;
    audio.play();
    songBanner.innerHTML = `<img src="${song.image}" alt="pic"><h6>${song.name} by ${song.artist}</h6>`;
    songBanner.style.display = 'none';
    currentSongName.textContent = `${song.name} by ${song.artist}`;
    playButton.src = 'pause.png'; // Change to pause icon
    showModal(song);
  }

  function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
  }

  function setVolume() {
    audio.volume = volumeBar.value / 100;
  }

  function showModal(song) {
    modal.innerHTML = `<img src="${song.image}" alt="pic"><h6>${song.name} by ${song.artist}</h6>`;
    modal.style.display = 'block';
    overlay.style.display = 'block';
    container.classList.add('blurred');
  }

  function hideModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    container.classList.remove('blurred');
  }

  function updateCurrentTime() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    currentTimeDisplay.textContent = `${minutes}:${seconds}`;
  }

  function updateTotalTime() {
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
    totalTimeDisplay.textContent = `${minutes}:${seconds}`;
  }
  
  function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    updateCurrentTime(); // Update current playback time
  }  

  songList.forEach((songDiv, index) => {
    songDiv.addEventListener('click', () => {
      currentSongIndex = index;
      playSong(index);
    });
  });

  overlay.addEventListener('click', hideModal);

  playButton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playButton.src = 'pause.png'; // Change to pause icon
    } else {
      audio.pause();
      playButton.src = 'play.png'; // Change to play icon
    }
  });

  audio.addEventListener('loadedmetadata', updateTotalTime);
  audio.addEventListener('timeupdate', updateProgressBar);
  progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
  });
  volumeBar.addEventListener('input', setVolume);
});
