var solo, solo_image, solo_invis;
var jogador, jogador_image, jogador_stop;
var dinheiro, dinheiro_image, obstaculo, obstaculo_image;
var dinheiro$, moneydie_image;
var sorteio;
var grupoDinheiro, grupoObstaculo;
var etapaJogo, JOGAR, INICIO;
var pontuacao = 0, pontuacao2 = 0;
var pergunta1, pergunta2, pergunta3, pergunta4, p1_image, p2_image, p3_image, p4_image;
var sim, nao;

function preload(){
  jogador_image = loadAnimation('download (1).png', 'download-2.png', 'download-3.png');
  solo_image = loadImage('ground2.png');
  dinheiro_image = loadImage('bau.png');
  obstaculo_image = loadImage('obstaculo.png');
  moneydie_image = loadImage('money die.png');
  p1_image = loadImage('pergunta1.png');
  p2_image = loadImage('pergunta2.png');
  p3_image = loadImage('pergunta3.png');
  p4_image = loadImage('pergunta4.png');
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  solo = createSprite(width - 500, height - 50, 20, 20);
  solo.addImage('solo_image', solo_image);
  solo_invis = createSprite(width - width + 100, height - 15, 800, 10);
  solo_invis.visible = false;
  jogador = createSprite(width - width + 100, height - 75, 35, 80);
  jogador.addAnimation('jogador_image', jogador_image);
  
  pergunta1 = createSprite(width/2, height/2, 20, 20);
  pergunta1.visible = false;
  pergunta1.scale = 0.3;
  
  sim = createSprite(width/2, height/2 + 100, 20, 20);
  nao = createSprite(width/2 + 20, height /2 + 100, 20, 20);
  sim.shapeColor = 'green';
  nao.shapeColor = 'red';
  sim.visible = false;
  nao.visible = false;
  
  JOGAR = 1;
  INICIO = 0;
  etapaJogo = INICIO;
  
  //grupos
  grupoObstaculo = new Group();
  grupoDinheiro = new Group();
}

function draw(){
  background("white");
  jogador.collide(solo_invis);
  solo.velocityX = -(3 + pontuacao2/100);
  if(solo.x < solo.width/5) {
    solo.x = solo.width/2;
  }
  if(jogador.isTouching(grupoDinheiro)) {
    pontuacao += 200000;
    grupoDinheiro.destroyEach();
  }
  if(jogador.isTouching(grupoObstaculo)) {
    etapaJogo = JOGAR;
  }
  if(etapaJogo === JOGAR) {
    jogar();
  }
  if(keyDown('space') && jogador.y > height - 100) {
    jogador.velocityY = -10 ;
  }
  pontuacao2 = pontuacao2+ (Math.round(frameRate()/60));
  if(mousePressedOver(sim) && etapaJogo === JOGAR) {
    solo.velocityX = -(2 + pontuacao2/100);
    grupoObstaculo.setLifetimeEach(width/ obstaculo.velocityX);
    grupoDinheiro.setLifetimeEach(width/ dinheiro.velocityX);
    dinheiro$.lifetime = width/ dinheiro$.velocityX;
    jogador.visible = true;
    sim.visible = false;
    nao.visible = false;
    pergunta1.visible = false;
    etapaJogo = INICIO;
    pontuacao2 = 0;
  }
  if(mousePressedOver(nao) && etapaJogo === JOGAR) {
    reset();
    etapaJogo = INICIO;
  }
  
  //gravidade
  jogador.velocityY += 0.4;
  
  money();
  perda$();
  moneyDie();
  drawSprites();
  
  fill('black');
  textSize(20);
  text('R$ '+ pontuacao, width - width + 80, height - 700);
}
function money() {
  if(frameCount% 200 === 0) {
    dinheiro = createSprite( width + 10, height - 50, 20, 20);
    dinheiro.velocityX = -(3 + pontuacao2/100);
    dinheiro.addImage('money_image', dinheiro_image);
    dinheiro.scale = 0.3;
    dinheiro.lifetime = width/ dinheiro.velocityX;
    grupoDinheiro.add(dinheiro);
  }
}
function perda$() {
  if(frameCount% 250 === 0) {
    obstaculo = createSprite(width + 20, height - 50, 20, 20);
    obstaculo.addImage('obs_image', obstaculo_image);
    obstaculo.velocityX = -(3 + pontuacao2/100);
    obstaculo.lifetime = width/ obstaculo.velocityX;
    obstaculo.scale = 0.4;
    grupoObstaculo.add(obstaculo);
  }
}
function moneyDie() {
  if(frameCount% 50 === 0) {
    dinheiro$ = createSprite(width - width - 10, Math.round(random(height - 770, height - 150), 20, 20));
    dinheiro$.addImage('moneydie', moneydie_image);
    dinheiro$.velocityX = (4 + pontuacao2/100)
    dinheiro$.scale = 0.1;
    dinheiro$.lifetime = width/ dinheiro$.velocityX;
    }
}
function jogar() {
  sorteio = Math.round(random(1, 4));
  switch(sorteio) {
    case 1: pergunta1.addImage('p1', p1_image);
      break;
    case 2: pergunta1.addImage('p2', p2_image);
      break;
    case 3: pergunta1.addImage('p3', p3_image);
      break;
    case 4: pergunta1.addImage('p4', p4_image);
      break;
  }
  sim.visible = true;
  nao.visible = true;
  pergunta1.visible = true;
  solo.velocityX = 0;
  grupoDinheiro.destroyEach();
  grupoDinheiro.setLifetimeEach(-1);
  grupoObstaculo.destroyEach();
  grupoObstaculo.setLifetimeEach(-1);
  jogador.visible = false;
  dinheiro$.destroy();
  dinheiro$.lifetime = -1;
}
function reset() {
  pontuacao2 = 0;
  pontuacao = 0;
  jogador.visible = true;
  sim.visible = false;
  nao.visible = false;
  pergunta1.visible = false;
}