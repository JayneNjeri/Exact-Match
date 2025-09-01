import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import styled from 'styled-components';

const SuccessContainer = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 3rem 2rem;
  text-align: center;
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: var(--success-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
`;

const Title = styled.h1`
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.125rem;
`;

const OrderDetails = styled.div`
  background: var(--background-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin: 2rem 0;
  border: 1px solid var(--border-color);
`;

const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
  
  &.total {
    font-weight: 600;
    font-size: 1.125rem;
    color: var(--primary-color);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &.primary {
    background: var(--primary-color);
    color: white;
    
    &:hover {
      background: #0056b3;
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background: var(--secondary-color);
    color: white;
    
    &:hover {
      background: #5a6268;
    }
  }
`;

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { orderId, orderTotal } = location.state || {};
  
  // If no order data, redirect to home
  if (!orderId) {
    setTimeout(() => navigate('/'), 3000);
    return (
      <SuccessContainer>
        <Package size={64} color="var(--text-muted)" />
        <Title>No Order Found</Title>
        <Subtitle>Redirecting to home page...</Subtitle>
      </SuccessContainer>
    );
  }
  
  return (
    <SuccessContainer>
      <SuccessIcon>
        <CheckCircle size={40} color="white" />
      </SuccessIcon>
      
      <Title>Order Placed Successfully!</Title>
      <Subtitle>
        Thank you for your order. We'll send you a confirmation email shortly.
      </Subtitle>
      
      <OrderDetails>
        <OrderRow>
          <span>Order Number:</span>
          <strong>#{orderId}</strong>
        </OrderRow>
        <OrderRow>
          <span>Order Date:</span>
          <span>{new Date().toLocaleDateString()}</span>
        </OrderRow>
        <OrderRow>
          <span>Status:</span>
          <span style={{ color: 'var(--warning-color)' }}>Processing</span>
        </OrderRow>
        <OrderRow className="total">
          <span>Total Amount:</span>
          <span>Ksh.{orderTotal?.toLocaleString() || '0'}</span>
        </OrderRow>
      </OrderDetails>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>What's Next?</h3>
        <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={16} color="var(--success-color)" />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Order confirmation email sent
            </span>
          </div>
          <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={16} color="var(--warning-color)" />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Order being prepared for dispatch
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowRight size={16} color="var(--info-color)" />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Delivery within 1-3 business days
            </span>
          </div>
        </div>
      </div>
      
      <Actions>
        <Button 
          className="primary"
          onClick={() => navigate('/browse')}
        >
          Continue Shopping
          <ArrowRight size={16} />
        </Button>
        <Button 
          className="secondary"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Actions>
    </SuccessContainer>
  );
};

export default OrderSuccess;
