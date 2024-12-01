const form = document.getElementById("edit_form");
const titleInput = document.getElementById("title_input");
const visitInput = document.getElementById("visit_input");
const roomInput = document.getElementById("room_input");

const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get('id');

const hotels = JSON.parse(sessionStorage.getItem('hotels') || '[]');
const hotelIndex = hotels.findIndex(h => h.id === hotelId);

const fetchHotel = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/hotels/${hotelId}`);
        if (!response.ok) {
            throw new Error('Hotel not found');
        }
        const hotel = await response.json();
        titleInput.value = hotel.title;
        visitInput.value = hotel.visitors;
        roomInput.value = hotel.nrooms;
    } catch (error) {
        window.location.href = "index.html";
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:3000/api/hotels/${hotelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: titleInput.value.trim(),
                visitors: parseInt(visitInput.value, 10),
                nrooms: parseInt(roomInput.value, 10),
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update hotel');
        }

        window.location.href = "index.html";
    } catch (error) {
        alert(error.message);
    }
});