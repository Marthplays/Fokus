const html = document.querySelector('html');
const focoButton = document.querySelector('.app__card-button--foco');
const curtoButton = document.querySelector('.app__card-button--curto');
const longoButton = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseButton = document.querySelector('#start-pause');
const musicaFoco = document.querySelector('#alternar-musica');
const iniciarOuPausarButton = document.querySelector('#start-pause span');
const imgButton = document.querySelector('.app__card-primary-butto-icon');
const tempoTela = document.getElementById('timer');

const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPausar = new Audio('./sons/pause.mp3');
const audioIniciar = new Audio('./sons/play.wav');
const audioFinalizar = new Audio('./sons/beep.mp3');

musica.loop = true

let tempoDecorrido = 1500;
let intervaloID = null;

musicaFoco.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoButton.addEventListener('click', () => {
    tempoDecorrido = 1500;
    alterarContexto('foco');
    focoButton.classList.add('active');
});

curtoButton.addEventListener('click', () => {
    tempoDecorrido = 300;
    alterarContexto('descanso-curto');
    curtoButton.classList.add('active');
});

longoButton.addEventListener('click', () => {
    tempoDecorrido = 900;
    alterarContexto('descanso-longo');
    longoButton.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = 
            `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = 
            `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = 
            `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
};

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0){
        audioFinalizar.play();
        alert('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('focoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar()
        return
    }
    tempoDecorrido--;
    mostrarTempo();
}

startPauseButton.addEventListener('click', iniciar);

function iniciar() {
    if(intervaloID){
        audioPausar.play();
        zerar()
        return
    }
    audioIniciar.play();
    intervaloID = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarButton.textContent = "Pausar";
    imgButton.src = '/imagens/pause.png'; 
}

function zerar() {
    clearInterval(intervaloID) 
    iniciarOuPausarButton.textContent = "Começar";
    imgButton.src = '/imagens/play_arrow.png'; 
    intervaloID = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
    tempoTela.innerHTML = `${tempoFormatado}`
}