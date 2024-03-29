const queryString = window.location.search // on recupère les paramètre url
const urlParams = new URLSearchParams(queryString) // on defini une variable pour aller chercher un paramètre en particulier
const productId = urlParams.get('id') // on recupère l'id du produit

// variable necéssaire pour le DOM
let colors

// variable necéssaire pour le panier
let panier = []
let couleur
let detail_Produit
let produits

fetch('http://localhost:3000/api/products/' + productId)
.then (response => response.json())
.then (response => {
    detail_Produit = response
    info_Produit(response)
    
})


function info_Produit(params)
{
    // recuperation des divers conteneurs
    const image = document.getElementById("image")
    const titre = document.getElementById("title")
    const prix = document.getElementById("price")
    const descriptions = document.getElementById("description")
    couleur = document.getElementById("colors")

    // attribution des paramètres de chaque éléments
    titre.innerHTML = params.name
    prix.innerHTML = params.price
    descriptions.innerHTML = params.description
    image.setAttribute("src",params.imageUrl)

    // le paramètre couleur est un tableau on crée donc une boucle nous permettant de parcourir ces couleurs et de créer une option pour chacune d'entre elles
    colors =params.colors
    for (color of colors){
        const nouvelle_Couleur = document.createElement("option")
        nouvelle_Couleur.value = color
        nouvelle_Couleur.innerHTML = color
        couleur.appendChild(nouvelle_Couleur)
    }
}

// ajout des produits au panier
const bouton_Panier = document.getElementById("addToCart")

bouton_Panier.addEventListener('click', function (event){

// on recupere l'elemnt contenant la quantité 
let nb_Produit= document.getElementById("quantity")


console.log(detail_Produit)


produits = {
    produit_id : detail_Produit._id,
    quantite : nb_Produit.value,
    couleur : couleur.value
}

// obligation pour l'utilisateur de selectionné une couleur et un  nombre pour le produit
if( couleur.value=="" || nb_Produit.value==0){
    console.log("je passe dans le if")
    event.preventDefault()
    window.confirm("veuillez selectionez une couleur et/ou un nombre")
    return false
}

// si le panier contient dejà un objet alors on lance la fonction comparaison sinon on l'ajoute au panier 
if (localStorage.getItem('panier')){
    comparaison(produits)
}else{
    ajout_produit(produits)
}

if(window.confirm('Le produit a été ajouté. Voulez-vous consulter votre panier ?')) {
    window.location.replace("./cart.html")
}
} ) 


function comparaison(produits){
    panier = JSON.parse(localStorage.getItem('panier')) // on retransforme le contenue du local storage en un objet 

    // on lance la fonction find qui permet de boucler sur le panier et s'arreté quand la condition est remplie
    let trouver_Produit = panier.find(p => p.produit_id === produits.produit_id && p.couleur === produits.couleur)

    if(trouver_Produit){
            trouver_Produit.quantite = parseInt( trouver_Produit.quantite )+ parseInt( produits.quantite)
            localStorage.removeItem('panier')
            localStorage.setItem('panier',JSON.stringify(panier))    
    }
    else{
        ajout_produit(produits)
    }
}

function ajout_produit(produits){
panier.push(produits)
const Panier_JSON = JSON.stringify(panier)
localStorage.setItem('panier',Panier_JSON)
} 