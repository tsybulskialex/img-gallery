window.addEventListener('DOMContentLoaded', () => {

    const searchBtn = document.querySelector('.search__btn'),
          searchInput = document.querySelector('.search__input'),

          wrapperImg = document.querySelector('.wrapper__images'),
          close = document.querySelector('.search__cross'),

          sun = document.querySelector('.header__sun'),
          moon = document.querySelector('.header__moon');

    
    // функция создания картинок
    function createImg(url) {
        const img = document.createElement("img");
        img.classList.add("item");
        img.src = url;
        img.alt = `image`;
        wrapperImg.append(img);
    }

    const keyApi = 'Z4nmB-geayXkZ7-2ACmKiCOpPcB1IUv_tjSs-G1AlzE'; // ключ от Unsplash
    const url = `https://api.unsplash.com/search/photos?query=panda&per_page=21&orientation=landscape&client_id=${keyApi}`

    // функция отправки запроса
    async function getData(url) {
        const res = await fetch(url);
        if(!res.ok) {
            console.log('403 - Too many request');
            throw new Error(`status-${res.status}`);
        }
        const data = await res.json();
        const arr = data.results;
        arr.forEach((item) => {
            const urlImg = item.urls.regular;
            createImg(urlImg);
        })
        // перебираем массив картинок и при нажатии на картинку открываем функцию создания модального окна - картинки
        const images = document.querySelectorAll('.item');
        images.forEach((item) => {
        item.addEventListener('click', (e) => {
            const srcImg = e.target.src;
            openImg(srcImg);
        })
    })
    }
    getData(url);

    searchBtn.addEventListener('click', searchImg);

    // функция - какой запрос отправляем и очищаем старую галлерею
    function searchImg() {
        const value = searchInput.value;
        const currUrl = `https://api.unsplash.com/search/photos?query=${value}&per_page=21&orientation=landscape&client_id=${keyApi}`;
        wrapperImg.innerHTML = "";
        getData(currUrl);
    }

    // при нажатии на enter отправляется запроос
    searchInput.addEventListener('keydown', (e) =>{
		if (e.code === "Enter" && searchInput.value.length !== 0) {
			searchImg();
		};
	})

    // крестик появляется если есть значение в инпуте
    searchInput.addEventListener('input', () => {
        if(searchInput.value.length > 0) {
            close.style.display = 'block';
        } else if (searchInput.value.length === 0) {
            close.style.display = 'none';
        }
    })

    // функция очиски значения при нажатии на крестик в инпуте
    function clearValue() {
        searchInput.value = '';
        close.style.display = 'none';
    }
    close.addEventListener('click', clearValue);
    
    // функция смены на стиль светлый
    function changeMoon() {
        document.querySelector('body').style.backgroundColor = 'white';
        document.querySelector('.header__icon').style.filter = 'invert(0)';
        document.querySelector('.header__title').style.color = 'black';
        document.querySelector('.github').style.filter = 'invert(0)';
        document.querySelector('.github__name').style.color = 'black';
        sun.style.display = 'none';
        moon.style.display = 'block';
    }

    // функция смены на стиль темный
    function changeSun() {
        document.querySelector('body').style.backgroundColor = 'black';
        document.querySelector('.header__icon').style.filter = 'invert(1)';
        document.querySelector('.github').style.filter = 'invert(1)';
        document.querySelector('.header__title').style.color = 'white';
        document.querySelector('.github__name').style.color = 'white';
        moon.style.display = 'none';
        sun.style.display = 'block';
    }

    sun.addEventListener('click', changeMoon);
    moon.addEventListener('click', changeSun);

    const overlay = document.querySelector('.overlay');

    // функция создания модального окна - картинки и собия его закрытия
    function openImg(src) {
        const divCard = document.createElement("div");
        divCard.classList.add("item__img");
        divCard.innerHTML = `<div class="item__img">
                         <img src="icons/cross.svg" alt="cross" class="croos__img">
                            <img src="${src}" alt="image" class="modal__img">
                        </div>`;
        divCard.style.zIndex = '1000';
        document.querySelector('body').append(divCard);
        document.querySelector('body').style.overflow = "hidden";
        overlay.style.display = 'block';

        const close = document.querySelector('.croos__img');
        close.addEventListener('click', (e) => {
            if (e.target === close) {
                closeImg(divCard);
            }
        })
        document.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeImg(divCard);
            }
        })
        document.addEventListener('keydown', (e) =>{
            if (e.code === "Escape") {
                closeImg(divCard);
            };
        })
    }

    // функция удаления модального окна - картинки
    function closeImg(card) {
        card.remove();
        document.querySelector('body').style.overflow = "visible";
        overlay.style.display = 'none';
    }
})