import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useBrands } from '../hooks/useBatteryData';

const BrandsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const PageSubtitle = styled.p`
  text-align: center;
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const BrandCard = styled(Link)`
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary-color);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  }
`;

const BrandIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

const BrandName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
`;

const BrandDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.925rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const BrandStats = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  margin-top: 1rem;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 4rem;
  color: var(--text-secondary);
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 4rem;
  color: var(--error-color);
`;

const Brands = () => {
  const { brands, loading, error } = useBrands();

  if (loading) {
    return (
      <LoadingContainer>
        <h2>Loading brands...</h2>
        <p>Please wait while we fetch the latest brand information.</p>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <h2>Error loading brands</h2>
        <p>{error}</p>
      </ErrorContainer>
    );
  }

  return (
    <BrandsContainer>
      <PageTitle>Battery Brands</PageTitle>
      <PageSubtitle>
        Discover premium battery brands from trusted manufacturers worldwide
      </PageSubtitle>
      
      <Grid>
        {brands.map(brand => (
          <BrandCard key={brand.id} to={`/browse?brand=${brand.id}`}>
            <BrandIcon>🏭</BrandIcon>
            <BrandName>{brand.name}</BrandName>
            <BrandDescription>
              {brand.description || `Premium ${brand.name} batteries for all your power needs`}
            </BrandDescription>
            <BrandStats>
              <Stat>
                <StatNumber>{brand.battery_count || '10+'}</StatNumber>
                <StatLabel>Products</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>★ 4.8</StatNumber>
                <StatLabel>Rating</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>2Y</StatNumber>
                <StatLabel>Warranty</StatLabel>
              </Stat>
            </BrandStats>
          </BrandCard>
        ))}
      </Grid>
    </BrandsContainer>
  );
};

export default Brands;
