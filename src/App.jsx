import React, { useState } from "react";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

function ProductList() {
  const [addedProducts, setAddedProducts] = useState([]);

  const addToCart = (product) => {
    const existingProduct = addedProducts.find((p) => p.name === product.name);

    if (existingProduct) {
      setAddedProducts(
        addedProducts.map((p) =>
          p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productName) => {
    setAddedProducts(
      addedProducts.filter((product) => product.name !== productName)
    );
  };

  const totalPrice = addedProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div>
      <h2>Lista Prodotti</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong>: €{product.price.toFixed(2)}
            <button onClick={() => addToCart(product)}>
              Aggiungi al carrello
            </button>
          </li>
        ))}
      </ul>

      {addedProducts.length > 0 && (
        <div>
          <h3>Carrello</h3>
          <ul>
            {addedProducts.map((product, index) => (
              <li key={index}>
                <strong>{product.name}</strong>: €{product.price.toFixed(2)}
                (Quantità: {product.quantity})
                <button onClick={() => removeFromCart(product.name)}>
                  Rimuovi
                </button>
              </li>
            ))}
          </ul>
          <h3>Totale: €{totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

export default ProductList;
