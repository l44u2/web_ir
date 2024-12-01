const form = document.getElementById("hotel_form");
const titleInput = document.getElementById("title_input");

const getHotels = () => JSON.parse(sessionStorage.getItem('hotels') || '[]');

const isDuplicateTitle = (title) => {
    const hotels = getHotels();
    return hotels.some(hotel => hotel.title.toLowerCase() === title.toLowerCase());
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const titleInput = document.getElementById("title_input");
    const visitInput = document.getElementById("visit_input");
    const roomInput = document.getElementById("room_input");

    const visitors = parseInt(visitInput.value, 10);
    const nrooms = parseInt(roomInput.value, 10);

    if (visitors < 0 || nrooms < 0) {
        alert("Visitors and rooms cannot be negative!");
        return; 
    }

    const hotels = JSON.parse(sessionStorage.getItem('hotels') || '[]');
    const isDuplicate = hotels.some(hotel =>
        hotel.title.trim().toLowerCase() === titleInput.value.trim().toLowerCase()
    );

    if (isDuplicate) {
        alert("A hotel with this title already exists. Please use a different title.");
        return; 
    }

    const newHotel = {
        id: crypto.randomUUID(),
        title: titleInput.value.trim(),
        visitors: visitors,
        nrooms: nrooms,
    };

    hotels.push(newHotel);
    sessionStorage.setItem('hotels', JSON.stringify(hotels));

    window.location.href = "index.html";
});
