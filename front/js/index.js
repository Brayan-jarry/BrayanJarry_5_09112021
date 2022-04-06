// recupération des données
fetch("http://localhost:3000/api/products")
.then(response => response.json())
.then(response => {
    showProducts(response)
})

// affichage des produits
const showProducts = products => {
    for (product of products){
        //console.log(product)
        Creation_Vignette(product)
    }
}
let Vignettes = document.getElementById('items') //recuperation du conteneur 


function Creation_Vignette(product) {

    // creation des divers elements nécessaire a la vignette

    const Nouvelle_Vignette = document.createElement("a")// creation d'un nouvelle element a pour chaque produits
    const Vignette_Article = document.createElement("article")
    const Article_Img = document.createElement("img")
    const Article_H3 = document.createElement("h3")
    const Article_Paragraphe = document.createElement("p")

    // attribution des paramètres de chaque élément

    // élément <a>
    Nouvelle_Vignette.href = "product.html?id="+product._id // recupération et attribution du href de chaque produit 
    //console.log(Nouvelle_Vignette)
    // image
    Article_Img.src = product.imageUrl
    Article_Img.alt = product.altTxt
    // sous-titre
    Article_H3.classList.add = "productName"
    Article_H3.textContent = product.name
    // description
    Article_Paragraphe.classList.add = "productDescription"
    Article_Paragraphe.innerHTML = product.description

    // attribution des enfants
    Vignette_Article.appendChild(Article_Img)
    Vignette_Article.appendChild(Article_H3)
    Vignette_Article.appendChild(Article_Paragraphe)
    Nouvelle_Vignette.appendChild(Vignette_Article)
    Vignettes.appendChild(Nouvelle_Vignette)
}