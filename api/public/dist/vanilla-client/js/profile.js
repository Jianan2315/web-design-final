window.addEventListener("load", function () {
    const userInfo = localStorage.getItem('userInfo');
    let user = null;
    if (userInfo) {
        user = JSON.parse(userInfo);
        document.getElementById('user-info').innerHTML = `
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            `;
    } else {
        document.getElementById('user-info').innerHTML = `<p><strong>Error:</strong> No access to personal information.</p>`;
    }

    const resumesString = localStorage.getItem('resumes');
    let resumes = null;
    if (resumesString) {
        resumes = JSON.parse(resumesString);
    } else {
        console.error("Invalid configuration for user data.");
    }

    const resumesContainer = document.querySelector('.resumes');
    const blankThumbnail = document.querySelector('.thumbnail.blank');
    blankThumbnail.addEventListener('click', () => {
        window.location.href = 'templateSelect.html';
    });

    resumes.forEach((resume)=>{
        const resumeData = resume.json;
        const templateId = resume.templateId;
        const thumbnail = resume.thumbnail;
        const id = resume._id;

        const newThumbnail = document.createElement('div');
        newThumbnail.className = 'thumbnail';
        const newImage = document.createElement('img');
        newImage.src=thumbnail;

        // newImage.addEventListener('click', function () {
        //     localStorage.setItem(id, JSON.stringify(resumeData));
        //     window.location.href = `edit.html?template=${templateId}&id=${id}`;
        // });

        newImage.addEventListener('click', function () {
            localStorage.setItem(id, resumeData);
            window.parent.postMessage(
                { templateId, id },
                window.location.origin
            );
        });

        newThumbnail.appendChild(newImage);
        resumesContainer.insertBefore(newThumbnail, blankThumbnail);
    })
});

