// ttsForm.js

document.getElementById('ttsForm').addEventListener('submit', async function (e) {
	e.preventDefault();

	const formData = {
		message: document.getElementById('message').value,
		voice_id: document.getElementById('voice_id').value,
	};

	const submitButton = document.getElementById('submitButton');
	submitButton.innerHTML = "<img id='loading' style='width: 15px;' src='https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif'/>";
	submitButton.disabled = true;

	try {
		const response = await fetch('https://kevinatruong.com/api/tts/speak', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});
		const result = await response.text();
	} catch (error) {
		console.error('Error:', error);
	} finally {
		const title = document.getElementById('title');
		const input = document.getElementById('ttsForm');
		title.innerHTML = "THANK YOU FOR YOUR MESSAGE.";
		input.innerHTML = "";
	}
});