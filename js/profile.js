const PORT=3072;

window.addEventListener("load", function () {
    const personalInfo = document.querySelector('.personal-info .details');
    const emailParagraph = personalInfo.querySelector('p:nth-child(3)'); // The 3rd <p> tag contains the email
    const email = emailParagraph.textContent.split(': ')[1].trim();

    const resumes = [];
    fetch(`http://localhost:${PORT}/get/resumes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: `${email}`
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            console.log('Response:', data);
            resumes.push(data);
        })
        .then(()=>{
            console.log("resumes: ",resumes);
            console.log("resumes[0].resumes[0]: ",resumes[0].resumes[0]);

            const resumesContainer = document.querySelector('.resumes');
            const blankThumbnail = document.querySelector('.thumbnail.blank');
            blankThumbnail.addEventListener('click', () => {
                window.location.href = 'templateSelect.html';
            });

            for (let e of resumes[0].resumes) {
                const json = JSON.parse(e.json);
                const id = e._id;

                const newThumbnail = document.createElement('div');
                newThumbnail.className = 'thumbnail';
                const newImage = document.createElement('img');
                newImage.src=e.thumbnail;

                newImage.addEventListener('click', function () {
                    localStorage.setItem(id, JSON.stringify(json));
                    const templateId = e.templateId; //get by database
                    window.location.href = `edit.html?template=${templateId}&id=${id}`;
                });

                newThumbnail.appendChild(newImage);
                resumesContainer.insertBefore(newThumbnail, blankThumbnail);
            }
        })
        .catch(error => console.error('Error:', error));
});

