const modalManager = () => {
    // Подключение объектов
    const modal = document.querySelector('.modal')
    const modalClose = document.querySelector('.modal__close')
    const buttonBuy = document.querySelectorAll('.button_buy')
    // Обработчик событий для кнопок
    buttonBuy.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex'
            document.body.style.overflow  = 'hidden'
        })
    })
    // Обработчик событий для окна
    modalClose.addEventListener('click', (event) => {
        if (event.target === modal || evetn.target === modalClose) {
            modal.style.display = 'none'
            document.body.style.overflow  = ''
        }
    })
}

const tabs = () => {
    // Подключение объектов
    const cardDetailChange = document.querySelectorAll('.card-detail__change')
    const cardDetailsTitles = document.querySelectorAll('.card-details__title')
    const cardImage = document.querySelectorAll('.card__image')
    // Функция для закрытия 
    const hideAll = () => {
        cardDetailChange.forEach(item => item.classList.remove('active'))
        cardDetailsTitles.forEach(item => item.classList.remove('active'))
        cardImage.forEach(item => item.classList.remove('active'))
    }
    // 
    for(let i = 0; i < cardDetailChange.length; i += 1) {
        cardDetailChange[i].addEventListener('click', () =>{
            hideAll()
            cardDetailChange[i].classList.add('active')
            cardDetailsTitles[i].classList.add('active')
            cardImage[i].classList.add('active')

        })
    }
}

const accordion = () => {
    const characteristicsTitle = document.querySelectorAll('.characteristics__title')
    const characteristicsDescription = document.querySelectorAll('.characteristics__description')

    const hideAll = () => {
        characteristicsTitle.forEach(item => item.classList.remove('active'))
        characteristicsDescription.forEach(item => item.style.height = '')
    }

    const open = (index) => {
        hideAll()
        characteristicsDescription[index].style.height = `${characteristicsDescription[index].scrollHeight}px`
        characteristicsTitle[index].classList.add('active')
    }

    for (let i = 0; i < characteristicsTitle.length; i++) {
        characteristicsTitle[i].addEventListener("click", () => {
            characteristicsTitle[i].classList.contains('active') ? hideAll() : open(i)
        })
    }

}

const getData = async (url) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Ошибка по адресу url')
    } else {
        return await response.json()
    }
}

const renderCrossSell = () => {
    const crossSellList = document.querySelector('.cross-sell__list')
    const createCardGood = (good) => {
        const cardGood = document.createElement('li')
        cardGood.innerHTML = `
        <article class="cross-sell__item">
            <img class="cross-sell__image" src=${good.photo} alt="">
            <h3 class="cross-sell__title">${good.name}</h3>
            <p class="cross-sell__price">${good.price}₽</p>
            <div class="button button_buy cross-sell__button">Купить</div>
        </article>
        `
        crossSellList.append(cardGood)
    }
    getData("../cross-sell-dbase/dbase.json")
        .then((goods) => {
            goods.forEach((good) => {
                console.log(good)
                createCardGood(good)
            })
        })
}

modalManager()
tabs()
accordion()
renderCrossSell()
// Массивы, объекты, события