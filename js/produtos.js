const getProducts = async() => {
    try {
        const results = await fetch("./data/products.json");
        const data = await results.json();
        const products = data.products;
        return products;
    } catch (err) {
        console.log(err);
    }
};

// Carregar produtos da categoria
const categoryCenter = document.querySelector(".category_center");

window.addEventListener("DOMContentLoaded", async function() {
    const products = await getProducts();
    displayProductItems(products);
});

const displayProductItems = items => {
    let displayProduct = items.map(
        product => `
        <div class="product category_products">
            <div class="product_header">
              <img src=${product.image} alt="product">
            </div>
            <div class="product_footer">
                <h3> R${product.title}</h3>
                <div class="rating">
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                    </svg>
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                    </svg>
                    <svg>
                       <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                    </svg>
                    <svg>
                       <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                    </svg>
                    <svg>
                       <use xlink:href="./images/sprite.svg#icon-star-empty"></use>
                    </svg>
                </div>
                <div class="product_price">
                    <h4>${product.price}</h4>
                </div>
                <a href="#"><button type="submit" class="product_btn">Adicionar ao Carrinho</button></a>
            </div>
            <ul>
                <li>
                    <a data-tip="Olhada rápida" data-place="left" href="#">
                        <svg>
                           <use xlink:href="./images/sprite.svg#icon-eye"></use>
                        </svg>
                    </a>
                </li>
                <li>
                    <a data-tip="Adicionar a lista de Compras" data-place="left" href="#">
                        <svg>
                            <use xlink:href="./images/sprite.svg#icon-heart-o"></use>
                        </svg>
                    </a>
                </li>
                <li>
                    <a data-tip="Adicionar para Comparar" data-place="left" href="#">
                        <svg>
                            <use xlink:href="./images/sprite.svg#icon-loop2"></use>
                        </svg>
                    </a>
                </li>
            </ul>
        </div>`
    );

    displayProduct = displayProduct.join("");
    if (categoryCenter) {
        categoryCenter.innerHTML = displayProduct;
    }
};

// Filtering
const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");

if (categoryContainer) {
    categoryContainer.addEventListener("click", async e => {
        const target = e.target.closest(".section_title");
        if (!target) return;

        const id = target.dataset.id;
        const products = await getProducts();

        if (id) {
            // remover ativo dos botões
            Array.from(filterBtn).forEach(btn => {
                btn.classList.remove("active");
            });
            target.classList.add("active");

            // Carregar Produtos
            let menuCategory = products.filter(product => {
                if (product.category === id) {
                    return product;
                }
            });
            if (id === "All Products") {
                displayProductItems(products);
            } else {
                displayProductItems(menuCategory);
            }
        }
    });
}

// Detalhes do produto restantes
const pic1 = document.getElementById("pic1");
const pic2 = document.getElementById("pic2");
const pic3 = document.getElementById("pic3");
const pic4 = document.getElementById("pic4");
const pic5 = document.getElementById("pic5");
const picContainer = document.querySelector(".product_pictures");
const zoom = document.getElementById("zoom");
const pic = document.getElementById("pic");

// Lista de Imagens
const picList = [pic1, pic2, pic3, pic4, pic5];

// Foto ativa
let picActive = 1;

["mouseover", "touchstart"].forEach(event => {
    if (picContainer) {
        picContainer.addEventListener(event, e => {
            const target = e.target.closest("img");
            if (!target) return;
            const id = target.id.slice(3);
            changeImage(`./images/products/iPhone/iphone${id}.jpeg`, id);
        });
    }
});

// mudar a imagem ativa
const changeImage = (imgSrc, n) => {

    // mude a imagem principal
    pic.src = imgSrc;

    // mudar a imagem de fundo
    zoom.style.backgroundImage = `url(${imgSrc})`;

    // remova a borda da imagem lateral ativa anterior
    picList[picActive - 1].classList.remove("img-active");

    // adicionar à imagem ativa
    picList[n - 1].classList.add("img-active");

    // atualize a imagem lateral ativa
    picActive = n;
};

// Detalhes do produto inferior
const btns = document.querySelectorAll(".detail-btn");
const detail = document.querySelector(".product-detail_bottom");
const contents = document.querySelectorAll(".content");

if (detail) {
    detail.addEventListener("click", e => {
        const target = e.target.closest(".detail-btn");
        if (!target) return;

        const id = target.dataset.id;
        if (id) {
            Array.from(btns).forEach(btn => {

                // remover ativo de todos os btn
                btn.classList.remove("active");
                e.target.closest(".detail-btn").classList.add("active");
            });
            // esconder outro ativo
            Array.from(contents).forEach(content => {
                content.classList.remove("active");
            });
            const element = document.getElementById(id);
            element.classList.add("active");
        }
    });
}