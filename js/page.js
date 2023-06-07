fetch("https://diwserver.vps.webdock.cloud/products")
    .then((res) => res.json())
    .then((json) => {
        const productContainer = document.getElementById("productContainer");

        // Função para filtrar os produtos
        const filterProducts = (searchTerm) => {
            productContainer.innerHTML = ""; // Limpar os produtos exibidos

            // Filtrar os produtos com base no termo de pesquisa
            const filteredProducts = json.products.filter((product) => {
                const title = product.title.toLowerCase();
                const category = product.category.toLowerCase();
                const search = searchTerm.toLowerCase();
                return title.includes(search) || category.includes(search);
            });

            // CARDS
            filteredProducts.forEach((product) => {
                const card = document.createElement("div");
                card.classList.add("card");

                const image = document.createElement("img");
                image.src = product.image;
                card.appendChild(image);

                const title = document.createElement("h1");
                title.textContent = product.title;
                card.appendChild(title);

                const category = document.createElement("h2");
                category.textContent = product.category;
                card.appendChild(category);

                const price = document.createElement("h4");
                price.textContent = `Price: $${product.price}`;
                card.appendChild(price);

                const rating = document.createElement("p");
                rating.innerHTML = `Rating: ${product.rating.rate} (${product.rating.count} votes) <i class="fas fa-star"></i>`;
                card.appendChild(rating);

                const button = document.createElement("button");
                button.textContent = "More Details";
                button.classList.add("card-button");
                button.addEventListener("click", () => {
                    window.location.href = `details.html?id=${product.id}`;
                });
                card.appendChild(button);

                productContainer.appendChild(card);
            });
        };

        // Formulário de pesquisa
        const searchForm = document.getElementById("searchForm");
        const searchInput = document.getElementById("searchInput");

        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const searchTerm = searchInput.value;
            filterProducts(searchTerm);
        });

        // Exibir todos os produtos ao carregar a página
        filterProducts("");
    });