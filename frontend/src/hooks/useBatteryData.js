import { useState, useEffect } from 'react';
import { batteryAPI, categoryAPI, brandAPI } from '../services/api';

export const useBatteries = (filters = {}) => {
  const [batteries, setBatteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatteries = async () => {
      try {
        setLoading(true);
        const response = await batteryAPI.getBatteries(filters);
        setBatteries(response.data.results || response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching batteries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBatteries();
  }, [JSON.stringify(filters)]);

  return { batteries, loading, error };
};

export const useFeaturedBatteries = () => {
  const [batteries, setBatteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedBatteries = async () => {
      try {
        setLoading(true);
        const response = await batteryAPI.getFeaturedBatteries();
        setBatteries(response.data.results || response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching featured batteries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBatteries();
  }, []);

  return { batteries, loading, error };
};

export const usePopularBatteries = () => {
  const [batteries, setBatteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularBatteries = async () => {
      try {
        setLoading(true);
        const response = await batteryAPI.getPopularBatteries();
        setBatteries(response.data.results || response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching popular batteries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularBatteries();
  }, []);

  return { batteries, loading, error };
};

export const useCategories = (categoryType = null) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const params = categoryType ? { type: categoryType } : {};
        const response = await categoryAPI.getCategories(params);
        setCategories(response.data.results || response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categoryType]);

  return { categories, loading, error };
};

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await brandAPI.getBrands();
        setBrands(response.data.results || response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching brands:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};

// Hook for filtering categories by type
export const useCategoriesByType = () => {
  const [categoriesData, setCategoriesData] = useState({
    vehicle_type: [],
    battery_type: [],
    use_case: [],
    brand_series: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriesByType = async () => {
      try {
        setLoading(true);
        const categoryTypes = ['vehicle_type', 'battery_type', 'use_case', 'brand_series'];
        
        const promises = categoryTypes.map(type =>
          categoryAPI.getCategoriesByType(type)
        );
        
        const responses = await Promise.all(promises);
        
        const newCategoriesData = {};
        categoryTypes.forEach((type, index) => {
          newCategoriesData[type] = responses[index].data.results || responses[index].data;
        });
        
        setCategoriesData(newCategoriesData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching categories by type:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesByType();
  }, []);

  return { categoriesData, loading, error };
};
