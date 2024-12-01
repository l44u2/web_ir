import { renderItemsList, updateVisitorCounter } from "./somegaybsidk.js";

const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const visitorSortButton = document.getElementById("visitor_sort");
const roomSortButton = document.getElementById("room_sort");

let currentSearch = '';
let currentSort = '';

const fetchHotels = async (search = '', sortBy = '') => {
    try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (sortBy) queryParams.append('sortBy', sortBy);
        
        const response = await fetch(`http://localhost:3000/api/hotels?${queryParams}`);
        const hotels = await response.json();
        renderItemsList(hotels, removeItem, editItem);
        updateVisitorCounter(hotels);
    } catch (error) {
        console.error('Failed to load hotels:', error);
    }
};

const removeItem = async (id) => {
    try {
        await fetch(`http://localhost:3000/api/hotels/${id}`, {
            method: 'DELETE',
        });
        await fetchHotels(currentSearch, currentSort);
    } catch (error) {
        alert("Failed to delete hotel");
    }
};

const editItem = (id) => {
    window.location.href = `edit.html?id=${id}`;
};

document.addEventListener('DOMContentLoaded', () => {
    fetchHotels();
});

findButton.addEventListener("click", () => {
    currentSearch = findInput.value.trim().replace(/\s+/g, ' ');
    fetchHotels(currentSearch, currentSort);
});

cancelFindButton.addEventListener("click", () => {
    currentSearch = '';
    findInput.value = "";
    fetchHotels('', currentSort);
});

visitorSortButton.addEventListener("click", () => {
    currentSort = 'visitors';
    fetchHotels(currentSearch, currentSort);
});

roomSortButton.addEventListener("click", () => {
    currentSort = 'rooms';
    fetchHotels(currentSearch, currentSort);
});