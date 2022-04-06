const queryString = window.location.search // on recupère les paramètre url
const urlParams = new URLSearchParams(queryString) // on defini une variable pour aller chercher un paramètre en particulier
const productId = urlParams.get('id') // on recupère l'id du produit
let detail_Produit
let produits

fetch('http://localhost:3000/api/products/' + productId)
.then (response => response.json())
.then (response => {
    info_Produit(response)
    
})


function info_Produit(params)
{
    // recuperation des divers conteneurs
    const image = document.getElementById("image")
    const titre = document.getElementById("title")
    const prix = document.getElementById("price")
    const descriptions = document.getElementById("description")
    const couleur = document.getElementById("colors")

    // attribution des paramètres de chaque éléments
    titre.innerHTML = params.name
    prix.innerHTML = params.price
    descriptions.innerHTML = params.description
    image.setAttribute("src",params.imageUrl)

    // le paramètre couleur est un tableau on crée donc une boucle nous permettant de parcourir ces couleurs et de créer une option pour chacune d'entre elles
    let colors =params.colors
    for (color of colors){
        const nouvelle_Couleur = document.createElement("option")
        nouvelle_Couleur.value = color
        nouvelle_Couleur.innerHTML = color
        couleur.appendChild(nouvelle_Couleur)
    }

    detail_Produit = params
    produits = {
        produit_id : detail_Produit._id,
        titre : detail_Produit.name,
        prix : detail_Produit.price,
        descrription : detail_Produit.description,
        image : detail_Produit.imageUrl,
        quantite : nb_Produit
    }
}
// ajout des produits au panier

const bouton_Panier = document.getElementById("addToCart")
let nb_Produit= 1
let produit_Dans_Panier = []



bouton_Panier.addEventListener('click', function () {
    console.log(localStorage.getItem('panier'))
if (localStorage.getItem('panier')){
    comparaison()
}else{
    ajout_produit()
}
   
} )

function comparaison(){
    let panier = JSON.parse(localStorage.getItem('panier'))
    for (let i=0; i<=panier.length; i++){
        console.log(panier[i].produit_id)
        console.log(produits.produit_id)
        if(panier[i].produit_id===produits.produit_id){
            panier[i].quantite+=1
        }else{
            ajout_produit()
        }
    }
}

function ajout_produit(){
produit_Dans_Panier.push(produits)
const produit_Dans_Panier_JSON = JSON.stringify(produit_Dans_Panier)
localStorage.setItem('panier',produit_Dans_Panier_JSON)
}