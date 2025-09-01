import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, List, SortAsc, SortDesc } from 'lucide-react';
import { useBatteries } from '../hooks/useBatteryData';
import BatteryCard from '../components/BatteryCard';
import FilterPanel from '../components/FilterPanel';

const BrowseContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const PageSubtitle = styled.p`
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const BrowseLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FilterSidebar = styled.aside`
  @media (max-width: 1024px) {
    order: 2;
  }
`;

const MainContent = styled.main`
  @media (max-width: 1024px) {
    order: 1;
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const ResultsInfo = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const ResultsControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
`;

const ViewButton = styled.button`
  padding: 0.5rem;
  border: none;
  background-color: ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-color)' : 'var(--bg-secondary)'};
  }
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const BatteriesGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => 
    props.view === 'grid' 
      ? 'repeat(auto-fill, minmax(280px, 1fr))'
      : '1fr'
  };
  gap: ${props => props.view === 'grid' ? '1.5rem' : '1rem'};
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 4rem;
  color: var(--text-secondary);
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem;
  color: var(--text-secondary);
  
  h3 {
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--bg-secondary);
    border-color: var(--primary-color);
  }
`;

const BrowseBatteries = () => {
  const [filters, setFilters] = useState({
    search: '',
    vehicle_search: '',
    categories: [],
    brands: [],
    min_price: '',
    max_price: '',
    min_amp_hours: '',
    max_amp_hours: '',
    min_cca: '',
    max_cca: '',
    condition: '',
    voltage: '',
    in_stock: false,
    ordering: '-created_at'
  });

  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const [appliedFilters, setAppliedFilters] = useState({});

  const { batteries, loading, error } = useBatteries(appliedFilters);

  const handleFiltersChange = (newFilters) => {
    // Clean up empty filters
    const cleanFilters = {};
    Object.keys(newFilters).forEach(key => {
      const value = newFilters[key];
      if (value !== '' && value !== null && value !== undefined) {
        if (Array.isArray(value) && value.length > 0) {
          cleanFilters[key] = value;
        } else if (!Array.isArray(value)) {
          cleanFilters[key] = value;
        }
      }
    });

    setAppliedFilters(cleanFilters);
    setFilters(newFilters);
  };

  const handleSortChange = (e) => {
    const ordering = e.target.value;
    const newFilters = { ...appliedFilters, ordering };
    setAppliedFilters(newFilters);
    setFilters(prev => ({ ...prev, ordering }));
  };

  const sortOptions = [
    { value: '-created_at', label: 'Newest First' },
    { value: 'created_at', label: 'Oldest First' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' },
    { value: '-name', label: 'Name Z-A' },
    { value: '-amp_hours', label: 'Capacity: High to Low' },
    { value: 'amp_hours', label: 'Capacity: Low to High' },
    { value: '-cold_cranking_amps', label: 'CCA: High to Low' },
    { value: 'cold_cranking_amps', label: 'CCA: Low to High' }
  ];

  if (error) {
    return (
      <BrowseContainer>
        <NoResults>
          <h3>Error Loading Batteries</h3>
          <p>{error}</p>
        </NoResults>
      </BrowseContainer>
    );
  }

  return (
    <BrowseContainer>
      <PageHeader>
        <PageTitle>Browse Car Batteries</PageTitle>
        <PageSubtitle>
          Find the perfect battery for your vehicle with our advanced filtering system
        </PageSubtitle>
      </PageHeader>

      <BrowseLayout>
        <FilterSidebar>
          <FilterPanel 
            filters={filters}
            onFiltersChange={handleFiltersChange}
            appliedFilters={appliedFilters}
          />
        </FilterSidebar>

        <MainContent>
          <ResultsHeader>
            <ResultsInfo>
              {loading ? (
                'Loading batteries...'
              ) : (
                `${batteries.length} ${batteries.length === 1 ? 'battery' : 'batteries'} found`
              )}
            </ResultsInfo>
            
            <ResultsControls>
              <ViewToggle>
                <ViewButton 
                  $active={view === 'grid'} 
                  onClick={() => setView('grid')}
                  title="Grid View"
                >
                  <Grid size={16} />
                </ViewButton>
                <ViewButton 
                  $active={view === 'list'} 
                  onClick={() => setView('list')}
                  title="List View"
                >
                  <List size={16} />
                </ViewButton>
              </ViewToggle>

              <SortSelect 
                value={filters.ordering} 
                onChange={handleSortChange}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SortSelect>
            </ResultsControls>
          </ResultsHeader>

          {loading ? (
            <LoadingContainer>
              <h3>Loading batteries...</h3>
              <p>Please wait while we fetch the latest battery data.</p>
            </LoadingContainer>
          ) : batteries.length === 0 ? (
            <NoResults>
              <h3>No batteries found</h3>
              <p>Try adjusting your filters or search terms to find more results.</p>
            </NoResults>
          ) : (
            <>
              <BatteriesGrid view={view}>
                {batteries.map(battery => (
                  <BatteryCard 
                    key={battery.id} 
                    battery={battery} 
                    view={view}
                  />
                ))}
              </BatteriesGrid>
              
              {/* Placeholder for pagination */}
              {batteries.length >= 12 && (
                <LoadMoreButton>
                  Load More Batteries
                </LoadMoreButton>
              )}
            </>
          )}
        </MainContent>
      </BrowseLayout>
    </BrowseContainer>
  );
};

export default BrowseBatteries;
