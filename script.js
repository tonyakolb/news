const baseUrl = 'https://newsapi.org/v2/top-headlines?';
const apiKey = '8dc2fe5854874ad09c838ccb8557875e';

const buttons = document.querySelectorAll('.button');
const articlesContainer = document.querySelector('.articles');
const loader = document.querySelector('.lds-ripple');

buttons.forEach((button, index) => {
    button.addEventListener('click', async () => {
        let source;
        switch (index) {
            case 0:
                source = 'techcrunch';
                break;
            case 1:
                source = 'bloomberg';
                break;
            case 2:
                source = 'the-verge';
                break;
            case 3:
                source = 'the-wall-street-journal';
                break;
        }
        await fetchNews(source);
    })
});

async function fetchNews(source) {
    try {
        const response = await fetch(`${baseUrl}sources=${source}&apiKey=${apiKey}`);
        const data = await response.json();
        outputInfo(data);
    }
    catch (error) {
        console.log(error);
    }
}

function outputInfo(data) {

    articlesContainer.innerHTML = '';
    loader.style.display = 'block';
    const fragment = new DocumentFragment();

    if (data.articles && data.articles.length > 0) {
        data.articles.forEach(article => {
            const card = document.createElement('div');
            card.classList.add('news-card');
            card.innerHTML = `
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}" alt="${article.title}">
                <p>${article.description}</p>
            `;
            fragment.append(card);
            // articlesContainer.appendChild(card);
        });
        articlesContainer.append(fragment);
        loader.style.display = 'none';
    } else {
        articlesContainer.innerHTML = '<p>Нет новостей для отображения.</p>';
    }
}