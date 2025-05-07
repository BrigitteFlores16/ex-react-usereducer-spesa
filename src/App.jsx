import React, { useState } from "react";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingProduct = state.find((p) => p.name === action.payload.name);
      if (existingProduct) {
        return state.map((p) =>
          p.name === action.payload.name
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "REMOVE_ITEM":
      return state.filter((product) => product.name !== action.payload);

    case "UPDATE_QUANTITY":
      return state.map((product) =>
        product.name === action.payload.name
          ? {
              ...product,
              quantity: Math.max(1, Math.floor(action.payload.quantity)),
            }
          : product
      );

    default:
      return state;
  }
};

function ProductList() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <div>
      <h2>Lista Prodotti</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong>: €{product.price.toFixed(2)}
            <button
              onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
            >
              Aggiungi al carrello
            </button>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <div>
          <h3>Carrello</h3>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                <strong>{product.name}</strong>: €{product.price.toFixed(2)}
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_QUANTITY",
                      payload: { name: product.name, quantity: e.target.value },
                    })
                  }
                />
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_ITEM", payload: product.name })
                  }
                >
                  Rimuovi
                </button>
              </li>
            ))}
          </ul>
          <h3>
            Totale da pagare: €
            {cart
              .reduce(
                (total, product) => total + product.price * product.quantity,
                0
              )
              .toFixed(2)}
          </h3>
        </div>
      )}
    </div>
  );
}

export default ProductList;
