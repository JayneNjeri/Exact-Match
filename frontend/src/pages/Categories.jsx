import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCategories, useBrands } from '../hooks/useBatteryData';

const CategoriesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-primary);
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Card = styled(Link)`
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary-color);
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 4rem;
  color: var(--text-secondary);
`;

const Categories = () => {
  const { categories, loading: categoriesLoading } = useCategories();
  const { brands, loading: brandsLoading } = useBrands();

  if (categoriesLoading && brandsLoading) {
    return (
      <LoadingContainer>
        <h2>Loading categories and brands...</h2>
      </LoadingContainer>
    );
  }

  return (
    <CategoriesContainer>
      <PageTitle>Browse by Category & Brand</PageTitle>
      
      <Section>
        <SectionTitle>Battery Types</SectionTitle>
        <Grid>
          {categories.map(category => (
            <Card key={category.id} to={`/category/${category.id}`}>
              <CardIcon>🔋</CardIcon>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Popular Brands</SectionTitle>
        <Grid>
          {brands.map(brand => (
            <Card key={brand.id} to={`/brand/${brand.id}`}>
              <CardIcon>🏭</CardIcon>
              <CardTitle>{brand.name}</CardTitle>
              <CardDescription>{brand.description}</CardDescription>
            </Card>
          ))}
        </Grid>
      </Section>
    </CategoriesContainer>
  );
};

export default Categories;
