import React, { useState, useEffect, useRef } from "react";
import { searchData } from "./searchdata";
import { useNavigate } from "react-router-dom";
import search from '@/assets/icons/search.svg';
import filtericon from '@/assets/icons/filter.svg';
const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [results, setResults] = useState<{ title: string; path: string; category: string }[]>([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const updateResults = (searchText: string, selectedFilter: string) => {
    let filteredResults = searchData;

    if (selectedFilter !== "All") {
      filteredResults = filteredResults.filter(item => item.category === selectedFilter);
    }

    if (searchText.trim()) {
      filteredResults = filteredResults.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
    }

    setResults(filteredResults);
    setShowResultsDropdown(filteredResults.length > 0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    updateResults(value, filter);
  };

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
    setShowFilterDropdown(false); 
    updateResults(query, selectedFilter);
  };

  const handleSelect = (path: string) => {
    navigate(path);
    setQuery("");
    setResults([]);
    setShowResultsDropdown(false);
  };

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current && !filterRef.current.contains(event.target as Node) &&
        searchRef.current && !searchRef.current.contains(event.target as Node)
      ) {
        setShowFilterDropdown(false);
        setShowResultsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div  className= "relative w-full  mx-auto hidden md:block" ref={searchRef}>
      <div className="flex items-center  border rounded-4xl mx-10 px-5 w-[25vw]">
        <img src={search} alt="search icon"/>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search here"
          className="w-full p-2 outline-none placeholder-light-SearchBar-placeholder-color font-primary-medium mx-5"
        />
        
        <div 
          className="relative ml-2 cursor-pointer"
          ref={filterRef}
        >
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center justify-center w-8 h-8 cursor-pointer "
          >
            <img src={filtericon} alt= "filter icon" />
          </button>
          {showFilterDropdown && (
            <div 
              className="absolute bg-white border shadow-md rounded p-2 mt-1 w-40"
            >
              {["All", "Pages", "Sections"].map((option) => (
                <p
                  key={option}
                  className={`cursor-pointer p-1 hover:bg-gray-200 ${filter === option ? "font-bold" : ""}`}
                  onClick={() => handleFilterChange(option)}
                >
                  {option}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {showResultsDropdown && results.length > 0 && (
        <ul className="absolute left-20 right-24 bg-white border shadow-md mt-1 rounded">
          {results.map((item) => (
            <li
              key={item.path}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(item.path)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
