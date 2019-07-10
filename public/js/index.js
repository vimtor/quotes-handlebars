const $likeButtons = document.querySelectorAll('.like-button');

$likeButtons.forEach($button => $button.addEventListener('click', () => {
    likeQuote($button.dataset.target)
        .then(likes => $button.querySelector('.like-text').textContent = likes)
        .catch(console.error);
}));

async function likeQuote(id) {
    const response = await fetch('/api/like', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({id})
    });

    const body = await response.json();

    if (response.status == 400) {
        throw body.error;
    }

    return body.likes;
}