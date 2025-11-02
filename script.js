// navigation + dynamic loader
function openGame(gameId){
  document.getElementById('dashboard').classList.add('hidden');
  document.querySelectorAll('.game-section').forEach(s=>s.classList.add('hidden'));
  const sec = document.getElementById(gameId);
  sec.classList.remove('hidden');
  document.getElementById('backBtn').style.display='block';

  // if game script not loaded, load it dynamically
  if(!document.querySelector(`script[data-game="${gameId}"]`)){
    const s = document.createElement('script');
    s.src = `games/${gameId}.js`;
    s.setAttribute('data-game', gameId);
    document.body.appendChild(s);
  } else {
    // call init if already loaded
    if(window[gameId] && typeof window[gameId].init === 'function') window[gameId].init();
  }
}

function goBack(){
  document.querySelectorAll('.game-section').forEach(s=>s.classList.add('hidden'));
  document.getElementById('dashboard').classList.remove('hidden');
  document.getElementById('backBtn').style.display='none';
}
function openGame(gameName) {
  const path = `games/${gameName}/index.html`;
  window.location.href = path;
}

