let $ = document;

/////////////////////////////////responsive showMenu ////////////////////////////////////////////////////////
const menuIcon = $.querySelector(".fa-bars");
const newMenu = $.querySelector(".new-nav");

let flag = false;

menuIcon.addEventListener("click", () => {
  if (flag) {
    close();
  } else {
    open();
  }

  function open() {
    newMenu.style.display = "flex";
    flag = true;
  }
  function close() {
    newMenu.style.display = "none";
    flag = false;
  }
});

///////////////////////////////////see more for products///////////////////////////////////////////////////////
const more_span = $.querySelectorAll(".more");
const close_span_infos = $.querySelectorAll(".close-more");

more_span.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.style.display = "none";
    e.target.nextElementSibling.style.display = "block";
    e.target.nextElementSibling.nextElementSibling.style.display = "block";
  });
});
close_span_infos.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.style.display = "none";
    e.target.previousElementSibling.style.display = "none";
    e.target.previousElementSibling.previousElementSibling.style.display =
      "block";
  });
});
/////////////////////////////////////////////toggle for like ///////////////////////////////////////////////////

let like = $.querySelector('.btn2');
like.addEventListener('click',()=>{
  like.classList.toggle('pink');
  if(like.className.includes('pink')){
    localStorage.setItem('Theme','pink');
  }else{
    localStorage.setItem('Theme','white')
  }
});
window.addEventListener('load',()=>{
  let localTheme = localStorage.getItem('Theme');
  if(localTheme ==='pink'){
    like.classList.add('pink');
  }
})

///////////////////////////////////////////star color to score /////////////////////////////////////////////////

let stars = $.querySelectorAll('.score');
let firstStar = $.querySelector('.one');
let secondStar = $.querySelector('.two');
let thirdStar = $.querySelector('.three');
let fourthStar = $.querySelector('.four');
let fivesStar = $.querySelector('.five');
let btnScore;
stars.forEach((btn)=>{
  
  btn.addEventListener('click',(e)=>{
    console.log(e.target.innerHTML);
    btnScore = e.target.innerHTML;

    if(btnScore==1){
      firstStar.style.color = 'gold';
      secondStar.style.color = 'black';
      thirdStar.style.color = 'black';
      fourthStar.style.color = 'black';
      fivesStar.style.color = 'black';
    }
    if(btnScore==2){
      firstStar.style.color = 'gold';
      secondStar.style.color = 'gold';
      thirdStar.style.color = 'black';
      fourthStar.style.color = 'black';
      fivesStar.style.color = 'black';
    }
    if(btnScore==3){
      firstStar.style.color = 'gold';
      secondStar.style.color = 'gold';
      thirdStar.style.color = 'gold';
      fourthStar.style.color = 'black';
      fivesStar.style.color = 'black';
    }
    if(btnScore==4){
      firstStar.style.color = 'gold';
      secondStar.style.color = 'gold';
      thirdStar.style.color = 'gold';
      fourthStar.style.color = 'gold';
      fivesStar.style.color = 'black';
    }
    if(btnScore==5){
      firstStar.style.color = 'gold';
      secondStar.style.color = 'gold';
      thirdStar.style.color = 'gold';
      fourthStar.style.color = 'gold';
      fivesStar.style.color = 'gold';
    }
  });

});


////////////////////////////////////////////add product to basket ///////////////////////////////////////////////

let addButtons = $.querySelectorAll(".btn_add");

let array_products = [
  {
    id: 1,
    name: "Coffee",
    price: 1100,
    img: "images/coffee-brain-caffeine-neuroscincces.webp",
    count: 1,
  },
  {
    id: 2,
    name: "Cofte Tabrizi",
    price: 1500,
    img: "images/Kufteh-Tabrizi.jpg",
    count: 1,
  },
  { id: 3, name: "Berger", price: 1400, img: "images/berger.jpg", count: 1 },
  {
    id: 4,
    name: "Gheime",
    price: 1900,
    img: "images/Gheimeh-bademjan2.jpg",
    count: 1,
  },
  {
    id: 5,
    name: "Kabab koobideh",
    price: 2400,
    img: "images/kebab.jpg",
    count: 1,
  },
  {
    id: 6,
    name: "Jujeh Kebab",
    price: 2200,
    img: "images/jooje.jpg",
    count: 1,
  },
  {
    id: 7,
    name: "Ghormeh sabzi",
    price: 2500,
    img: "images/ghormeh-sabzi.jpg",
    count: 1,
  },
  {
    id: 8,
    name: "Ice cream",
    price: 1200,
    img: "images/icecream.jpg",
    count: 1,
  },
  {
    id: 9,
    name: "Fried Chicken",
    price: 1350,
    img: "images/ch2.jpg",
    count: 1,
  },
];

let product_id;
let product_obj;
let Basket_number = $.querySelector(".countBasket");


addButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {


    ///////////////solution2/////////////////
    // let arrayPrice,priceValue,productName,product_img;
    //   arrayPrice = e.target.previousElementSibling.children;
    //   priceValue = arrayPrice[1].innerText;
    //   productName = e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    //   product_img = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute('src');


    /////////////solution1(main)/////////////

    product_id = e.target.dataset.id;
    console.log(e.target);

    product_obj = array_products.find((product) => {
      return product.id == product_id;
    });

    console.log(product_obj);
    getProducts();

    
  });
});

/////////////////////////fetch api/////////////////////////////

//////////////////////method get////////////////////
let getResult;
let resultId;
let new_product_obj;


async function getProducts() {
  try {
    let result = await fetch("http://localhost:3000/posts");
    let posts = await result.json();
    console.log(posts);
    getResult = posts.find((get) => {
      return get.id === product_obj.id;
    });
    console.log(getResult);

    if (getResult) {

      resultId = getResult.id;
      new_product_obj = {
        id: getResult.id,
        name: getResult.name,
        price: getResult.price,
        img: getResult.img,
        count: getResult.count + 1,
      };
      updateArray_basket(resultId,new_product_obj);

    } else {
      postArray_basket();
    }

  } catch (err) {
    console.log("There is a Error to GET : ", err);
  }
}


//////////////////////method put/////////////////////
async function updateArray_basket(resultId,new_product_obj) {
  try {
    let res = await fetch(`http://localhost:3000/posts/${resultId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(new_product_obj),
    }).then((response) => {
      console.log(response);
    });
    console.log(res);
  } catch (err) {
    console.log("There is a Error to pUT : ", err);
  }
}
//////////////////////method post/////////////////////
async function postArray_basket() {
  try {
    let res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product_obj),
    });
    console.log(res);
  } catch (err) {
    console.log("There is a Error to post : ", err);
  }
}
///////////////////method get for count products///////////////
let counter;
async function getProducts_for_count() {
  try {
    let result = await fetch("http://localhost:3000/posts");
    let posts = await result.json();
    console.log(posts);

    counter =  posts.length;
    console.log(counter);
    Basket_number.innerHTML = counter;


  }catch(err){
    console.log('getProducts_for_count'+ err);
  }

}
getProducts_for_count();
  






/////////////////////////////////////////////input validation/////////////////////////////////////////////////////

const btnSubmit =$.querySelector('.btn5');

const inputSpan1 = $.querySelector('.sp1');
const inputSpan2 = $.querySelector('.sp2');
const inputSpan3 = $.querySelector('.sp3');
const inputSpan4 = $.querySelector('.sp4');
const inputSpan5 = $.querySelector('.sp5');
const inputSpan6 = $.querySelector('.sp6');
const inputSpan7 = $.querySelector('.sp7');

const inputElem8 = $.querySelector('.input8');

let sp_array = [inputSpan1,inputSpan2,inputSpan3,inputSpan4,inputSpan5,inputSpan6,inputSpan7];
let inp_array = $.querySelectorAll('.inp');

console.log(sp_array);
console.log(inp_array);

let input_index;
const emailPattern = /^\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+$/;
const phonePattern = /09(1[0-9]|3[0-9]|2[012]|9[012])-?[0-9]{3}-?[0-9]{4}/;
const postCodePattern = /\d{10}/;

let postcodeResult;
let emailResult;
let phoneResult;
let infos_obj;
let sp_Value_Array=[];
let result_sp_val;

btnSubmit.addEventListener('click',() =>{
  
  inputElem8.nextElementSibling.style.color = '#737B7D';
 
  console.log('submitd');
  if(inputElem8.checked){
    console.log('checked true');

  }else{

    inputElem8.nextElementSibling.style.color = '#FF8B13';
  }
  formValidation()

})


function formValidation(){
  inp_array.forEach((input)=>{

    if(input.value===''){
      input_index=input.className.charAt(5)-1;
      console.log(input_index);
      sp_array[input_index].innerHTML = 'Fill the input';

    }
    else{

      input_index=input.className.charAt(5)-1;
      sp_array[input_index].innerHTML = '';

      if(input_index == 3){
        
        postcodeResult=postCodePattern.test(input.value);
        if(!postcodeResult){
          sp_array[3].innerHTML='All must be number(10 digits)'
        }

      }
      if(input_index == 5){
        
        phoneResult=phonePattern.test(input.value);
        if(!phoneResult){
          sp_array[5].innerHTML='example: 09303408998'
        }
      }
      if(input_index == 6){
        
        emailResult=emailPattern.test(input.value);
        if(!emailResult){
          sp_array[6].innerHTML='example: mohammad@gmail.com'
        }
      }
      
      sp_Value_Array.push(sp_array[input_index].innerHTML );
      console.log(sp_Value_Array);

      if(sp_Value_Array.length===7){

        result_sp_val = sp_Value_Array.every((val)=>{
          return val==''
        })
        console.log(result_sp_val);

        if(result_sp_val && inputElem8.checked){
          infos_obj={
            CompanyName:inp_array[0].value,
            Nature_Of_Business:inp_array[1].value,
            Address:inp_array[2].value,
            Postcode:inp_array[3].value,
            Contact_Name:inp_array[4].value,
            Phone:inp_array[5].value,
            Email:inp_array[6].value,
        
           }
          postInputs_infos(infos_obj);
        }
        sp_Value_Array=[];
      }

    }

  })

}

async function postInputs_infos(infos_obj) {
  try {
    let res = await fetch("http://localhost:3000/inputs_infos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(infos_obj),
    });
    console.log(res);
  } catch (err) {
    console.log("There is a Error to post : ", err);
  }
}



/////////////////////////////////////////////////END///////////////////////////////////////////////////////////