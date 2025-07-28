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
        {/* Header */}
        <motion.section 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-dm-serif font-bold mb-4 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            AI Search Results
          </h1>
          {query && (
            <p className="text-lg font-lora text-[#E05264] max-w-2xl mx-auto">
              Intelligent search results for: <span className="font-semibold">"{query}"</span>
            </p>
          )}
        </motion.section>

        {/* Search Component */}
        <SmartSearchComponent initialQuery={query} />
      </div>
    </div>
  );
};

export default SearchResults;
