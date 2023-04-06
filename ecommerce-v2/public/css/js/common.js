//Post Request by passing config object: another way of sending post request. 
//Using this config object  to find out whether request is ajax or xhr request.
try{
    const response=await axios({
        method:"post",
        url:`product/${productid}/like`,
        headers:  {"X-Requested-With": XMLHttpRequest}
      });
      if(btn.children[0].classList.contains("fas")){
        btn.children[0].classList.remove("fas");
        btn.children[0].classList.add("far");
      }
      else{
        btn.children[0].classList.add("fas");
        btn.children[0].classList.remove("far");
      }
    }
    catch(e){ 
        //To redirect to login page
     window.location.replace("/login");
      //console.log(e.message);
    }
    
    for(let btn of allLikeButton){
        btn.addEventListener("click",()=>{
           const productid= btn.getAttribute("product-id");
            likeButton(productid,btn);
        })
    }
    