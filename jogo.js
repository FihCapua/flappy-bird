
let frames = 0;

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// Objeto que guarda infos da img - [Fundo]
const background= {
    spriteX : 390,
    spriteY : 0,
    largura : 275,
    altura : 204,
    x : 0,
    y : 204,

    // Função que desenha a img na tela
    desenha(){
        contexto.fillStyle = "#70c5ce";
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY, //sprite x e sprite y - define altura na img.
            background.largura, background.altura, //tamanho recorte na sprite - altura e largura.
            background.x, background.y, //em que posição a imagem vai aparecer na tela.
            background.largura, background.altura, //tamanho do recorte na sprite dentro do canvas.
        );

        // Desenha outra parte do fundo
        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY, //sprite x e sprite y - define altura na img [...]
            background.largura, background.altura, 
            (background.x + background.largura), background.y, 
            background.largura, background.altura, 
        );
    }
}

// Objeto [...] - [Chão]
function criaChao(){
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,

        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;

            //console.log('[chao.x]', chao.x);
            //console.log('[repeteEm]',repeteEm);
            //console.log('[movimentacao]',movimentacao % repeteEm);

            chao.x = movimentacao % repeteEm;
        },    
    
        // Função que desenha a img na tela
        desenha() {
            contexto.drawImage(
              sprites,
              chao.spriteX, chao.spriteY,
              chao.largura, chao.altura,
              chao.x, chao.y,
              chao.largura, chao.altura,
            );
            
            // Desenha uma outra parte do chão p/ completar
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
              );
            },
          };
          return chao;
}


//passaro faz colisão c/ o chão
function fazColisao(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY){
        return true;
    }
    return false;
}

// Objeto [...] - [Pássaro]
function criaFlappyBird(){
    const flappyBird = {
        spriteX : 0,
        spriteY : 0,
        largura : 33,
        altura : 24,
        x : 10,
        y : 50,
        pulo : 4.6,
        pula(){
            flappyBird.velocidade = - flappyBird.pulo;
        },
        gravidade : 0.25,
        velocidade : 0,
    
        // Função que atualiza antes de rodar
        atualiza(){
            if(fazColisao(flappyBird, globais.chao)){
                console.log('fez colisão');
                
                som_HIT.play(); //som quando o pássaro cai
                
                // tempo de delay entre o final de um jogo e a tela inicial
                setTimeout(() =>{
                    mudaParaTela(Telas.INICIO);
                }, 500);

                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },

        movimentos:[
            {spriteX: 0, spriteY: 0,}, //img asa pra cima
            {spriteX: 0, spriteY: 26,}, //img asa do meio
            {spriteX: 0, spriteY: 52,}, //img asa pra baixo
            {spriteX: 0, spriteY: 26,}, //img asa do meio
        ],

        //passarinho bate as asas
        frameAtual: 0,
            atualizaOFrameAtual() {     
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            // console.log('passouOIntervalo', passouOIntervalo)

            if(passouOIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao
            }
                // console.log('[incremento]', incremento);
                // console.log('[baseRepeticao]',baseRepeticao);
                // console.log('[frame]', incremento % baseRepeticao);
            },
        
        // Função que desenha a img na tela
        desenha(){
            flappyBird.atualizaOFrameAtual();
            const {spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
                sprites,
                spriteX, spriteY, //sprite x e sprite y - define altura na img.[...]
                flappyBird.largura, flappyBird.altura, 
                flappyBird.x, flappyBird.y, 
                flappyBird.largura, flappyBird.altura, 
            );
        }
    }

    return flappyBird;
}

// Objeto [...] - [Tela Inicial]
const msgGetReady = {
    sX : 134,
    sY : 0,
    w : 174,
    h : 152,
    x : (canvas.width / 2) - 174 / 2,
    y : 50,
    
        desenha(){
        contexto.drawImage(
            sprites,
            msgGetReady.sX, msgGetReady.sY,
            msgGetReady.w, msgGetReady.h,
            msgGetReady.x, msgGetReady.y,
            msgGetReady.w, msgGetReady.h,
        );
    }
}

// [Telas]

const globais = {}; // acessa tudo que for global, que se queira acessar na(s) tela(s)
let telaAtiva = {};

function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if(telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}


const Telas = {
    INICIO : {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
          },
          desenha() {
            background.desenha();
            globais.flappyBird.desenha();
            
            globais.chao.desenha();
            msgGetReady.desenha();
          },
          click() {
            mudaParaTela(Telas.JOGO);
          },
          atualiza() {
            globais.chao.atualiza();
          }
        }
};

Telas.JOGO = {
    desenha() {
      background.desenha();
      globais.chao.desenha();
      globais.flappyBird.desenha();
    },
    click() {
      globais.flappyBird.pula();
    },
    atualiza() {
      globais.chao.atualiza();
      globais.flappyBird.atualiza();
    }
  };

function loop(){

    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if (telaAtiva.click){
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();