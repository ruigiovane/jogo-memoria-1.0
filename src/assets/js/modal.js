var _targettedModal, modalActiveClass = "is-modal-active";

const generateModal = function() {
  var message = 'Que tal jogar novamente?';

  if (document.getElementById('level-select').value != '4')
    message = 'Que tal jogar novamente aumentando a dificuldade?';

  var content = `
    <div class="modal-dialog">
      <button class="modal-close close-modal">×</button>
      <header class="modal-header">
        <h3 class="modal-title">Parabéns!</h3>
      </header>
      <div class="modal-content">
        <p>Você conseguiu!</p>
        <p>${message}</p>
      </div>
      <footer class="modal-footer">
        <button id="btn-play-again" class="demo-btn close-modal">Tentar novamente</button>
      </footer>
    </div>
  `;

  var modal = document.getElementById('modal');
  modal.innerHTML = content;

  setModalEvents();

  showModal();
};

const setModalEvents = function() {
  [...document.getElementsByClassName('close-modal')].forEach(el => {
    el.addEventListener('click', hideModal)
  });

  document.getElementById('btn-play-again').addEventListener('click', init);
}

const showModal = function() {
  _targettedModal = document.getElementById('modal');
  _targettedModal.classList.add(modalActiveClass);
};

const hideModal = function() {
  _targettedModal.classList.remove(modalActiveClass);
};