const startConf = function(){  //başlangiçta localstorage'deki itemları ekrana yazdırma

}




// liste itemlarını bir değişkene atama ??? sayfa açılınca li yokk ki nereden alıyor?? localstorage
let listItems = document.getElementsByTagName("li");

// LIST ITEM OLUŞTURMA  ?? sayfa açılınca hazir olan li'leri oluşturuyor???
for (let i = 0; i < listItems.length; i++) {      //  her bir liste itemı için
    let span = document.createElement("span");  //  bir span tagi oluştur
    let carpi = document.createTextNode("x");   //  itemı kapatma buton işareti
    span.className = "close";                   //  span'a close classı ekle
    span.appendChild(carpi);                    //  span içine carpiyi ekle
    listItems[i].appendChild(span);             //  her item'a span'i ekle
}

// class'ı close olan itemları close değişkeninde tut
let close = document.getElementsByClassName("close");

//CLOSE/ÇARPI'YA TIKLAYINCA ITEM KAYBOLSUN - zaten var olan itemlar için
for (let i = 0; i < close.length; i++) {          // class'ı "close" olan her item için
    close[i].onclick = function () {            // close'a tıklanınca
        let div = this.parentElement;           // div değişkeni close'u kapsayan elementi yani spani kapsayan "li" elementini temsil edecek
        div.style.display = "none";             // div'in css display özelliği none olsun yani ekrandan kaybolsun
    }
}

//TUM LİSTEYİ, YANİ UL TAGINI SEÇTİK
const listYaniUL = document.getElementById("list");


//YENİ ELEMENT EKLEME
function yeniElement() {
    let yeniLi = document.createElement("li");                  // yeni bir li oluştur
    let inputValue = document.getElementById("task").value;     // yazılan değeri string olarak inputValue'da tut
    let valueMetni = document.createTextNode(inputValue);       // string değeri text node yap (html'den kurtul düz metin al)
    yeniLi.appendChild(valueMetni);                             //  girilen metni yeni li itema ekledi
    if (inputValue === "" || inputValue.replace(/^\s+|\s+$/g, "").length == 0) { // eğer değer girilmeden ekleye tıklanmışsa veya değer trim yapıldıktan sonra boş string kalıyorsa
        $(".error").toast("show");                              // bootstrap hata toast'ı çalışsın
    } else {
        $(".success").toast("show");                            // bootstrap başarıyla eklediniz toast'ı çalışsın
        listYaniUL.appendChild(yeniLi);                         // ul içine yeni list item'ı eklensin
    }
    document.getElementById("task").value = "";                 // input alanı temizlensin tekrar boş olsun

    let span = document.createElement("span");                  // yeni span tagi oluştur
    let carpi = document.createTextNode("x");                   // çarpı işaret oluştur
    span.className = "close";                                   // span'a "close" classı ekle
    span.appendChild(carpi);                                    // span'a carpi ekle
    yeniLi.appendChild(span);                                   // span'ı li'ye ekle

    //CLOSE/ÇARPI'YA TIKLAYINCA ITEM KAYBOLSUN - yeni eklenenler için
    for (let i = 0; i < close.length; i++) {          // class'ı "close" olan her item için
        close[i].onclick = function () {            // close'a tıklanınca
            let div = this.parentElement;           // div değişkeni close'u kapsayan elementi yani spani kapsayan "li" elementini temsil edecek
            div.style.display = "none";             // div'in css display özelliği none olsun yani ekrandan kaybolsun
        }
    }

}

//CHECKED YAPMA, TIKLAYINCA ÜSTÜNÜ ÇİZME
listYaniUL.addEventListener(
    "click",
    function (event) {
        if (event.target.tagName === "LI") {               // eğer tıklanan şey "li" ise
            event.target.classList.toggle("checked");        // eğer "li"nin classlari içinde "checked" varsa kaldırır yoksa ekler (toggle methodu)
        }
    },
    false                                                 // ücüncü parametre useCapture, varsayılan olarak "false"tur. (event capture - event bubbling ile ilgili)
);

let localItemList = JSON.parse(localStorage.getItem("localItem"));
if(localItemList === null){
    listItems = []
}else{
    listItems = localItemList
}
listItems.push(inputValue);
localStorage.setItem("localItem", JSON.stringify(listItems));