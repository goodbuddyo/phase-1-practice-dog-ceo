//console.log('%c HI','color: firebrick')

const init=() => {

  // puppy images
  async function getPuppyImgs() {
    let url='https://dog.ceo/api/breeds/image/random/4';
    try {
      let res=await fetch(url);
      return await res.json();
    } catch(error) {
      console.log(error);
    }
  }

  async function renderPuppyImgs() {
    let puppies=await getPuppyImgs();  //console.log(puppies.message[0])
    const array1=puppies.message;  //console.log(array1)
    let html='';
    for(const element of array1) {    //console.log(element);
      let htmlSegment=`<span class="puppy"> <img src="${element}" >
                        </span>`;
      html+=htmlSegment;
    }
    let container=document.querySelector('#dog-image-container');
    container.innerHTML=html;
  }
  renderPuppyImgs();
}

// puppy breeds
async function getPuppyBreeds() {
  const url='https://dog.ceo/api/breeds/list/all';
  try {
    let res=await fetch(url);
    return await res.json();
  } catch(error) {
    console.log(error);
  }
}

async function renderPuppyBreeds() {
  let puppies=await getPuppyBreeds();  //console.log(puppies.message)
  const array1=puppies.message;  //console.log(array1)
  let html='';
  let htmlSegment;
  for(const element in array1) {  //console.log(element);
    htmlSegment=`<li class="puppybreed"><span class="puppyspan">${element}</span></li> `
    html+=htmlSegment;
  }

  let container=document.querySelector('#dog-breeds');
  container.innerHTML=html;
  const ul=document.getElementById("dog-breeds");
  ul.addEventListener("click",hide,false);

  function hide(evt) {
    // evt.target refers to the clicked <li> element
    evt.target.style.color="red";
  }

}

renderPuppyBreeds();

/* 
{  "message": {
    "affenpinscher": [],
    // about 90 breeds note terrier has array of 23 types
 ...
    "terrier": ["american", "australian", "bedlington", "border", "cairn", "dandie", "fox", "... "westhighland", "wheaten", "yorkshire"],
    "whippet": [],
    "wolfhound": ["irish"]
  },
  "status": "success"
}  
//!!!  good fetch tutorial https://www.javascripttutorial.net/javascript-fetch-api/ 
{  "message": [
   "https:\/\/images.dog.ceo\/breeds\/terrier-bedlington\/n02093647_1338.jpg",
   "https:\/\/images.dog.ceo\/breeds\/terrier-yorkshire\/n02094433_1490.jpg",
   "status": "success"
}   
*/

document.addEventListener("DOMContentLoaded",init)
