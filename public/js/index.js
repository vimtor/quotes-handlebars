const $modalButtons = document.querySelectorAll('.modal-button');
const $modalCloseButtons = document.querySelectorAll('.modal-close');

$modalButtons.forEach($button => {
    $button.addEventListener('click', () => openModal($button.dataset.target))
});

$modalCloseButtons.forEach($button => {
    $button.addEventListener('click', () => closeModal($button.dataset.target))
});

function openModal(modalID) {
    const $modal = document.getElementById(modalID);
    $modal.classList.add('is-active');
}

function closeModal(modalID) {
    const $modal = document.getElementById(modalID);
    $modal.classList.remove('is-active');
}