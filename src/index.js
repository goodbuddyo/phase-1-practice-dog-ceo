
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
    let bDropDown=0,html='',htmlSegment,arrOfBreeds=[];
    for(const element in array1) {
      //console.log(element);
      arrOfBreeds.push(element);

      //const map1=arrOfBreeds.map(x => x*2);
      //console.log(map1);
      ///////////////////////////////////////////////////////

      // need to work on filter, look into using .map()

      htmlSegment=`<li class="puppybreed"><span class="puppyspan">${element}</span></li> `
      html+=htmlSegment;

      const selectElement=document.querySelector("#breed-dropdown");

      selectElement.addEventListener("change",(event) => {
        bDropDown=1;
        let targetValue=event.target.value
        handleDogFilter(targetValue,arrOfBreeds)
        //console.log(event.target.value)
        //const result=document.querySelector(".result");
        //result.textContent=`You like ${event.target.value}`;
      });
      //for(const breed in arrOfBreeds) {
      //  console.log(breed);
      //}

      function filterItems(query,arr) {
        return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
      }

      function handleDogFilter(query,arr) {
        if(bDropDown) {
          //console.log(query)
          //console.log(arr)
          function firstN(item) {
            return item.toLowerCase().indexOf(query)===0;
          }
          let startsWithN=arr.filter(firstN);
          //console.log(startsWithN)
        }

      }

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
}
document.addEventListener("DOMContentLoaded",init)
