import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';
import ThemeToggle from './ThemeToggle';

const HeaderContainer = styled.header`
  background-color: var(--darker-bg);
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--card-bg);
  border-radius: var(--radius-md);
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  min-width: 300px;
  
  @media (max-width: 768px) {
    min-width: 200px;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  width: 100%;
  margin-left: 0.5rem;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const CartButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--darker-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem;
  z-index: 1000;
  
  &.open {
    display: block;
  }
  
  @media (min-width: 769px) {
    display: none !important;
  }
`;

const MobileMenuOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  
  &.open {
    display: block;
  }
  
  @media (min-width: 769px) {
    display: none !important;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileSearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--card-bg);
  border-radius: var(--radius-md);
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
`;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search after submitting
      setIsMobileMenuOpen(false); // Close mobile menu when search is performed
    }
  };

  return (
    <HeaderContainer ref={mobileMenuRef}>
      <Nav>
        <Logo to="/">
          🔋 ExactMatch
        </Logo>
        
        <form onSubmit={handleSearch}>
          <SearchContainer>
            <Search size={20} color="var(--text-muted)" />
            <SearchInput
              type="text"
              placeholder="Search for car batteries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
        </form>
        
                <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/browse">Browse</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/brands">Brands</NavLink>
        </NavLinks>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeToggle />
          <CartButton to="/cart">
            <ShoppingCart size={20} />
            Cart ({cartCount})
          </CartButton>
        </div>
        
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </Nav>
      
      <MobileMenu className={isMobileMenuOpen ? 'open' : ''}>
        <MobileSearchContainer>
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Search size={20} color="var(--text-muted)" />
            <SearchInput
              type="text"
              placeholder="Search batteries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </MobileSearchContainer>
        
        <MobileNavLinks>
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/browse" onClick={() => setIsMobileMenuOpen(false)}>Browse</NavLink>
          <NavLink to="/categories" onClick={() => setIsMobileMenuOpen(false)}>Categories</NavLink>
          <NavLink to="/brands" onClick={() => setIsMobileMenuOpen(false)}>Brands</NavLink>
          <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center' }}>
            <ThemeToggle />
          </div>
        </MobileNavLinks>
      </MobileMenu>
      
      {/* Overlay for mobile menu */}
      <MobileMenuOverlay 
        className={isMobileMenuOpen ? 'open' : ''} 
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </HeaderContainer>
  );
};

export default Header;
