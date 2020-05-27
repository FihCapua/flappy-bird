console.log ("Flappy Bird");

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
            background.spriteX, background.spriteY, //sprite x e sprite y - define altura na img.
            background.largura, background.altura, //tamanho recorte na sprite - altura e largura.
            (background.x + background.largura), background.y, //em que posição a imagem vai aparecer na tela.
            background.largura, background.altura, //tamanho do recorte na sprite dentro do canvas.
        );
    }
}

// Objeto que guarda infos da img - [Chão]
const floor = {
    spriteX : 0,
    spriteY : 610,
    largura : 224,
    altura : 112,
    x : 0,
    y : canvas.height - 112,

    // Função que desenha a img na tela
    desenha(){
        contexto.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.largura, floor.altura,
            floor.x, floor.y,
            floor.largura, floor.altura,
        );
        
        // Desenha uma outra parte do chão p/ completar
        contexto.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.largura, floor.altura,
            (floor.x + floor.largura), floor.y,
            floor.largura, floor.altura,
        );
    }
}

// Objeto que guarda infos da img - [Pássaro]
const flappyBird = {
    spriteX : 0,
    spriteY : 0,
    largura : 33,
    altura : 24,
    x : 10,
    y : 50,
    gravidade : 0.25,
    velocidade : 0,

    // Função que atualiza antes de rodar
    atualiza(){
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    // Função que desenha a img na tela
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, //sprite x e sprite y - define altura na img.
            flappyBird.largura, flappyBird.altura, //tamanho recorte na sprite - altura e largura.
            flappyBird.x, flappyBird.y, //em que posição a imagem vai aparecer na tela.
            flappyBird.largura, flappyBird.altura, //tamanho do recorte na sprite dentro do canvas.
        );
    }
}

function loop(){
    flappyBird.atualiza();
    background.desenha();
    floor.desenha();
    flappyBird.desenha();    

    requestAnimationFrame(loop);
}

loop();