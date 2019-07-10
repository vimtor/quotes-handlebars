(function() {

    const $deleteNavButton = document.querySelector('#delete-button');
    const $closeModalButtons = document.querySelectorAll('#close-button');
    const $modal = document.querySelector('.modal');

    $deleteNavButton.addEventListener('click', () => $modal.classList.add('is-active'));
    $closeModalButtons.forEach($button => { 
        $button.addEventListener('click', () => $modal.classList.remove('is-active'));
    });

})();