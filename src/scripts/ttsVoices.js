// ttsVoices.js

async function fetchVoices() {
	try {
		const response = await fetch('https://kevinatruong.com/api/tts/voices');
		const voices = await response.json();
		const voiceSelect = document.getElementById('voice_id');

		// Mapping of original voice names to custom names
		const customNames = {
			"Akari" : "Japanese Girl",
			"Alpha" : "",
			"Anita" : "Hindi Women",
			"Atlas" : "Default Man",
			"Aurora" : "Default Woman",
			"Axel" : "",
			"Barter" : "",
			"Beep" : "",
			"Bella" : "Isabelle Villager",
			"Blitz" : "",
			"Breaker" : "",
			"Breeze" : "ASMR",
			"Bulk" : "",
			"Buzz" : "Watchmojo Lady",
			"Byte" : "R2-D2",
			"Chef" : "Gordan Ramsey",
			"Circuit" : "Linus Tech Tips",
			"Commander" : "",
			"Czar" : "Russian Man",
			"Dash" : "Sonic",
			"Debater" : "Ben Shapiro",
			"Diplomat" : "Joe Biden",
			"Elder" : "Morgan Freeman",
			"Epic  Narrator": "", 
			"Explorer" : "National Geographic Narrator",
			"Forge" : "",
			"Frogman" : "Kermit",
			"Frost" : "Chills",
			"Gemma" : "Megan",
			"Gravel" : "Penguinz0",
			"Herald" : "",
			"Hunter" : "",
			"Inferno" : "",
			"Ironclad" : "",
			"Kawaii" : "Weeb Girl",
			"Leader" : "Obama",
			"Mentor" : "",
			"Merlin" : "French Man",
			"Micro" : "Plankton",
			"Nova" : "Default Man",
			"Oracle" : "GladOs",
			"Outlaw" : "Kkona",
			"Pablo" : "",
			"Phantom" : "",
			"Pinnacle" : "",
			"Pulse" : "Zoomer",
			"Quill" : "",
			"Reasonable" : "",
			"Scout" : "Bart",
			"Sentient" : "Become Human: Connor",
			"Sentinel" : "",
			"Shade" : "",
			"Singer" : "",
			"Specter" : "",
			"Spectral" : "",
			"Spongey" : "Spongebob Squarepants",
			"Star" : "Patrick Star",
			"Stella" : "",
			"Tentacle" : "Squidward",
			"Titan" : "",
			"Titanus" : "",
			"Tycoon" : "Trump",
			"Vera" : "",
			"Verdant" : "",
			"Vice" : "Patrick Batemen",
			"Wanderer" : "",
			"Warden" : "",
			"Whisper" : "",
			"Wretch" : "",
			"Yuki" : "Japanese Women",
		}
		const Unknown = {
			"Alpha" : "",
			"Aurora" : "",
			"Axel" : "",
			"Barter" : "",
			"Beep" : "",
			"Blitz" : "",
			"Breaker" : "",
			"Bulk" : "",
			"Byte" : "",
			"Commander" : "",
			"Epic  Narrator": "",
			"Forge" : "",
			"Herald" : "",
			"Hunter" : "",
			"Inferno" : "",
			"Ironclad" : "",
			"Mentor" : "",
			"Pablo" : "",
			"Phantom" : "",
			"Pinnacle" : "",
			"Quill" : "",
			"Reasonable" : "",
			"Sentinel" : "",
			"Shade" : "",
			"Singer" : "",
			"Specter" : "",
			"Spectral" : "",
			"Stella" : "",
			"Titan" : "",
			"Titanus" : "",
			"Vera" : "",
			"Verdant" : "",
			"Wanderer" : "",
			"Warden" : "",
			"Whisper" : "",
			"Wretch" : "",
		}
		voices.forEach(voice => {
			if (customNames[voice.name]) {
				const option = document.createElement('option');
				option.value = voice.voice_id;
				option.textContent = customNames[voice.name];
				option.dataset.sample = voice.sample; 

				voiceSelect.appendChild(option);
			}
		});
	} catch (error) {
		console.error('Error fetching voices:', error);
	}
}


let audio;
document.getElementById('playPreviewButton').addEventListener('click', () => {
    const selectedVoice = document.getElementById('voice_id').selectedOptions[0];
    const previewUrl = selectedVoice.dataset.sample;

    if (!previewUrl) {
        alert('No preview available for this voice.');
        return;
    }
    
    // Check if audio is already playing
    if (audio && !audio.paused) {
        // Stop the current audio if it’s playing
        audio.pause();
        audio.currentTime = 0;
    }

    // Create a new Audio instance and play it
    audio = new Audio(previewUrl);
    audio.play();
});

document.addEventListener('DOMContentLoaded', fetchVoices);
