
let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// Objeto que guarda infos da img - [Fundo]
const background= {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

    // Função que desenha a img na tela
    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height)

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
    },
};

// Objeto [...] - [Chão]
function criaChao() {
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
function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if(flappyBirdY >= chaoY) {
    return true;
  }

  return false;
}

// Objeto [...] - [Pássaro]
function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      console.log('devo pular');
      console.log('[antes]', flappyBird.velocidade);
      flappyBird.velocidade =  - flappyBird.pulo;
      console.log('[depois]', flappyBird.velocidade);
    },
    gravidade: 0.25,
    velocidade: 0,
    
    // Função que atualiza antes de rodar
        atualiza() {
          if(fazColisao(flappyBird, globais.chao)) {
            console.log('Fez colisao');
            som_HIT.play();
    
            setTimeout(() => {
              mudaParaTela(Telas.INICIO);
            }, 500);
            return;
          }
      
          flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
          flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
          { spriteX: 0, spriteY: 0, }, // asa pra cima
          { spriteX: 0, spriteY: 26, }, // asa no meio 
          { spriteX: 0, spriteY: 52, }, // asa pra baixo
          { spriteX: 0, spriteY: 26, }, // asa no meio 
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
        desenha() {
          flappyBird.atualizaOFrameAtual();
          const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
    
          contexto.drawImage(
            sprites,
            spriteX, spriteY, // Sprite X, Sprite Y
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
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

// Objeto [...] - [Cria Canos]
function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenha() {
      canos.pares.forEach(function(par) {
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;
  
        const canoCeuX = par.x;
        const canoCeuY = yRandom; 

        // [Cano do Céu]
        contexto.drawImage(
          sprites, 
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
        )
        
        // [Cano do Chão]
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; 
        contexto.drawImage(
          sprites, 
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        )

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },
    temColisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
      
      if(globais.flappyBird.x >= par.x) {
        if(cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }

        if(peDoFlappy >= par.canoChao.y) {
          return true;
        }
      }
      return false;
    },
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if(passou100Frames) {
        console.log('Passou 100 frames');
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }


             //pula 2 px cada vez que desenha os canos - p/ não sobrepor
             canos.pares.forEach(function(par) {
              par.x = par.x - 2;
      
              if(canos.temColisaoComOFlappyBird(par)) {
                console.log('Você perdeu!')
                mudaParaTela(Telas.INICIO);
              }
      
              if(par.x + canos.largura <= 0) {
                canos.pares.shift();
              }
            });
      
          }
        }
      
        return canos;
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
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
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
    globais.canos.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
  },
  click() {
    globais.flappyBird.pula();
  },
  atualiza() {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.flappyBird.atualiza();
  }
};

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}


window.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(Telas.INICIO);
loop();