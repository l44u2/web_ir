import React, { useState, useContext } from 'react';
import Product from './product';
import Select from './select';
import PrimaryButton from './primarybutton';
import { ItemContext } from './itemcontext';

const Catalog = () => {
    const { items } = useContext(ItemContext);
    const [filter, setFilter] = useState({ search: '', rooms: '', sort: '' });
    const [filteredItems, setFilteredItems] = useState(items);

    const sortOptions = [
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'visitors-asc', label: 'Visitors: Low to High' },
        { value: 'visitors-desc', label: 'Visitors: High to Low' },
    ];

    const applyFilters = () => {
        let updatedItems = items.filter(item => 
            item.name.toLowerCase().includes(filter.search.trim().toLowerCase()) &&
            (filter.rooms ? item.rooms.toString() === filter.rooms : true)
        );

        if (filter.sort === 'price-asc') {
            updatedItems = updatedItems.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        } else if (filter.sort === 'price-desc') {
            updatedItems = updatedItems.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
        } else if (filter.sort === 'visitors-asc') {
            updatedItems = updatedItems.sort((a, b) => a.visitors - b.visitors);
        } else if (filter.sort === 'visitors-desc') {
            updatedItems = updatedItems.sort((a, b) => b.visitors - a.visitors);
        }

        setFilteredItems(updatedItems);
    };

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    return (
        <div className="catalog__component">
            <div className="catalog__filters">
                <div className="catalog__field">
                    <input 
                        type="text" 
                        name="search"
                        placeholder="Search..." 
                        className="catalog__search" 
                        value={filter.search}
                        onChange={handleFilterChange} 
                    />
                    <Select 
                        name="rooms"
                        options={[
                            { value: '', label: 'All Rooms' },
                            { value: '1', label: '1 Room' },
                            { value: '2', label: '2 Rooms' },
                            { value: '3', label: '3 Rooms' },
                            { value: '4', label: '4 Rooms' },
                        ]} 
                        onChange={handleFilterChange} 
                    />
                    <Select 
                        name="sort"
                        options={sortOptions}
                        onChange={handleFilterChange} 
                    />
                </div>
                <PrimaryButton onClick={applyFilters}>Apply</PrimaryButton>
            </div>
            <div className="catalog__list">
                {filteredItems.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Catalog;
