const form = document.getElementById("edit_form");
const titleInput = document.getElementById("title_input");
const visitInput = document.getElementById("visit_input");
const roomInput = document.getElementById("room_input");

const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get('id');

const hotels = JSON.parse(sessionStorage.getItem('hotels') || '[]');
const hotelIndex = hotels.findIndex(h => h.id === hotelId);

if (hotelIndex !== -1) {
    const hotel = hotels[hotelIndex];
    titleInput.value = hotel.title;
    visitInput.value = hotel.visitors;
    roomInput.value = hotel.nrooms;
} else {
    window.location.href = "index.html";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (hotelIndex !== -1) {
        hotels[hotelIndex] = {
            id: hotelId,
            title: titleInput.value,
            visitors: parseInt(visitInput.value, 10),
            nrooms: parseInt(roomInput.value, 10)
        };

        sessionStorage.setItem('hotels', JSON.stringify(hotels));
    }

    window.location.href = "index.html";
});