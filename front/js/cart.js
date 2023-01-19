fetch("http://localhost:3000/api/products")
.then(response => response.json())
.then(response => {
    params_produit = response
    
})

for (let i=0; i <= panier.length; i++){
    Vignettes_panier()
}

console.log(response)

let panier = localStorage.getItem("panier")

// ajout du panier au local storage
function save_panier(panier){
     localStorage.setItem("panier", JSON.stringify(panier))
}

// retirer un produit via son id du panier
function remove_Product(product){ 
    panier=panier.filter(p => p.id !=product)
    save_panier(panier)
}

// changer la quantité d'un produit du panier et si ça quantité est égale à zero le retirer du panier
function change_Quantity(product,quantity){
    let foundproduct = panier.find(p => p.id == product.id)
    if (foundproduct != undefined){
        foundproduct.quantity += quantity
        if(foundproduct.quantity <= 0){
            remove_Product(foundproduct)
        }else{
            save_panier(panier)
        }
    }
   
}

// calcul du nombre de produit dans le panier
function get_Number_Product(){
    let number = 0
    for (product of panier){
        number += product.quantity
    }
    return number
}

// calcul du prix total
function get_Total_Price(){
     let total = 0
     for (product of panier){
         total = get_Number_Product()*product.price
     }
}

// creatioon des vignettes et de leurs attributs
function Vignettes_panier() {

const article = document.createElement("article")
const Div = document.createElement("div")
const Img = document.createElement("img")
const Kanap_name = document.createElement("h2")
const P_couleur/*, P_quantite, P_prix*/ = document.createElement("p")
const Input = document.createElement("input")

const Div_Img, Div_content, Div_content_description, Div_content_settings, Div_content_settings_quantity, Div_content_settings_delete = Div

article.classList.add("cart_item")
article.setAttribute("data-id", produit.id)
 Div_Img.classlist.add("cart_item_img")
 Img.setAttribute("src",params_produit.imageUrl)
 Div_content.classList.add("cart_item_content")
 Div_content_description.classList.add("cart__item__content__description")
 Div_content_settings.classList.add("cart__item__content__settings")
 Div_content_settings_quantity.classList.add("cart__item__content__settings__quantity")
 Input.classList.add("itemQuantity")
 Input.setAttribute("type","number")
 Input.setAttribute("name","itemQuantity")
 Input.setAttribute("min","1")
 Input.setAttribute("max","100")

P_couleur.innerHTML = poduits.couleur
}
