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

const currentWord=[];
const word=['C','H','L','E','B'];


const fromMenuToGame=function(){
  header.style.top='0';
  menu.classList.add('hidden');

  main.style.display='flex';
  viev.style.display='flex';
  game.classList.remove("hidden");

};
const wordToHtml = function(){
  for(el of word){
    currentWord.push('_');
  
    vievText.textContent+=`${currentWord[el.indexOf(el)]} `;
    console.log(el);
  }
};
const checkTheGame= function(callback){
  letterButtons.forEach((el)=>{
  el.addEventListener('click',function(){
    el.classList.add('hidden');
    let a=0;
    word.forEach((arr,i)=>{
      if(el.value==arr){
        currentWord[i]=arr;
        if(word.join(' ')==currentWord.join(' ')){
        callback();
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
const afterGameEnd=function(){

 game.style.display='none';
  restetBtn.style.display='block';
  goBackBtn.style.display='block';
  endMenu.classList.remove('hidden');
}
menuBtn.addEventListener('click',()=>{
  fromMenuToGame();
  wordToHtml();
  checkTheGame(afterGameEnd);
},false)
