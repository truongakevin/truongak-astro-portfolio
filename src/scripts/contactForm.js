document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        name: (document.getElementById('name')).value,
        email: (document.getElementById('email')).value,
        message: (document.getElementById('message')).value,
    };
    
    const submitButton = document.getElementById('submitButton');
    submitButton.innerHTML = "<img id='loading' style='width: 15px;' src='https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif'/>"
    submitButton.disabled = true

    try {
        // const response = await fetch('http://localhost:3000/api/contact', {
        const response = await fetch('https://kevinatruong.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const result = await response.text();
        // alert(result);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        const title = document.getElementById('title');
        const input = document.getElementById('contactForm');
        title.innerHTML = "THANK YOU FOR YOUR MESSAGE."
        input.innerHTML = ""
    }
});