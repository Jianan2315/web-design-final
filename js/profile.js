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
            // currently, only configure template3 as demo purpose
            // so that make sure 1) only one resume in database 2) it must be template 3
            // loop only one time
            for (let e of resumes[0].resumes) {
                const json = JSON.parse(e.json);
                const thumbnail1 = document.getElementById('resume1');
                thumbnail1.src=e.thumbnail;
                thumbnail1.addEventListener('click', function () {
                    localStorage.setItem('data', JSON.stringify(json));
                    const templateId = e.templateId; //get by database
                    window.location.href = `edit.html?template=${templateId}`;
                });
            }
        })
        .catch(error => console.error('Error:', error));
});

