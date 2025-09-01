import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useCategoriesByType, useBrands } from '../hooks/useBatteryData';

const FilterContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: 1.5rem;
`;

const FilterTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.875rem;
  text-decoration: underline;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const SearchSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  width: 1rem;
  height: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h4`
  margin: 0;
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FilterGrid = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const FilterCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.25rem 0;
  
  input {
    margin: 0;
  }
`;

const FilterLabel = styled.span`
  color: var(--text-secondary);
  font-size: 0.875rem;
  flex: 1;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const FilterCount = styled.span`
  color: var(--text-secondary);
  font-size: 0.75rem;
  background-color: var(--bg-secondary);
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-sm);
`;

const PriceRangeSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const PriceInput = styled(Input)`
  padding: 0.5rem;
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--accent-color);
  }
`;

const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActiveFilter = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
`;

const RemoveFilter = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const FilterPanel = ({ filters, onFiltersChange, appliedFilters = {} }) => {
  const { categoriesData, loading: categoriesLoading } = useCategoriesByType();
  const { brands, loading: brandsLoading } = useBrands();
  
  const [localFilters, setLocalFilters] = useState({
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
    ...filters
  });

  const [expandedSections, setExpandedSections] = useState({
    vehicle_type: true,
    battery_type: true,
    use_case: false,
    brand_series: false,
    brands: false,
    specs: false
  });

  useEffect(() => {
    setLocalFilters(prev => ({ ...prev, ...filters }));
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCategoryToggle = (categoryId) => {
    setLocalFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleBrandToggle = (brandId) => {
    setLocalFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brandId)
        ? prev.brands.filter(id => id !== brandId)
        : [...prev.brands, brandId]
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
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
      in_stock: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const removeActiveFilter = (key, value = null) => {
    if (key === 'categories' || key === 'brands') {
      handleFilterChange(key, localFilters[key].filter(id => id !== value));
    } else {
      handleFilterChange(key, Array.isArray(localFilters[key]) ? [] : '');
    }
    // Apply immediately when removing
    setTimeout(applyFilters, 0);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.search) count++;
    if (localFilters.vehicle_search) count++;
    count += localFilters.categories.length;
    count += localFilters.brands.length;
    if (localFilters.min_price || localFilters.max_price) count++;
    if (localFilters.min_amp_hours || localFilters.max_amp_hours) count++;
    if (localFilters.min_cca || localFilters.max_cca) count++;
    if (localFilters.condition) count++;
    if (localFilters.voltage) count++;
    if (localFilters.in_stock) count++;
    return count;
  };

  const renderCategorySection = (categoryType, title) => {
    const categories = categoriesData[categoryType] || [];
    const isExpanded = expandedSections[categoryType];

    return (
      <FilterSection key={categoryType}>
        <SectionHeader onClick={() => toggleSection(categoryType)}>
          <SectionTitle>{title}</SectionTitle>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </SectionHeader>
        {isExpanded && (
          <FilterGrid>
            {categories.map(category => (
              <FilterCheckbox key={category.id}>
                <input
                  type="checkbox"
                  checked={localFilters.categories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                />
                <FilterLabel>{category.name}</FilterLabel>
                <FilterCount>{category.battery_count}</FilterCount>
              </FilterCheckbox>
            ))}
          </FilterGrid>
        )}
      </FilterSection>
    );
  };

  if (categoriesLoading || brandsLoading) {
    return (
      <FilterContainer>
        <FilterTitle>Loading filters...</FilterTitle>
      </FilterContainer>
    );
  }

  return (
    <FilterContainer>
      <FilterHeader>
        <FilterTitle>
          <Filter size={18} />
          Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
        </FilterTitle>
        {getActiveFiltersCount() > 0 && (
          <ClearButton onClick={clearAllFilters}>Clear All</ClearButton>
        )}
      </FilterHeader>

      <SearchSection>
        <SearchInput>
          <SearchIcon />
          <Input
            type="text"
            placeholder="Search batteries..."
            value={localFilters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </SearchInput>
        <SearchInput>
          <SearchIcon />
          <Input
            type="text"
            placeholder="Search by vehicle (e.g., Toyota Corolla)..."
            value={localFilters.vehicle_search}
            onChange={(e) => handleFilterChange('vehicle_search', e.target.value)}
          />
        </SearchInput>
      </SearchSection>

      {renderCategorySection('vehicle_type', 'Vehicle Type')}
      {renderCategorySection('battery_type', 'Battery Type')}
      {renderCategorySection('use_case', 'Use Case')}
      {renderCategorySection('brand_series', 'Brand Series')}

      <FilterSection>
        <SectionHeader onClick={() => toggleSection('brands')}>
          <SectionTitle>Brands</SectionTitle>
          {expandedSections.brands ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </SectionHeader>
        {expandedSections.brands && (
          <FilterGrid>
            {brands.map(brand => (
              <FilterCheckbox key={brand.id}>
                <input
                  type="checkbox"
                  checked={localFilters.brands.includes(brand.id)}
                  onChange={() => handleBrandToggle(brand.id)}
                />
                <FilterLabel>{brand.name}</FilterLabel>
                <FilterCount>{brand.battery_count}</FilterCount>
              </FilterCheckbox>
            ))}
          </FilterGrid>
        )}
      </FilterSection>

      <FilterSection>
        <SectionHeader onClick={() => toggleSection('specs')}>
          <SectionTitle>Specifications</SectionTitle>
          {expandedSections.specs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </SectionHeader>
        {expandedSections.specs && (
          <div>
            <FilterGrid>
              <FilterCheckbox>
                <input
                  type="checkbox"
                  checked={localFilters.in_stock}
                  onChange={(e) => handleFilterChange('in_stock', e.target.checked)}
                />
                <FilterLabel>In Stock Only</FilterLabel>
              </FilterCheckbox>
            </FilterGrid>
            
            <PriceRangeSection>
              <PriceInput
                type="number"
                placeholder="Min Price"
                value={localFilters.min_price}
                onChange={(e) => handleFilterChange('min_price', e.target.value)}
              />
              <PriceInput
                type="number"
                placeholder="Max Price"
                value={localFilters.max_price}
                onChange={(e) => handleFilterChange('max_price', e.target.value)}
              />
            </PriceRangeSection>

            <PriceRangeSection>
              <PriceInput
                type="number"
                placeholder="Min Amp Hours"
                value={localFilters.min_amp_hours}
                onChange={(e) => handleFilterChange('min_amp_hours', e.target.value)}
              />
              <PriceInput
                type="number"
                placeholder="Max Amp Hours"
                value={localFilters.max_amp_hours}
                onChange={(e) => handleFilterChange('max_amp_hours', e.target.value)}
              />
            </PriceRangeSection>

            <PriceRangeSection>
              <PriceInput
                type="number"
                placeholder="Min CCA"
                value={localFilters.min_cca}
                onChange={(e) => handleFilterChange('min_cca', e.target.value)}
              />
              <PriceInput
                type="number"
                placeholder="Max CCA"
                value={localFilters.max_cca}
                onChange={(e) => handleFilterChange('max_cca', e.target.value)}
              />
            </PriceRangeSection>
          </div>
        )}
      </FilterSection>

      <ApplyButton onClick={applyFilters}>
        Apply Filters
      </ApplyButton>

      {getActiveFiltersCount() > 0 && (
        <ActiveFilters>
          {localFilters.search && (
            <ActiveFilter>
              Search: {localFilters.search}
              <RemoveFilter onClick={() => removeActiveFilter('search')}>
                <X size={12} />
              </RemoveFilter>
            </ActiveFilter>
          )}
          {localFilters.vehicle_search && (
            <ActiveFilter>
              Vehicle: {localFilters.vehicle_search}
              <RemoveFilter onClick={() => removeActiveFilter('vehicle_search')}>
                <X size={12} />
              </RemoveFilter>
            </ActiveFilter>
          )}
          {localFilters.categories.map(categoryId => {
            const category = Object.values(categoriesData).flat().find(c => c.id === categoryId);
            return category ? (
              <ActiveFilter key={categoryId}>
                {category.name}
                <RemoveFilter onClick={() => removeActiveFilter('categories', categoryId)}>
                  <X size={12} />
                </RemoveFilter>
              </ActiveFilter>
            ) : null;
          })}
          {localFilters.brands.map(brandId => {
            const brand = brands.find(b => b.id === brandId);
            return brand ? (
              <ActiveFilter key={brandId}>
                {brand.name}
                <RemoveFilter onClick={() => removeActiveFilter('brands', brandId)}>
                  <X size={12} />
                </RemoveFilter>
              </ActiveFilter>
            ) : null;
          })}
        </ActiveFilters>
      )}
    </FilterContainer>
  );
};

export default FilterPanel;
