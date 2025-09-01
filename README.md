# ExactMatch - Car Battery E-commerce Platform

A modern, full-stack e-commerce platform for car batteries built with Django REST Framework and React.

## 🚀 Features

### Backend (Django REST Framework)
- **RESTful API** with comprehensive battery data management
- **Battery Models**: Complete specifications including voltage, capacity, CCA, dimensions
- **Brand & Category Management**: Organized product catalog
- **Order Management**: Full order processing system
- **Review System**: Customer reviews and ratings
- **Inquiry System**: Customer inquiries and support
- **Admin Interface**: Easy content management
- **CORS Support**: Seamless frontend-backend communication

### Frontend (React + Vite)
- **Modern UI**: Dark theme with responsive design
- **Product Catalog**: Dynamic product listings from API
- **Search & Filter**: Find batteries by specifications
- **Featured Products**: Highlight popular items
- **Category Browse**: Browse by battery type and brand
- **Shopping Cart**: Add to cart functionality (in progress)
- **Mobile Responsive**: Works on all devices

## 🛠️ Technology Stack

### Backend
- **Django 5.2.5** - Web framework
- **Django REST Framework** - API development
- **SQLite** - Database (development)
- **Django CORS Headers** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **Lucide React** - Icon library

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd exactmatch-backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers
   ```

4. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Create superuser:
   ```bash
   python manage.py createsuperuser
   ```

6. Populate sample data:
   ```bash
   python manage.py populate_sample_data
   ```

7. Start the development server:
   ```bash
   python manage.py runserver
   ```

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

Frontend will be available at `http://localhost:5174` (or another port if 5174 is in use)

## 📁 Project Structure

```
Exact-Match/
├── exactmatch-backend/          # Django backend
│   ├── backend/                 # Project settings
│   ├── batteries/               # Main app
│   │   ├── models.py           # Database models
│   │   ├── serializers.py      # API serializers
│   │   ├── views.py            # API views
│   │   ├── urls.py             # URL routing
│   │   └── management/         # Custom commands
│   ├── env/                    # Virtual environment
│   └── manage.py               # Django management
└── frontend/                   # React frontend
    ├── src/
    │   ├── components/         # Reusable components
    │   ├── pages/              # Page components
    │   ├── services/           # API services
    │   ├── hooks/              # Custom hooks
    │   └── styles/             # Global styles
    ├── public/                 # Static assets
    └── package.json            # Dependencies
```

## 🔌 API Endpoints

### Batteries
- `GET /api/batteries/` - List all batteries
- `GET /api/batteries/featured/` - Featured batteries
- `GET /api/batteries/popular/` - Popular batteries
- `GET /api/batteries/{id}/` - Battery details
- `GET /api/batteries/search/` - Search batteries

### Categories & Brands
- `GET /api/categories/` - List categories
- `GET /api/brands/` - List brands

### Orders & Reviews
- `POST /api/orders/` - Create order
- `POST /api/reviews/` - Create review
- `POST /api/inquiries/` - Create inquiry

## 🎨 Design Features

- **Dark Theme**: Modern dark UI inspired by the provided design
- **Responsive Layout**: Mobile-first design approach
- **Component Architecture**: Modular and reusable components
- **Real-time Data**: Dynamic content from Django API
- **Professional Typography**: Inter font family
- **Smooth Animations**: Hover effects and transitions

## 🚧 In Progress

- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] User authentication
- [ ] Product detail pages
- [ ] Search functionality
- [ ] Filter by specifications
- [ ] User reviews display
- [ ] Order tracking
- [ ] Payment integration


## 🎯 Next Steps

1. **Complete Cart System**: Implement shopping cart state management
2. **User Authentication**: Add login/register functionality
3. **Product Details**: Create detailed product pages
4. **Search & Filter**: Advanced search capabilities
5. **Payment Integration**: Stripe or Mpesa integration
6. **Admin Dashboard**: Enhanced admin interface
7. **Analytics**: User behavior tracking
9. **SEO Optimization**: Server-side rendering
10. **Testing**: Unit and integration tests
An E-commerce site that allows users o buy and sell car batteries
