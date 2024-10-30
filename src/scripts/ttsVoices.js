// ttsVoices.js

async function fetchVoices() {
	try {
		const response = await fetch('https://kevinatruong.com/api/tts/voices');
		const voices = await response.json();
		const voiceSelect = document.getElementById('voice_id');

		voices.forEach(voice => {
			const option = document.createElement('option');
			option.value = voice.voice_id; // Use voice_id for the form
			option.textContent = voice.name; // Display the name of the voice
			option.dataset.sample = voice.sample; 

			voiceSelect.appendChild(option);
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
