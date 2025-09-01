import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyCartTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const EmptyCartText = styled.p`
  margin-bottom: 2rem;
  font-size: 1.125rem;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  border: 1px solid var(--border-color);
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #333, #555);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const ItemBrand = styled.div`
  color: var(--primary-color);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ItemSpecs = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const ItemPrice = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-right: 1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid var(--border-color);
  background-color: var(--card-bg);
  color: var(--text-primary);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 2rem;
  text-align: center;
  font-weight: 500;
  color: var(--text-primary);
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--error-color);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--error-color);
    color: white;
  }
`;

const CartSummary = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  height: fit-content;
`;

const SummaryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  
  &.total {
    font-size: 1.125rem;
    font-weight: bold;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-color);
    color: var(--text-primary);
  }
`;

const SummaryLabel = styled.span`
  color: var(--text-secondary);
`;

const SummaryValue = styled.span`
  color: var(--text-primary);
  font-weight: 500;
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  text-align: center;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1.125rem;
  margin-top: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const ContinueShoppingButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const Cart = () => {
  const { items: cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const subtotal = cartTotal;
  const shipping = subtotal > 150 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <ContinueShoppingButton to="/">
          <ArrowLeft size={20} />
          Continue Shopping
        </ContinueShoppingButton>
        
        <EmptyCart>
          <EmptyCartIcon>
            <ShoppingBag size={80} />
          </EmptyCartIcon>
          <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
          <EmptyCartText>
            Looks like you haven't added any batteries to your cart yet.
          </EmptyCartText>
          <Link to="/browse" className="btn btn-primary">
            Shop Batteries
          </Link>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <ContinueShoppingButton to="/">
        <ArrowLeft size={20} />
        Continue Shopping
      </ContinueShoppingButton>
      
      <PageTitle>Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</PageTitle>
      
      <CartContent>
        <CartItems>
          {cartItems.map(item => (
            <CartItem key={item.id}>
              <ItemImage>🔋</ItemImage>
              
              <ItemDetails>
                <ItemBrand>{item.brand}</ItemBrand>
                <ItemName>{item.name}</ItemName>
                <ItemSpecs>{item.specs}</ItemSpecs>
              </ItemDetails>
              
              <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
              
              <QuantityControls>
                <QuantityButton
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} />
                </QuantityButton>
                <QuantityDisplay>{item.quantity}</QuantityDisplay>
                <QuantityButton
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={16} />
                </QuantityButton>
              </QuantityControls>
              
              <RemoveButton onClick={() => removeFromCart(item.id)}>
                <Trash2 size={20} />
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>
        
        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          <SummaryRow>
            <SummaryLabel>Subtotal:</SummaryLabel>
            <SummaryValue>${subtotal.toFixed(2)}</SummaryValue>
          </SummaryRow>
          
          <SummaryRow>
            <SummaryLabel>Shipping:</SummaryLabel>
            <SummaryValue>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </SummaryValue>
          </SummaryRow>
          
          <SummaryRow>
            <SummaryLabel>Tax:</SummaryLabel>
            <SummaryValue>${tax.toFixed(2)}</SummaryValue>
          </SummaryRow>
          
          <SummaryRow className="total">
            <SummaryLabel>Total:</SummaryLabel>
            <SummaryValue>${total.toFixed(2)}</SummaryValue>
          </SummaryRow>
          
          <CheckoutButton to="/checkout">
            Proceed to Checkout
          </CheckoutButton>
          
          {subtotal < 150 && (
            <div style={{ 
              textAlign: 'center', 
              marginTop: '1rem', 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary)' 
            }}>
              Add ${(150 - subtotal).toFixed(2)} more for free shipping!
            </div>
          )}
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;