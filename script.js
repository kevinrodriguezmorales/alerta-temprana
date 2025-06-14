
const alertStatus = document.getElementById('alertStatus');

const alarmButton = document.getElementById('activateAlarm');
const alarmAmbulance = document.getElementById('alarmAmbulance');

// sirens
const alarmSoundPeru = document.getElementById('alarmSoundPeru');
const alarmSoundColombia = document.getElementById('alarmSoundColombia');
const alarmSoundChile = document.getElementById('alarmSoundChile');

// ambulances
const ambulanceSoundPeru = document.getElementById('ambulanceSoundPeru');
const ambulanceSoundColombia = document.getElementById('ambulanceSoundColombia');
const ambulanceSoundChile = document.getElementById('ambulanceSoundChile');

const locationOutput = document.getElementById('locationOutput');

const locationButton = document.getElementById('shareLocation');
const callButton = document.getElementById('callPolice');

let isAlarmPlaying = false;

let locationConfig = "peru";
let policeNumber = '105';

alarmButton.addEventListener('click', () => {
  if (!isAlarmPlaying) {

    if (locationConfig === "peru") {
      alarmSoundPeru.volume = 1.0;
      alarmSoundPeru.play().catch(err => {
        alert("El navegador impidió reproducir el sonido automáticamente. Haz clic para permitirlo.");
        console.error(err);
      });
    } else if (locationConfig === "colombia") {
      alarmSoundColombia.volume = 1.0;
      alarmSoundColombia.play().catch(err => {
        alert("El navegador impidió reproducir el sonido automáticamente. Haz clic para permitirlo.");
        console.error(err);
      });
    } else if (locationConfig === "chile") {
      alarmSoundChile.volume = 1.0;
      alarmSoundChile.play().catch(err => {
        alert("El navegador impidió reproducir el sonido automáticamente. Haz clic para permitirlo.");
        console.error(err);
      });
    }

    isAlarmPlaying = true;
    alarmButton.classList.add('active-button');
    alertStatus.classList.add('active');
  } else {

    if (locationConfig === "peru") {
      alarmSoundPeru.pause();
      alarmSoundPeru.currentTime = 0;
    } else if (locationConfig === "colombia") {
      alarmSoundColombia.pause();
      alarmSoundColombia.currentTime = 0;
    } else if (locationConfig === "chile") {
      alarmSoundChile.pause();
      alarmSoundChile.currentTime = 0;
    }

    isAlarmPlaying = false;
    alarmButton.classList.remove('active-button');
    alertStatus.classList.remove('active');
  }
});

let isAmbulanceAlarmPlaying = false;

alarmAmbulance.addEventListener('click', () => {
  if (!isAmbulanceAlarmPlaying) {
    if (locationConfig === "peru") {
      ambulanceSoundPeru.volume = 1.0;
      ambulanceSoundPeru.play().catch(err => {
        alert("El navegador impidió reproducir el sonido automáticamente. Haz clic para permitirlo.");
        console.error(err);
      });
    } else if (locationConfig === "colombia") {
      ambulanceSoundColombia.volume = 1.0;
      ambulanceSoundColombia.play().catch(err => {
        alert("El navegador impidió reproducir el sonido automáticamente. Haz clic para permitirlo.");
        console.error(err);
      });
    } else if (locationConfig === "chile") {
      ambulanceSoundChile.volume = 1.0;
      ambulanceSoundChile.play().catch(err => {
        alert("El navegador impidió reproducir el sonido automáticamente. Haz clic para permitirlo.");
        console.error(err);
      });
    }

    isAmbulanceAlarmPlaying = true;
  } else {
    if (locationConfig === "peru") {
      ambulanceSoundPeru.pause();
      ambulanceSoundPeru.currentTime = 0;
    } else if (locationConfig === "colombia") {
      ambulanceSoundColombia.pause();
      ambulanceSoundColombia.currentTime = 0;
    } else if (locationConfig === "chile") {
      ambulanceSoundChile.pause();
      ambulanceSoundChile.currentTime = 0;
    }

    isAmbulanceAlarmPlaying = false;
  }
});

// Llamar al 105
callButton.addEventListener('click', () => {
  window.location.href = `tel:${policeNumber}`;
});

// Compartir ubicación en tiempo real
let watchId = null;

locationButton.addEventListener('click', () => {
  if (navigator.geolocation) {
    if (watchId === null) {
      watchId = navigator.geolocation.watchPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locationUrl = `https://www.google.com/maps?q=${lat},${lon}`;
        locationOutput.innerHTML = `Ubicación en tiempo real: <a href="${locationUrl}" target="_blank">${locationUrl}</a>`;
      }, (err) => {
        alert("No se pudo obtener la ubicación: " + err.message);
      }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      });
    } else {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
      locationOutput.innerHTML = "";
    }
  } else {
    alert("Geolocalización no soportada en este navegador.");
  }
})

function setPoliceNumber() {
  if (locationConfig === "peru") {
    policeNumber = '105';
  } else if (locationConfig === "colombia") {
    policeNumber = '123';
  } else if (locationConfig === "chile") {
    policeNumber = '133';
  }

  document.getElementById('policeNumber').textContent = `Llamar al ${policeNumber}`;
}

setPoliceNumber();

document.querySelectorAll('.grid-option').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelector('.text-help-support').classList.toggle('active');
    this.classList.toggle('active');
  });
});

function stopAllSounds() {
  // Sirenas
  alarmSoundPeru.pause();
  alarmSoundPeru.currentTime = 0;
  alarmSoundColombia.pause();
  alarmSoundColombia.currentTime = 0;
  alarmSoundChile.pause();
  alarmSoundChile.currentTime = 0;
  // Ambulancias
  ambulanceSoundPeru.pause();
  ambulanceSoundPeru.currentTime = 0;
  ambulanceSoundColombia.pause();
  ambulanceSoundColombia.currentTime = 0;
  ambulanceSoundChile.pause();
  ambulanceSoundChile.currentTime = 0;
  // Estados
  isAlarmPlaying = false;
  isAmbulanceAlarmPlaying = false;
  // Quitar clases activas si es necesario
  alarmButton.classList.remove('active-button');
  alertStatus.classList.remove('active');
}

function toggleOverlay() {
  document.querySelector('.overlay-menu').classList.toggle('active-layout');
  document.querySelector('.wrapper-menu').classList.toggle('active-menu');
  document.querySelector('.content-menu').classList.toggle('active-content');
}

document.querySelectorAll('.button-menu').forEach(btn => {
  btn.addEventListener('click', toggleOverlay);
})

document.querySelector('.overlay-menu').addEventListener('click', toggleOverlay);

document.querySelectorAll('.menu-option').forEach(option => {
  option.addEventListener('click', function () {
    const selectedLocation = this.getAttribute('data-location');
    stopAllSounds();
    if (selectedLocation) {
      locationConfig = selectedLocation;
      document.querySelectorAll('.menu-option').forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
    }
    setPoliceNumber();
  });
});

function toggleNotification() {
  document.querySelector('.button-notification').classList.remove('active');
  document.querySelector('.wrapper-notification').classList.toggle('active');
  document.querySelector('.overlay-notification').classList.toggle('active');
  document.querySelector('.badge-alert').classList.remove('active');
}

document.querySelector('.button-notification').addEventListener('click', toggleNotification);
document.querySelector('.overlay-notification').addEventListener('click', toggleNotification);

function executeAlarm() {
  if (!isAlarmPlaying) {
    if (locationConfig === "peru") {
      alarmSoundPeru.volume = 1.0;
      alarmSoundPeru.play().catch(err => {
        alert("El navegador impidió reproducir el sonido automáticamente. Haz clic para permitirlo.");
        console.error(err);
      });
    } else if (locationConfig === "colombia") {
      alarmSoundColombia.volume = 1.0;
      alarmSoundColombia.play().catch(err => {
        alert("El navegador impidió reproducir el sonido automáticamente. Haz clic para permitirlo.");
        console.error(err);
      });
    } else if (locationConfig === "chile") {
      alarmSoundChile.volume = 1.0;
      alarmSoundChile.play().catch(err => {
        alert("El navegador impidió reproducir el sonido automáticamente. Haz clic para permitirlo.");
        console.error(err);
      });
    }

    isAlarmPlaying = true;
  } else {

    if (locationConfig === "peru") {
      alarmSoundPeru.pause();
      alarmSoundPeru.currentTime = 0;
    } else if (locationConfig === "colombia") {
      alarmSoundColombia.pause();
      alarmSoundColombia.currentTime = 0;
    } else if (locationConfig === "chile") {
      alarmSoundChile.pause();
      alarmSoundChile.currentTime = 0;
    }

    isAlarmPlaying = false;
  }

}

function simulateAlert() {
  setTimeout(() => {
    document.querySelector('.badge-alert').classList.add('active');
    document.querySelector('.button-notification').classList.add('active');
  
    executeAlarm();
  }, 2000);
}

document.querySelector('#simulateAlert').addEventListener('click', simulateAlert);
document.querySelector('.dialog-action').addEventListener('click', () => {

  toggleNotification();
  executeAlarm();
});