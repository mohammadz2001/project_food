
let $ =document;
let itemsContainer = $.querySelector(".products-items");
let items_name = $.querySelectorAll('.item-name');
let item_count = $.querySelectorAll('.count');

//////////////get method//////////////////////
async function getAllProducts() {
  try {
    let res = await fetch("http://localhost:3000/posts");
    let posts = await res.json();

    console.log(posts);
    

    posts.forEach((post) => {
      
      pushItem(post); 
      clearItems(post);
      
           
    });

    clickProductHandler(posts);

    calculateTotalPrice(posts);

  } catch (err) {
    console.log("There is a Error to get : ", err);
  }


}
getAllProducts();



function pushItem(post){

  itemsContainer.insertAdjacentHTML("beforeend",

  `<div class="p-item">
   <div class="p-item-left">
       <img class='item-img' src="${post.img}" alt="">
   </div>
   <div class="p-item-middle">
       <p>NAME : <span>${post.name}</span></p>
       <p>PRICE : <span>${post.price}</span> $</p>

   </div>
   <div class="p-item-right">
       <did class="delete-add">
           <input value="${post.count}" min="0" placeholder="count" type="number">
        <button id="${post.id}" type="button">DELETE</button>

       </did>

    </div>

   </div>`

  );

}


//////////Delete method ///////////////////

let delete_id;
let count_id;
let countElem;
let countValue;

function clickProductHandler(array){

  itemsContainer.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(e.target.tagName);

    if(e.target.tagName === 'BUTTON'){
      delete_id=e.target.id;
      deleteItem(delete_id);

    }

    if(e.target.tagName ==='INPUT'){
      
      count_id = e.target.nextElementSibling.id;
      console.log(count_id);
      countValue=e.target.value;
      console.log(array);
      console.log(countValue);
      updateCount(countValue,count_id,array);
      
    }
 })

}



async function deleteItem(id){
  try {
    let res = await fetch(`http://localhost:3000/posts/${id}`,{method:"DELETE"})
    
    console.log(res);
    getAllProducts();

  }catch(err){
    console.log('There is a Error to DELETE : ',err);
  }

}


///////////////////////ClearAll//////////////////////////

const clear_all_btn = $.querySelector('.btn9');
function clearItems(post){
  clear_all_btn.addEventListener('click',(e)=>{
    
    deleteItem(post.id);
    getAllProducts() 
  })

}
clearItems();

///////////////////Total price////////////////////////

let totalPrice = $.querySelector('.total');

function calculateTotalPrice (posts){

  console.log(posts);

  let total;
  let array_price=[];
  let array_count_time_price = [];
  let number_count_time_price ;
  
  posts.forEach((post)=>{

    number_count_time_price = post.price * post.count;
    array_count_time_price.push(number_count_time_price);
    console.log(array_count_time_price); 

    array_price.push(post.price);

    if(array_count_time_price.length === posts.length ) {

      total = array_count_time_price.reduce((prevValue,currentValue)=>{
        return prevValue + currentValue;
      })

      console.log(total);
      totalPrice.innerHTML = total;
    }


  })
 

}

///////////////////////////update count///////////////////


async function updateCount(countValue,countId,array){
  console.log(array,countValue,countId);
  let up_arr = array.find((product)=>{
    return product.id == countId    
  })
  console.log(up_arr);

  let new_count = {
   id:up_arr.id,
   name:up_arr.name,
   price:up_arr.price,
   img:up_arr.img,
   count:countValue
  }

  try {
    let res = await fetch(`http://localhost:3000/posts/${countId}`,{
         method:"PUT",
         headers:{"content-type":'application/json'},
        body:JSON.stringify(new_count)
      })
    .then(response => {
      console.log(response);
    } )


  }catch(err){
      console.log('There is a Error to pUT : ',err);
  }


}

