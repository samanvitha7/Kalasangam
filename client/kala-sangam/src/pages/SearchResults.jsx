import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SmartSearchComponent from '../components/SmartSearchComponent';
import FullBleedDivider from '../components/FullBleedDivider';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q');

  useEffect(() => {
    // If no query parameter, redirect to home
    if (!query) {
      navigate('/');
    }
  }, [query, navigate]);

  return (
    <div className="min-h-screen bg-[#F8E6DA] pb-8">
      <FullBleedDivider />
      
      <div className="container mx-auto px-4 pt-20">
        {/* Search Component */}
        <SmartSearchComponent initialQuery={query} />
      </div>
    </div>
  );
};

export default SearchResults;
