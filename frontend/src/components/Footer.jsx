import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--darker-bg);
  border-top: 1px solid var(--border-color);
  padding: 3rem 0 1rem;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: var(--text-primary);
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--card-bg);
  border-radius: 50%;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
  text-align: center;
  color: var(--text-muted);
`;

const CompanyDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>🔋 ExactMatch</h3>
            <CompanyDescription>
              Your trusted partner for premium car batteries. We provide exact matches 
              for your vehicle with guaranteed quality and performance.
            </CompanyDescription>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <Facebook size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <Twitter size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <Instagram size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/categories">Categories</FooterLink>
            <FooterLink to="/brands">Brands</FooterLink>
            <FooterLink to="/how-it-works">How it Works</FooterLink>
            <FooterLink to="/warranty">Warranty</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h3>Customer Service</h3>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/support">Technical Support</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <Phone size={16} />
              <span>+254 (712) 345-678</span>
            </ContactInfo>
            <ContactInfo>
              <Mail size={16} />
              <span>info@exactmatch.com</span>
            </ContactInfo>
            <ContactInfo>
              <MapPin size={16} />
              <span>123 Battery Street, Auto City, AC 12345</span>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>
        
        <FooterBottom>
          <p>&copy; 2025 ExactMatch. All rights reserved. | Privacy Policy | Terms of Service</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
