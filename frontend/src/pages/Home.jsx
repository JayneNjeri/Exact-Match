import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Truck, Shield, Clock } from 'lucide-react';
import styled from 'styled-components';
import { useFeaturedBatteries, useBatteries } from '../hooks/useBatteryData';
import BatteryCard from '../components/BatteryCard';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--darker-bg) 0%, var(--dark-bg) 100%);
  padding: 4rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Section = styled.section`
  padding: 3rem 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-primary);
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FeaturesSection = styled.section`
  background-color: var(--card-bg);
  padding: 4rem 0;
  margin: 4rem 0;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const Home = () => {
  const { batteries: featuredBatteries, loading: featuredLoading } = useFeaturedBatteries();
  const { batteries: allBatteries, loading: allLoading } = useBatteries();

  const handleAddToCart = (battery) => {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', battery);
  };

  if (featuredLoading && allLoading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Get Your Dream Car Battery</HeroTitle>
          <HeroSubtitle>
            Find the exact battery match for your vehicle. Premium quality, 
            competitive prices, and fast delivery guaranteed.
          </HeroSubtitle>
          <div className="flex justify-center gap-4">
            <Link to="/categories" className="btn btn-primary">
              Shop Now
            </Link>
            <Link to="/how-it-works" className="btn btn-secondary">
              How it Works
            </Link>
          </div>
        </HeroContent>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        <SectionTitle>Why Choose ExactMatch?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <Search size={32} />
            </FeatureIcon>
            <FeatureTitle>Easy Vehicle Search</FeatureTitle>
            <FeatureDescription>
              Simply enter your vehicle details and we'll find the perfect battery match.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <Shield size={32} />
            </FeatureIcon>
            <FeatureTitle>Quality Guarantee</FeatureTitle>
            <FeatureDescription>
              All our batteries come with manufacturer warranty and our quality promise.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <Truck size={32} />
            </FeatureIcon>
            <FeatureTitle>Fast Delivery</FeatureTitle>
            <FeatureDescription>
              Free shipping on orders over $150. Get your battery delivered within 2-3 days.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <Clock size={32} />
            </FeatureIcon>
            <FeatureTitle>Expert Support</FeatureTitle>
            <FeatureDescription>
              Our battery experts are available 24/7 to help you choose the right battery.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      {/* Popular Products */}
      <Section>
        <SectionTitle>Popular Choices</SectionTitle>
        <ProductGrid>
          {allBatteries.slice(0, 4).map(battery => (
            <BatteryCard 
              key={battery.id} 
              battery={battery} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </ProductGrid>
        <div className="text-center mt-8">
          <Link to="/categories" className="btn btn-primary">
            View All Batteries
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Home;
