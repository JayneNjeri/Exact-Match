import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { MapPin, CreditCard, Phone, Mail, User, Package, AlertCircle, CheckCircle } from 'lucide-react';
import styled from 'styled-components';

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;
  }
`;

const CheckoutForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 2rem;
  border: 1px solid var(--border-color);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
  
  .icon {
    color: var(--primary-color);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: border-color 0.2s ease;
  background: var(--input-bg);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  &.error {
    border-color: var(--error-color);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: border-color 0.2s ease;
  background: var(--input-bg);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: border-color 0.2s ease;
  background: var(--input-bg);
  color: var(--text-primary);
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--primary-color);
  }
  
  &.selected {
    border-color: var(--primary-color);
    background: rgba(0, 123, 255, 0.05);
  }
  
  input[type="radio"] {
    margin: 0;
  }
`;

const OrderSummary = styled.div`
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 2rem;
  border: 1px solid var(--border-color);
  height: fit-content;
  position: sticky;
  top: 2rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  
  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
    color: var(--text-primary);
  }
  
  p {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0;
  }
`;

const ItemPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  
  .quantity {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
  
  .price {
    font-weight: 600;
    color: var(--primary-color);
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  
  &.total {
    border-top: 1px solid var(--border-color);
    font-weight: 600;
    font-size: 1.125rem;
    color: var(--primary-color);
  }
`;

const PlaceOrderButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  
  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: var(--text-muted);
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  
  h2 {
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: var(--secondary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #5a6268;
  }
`;

const Checkout = () => {
  const { items, cartTotal, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Redirect to cart if empty
  useEffect(() => {
    if (!items || items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  // Show loading or empty state while redirecting
  if (!items || items.length === 0) {
    return null;
  }
  
  const [formData, setFormData] = useState({
    // Customer Information
    name: '',
    email: '',
    phone: '',
    
    // Payment Information
    paymentMethod: 'mpesa',
    mpesaPhone: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const kenyaCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi',
    'Kitale', 'Garissa', 'Kakamega', 'Meru', 'Nyeri', 'Machakos', 'Kericho',
    'Embu', 'Migori', 'Homa Bay', 'Naivasha', 'Kilifi', 'Isiolo'
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = [
      'email', 'phone', 'firstName', 'lastName', 
      'address', 'city', 'county'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (Kenyan format)
    if (formData.phone && !/^(\+254|0)[7-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Kenyan phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.mpesaPhone) {
        alert('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Simulate M-Pesa payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order object
      const order = {
        items: items,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        payment: {
          method: formData.paymentMethod,
          mpesaPhone: formData.mpesaPhone
        },
        total: cartTotal,
        orderDate: new Date().toISOString(),
        orderNumber: `EM${Date.now()}`
      };
      
      // Store order in localStorage (in real app, this would be sent to backend)
      localStorage.setItem('lastOrder', JSON.stringify(order));
      
      // Clear cart
      clearCart();
      
      // Navigate to success page
      navigate('/order-success', { 
        state: { 
          orderNumber: order.orderNumber,
          customerName: formData.name,
          total: cartTotal 
        } 
      });
      
    } catch (error) {
      console.error('Order processing error:', error);
      alert('Order processing failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <CheckoutContainer>
        <EmptyCart>
          <Package size={64} color="var(--text-muted)" />
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before proceeding to checkout.</p>
          <BackButton onClick={() => navigate('/browse')}>
            Continue Shopping
          </BackButton>
        </EmptyCart>
      </CheckoutContainer>
    );
  }
  
  return (
    <CheckoutContainer>
      <CheckoutForm>
        <form onSubmit={handleSubmit}>
          {/* Customer Information */}
          <Section>
            <SectionHeader>
              <User className="icon" size={20} />
              <h3>Customer Information</h3>
            </SectionHeader>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+254 7XX XXX XXX"
                  required
                />
              </FormGroup>
            </FormRow>
          </Section>

          {/* Payment Information */}
          <Section>
            <SectionHeader>
              <CreditCard className="icon" size={20} />
              <h3>Payment Method</h3>
            </SectionHeader>
            
            <PaymentOption className="selected">
              <div>
                <strong>M-Pesa Mobile Money</strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Pay securely with M-Pesa mobile money
                </p>
              </div>
            </PaymentOption>
            
            <FormGroup style={{ marginTop: '1rem' }}>
              <Label htmlFor="mpesaPhone">M-Pesa Phone Number *</Label>
              <Input
                type="tel"
                id="mpesaPhone"
                name="mpesaPhone"
                value={formData.mpesaPhone}
                onChange={handleInputChange}
                placeholder="+254 7XX XXX XXX"
                required
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Enter the phone number registered with M-Pesa that you'll use for payment
              </p>
            </FormGroup>
          </Section>
        </form>
      </CheckoutForm>
      
      {/* Order Summary */}
      <OrderSummary>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Order Summary</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          {items.map(item => (
            <OrderItem key={item.id}>
              <ItemDetails>
                <h4>{item.name}</h4>
                <p>{item.brand}</p>
                <p>{item.specs}</p>
              </ItemDetails>
              <ItemPrice>
                <span className="quantity">Qty: {item.quantity}</span>
                <span className="price">Ksh.{(item.price * item.quantity).toLocaleString()}</span>
              </ItemPrice>
            </OrderItem>
          ))}
        </div>
        
        <div>
          <SummaryRow>
            <span>Subtotal ({cartCount} items)</span>
            <span>Ksh.{cartTotal.toLocaleString()}</span>
          </SummaryRow>

          <SummaryRow className="total">
            <span>Total</span>
            <span>Ksh.{cartTotal.toLocaleString()}</span>
          </SummaryRow>
        </div>
        
        <PlaceOrderButton 
          type="submit" 
          form="checkout-form"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Placing Order...' : `Place Order - Ksh.${cartTotal.toLocaleString()}`}
        </PlaceOrderButton>
      </OrderSummary>
    </CheckoutContainer>
  );
};

export default Checkout;
