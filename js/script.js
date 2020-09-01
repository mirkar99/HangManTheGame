const header = document.querySelector('.header');
//Menu Section
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu__button');
//Main Element
const main = document.querySelector('.main');
const imgPanel =[...document.querySelectorAll('.panel__img')];
const vievText  = document.querySelector('.viev__text');
const gameText = document.querySelector('.game__text');
const letterButtons=[...document.querySelectorAll('.game__button')];
//EndMenu section
const endMenu = document.querySelector('.endMenu');
const restetBtn=document.querySelector('.endMenu__button--reset');
const goBackBtn=document.querySelector('.endMenu__button--goBack');
//Elemets to game work
const wordBase=[['H','A','P','P','Y'],['B','R','E','A','D'],['R','O','O','M'],['G','I','F','T']];
const currentWord=[];
const word=[];

//Change section elements
const changeMenuSection=function(headerTop){
  header.style.top=headerTop;
  menu.classList.toggle('hidden');
 
}; // string
const changeGameSection=function(removeClassHidden){
  main.classList.add("hidden");
  imgPanel.forEach((el,i)=>{
    if(i>0){
      el.classList.add('hidden');
    }
  })
  letterButtons.forEach((el)=>{
    if(el.classList.contains('hidden')){
      el.classList.remove('hidden');
    }});
  if(removeClassHidden==true){
  main.classList.remove("hidden");
  }
};// boolen
const changeEndMenu=function(removeClassHidden){
  endMenu.classList.add('hidden');
  if(removeClassHidden==true){
  endMenu.classList.remove('hidden');
  }
};// boolen
//Game elements
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
  }
};
const startTheGame=  function(){
      let noLetter=0;
      let mistake=0;
      letterButtons.forEach((el)=>{
        el.addEventListener('click',function(){
          el.classList.add('hidden');
          word.forEach((arr,i)=>{
            if(el.value==arr){
              noLetter=null;
              currentWord[i]=arr;
              if(word.join(' ')==currentWord.join(' ')){
                    mistake=0;
                    gameText.textContent='You Won'
                    gameText.style.color='green';
                    whenGamesEnds();
              }
            }else{
                if(noLetter!==null){
                noLetter++;
                }
                if(noLetter==word.length){
                  mistake+=1;
                 if(mistake==1){
                  imgPanel[1].classList.remove('hidden');
                 }else if(mistake==2){
                  imgPanel[2].classList.remove('hidden');
                 }else if(mistake==3){
                  imgPanel[3].classList.remove('hidden');
                }else if(mistake==4){
                  imgPanel[4].classList.remove('hidden');
                }else if(mistake==5){
                  imgPanel[5].classList.remove('hidden');
                }else if(mistake==6){
                  imgPanel[6].classList.remove('hidden');
                }else if(mistake==7){
                  imgPanel[7].classList.remove('hidden');
                }else if(mistake==8){
                  imgPanel[8].classList.remove('hidden');
                  mistake=0;
                  gameText.textContent='You Lose'
                  gameText.style.color='red';
                  whenGamesEnds();
                }
              }
            }
          });
          noLetter=0;
          vievText.textContent=`${currentWord.join(' ')} `;
        });
        });
};
const whenGamesEnds=function(){
  letterButtons.forEach((el)=>{
      el.classList.add('hidden');
    });
  gameText.classList.remove('hidden');
  setTimeout(()=>{
    changeGameSection()
    changeEndMenu(true);
    gameText.classList.add('hidden');
  },2000)
};
//Button's functions
const whenMenuBtnClicked=  function(){
  changeMenuSection('0'); 
  changeGameSection(true); 
  wordToHtml();
};
const whenResetBtnClicked=  function(){
  changeEndMenu(false); 
  changeGameSection(true); 
  wordToHtml();
};
const whenGoBackBtnClicked = function(){
  changeEndMenu(); 
  changeMenuSection('40%'); 
  changeGameSection();
};

startTheGame();
//Button's with events and  functions
menuBtn.addEventListener('click',()=>{
  whenMenuBtnClicked();
},false)
restetBtn.addEventListener('click',()=>{
  whenResetBtnClicked();
},false)
goBackBtn.addEventListener('click',()=>{
  whenGoBackBtnClicked();
},false)

