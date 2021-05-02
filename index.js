


   //CONTAINER

    let container= document.createElement('div');
    container.setAttribute('class','container-fluid');
    container.setAttribute('id','containerID')

    document.body.append(container)


//form-CONTAINER
let formContainer = document.createElement('div');
formContainer.setAttribute('class','container');
container.append(formContainer)



//CREATING FORM

let formTag = document.createElement('form')
formTag.setAttribute('id','form')


formTag.innerHTML='<div  class="input-group input-group-lg ml-3 mr-3" id="grp"><input type="text" name="searchBox" class="form-control" id="search"><button id="btn-submit" type="submit" class="btn btn-lg btn-outline-info pb-2"><i class="fa fa-search"></i></button> <input type="button" value="Show All" class="showAll ml-2 btn btn-lg btn-info" onclick="getAll()"></div>';




//APPENDING

formContainer.append(formTag)


//LASTUPDATE

let lastUpdate = document.createElement('div');
lastUpdate.setAttribute('class','m-2 row justify-content-center justify-content-lg-end  text-center')
async function getLastUpdate(){
  lastUpdate.innerHTML='<div class="s-loader text-center" >Loading...</div>'
    let res1 = await fetch('https://webscrapping-mobile.herokuapp.com/lastUpdate');
    let res2 = await res1.json();
    lastUpdate.innerHTML=`<div class="col-lg-4 h6" style="color:black">Last Updated On ${res2[0].lastUpdate}</div>`;
}
getLastUpdate();
formContainer.append(lastUpdate);


//CREATING CARD
let inputGroup = document.getElementById('grp');


let card = document.createElement('div');
card.setAttribute('class','card optionList col-12');
card.setAttribute('style','display:none;')
inputGroup.append(card);


//optionBar
let optionBar = document.createElement('ul');
optionBar.setAttribute('class','list-group list-group-flush');
optionBar.setAttribute('id','options')
card.append(optionBar)








//CREATING PRICE CARD

let row = document.createElement('div');
row.setAttribute('class','row justify-content-around');
container.append(row);




//GETALL

async function getAll(){
getLastUpdate();

 row.innerHTML='<div class="loader" style="margin-top:25vh"></div>'
  let res1 = await fetch(`https://webscrapping-mobile.herokuapp.com/showAll`);
  let res2 = await res1.json();
  console.log(res2);
  createCard(res2)

}







let searchBar = document.getElementById("search");

var liFlag=0;
searchBar.addEventListener("input",async function(){


  // if(liFlag){
  //   $(".optionList").remove()
  //   liFlag=0;
  // }

  card.setAttribute('style','display:block')


let data = this.value
console.log('flager');






if(data){
    


    const res1 = await fetch(`https://webscrapping-mobile.herokuapp.com/search?term=${this.value}`);
    const res2 = await res1.json();
   
    
       let matches = res2.filter(state => {
           const regex = new RegExp(`^${this.value}`,'gi');
           return state.title.match(regex)
       })

   
    optionBar.innerHTML='';    
    console.log(matches);
   
    if(this.value.length===0){
        console.log('hi');
        optionBar.innerHTML=''; 
    }


  else{
    for(i=0;i<matches.length;i++){
        liFlag=1
        optionBar.innerHTML+=`<li class='list-group-item'>${matches[i].title}</li>`;    
 } 

 

let newName;




optionBar.addEventListener("click",function(e){
   
    newName = e.path[0].innerText
    searchBar.value = newName
 
      optionBar.innerHTML=''; 

  card.setAttribute('style','display:none')
           
})

  }
 
}

})
let flag=0

document.getElementById('form').addEventListener('submit',async function(e){
   e.preventDefault()
if(searchBar.value){


  getLastUpdate();

  row.innerHTML='<div class="loader" style="margin-top:25vh"></div>'
  
  let res1 = await fetch('https://webscrapping-mobile.herokuapp.com/searchmobile',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({searchBox:searchBar.value})
  })
  let res2 = await res1.json()
console.log(res2);
if(flag){
  $(".phone").remove()
}
console.log(searchBar.value);

createCard(res2)
}



})




function createCard(data){
 
   row.innerHTML=''
  console.log("ji",data);
  let infoColor;

  for(i=0;i<data.length;i++){
   flag=1;
  
    //card
    let card = document.createElement('div');
    card.setAttribute('class','card col-lg-3 pl-0 pr-0 m-2  phone ')
    card.setAttribute('style','width: 25remrem;');
    row.append(card);
  
    //card header
  
    let cardHeader = document.createElement('div');
    cardHeader.setAttribute('class','card-header pl-0 pr-0 text-center ')
  
    if(data[i].storeName==='Flipkart'){
      card.setAttribute('style','border:2px solid #2874F0');
      cardHeader.setAttribute('id','flipkart')
      infoColor="#2874F0"  
    }
  
    else if(data[i].storeName==='Amazon'){
      card.setAttribute('style','border:2px solid #232F3E');
  
      cardHeader.setAttribute('id','amazon')
      infoColor="#232F3E"
  
    }
  
    else{
      card.setAttribute('style','border:2px solid #E40046');  
      cardHeader.setAttribute('id','snapdeal')
      infoColor="#E40046"
    
    }
 
    cardHeader.innerHTML = data[i].storeName;
    card.append(cardHeader)
  
  
    //card image
  
    let cardImg = document.createElement('img');
    cardImg.setAttribute('class','card-img-top mx-auto d-block pt-2');
    cardImg.setAttribute('src',data[i].image);
    cardImg.setAttribute('style','width:101px;height:200px')
    card.append(cardImg);
  
    //BODY
  
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class','card-body pl-0 pr-0');
    cardBody.innerHTML =` <h5 class="card-title pl-2 pr-2 " style="height:100px">${data[i].title}</h5>
       
        <div class="d-flex justify-content-between text-center">
      <div href="#" style='background-color:${infoColor};color:white;border: 1.5px solid ${infoColor} ;width:25%;border-radius:11px'class="ml-2">Rating: ${data[i].rating}</div>
       
       <div href="#" style='background-color:${infoColor};color:white;border: 1.5px solid ${infoColor} ;width:45%;border-radius:11px'class="mr-2">Price: ${data[i].finalPrice}</div>
    </div>`;
  
    card.append(cardBody);
     
    
  
  }
}



