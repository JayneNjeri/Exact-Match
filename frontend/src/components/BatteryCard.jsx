import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';

const ProductCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  display: ${props => props.$view === 'list' ? 'flex' : 'block'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary-color);
  }
`;

const ProductImage = styled.div`
  height: ${props => props.$view === 'list' ? '120px' : '200px'};
  width: ${props => props.$view === 'list' ? '120px' : '100%'};
  flex-shrink: 0;
  background: linear-gradient(135deg, #333, #555);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.$view === 'list' ? '2rem' : '3rem'};
  position: relative;
  
  .badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: var(--accent-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 600;
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: ${props => props.$view === 'list' ? 'flex' : 'block'};
  flex-direction: ${props => props.$view === 'list' ? 'column' : 'initial'};
  justify-content: ${props => props.$view === 'list' ? 'space-between' : 'initial'};
`;

const ProductHeader = styled.div`
  ${props => props.$view === 'list' && `
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  `}
`;

const ProductDetails = styled.div`
  ${props => props.$view === 'list' && `
    flex: 1;
  `}
`;

const ProductActions = styled.div`
  ${props => props.$view === 'list' && `
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  `}
`;

const ProductTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const ProductBrand = styled.div`
  color: var(--primary-color);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ProductSpecs = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
`;

const StockInfo = styled.div`
  color: ${props => props.$inStock ? 'var(--success-color)' : 'var(--error-color)'};
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: var(--text-muted);
    cursor: not-allowed;
    transform: none;
  }
`;

const BatteryCard = ({ battery, view = 'grid' }) => {
  const { addToCart, isInCart } = useCart();
  const isInStock = battery.stock_quantity > 0;
  const alreadyInCart = isInCart(battery.id);

  const handleAddToCart = () => {
    if (isInStock && !alreadyInCart) {
      addToCart(battery);
    }
  };
  
  return (
    <ProductCard $view={view}>
      <ProductImage $view={view}>
        🔋
        {battery.is_featured && <div className="badge">Featured</div>}
      </ProductImage>
      <ProductInfo $view={view}>
        {view === 'list' ? (
          <>
            <ProductHeader $view={view}>
              <ProductDetails $view={view}>
                <ProductBrand>{battery.brand.name}</ProductBrand>
                <ProductTitle>
                  <Link 
                    to={`/product/${battery.id}`} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {battery.name}
                  </Link>
                </ProductTitle>
                <ProductSpecs>
                  {battery.voltage} • {battery.amp_hours}Ah • {battery.cold_cranking_amps}A CCA
                </ProductSpecs>
                {battery.categories && battery.categories.length > 0 && (
                  <ProductSpecs>
                    Categories: {battery.categories.map(cat => cat.name).join(', ')}
                  </ProductSpecs>
                )}
              </ProductDetails>
              <ProductPrice>
                <Price>Ksh.{battery.price}</Price>
              </ProductPrice>
            </ProductHeader>
            <ProductActions $view={view}>
              <StockInfo $inStock={isInStock}>
                {isInStock ? `${battery.stock_quantity} in stock` : 'Out of stock'}
              </StockInfo>
              <AddToCartButton 
                disabled={!isInStock || alreadyInCart}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={16} />
                {!isInStock ? 'Out of Stock' : alreadyInCart ? 'In Cart' : 'Add to Cart'}
              </AddToCartButton>
            </ProductActions>
          </>
        ) : (
          <>
            <ProductBrand>{battery.brand.name}</ProductBrand>
            <ProductTitle>
              <Link 
                to={`/product/${battery.id}`} 
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {battery.name}
              </Link>
            </ProductTitle>
            <ProductSpecs>
              {battery.voltage} • {battery.amp_hours}Ah • {battery.cold_cranking_amps}A CCA
            </ProductSpecs>
            <StockInfo $inStock={isInStock}>
              {isInStock ? `${battery.stock_quantity} in stock` : 'Out of stock'}
            </StockInfo>
            <ProductPrice>
              <Price>Ksh.{battery.price}</Price>
            </ProductPrice>
            <AddToCartButton 
              disabled={!isInStock || alreadyInCart}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              {!isInStock ? 'Out of Stock' : alreadyInCart ? 'In Cart' : 'Add to Cart'}
            </AddToCartButton>
          </>
        )}
      </ProductInfo>
    </ProductCard>
  );
};

export default BatteryCard;
