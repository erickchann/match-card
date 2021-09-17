const container = document.querySelector('.cards');

const deck = [
    'cardAK', 'cardAK',
    'cardAQ', 'cardAQ',
    'cardAJ', 'cardAJ',
    'cardBK', 'cardBK',
    'cardBQ', 'cardBQ',
    'cardBJ', 'cardBJ',	
];

window.onload = generateCard();
function generateCard() {
    let leftOffset = 0;
    let topOffset = 0;

    for (let i = 0; i < 12; i++) {
        let rand = ~~(Math.random() * deck.length);
        container.innerHTML += `<div class="card" data-card="${deck[rand]}" style="left: ${leftOffset}px; top: ${topOffset}px">
                                <div class="front"></div>
                                <div class="back ${deck[rand]}"></div>
                            </div>`;
        deck.splice(rand, 1);

        leftOffset += ~~(container.offsetWidth / 4) + ~~(((container.offsetWidth / 4) - 80) / 2.5);
        
        if (i == 3 || i == 7) {
            leftOffset = 0;
            topOffset += ~~(container.offsetWidth / 3);
        }
    }
}

const cards = document.querySelectorAll('.card');
let done = 0;
let current = {
    c1: '',
    c2: ''
};


cards.forEach((card, i) => {
    card.addEventListener('click', e => {
        if (!current.c1) {
            current.c1 = card.getAttribute('data-card');

            card.classList.add('rotate');
        } else {
            if (current.c2) return;

            current.c2 = card.getAttribute('data-card');
            
            card.classList.add('rotate');
            
            setTimeout(() => {
                check();
            }, 1000);
        }

    });
});

function check() {
    if (done == 10) alert('Win');
    
    if (current.c1 != current.c2) {
        cards.forEach((card, i) => {
            card.classList.remove('rotate');
        });
    } else {
        const remove = document.querySelectorAll(`[data-card="${current.c1}"]`);

        remove.forEach(el => {
            el.classList.add('remove');
            
           setTimeout(() => {
               el.remove();
               done++;
            }, 500);
        });
    }
    
    current.c1 = '';
    current.c2 = '';
}