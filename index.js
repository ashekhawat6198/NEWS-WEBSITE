const API_KEY="c83b62b7e04749aeacfdd68b74994598";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",function(){
    fetchNews("INDIA");
})

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const response=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await response.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer=document.querySelector(".card-container");
    const newsCardTemplate=document.querySelector("#template-news-card");
    
    cardContainer.innerText="";

    articles.forEach(function(article){
     if(!article.urlToImage) return;
      
     const cardClone=newsCardTemplate.content.cloneNode(true);
     fillData(cardClone,article);
     cardContainer.appendChild(cardClone);
    });
}


function fillData(cardClone,article){
    const newsImg=cardClone.querySelector("#news-img");
    const newsTitle=cardClone.querySelector("#news-title")
    const newsSource=cardClone.querySelector(".news-source");
    const desc=cardClone.querySelector(".news-desc");
  
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
     desc.innerHTML=article.description;
  
     const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click",function(){
       window.open(article.url,"_blank");
    });
} 

let currentSelectedNav=null;

function onNavItemClick(id){
    fetchNews(id);

    const navItem=document.getElementById(id);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav=navItem;
    currentSelectedNav.classList.add("active");
}


const inputText=document.querySelector("#input");
const submitBtn=document.querySelector(".nav-btn");

submitBtn.addEventListener("click",function(){
    const query=inputText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav.classList.remove("active");
    currentSelectedNav=NULL;

})

