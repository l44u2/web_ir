import {
    renderItemsList,
    updateVisitorCounter,
    sortHotelsByVisitors,
    sortHotelsByRooms,
    clearHotels
} from "./somegaybsidk.js";

const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const visitorSortButton = document.getElementById("visitor_sort");
const roomSortButton = document.getElementById("room_sort");

let hotels = JSON.parse(sessionStorage.getItem('hotels') || '[]');
let filteredHotels = [...hotels]; 


const removeItem = (id) => {
    hotels = hotels.filter(hotel => hotel.id !== id);
    sessionStorage.setItem('hotels', JSON.stringify(hotels));
    renderItemsList(hotels, removeItem, editItem);
    updateVisitorCounter(hotels);
};

const editItem = (id) => {
    window.location.href = `edit.html?id=${id}`;
};

findButton.addEventListener("click", () => {
    const searchQuery = findInput.value.trim().replace(/\s+/g, ' ').toLowerCase();
    filteredHotels = hotels.filter((hotel) =>
        hotel.title.toLowerCase().includes(searchQuery)
    );
    renderItemsList(filteredHotels, removeItem, editItem);
    updateVisitorCounter(filteredHotels); 
});



cancelFindButton.addEventListener("click", () => {
    filteredHotels = [...hotels]; 
    renderItemsList(filteredHotels, removeItem, editItem);
    updateVisitorCounter(filteredHotels); 
    findInput.value = "";
});



visitorSortButton.addEventListener("click", () => {
    filteredHotels = sortHotelsByVisitors(filteredHotels);
    renderItemsList(filteredHotels, removeItem, editItem);
});

roomSortButton.addEventListener("click", () => {
    filteredHotels = sortHotelsByRooms(filteredHotels);
    renderItemsList(filteredHotels, removeItem, editItem);
});


clearHotels();

renderItemsList(hotels, removeItem, editItem);
updateVisitorCounter(hotels);
