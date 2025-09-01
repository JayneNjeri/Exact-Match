import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

// Cart Actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { battery, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === battery.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === battery.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: battery.id,
            name: battery.name,
            brand: battery.brand?.name || battery.brand, // Handle both object and string cases
            price: parseFloat(battery.price),
            quantity,
            specs: `${battery.voltage} • ${battery.amp_hours}Ah • ${battery.cold_cranking_amps}A CCA`,
            slug: battery.slug,
            image: battery.primary_image,
            stock_quantity: battery.stock_quantity
          }
        ]
      };
    }
    
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== id)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    }
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: []
      };
    
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload.items || []
      };
    
    default:
      return state;
  }
};

// Initial State
const initialState = {
  items: [],
  isOpen: false
};

// Create Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('exactmatch_cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        dispatch({
          type: CART_ACTIONS.LOAD_CART,
          payload: cartData
        });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever items change (but not during initial load)
  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      localStorage.setItem('exactmatch_cart', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state, isInitialized]);

  // Cart Actions
  const addToCart = (battery, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { battery, quantity }
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id }
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity }
    });
  };

  const clearCart = () => {
    dispatch({
      type: CART_ACTIONS.CLEAR_CART
    });
  };

  // Computed Values
  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const isInCart = (batteryId) => {
    return state.items.some(item => item.id === batteryId);
  };

  const getItemQuantity = (batteryId) => {
    const item = state.items.find(item => item.id === batteryId);
    return item ? item.quantity : 0;
  };

  const value = {
    // State
    items: state.items,
    cartCount,
    cartTotal,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Utilities
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
