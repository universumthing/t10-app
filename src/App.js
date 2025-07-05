import React, { useState } from 'react';
import { Search, Bookmark, Heart, Home, User, Filter, ArrowUpDown, Globe, Camera, Calendar } from 'lucide-react';

const TastePlacesApp = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);
  const [cuisineFilter, setCuisineFilter] = useState(null);
  const [sortOrder, setSortOrder] = useState('default');

  // Sample Montreal restaurant data matching your mockups
  const restaurants = [
    {
      id: 1,
      name: "Le Serpent",
      cuisine: "Italian",
      rating: 3,
      price: 4,
      address: "237 Avenue du Parc",
      city: "Montreal, QC",
      neighborhood: "Ville Marie",
      knownFor: "Foie Gras Parfait & Lobster Risotto",
      description: "Expertly executed Italian with a Quebec twist. From the same award winning team that brought you Le Club Chasse et Pêche."
    },
    {
      id: 2,
      name: "Impasto",
      cuisine: "Italian",
      rating: 3,
      price: 3,
      address: "48 Dante Street",
      city: "Montreal, QC",
      neighborhood: "Little Italy",
      knownFor: "Fresh Pasta & Natural Wine",
      description: "Neighborhood gem serving handmade pasta in a cozy setting."
    },
    {
      id: 3,
      name: "Leméac",
      cuisine: "French",
      rating: 2,
      price: 3,
      address: "1045 Avenue Laurier Ouest",
      city: "Montreal, QC",
      neighborhood: "Outremont",
      knownFor: "Classic French Bistro",
      description: "Traditional French bistro with an extensive wine list."
    },
    {
      id: 4,
      name: "Le P'tit Plateau",
      cuisine: "French",
      rating: 2,
      price: 3,
      address: "1516 Avenue du Mont-Royal Est",
      city: "Montreal, QC",
      neighborhood: "Plateau",
      knownFor: "Brunch & French Classics",
      description: "Charming neighborhood spot known for weekend brunch."
    },
    {
      id: 5,
      name: "Furusato",
      cuisine: "Japanese",
      rating: 1,
      price: 2,
      address: "2137 Rue Mackay",
      city: "Montreal, QC",
      neighborhood: "Downtown",
      knownFor: "Authentic Ramen",
      description: "Simple, authentic Japanese ramen in a casual setting."
    },
    {
      id: 6,
      name: "Cafe Resonance",
      cuisine: "Vegan",
      rating: 2,
      price: 1,
      address: "5175 Avenue du Parc",
      city: "Montreal, QC",
      neighborhood: "Mile End",
      knownFor: "Plant-Based Comfort Food",
      description: "Cozy vegan cafe with creative plant-based dishes."
    },
    {
      id: 7,
      name: "Pho Tay Ho",
      cuisine: "Vietnamese",
      rating: 1,
      price: 2,
      address: "1609 Rue Amherst",
      city: "Montreal, QC",
      neighborhood: "Village",
      knownFor: "Traditional Pho",
      description: "Authentic Vietnamese pho in a no-frills setting."
    },
    {
      id: 8,
      name: "Replika",
      cuisine: "Turkish",
      rating: 1,
      price: 1,
      address: "252 Rue Rachel Est",
      city: "Montreal, QC",
      neighborhood: "Plateau",
      knownFor: "Turkish Coffee & Baklava",
      description: "Authentic Turkish cafe with excellent coffee and pastries."
    },
    {
      id: 9,
      name: "Pullman Wine Bar",
      cuisine: "Late Night",
      rating: 2,
      price: 4,
      address: "3424 Avenue du Parc",
      city: "Montreal, QC",
      neighborhood: "Plateau",
      knownFor: "Natural Wine & Small Plates",
      description: "Sophisticated wine bar with curated natural wine selection."
    },
    {
      id: 10,
      name: "Mandy's",
      cuisine: "Salad",
      rating: 1,
      price: 2,
      address: "2067 Rue University",
      city: "Montreal, QC",
      neighborhood: "Downtown",
      knownFor: "Gourmet Salads",
      description: "Fresh, healthy salads and bowls in a modern setting."
    }
  ];

  const renderStars = (rating) => {
    return "★".repeat(rating);
  };

  const renderPrice = (price) => {
    return "$".repeat(price);
  };

  const toggleExpanded = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Filter and search functions
  const getUniqueValues = (key) => {
    return [...new Set(restaurants.map(r => r[key]))].sort();
  };

  const filteredRestaurants = restaurants
    .filter(restaurant => {
      // Search filter
      if (searchQuery && searchQuery.length > 0) {
        const query = searchQuery.toLowerCase();
        return restaurant.name.toLowerCase().includes(query) ||
               restaurant.cuisine.toLowerCase().includes(query) ||
               restaurant.neighborhood.toLowerCase().includes(query);
      }
      return true;
    })
    .filter(restaurant => {
      // Rating filter
      if (ratingFilter) return restaurant.rating === ratingFilter;
      return true;
    })
    .filter(restaurant => {
      // Price filter  
      if (priceFilter) return restaurant.price === priceFilter;
      return true;
    })
    .filter(restaurant => {
      // Cuisine filter
      if (cuisineFilter) return restaurant.cuisine === cuisineFilter;
      return true;
    })
    .sort((a, b) => {
      // Sorting
      if (sortOrder === 'rating-desc') return b.rating - a.rating;
      if (sortOrder === 'rating-asc') return a.rating - b.rating;
      if (sortOrder === 'price-desc') return b.price - a.price;
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'name') return a.name.localeCompare(b.name);
      return 0; // default order
    });

  const toggleSort = () => {
    const sortOptions = ['default', 'rating-desc', 'rating-asc', 'price-desc', 'price-asc', 'name'];
    const currentIndex = sortOptions.indexOf(sortOrder);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    setSortOrder(sortOptions[nextIndex]);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setRatingFilter(null);
    setPriceFilter(null);
    setCuisineFilter(null);
    setSortOrder('default');
  };

  const NavIcon = ({ icon: Icon, active = false }) => (
    <div className={`p-3 ${active ? 'text-white' : 'text-gray-400'}`}>
      <Icon size={24} />
    </div>
  );

  const FilterButton = ({ icon: Icon, active = false, onClick }) => (
    <button 
      onClick={onClick}
      className={`filter-button ${active ? 'active' : ''}`}
    >
      <Icon size={20} />
    </button>
  );

  const StarFilterBar = () => (
    <div className="px-6 mb-4">
      <div className="flex bg-black text-white">
        <button 
          onClick={() => setRatingFilter(null)}
          className={`flex-1 py-3 px-4 text-center ${!ratingFilter ? 'bg-white text-black' : ''}`}
        >
          All
        </button>
        {[1, 2, 3].map(rating => (
          <button
            key={rating}
            onClick={() => setRatingFilter(rating)}
            className={`flex-1 py-3 px-4 text-center ${ratingFilter === rating ? 'bg-white text-black' : ''}`}
          >
            {"★".repeat(rating)}
          </button>
        ))}
        <button 
          onClick={() => setPriceFilter(null)}
          className={`flex-1 py-3 px-4 text-center ${!priceFilter ? 'bg-white text-black' : ''}`}
        >
          $
        </button>
      </div>
    </div>
  );

  const CuisineFilterSection = () => {
    if (!cuisineFilter) return null;
    
    return (
      <div className="px-6 mb-4">
        <div className="bg-black text-white p-3">
          <div className="font-medium mb-2">{cuisineFilter}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="text-lg font-medium">@Will's</h1>
        <h2 className="text-lg font-medium">Montreal Restaurants</h2>
      </div>

      {/* Control Bar */}
      <div className="px-6 flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <FilterButton icon={Bookmark} />
          <FilterButton 
            icon={Search} 
            active={searchActive}
            onClick={() => setSearchActive(!searchActive)}
          />
        </div>
        <div className="flex gap-2">
          <FilterButton 
            icon={Filter} 
            active={ratingFilter || priceFilter || cuisineFilter}
            onClick={() => ratingFilter || priceFilter || cuisineFilter ? clearAllFilters() : setRatingFilter(3)}
          />
          <FilterButton 
            icon={ArrowUpDown} 
            active={sortOrder !== 'default'}
            onClick={toggleSort}
          />
        </div>
      </div>

      {/* Rating/Price Filter Bar */}
      {(ratingFilter || priceFilter) && <StarFilterBar />}

      {/* Cuisine Filter Section */}
      <CuisineFilterSection />

      {/* Search Bar */}
      {searchActive && (
        <div className="px-6 mb-4">
          <div className="bg-black text-white p-3">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent text-white placeholder-gray-400 w-full outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Restaurant List */}
      <div className="flex-1 px-6 pb-20">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No restaurants match your filters
          </div>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="mb-3">
              <div 
                className={`border-2 border-black p-4 cursor-pointer ${
                  expandedCard === restaurant.id ? 'bg-black text-white' : 'bg-white'
                }`}
                onClick={() => toggleExpanded(restaurant.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{restaurant.id}. {restaurant.name}</span>
                    </div>
                    <div className="text-sm">{restaurant.cuisine}</div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1">{renderStars(restaurant.rating)}</div>
                    <div className="text-sm">{renderPrice(restaurant.price)}</div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedCard === restaurant.id && (
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="mb-2">
                      <div className="text-sm font-medium">{restaurant.address}</div>
                      <div className="text-sm">{restaurant.city}</div>
                    </div>
                    
                    <div className="mb-2">
                      <span className="text-sm font-medium">Neighborhood: </span>
                      <span className="text-sm">{restaurant.neighborhood}</span>
                    </div>
                    
                    <div className="mb-3">
                      <span className="text-sm font-medium">Known for: </span>
                      <span className="text-sm">{restaurant.knownFor}</span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm italic">{restaurant.description}</p>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium flex items-center gap-2">
                        <Globe size={16} />
                        Website
                      </button>
                      <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium flex items-center gap-2">
                        <Camera size={16} />
                        Photos
                      </button>
                      <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium flex items-center gap-2">
                        <Calendar size={16} />
                        Reserve
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-black">
        <div className="flex justify-around py-2">
          <NavIcon icon={Bookmark} />
          <NavIcon icon={Heart} />
          <NavIcon icon={Home} active />
          <NavIcon icon={User} />
          <NavIcon icon={Search} />
        </div>
      </div>
    </div>
  );
};

export default TastePlacesApp;