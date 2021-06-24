const listYaniUL = document.getElementById("list");                         //TUM ITEMLARI KAPSAYACAK OLAN LİSTE, YANİ UL TAGINI SEÇTİK



// LOCALSTORAGE'DE VAR OLAN ITEMLARI SAYFA YENİLEYİNCE OLUŞTURMA FONKSİYONU
const localdeVarOlanItemlarıGostermek = function () {
    const todos = JSON.parse(localStorage.getItem("todos"));                // localStorage'deki todo itemlarını todos değişkeninde tut array olarak(parse metodu ile) yoksa string olur.
    if (!todos) {                                                           // eğer localde henüz hiç todo yoksa todos listesi yoksa 
        localStorage.setItem("todos", JSON.stringify([]))                   // boş bir array olarak todos listesi oluştur
    } else {
        for (let i = 0; i < todos.length; i++) {                            // local'deki her bir todo item'ı için
            function newElementForLocal() {

                let yeniLi = document.createElement("li");                  // yeni bir li oluştur
                let inputValue = todos[i].text;                                  // yazılan değeri string olarak inputValue'da tut
                let valueMetni = document.createTextNode(inputValue);       // string değeri text node yap (html'den kurtul düz metin al)
                yeniLi.appendChild(valueMetni);                             //  girilen metni yeni li itema ekledi


                let span = document.createElement("span");                  // yeni span tagi oluştur
                let carpi = document.createTextNode("x");                   // çarpı işaret oluştur
                span.className = "close";                                   // span'a "close" classı ekle
                span.appendChild(carpi);                                    // span'a carpi ekle
                yeniLi.appendChild(span);                                   // span'ı li'ye ekle
                listYaniUL.appendChild(yeniLi);                             // li'yi ul'ye ekle

                if (todos[i].isChecked == true) {
                    yeniLi.classList.add("checked")
                } else {
                    yeniLi.classList.remove("checked")
                }
            };
            newElementForLocal();                                           
        }
    }
}
localdeVarOlanItemlarıGostermek();



// TUM Lİ ELEMENTLERİ İÇİN DEĞİŞKEN
let listItems = document.getElementsByTagName("li");

// LIST ITEM OLUŞTURMA
for (let i = 0; i < listItems.length; i++) {                         //  her bir liste itemı için
    let span = document.createElement("span");                       //  bir span tagi oluştur
    let carpi = document.createTextNode("x");                        //  itemı kapatma buton işareti
    span.className = "close";                                        //  span'a close class'ı ekle
    span.appendChild(carpi);                                         //  span içine carpiyi ekle
    listItems[i].appendChild(span);                                  //  her item'a span'i ekle
}

// CLASS'I "CLOSE" OLAN ITEMLAR
let close = document.getElementsByClassName("close");

// CLOSE'A TIKLAYINCA ITEM KAYBOLSUN - zaten var olan itemlar için
for (let i = 0; i < close.length; i++) {                                            // class'ı "close" olan her item için
    close[i].onclick = function () {                                                // close'a tıklanınca
        let div = this.parentElement;                                               // div değişkeni close'u kapsayan elementi yani spani kapsayan "li" elementini temsil edecek
        div.style.display = "none";                                                 // div'in css display özelliği none olsun yani ekrandan kaybolsun

        //ITEM'I LOCALSTOREGE'DEN DE SİLMEK (item'in metnini alıp localde aratıp eşleşenleri sileceğiz)
        const icerikMetni = div.textContent;                                        // listItem'ın metnini içerikmetni olarak aldım
        const icerikMetniKesilmis = icerikMetni.slice(0, icerikMetni.length - 2);   // metnin sonunca carpi işaretleri çıktığı için onlardan kurtuldum.son iki karakteri çıkardırm

        let todos = JSON.parse(localStorage.getItem("todos"));                      // todos listesini array olarak aldım.
        todos = todos.filter(item => item.text != icerikMetniKesilmis);                  // filtre metodu ile kapatılan elemanın metni ile eşleşen localstorage deki elemanı çıkardım
        localStorage.setItem("todos", JSON.stringify(todos))                        // güncellenmeiş yeni todos listi localstorage gonderdim
    }
}




// YENİ ELEMENT EKLEME
function yeniElement() {
    let yeniLi = document.createElement("li");                                      // yeni bir li oluştur
    let inputValue = document.getElementById("task").value;                         // yazılan değeri string olarak inputValue'da tut
    let valueMetni = document.createTextNode(inputValue);                           // string değeri text node yap (html'den kurtul düz metin al)
    yeniLi.appendChild(valueMetni);                                                 //  girilen metni yeni li itema ekledi
    if (inputValue === "" || inputValue.replace(/^\s+|\s+$/g, "").length == 0) {    // eğer değer girilmeden ekleye tıklanmışsa veya değer trim yapıldıktan sonra boş string kalıyorsa
        $(".error").toast("show");                                                  // bootstrap hata toast'ı çalışsın
    } else {
        $(".success").toast("show");                                                // bootstrap başarıyla eklediniz toast'ı çalışsın
        listYaniUL.appendChild(yeniLi);                                             // ul içine yeni list item'ı eklensin
    }
    document.getElementById("task").value = "";                                     // input alanı temizlensin tekrar boş olsun

    let span = document.createElement("span");                                      // yeni span tagi oluştur
    let carpi = document.createTextNode("x");                                       // çarpı işaret oluştur
    span.className = "close";                                                       // span'a "close" classı ekle
    span.appendChild(carpi);                                                        // span'a carpi ekle
    yeniLi.appendChild(span);                                                       // span'ı li'ye ekle

    // CLOSE'A TIKLAYINCA ITEM KAYBOLSUN - yeni eklenenler için
    for (let i = 0; i < close.length; i++) {                                        // class'ı "close" olan her item için
        close[i].onclick = function () {                                            // close'a tıklanınca
            let div = this.parentElement;                                           // div değişkeni close'u kapsayan elementi yani spani kapsayan "li" elementini temsil edecek
            div.style.display = "none";                                             // div'in css display özelliği none olsun yani ekrandan kaybolsun
        }
    }

    const todo = {
        text: inputValue,
        isChecked: true
    }
    // YENİ EKLENEN İTEM'I LOCALSTORAGE'E EKLEME
    const todos = JSON.parse(localStorage.getItem("todos"));                        // localdeki todos listesini todos değişkenine ata ancak birazdan push metodu kullanabilmek için string olan bu veriyi parse metodu ile orijinal haline döndürüyorum
    todos.push(todo);                                                               // inputa girilen metni todos listesine push et
    localStorage.setItem("todos", JSON.stringify(todos));                           // push'tan sonra tekrar string hale cevir ve yenilenmiş todos değişkeni ile localstorage i güncelle
}


//ENTER TUŞUNA BASINCA DA YENİ ITEM EKLENSİN
var input = document.getElementById("task");                                // html'deki input alanını input değişkenine atadım

input.addEventListener("keyup", function (event) {                          // belirtilecek tuşa basınca fonksiyon çalışsın
    if (event.key === 'Enter') {                                            // eğer tuş "Enter" ise                                                    
        event.preventDefault();                                             // Enter'ın varsayılan bir görevi varsa onu iptal etsin
        document.getElementById("liveToastBtn").click();                    // html'de inputun sağındaki "Ekle" yazan html elemanına click yapılmış gibi davransın
    }
});

//CHECKED YAPMA, TIKLAYINCA ÜSTÜNÜ ÇİZME
listYaniUL.addEventListener(
    "click",                                                                // addEventListener ilk parametre click eventi
    function (event) {                                                      // addEventListener ikinci parametre çalışacak fonksiyon
        if (event.target.tagName === "LI") {                                // eğer tıklanan şey "li" ise
            event.target.classList.toggle("checked");                       // eğer "li"nin classlari içinde "checked" varsa kaldırır yoksa ekler (toggle methodu)
            console.log(event.target.textContent);

            const icerikMetni = event.target.textContent;                                   // listItem'ın metnini içerikmetni olarak aldım
            const icerikMetniKesilmis = icerikMetni.slice(0, icerikMetni.length - 2);       // metnin sonunca carpi işaretleri çıktığı için onlardan kurtuldum.son iki karakteri çıkardırm


            // ITEM CHECKED OLDUĞUNDA LOCALDEKİ ITEM'DA CHECKED OLSUN
            if (event.target.classList.contains("checked") == true) {
                const todos = JSON.parse(localStorage.getItem("todos"));
                todos.forEach(element => {
                    if (element.text == icerikMetniKesilmis) {
                        element.isChecked = true;
                    };
                    localStorage.setItem("todos", JSON.stringify(todos));
                });
            }else if(event.target.classList.contains("checked") == false){
                const todos = JSON.parse(localStorage.getItem("todos"));
                todos.forEach(element => {
                    if (element.text == icerikMetniKesilmis) {
                        element.isChecked = false;
                    };
                    localStorage.setItem("todos", JSON.stringify(todos));
                });
            }
        }
    },
    false                                                                               // addEventlistener ücüncü parametre (useCapture), varsayılan olarak "false"tur. (event capture - event bubbling ile ilgili)
);