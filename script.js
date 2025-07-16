function updateClock(){
    let now = new Date();

    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('hm').innerHTML = `${hours}:${minutes}`;
    document.getElementById('sec').innerHTML = seconds;
}

function updateDate(){
    let now = new Date();
    let days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    let months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

    let dateTxt = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;
    document.getElementById('date').innerHTML = dateTxt;
}

async function updateSpotifyInfo(){
    try {
        let response = await fetch('http://localhost:5000/api/spotify_info');
        let data = await response.json();
        document.getElementById('song-title').innerHTML = data.title + " ●&nbsp;";
        document.getElementById('artist').innerHTML = " " + data.artist;
        document.getElementById('cover').src = data.cover;
    } catch (error) {
        console.error(error);
    }
}
setInterval(updateSpotifyInfo, 3500);
updateSpotifyInfo();

setInterval(updateClock, 900);
updateClock();
updateDate();