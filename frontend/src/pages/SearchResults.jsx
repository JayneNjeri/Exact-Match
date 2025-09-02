import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';
import styled from 'styled-components';
import BatteryCard from '../components/BatteryCard';
import { searchBatteries } from '../services/api';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const SearchHeader = styled.div`
  margin-bottom: 2rem;
`;

const SearchTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const SearchInfo = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
`;

const SearchControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex: 1;
  max-width: 500px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  background-color: var(--card-bg);
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  z-index: 1;
`;

const ViewControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ViewButton = styled.button`
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  background-color: ${props => props.$active ? 'var(--primary-color)' : 'var(--card-bg)'};
  color: ${props => props.$active ? 'white' : 'var(--text-primary)'};
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-color)' : 'var(--bg-secondary)'};
  }
`;

const ResultsCount = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const BatteriesGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$view === 'grid' 
    ? 'repeat(auto-fill, minmax(300px, 1fr))' 
    : '1fr'};
  gap: 1.5rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
`;

const NoResultsTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const NoResultsText = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const SuggestionsTitle = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const Suggestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const Suggestion = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  color: var(--text-secondary);
`;

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [batteries, setBatteries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [totalResults, setTotalResults] = useState(0);

    const suggestions = [
    'Amaron',
    'Bike Power',
    'PowerMax',
    'Chloride Exide',
    '5AH',
    '90AH'
  ];

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query) => {
    if (!query.trim()) return;
    
    console.log('Performing search for:', query);
    setLoading(true);
    try {
      const response = await searchBatteries(query);
      console.log('Search API response:', response);
      console.log('Response data:', response.data);
      
      // The response is wrapped in a .data property due to axios
      const data = response.data;
      const batteries = data.results || data || [];
      
      setBatteries(batteries);
      setTotalResults(data.count || batteries.length || 0);
      console.log('Batteries set:', batteries);
    } catch (error) {
      console.error('Search error:', error);
      setBatteries([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchParams({ q: suggestion });
  };

  const currentQuery = searchParams.get('q');

  return (
    <Container>
      <SearchHeader>
        <SearchTitle>Search Results</SearchTitle>
        {currentQuery && (
          <SearchInfo>
            {loading ? 'Searching...' : 
             totalResults > 0 ? 
             `Found ${totalResults} result${totalResults !== 1 ? 's' : ''} for "${currentQuery}"` :
             `No results found for "${currentQuery}"`
            }
          </SearchInfo>
        )}
      </SearchHeader>

      <SearchControls>
        <SearchForm onSubmit={handleSearch}>
          <SearchIcon size={20} />
          <SearchInput
            type="text"
            placeholder="Search for car batteries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchForm>

        <ViewControls>
          <ViewButton
            $active={view === 'grid'}
            onClick={() => setView('grid')}
            title="Grid view"
          >
            <Grid size={18} />
          </ViewButton>
          <ViewButton
            $active={view === 'list'}
            onClick={() => setView('list')}
            title="List view"
          >
            <List size={18} />
          </ViewButton>
        </ViewControls>
      </SearchControls>

      {loading ? (
        <LoadingSpinner>
          <div>Searching for batteries...</div>
        </LoadingSpinner>
      ) : currentQuery ? (
        <>
          <ResultsCount>
            {totalResults > 0 
              ? `Found ${totalResults} ${totalResults === 1 ? 'battery' : 'batteries'}`
              : 'No batteries found'
            }
          </ResultsCount>

          {batteries.length > 0 ? (
            <BatteriesGrid $view={view}>
              {batteries.map((battery) => (
                <BatteryCard
                  key={battery.id}
                  battery={battery}
                  view={view}
                />
              ))}
            </BatteriesGrid>
          ) : currentQuery && (
            <NoResults>
              <NoResultsTitle>No batteries found</NoResultsTitle>
              <NoResultsText>
                We couldn't find any batteries matching "{currentQuery}". 
                Try adjusting your search or browse our suggestions below.
              </NoResultsText>
              <SuggestionsTitle>Popular searches:</SuggestionsTitle>
              <Suggestions>
                {suggestions.map((suggestion) => (
                  <Suggestion
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Suggestion>
                ))}
              </Suggestions>
            </NoResults>
          )}
        </>
      ) : (
        <NoResults>
          <NoResultsTitle>Start your search</NoResultsTitle>
          <NoResultsText>
            Enter a search term above to find the perfect battery for your vehicle.
          </NoResultsText>
          <SuggestionsTitle>Popular searches:</SuggestionsTitle>
          <Suggestions>
            {suggestions.map((suggestion) => (
              <Suggestion
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Suggestion>
            ))}
          </Suggestions>
        </NoResults>
      )}
    </Container>
  );
};

export default SearchResults;
