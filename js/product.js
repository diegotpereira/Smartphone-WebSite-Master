const getproducts = async() => {
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