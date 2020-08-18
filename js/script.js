const header = document.querySelector('.header');

const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu__button');

const game = document.querySelector('.game');
const main = document.querySelector('.main');
const viev  = document.querySelector('.viev');
const vievText  = document.querySelector('.viev__text');
const letterButtons=[...document.querySelectorAll('.main__button')];

const endMenu = document.querySelector('.endMenu');
const restetBtn=document.querySelector('.endMenu__button--reset');
const goBackBtn=document.querySelector('.endMenu__button--goBack');

const wordBase=[['C','H','L','E','B'],['L','I','Z','A','K'],['B','U','L','K','A'],['K','E','B','A','B']];
const currentWord=[];
const word=[];


const changeMenuSection=function(a){
  header.style.top=a;
  menu.classList.toggle('hidden');
 
};
const changeGameSection=function(a,b,c,d){
  game.classList.add("hidden");
  main.style.display=a;
  viev.style.display=a;
  game.style.display=b;
  game.style.height=c;
  letterButtons.forEach((el)=>{
    if(el.classList.contains('hidden')){
      el.classList.remove('hidden');
    }});
  if(d==true){
  game.classList.remove("hidden");
  }
}
const changeEndMenu=function(a,b){
  restetBtn.style.display=a;
  goBackBtn.style.display=a;
  endMenu.classList.add('hidden');
  if(b==true){
  endMenu.classList.remove('hidden');
}}

const wordToHtml = function(){
  word.splice(0,word.length)
  let random = Math.floor(Math.random() * wordBase.length);
  wordBase[random].forEach((el,i)=>{
    word.push(el);
  })
  currentWord.splice(0,currentWord.length)
  vievText.textContent='';
  for(el of word){
    currentWord.push('_');
    vievText.textContent+=`${currentWord[el.indexOf(el)]} `;
    console.log(el);
  }
};
const checkTheGame= function(){
  letterButtons.forEach((el)=>{
  el.addEventListener('click',function(){
    el.classList.add('hidden');
    let a=0;
    word.forEach((arr,i)=>{
      if(el.value==arr){
        currentWord[i]=arr;
        if(word.join(' ')==currentWord.join(' ')){
          changeGameSection('none','block','0')
          changeEndMenu('block',true);
        }
      }
      else{
        a++
          if(a==word.length){
            console.log('żle');
          }
      }
    });
    vievText.textContent=`${currentWord.join(' ')} `;
  });
  });
};

menuBtn.addEventListener('click',()=>{
  changeMenuSection('0'); changeGameSection('flex','block','90vh',true); wordToHtml(); checkTheGame();
},false)
restetBtn.addEventListener('click',()=>{
  changeEndMenu('none'); changeGameSection('flex','block','90vh',true); wordToHtml(); checkTheGame();
},false)
goBackBtn.addEventListener('click',()=>{
  changeEndMenu('none'); changeMenuSection('40%'); changeGameSection('none','block');
},false)

