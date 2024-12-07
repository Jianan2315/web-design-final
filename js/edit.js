// edit.js
const PORT=3072;

// add functions
function addCSS(filename) {
    // Create a new <link> element
    const link = document.createElement("link");

    // Set the attributes for the <link> element
    link.rel = "stylesheet";
    link.href = "css/templates/"+filename;  // Path to your CSS file

    // Append the <link> element to the <head> section
    document.head.appendChild(link);
}

function loadTextAsInnerHTML(filename) {
    // Path to your text file
    const filePath = 'innerHTML/'+filename;
    // Fetch the text file
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching file: ${response.statusText}`);
            }
            return response.text(); // Read the file as text
        });
}

// Load selected template
// per my test, this load event does NOT affect event delegation.
window.addEventListener("load", function () {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("template");
    localStorage.setItem('templateId', templateId);

    // Use templateId to load different templates
    // For simplicity, we'll just display the template ID
    const preview = document.getElementById("resume-preview");
    preview.innerHTML = `<p>Selected Template ID: ${templateId}</p>`;
    preview.classList.add("template"+templateId);
    addCSS("template"+templateId+".css");

    const script = document.createElement('script');
    // Relative path for edit.html
    // because here is just configuration.
    // In fact, script is really imported in edit.html.
    script.src = "./js/templates/"+"template"+templateId+".js";
    console.log(script.src);

    let resume = "";
    fetch('json/resume_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching file: ${response.statusText}`);
            }
            return response.json(); // Read the file as text
        })
        .then(data=>resume=data).then(()=>console.log("resume: ",resume));
    script.onload = () => {
        loadTextAsInnerHTML("template"+templateId+".txt")
            .then(text=> {
                let htmlcontent = text;
                if (localStorage.getItem('data') !== null) {
                    const resume=JSON.parse(localStorage.getItem('data'));
                    localStorage.removeItem('data');
                    htmlcontent = populateTemplate1(text, resume);
                    console.log(htmlcontent);
                } else {
                    console.log("Key does not exist.");
                }
                preview.innerHTML = htmlcontent;

                // Bind trash icon with delete function
                bindEduDelete();
                bindSkillDelete();
                bindExpDelete();
                if (typeof bindProjDelete === 'function') {
                    bindProjDelete();
                    console.log("pass");
                }
                if (typeof bindAchiDelete === 'function') {
                    bindAchiDelete();
                    console.log("pass");
                }
                if (typeof bindLangDelete === 'function') {
                    bindLangDelete();
                    console.log("pass");
                }
                // Bind all add buttons with add function
                bindAddFunction();

                // Add hover effect to "blocks"
                bindEduBlock();
                bindExpBlock();
                if (typeof bindProjBlock === 'function') {
                    bindProjBlock();
                }
                // Link update with click
                popEditForm();
            });
        console.log('Script loaded successfully!');
    };
    script.onerror = () => {
        console.error('Failed to load the script.');
    };
    document.body.appendChild(script);
});

function populateTemplate3(template, data) {
    // Personal Info
    template = template.replace(/<h1>.*?<\/h1>/, `<h1>${data.personal_info.name}</h1>`);
    template = template.replace(
        /<p>.*?<\/p>/,
        `<p> Phone: ${data.personal_info.phone} | Email: ${data.personal_info.email} | Location: ${data.personal_info.location}</p>`
    );

    // Education Section
    const educationHTML = data.education
        .map(
            edu => `
                <tr class="component">
                    <td><strong>${edu.institution}</strong></td>
                    <td>${edu.graduation_date}</td>
                    <td class="trash-td" rowspan="2"><i class="fa-solid fa-trash trash-icon-edu"></i></td>
                </tr>
                <tr class="degree component">
                    <td colspan="2">${edu.degree}</td>
                </tr>`
        )
        .join('');
    template = template.replace(/<table>.*?<\/table>/s, `<table>${educationHTML}</table>`);

    // Personal Skills Section
    const skillsHTML = data.personal_skills
        .map(skill => `<li class="component"><strong>${skill}</strong><i class="fa-solid fa-trash trash-icon-skill"></i></li>`)
        .join('');
    template = template.replace(/<ul>.*?<\/ul>/s, `<ul>${skillsHTML}</ul>`);

    // Languages Section
    const languagesHTML = data.languages
        .map(lang => `<li class="component"><strong>${lang.category}</strong>: ${lang.details}<i class="fa-solid fa-trash trash-icon-lang"></i></li>`)
        .join('');
    template = template.replace(/<ul>.*?<\/ul>/s, `<ul>${languagesHTML}</ul>`);

    // Professional Experience Section
    const experienceHTML = data.professional_experience
        .map(
            exp => `
                <h3 class="component">${exp.company}, ${exp.position}</h3>
                <p class="component"><em>${exp.location} | ${exp.start_end_dates}</em></p>
                <ul class="component">
                    ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    <i class="fa-solid fa-trash trash-icon-exp"></i>
                </ul>`
        )
        .join('');
    const professionalExperienceSection = `
        <h2>Professional Experience</h2>
        ${experienceHTML}
        <div id="add-exp" class="add-button">+</div>`;
    template = template.replace(
        /<section id="exp-section">.*?<\/section>/s,
        `<section id="exp-section">${professionalExperienceSection}</section>`
    );

    // Key Achievements Section
    const achievementsHTML = data.key_achievements
        .map(ach => `<li class="component"><strong>${ach}</strong><i class="fa-solid fa-trash trash-icon-achi"></i></li>`)
        .join('');
    template = template.replace(/<ul>.*?<\/ul>/s, `<ul>${achievementsHTML}</ul>`);

    return template;
}

function populateTemplate2(template, data) {
    // 1. Personal Info
    template = template.replace(/<h1>.*?<\/h1>/, `<h1>${data.personal_info.name}</h1>`);
    template = template.replace(
        /<p>.*?<\/p>/,
        `<p> Phone: ${data.personal_info.phone} | Email: ${data.personal_info.email} | Location: ${data.personal_info.location}</p>`
    );

    // 2. Education Section
    const educationHTML = data.education
        .map(
            edu => `
                <tr class="component">
                    <td><strong>${edu.institution}</strong></td>
                    <td>${edu.graduation_date}</td>
                    <td class="trash-td" rowspan="2"><i class="fa-solid fa-trash trash-icon-edu"></i></td>
                </tr>
                <tr class="degree component">
                    <td colspan="2">${edu.degree}</td>
                </tr>`
        )
        .join('');
    template = template.replace(
        /<table>.*?<\/table>/s,
        `<table>${educationHTML}</table>`
    );

    // 3. Technical Skills Section
    const technicalSkillsHTML = data.technical_skills
        .map(skill => `<li class="component"><strong>${skill}</strong><i class="fa-solid fa-trash trash-icon-skill"></i></li>`)
        .join('');
    template = template.replace(
        /<ul id="skills-list">.*?<\/ul>/s,
        `<ul id="skills-list">${technicalSkillsHTML}</ul>`
    );

    // 4. Professional Experience Section
    const experienceHTML = data.professional_experience
        .map(
            exp => `
                <h3 class="component">${exp.company}, ${exp.position}</h3>
                <p class="component"><em>${exp.location} | ${exp.start_end_dates}</em></p>
                <ul class="component">
                    ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    <i class="fa-solid fa-trash trash-icon-exp"></i>
                </ul>`
        )
        .join('');
    const professionalExperienceSection = `
        <h2>Professional Experience</h2>
        ${experienceHTML}
        <div id="add-exp" class="add-button">+</div>`;
    template = template.replace(
        /<section id="exp-section">.*?<\/section>/s,
        `<section id="exp-section">${professionalExperienceSection}</section>`
    );

    // 5. Academic Projects Section
    const projectsHTML = data.academic_projects
        .map(
            proj => `
                <h3 class="component">${proj.project}, ${proj.role}</h3>
                <p class="component"><em>${proj.location} | ${proj.start_end_dates}</em></p>
                <ul class="component">
                    ${proj.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    <i class="fa-solid fa-trash trash-icon-proj"></i>
                </ul>`
        )
        .join('');
    const academicProjectsSection = `
        <h2>Academic Projects</h2>
        ${projectsHTML}
        <div id="add-proj" class="add-button">+</div>`;
    template = template.replace(
        /<section id="proj-section">.*?<\/section>/s,
        `<section id="proj-section">${academicProjectsSection}</section>`
    );

    return template;
}

function populateTemplate1(template, data) {
    // 1. Personal Info
    template = template.replace(/<h1>.*?<\/h1>/, `<h1>${data.personal_info.name}</h1>`);
    template = template.replace(
        /<p>.*?<\/p>/,
        `<p> Phone: ${data.personal_info.phone} | Email: ${data.personal_info.email} | Location: ${data.personal_info.location}</p>`
    );

    // 2. Education Section
    const educationHTML = data.education
        .map(
            edu => `
                <tr class="component">
                    <td><strong>${edu.institution}</strong></td>
                    <td>${edu.graduation_date}</td>
                    <td class="trash-td" rowspan="2"><i class="fa-solid fa-trash trash-icon-edu"></i></td>
                </tr>
                <tr class="degree component">
                    <td colspan="2">${edu.degree}</td>
                </tr>`
        )
        .join('');
    template = template.replace(
        /<table>.*?<\/table>/s,
        `<table>${educationHTML}</table>`
    );

    // 3. Personal Skills Section
    const skillsHTML = `
        <li class="component"><strong>Communication language</strong>: ${data.personal_skills.communication_languages}<i class="fa-solid fa-trash trash-icon-skill"></i></li>
        <li class="component"><strong>Programming languages</strong>: ${data.personal_skills.programming_languages.join(', ')}<i class="fa-solid fa-trash trash-icon-skill"></i></li>
        <li class="component"><strong>Certifications</strong>: ${data.personal_skills.certifications.join('; ')}<i class="fa-solid fa-trash trash-icon-skill"></i></li>`;
    template = template.replace(
        /<ul>.*?<\/ul>/s,
        `<ul>${skillsHTML}</ul>`
    );

    // 4. Professional Experience Section
    const experienceHTML = data.professional_experience
        .map(
            exp => `
                <h3 class="component">${exp.company}, ${exp.position}</h3>
                <p class="component"><em>${exp.location} | ${exp.start_end_dates}</em></p>
                <ul class="component">
                    ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    <i class="fa-solid fa-trash trash-icon-exp"></i>
                </ul>`
        )
        .join('');
    const professionalExperienceSection = `
        <h2>Professional Experience</h2>
        ${experienceHTML}
        <div id="add-exp" class="add-button">+</div>`;
    template = template.replace(
        /<section id="exp-section">.*?<\/section>/s,
        `<section id="exp-section">${professionalExperienceSection}</section>`
    );

    return template;
}


// Wait for the DOM to be fully loaded
// per my test, element replacement does NOT matter for "DOMContentLoaded" event.
// Thus, any issue about event delegation are NOT related to this download event listener
document.addEventListener("DOMContentLoaded", function() {

    // Get the button and add an event listener
    const downloadButton = document.getElementById("download-icon");

    downloadButton.addEventListener("click", () => {
        // Get the HTML content to be converted
        let element = document.getElementById("resume-preview");
        const icons= element.querySelectorAll(".editIcon");

        const header = document.getElementById('personal-info');
        const infoText = header.querySelector('p').textContent;
        const emailMatch = infoText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
        localStorage.setItem('email', emailMatch[0]);

        for (let e of ["add-edu","add-skill","add-exp","add-proj","add-achi","add-lang"]){
            if (document.getElementById(e)){
                const element = document.getElementById(e);
                element.style.display="none";
            }
        }
        const previewSection = document.querySelector('#resume-preview');
        // Use html2canvas to take a screenshot of the preview section
        html2canvas(previewSection)
            .then(canvas => {
                // Convert the canvas to a data URL
                const imageData = canvas.toDataURL('image/png');
                localStorage.setItem('thumbnail', imageData);
                // Create a link element to download the image
                // const downloadLink = document.createElement('a');
                // downloadLink.href = imageData;
                // downloadLink.download = 'output.png';
                // downloadLink.click();
            })

        // Use html2pdf to convert the content to a PDF and save it
        html2pdf()
            .from(element)
            .set({
                margin: 0,               // Optional: Adjust margins (in inches)
                filename: "output.pdf",   // Optional: Specify the file name
                html2canvas: { scale: 2 }, // Optional: Higher quality canvas rendering
                jsPDF: { unit: "in", format: "a4", orientation: "portrait" }, // Optional: Specify PDF settings
            })
            .then(()=>icons.forEach(icon=>{icon.classList.add("editIcon-hidden")}))
            .then(()=>element.classList.add("pdf"))
            .save() // This triggers the download of the PDF
            .then(()=>extractAndSaveResumeData())
            .then(()=>{window.location.href = "download.html";})
            ;

    });
});

function extractAndSaveResumeData() {
    const resumeData = {};
    const params = new URLSearchParams(window.location.search);
    const templateId = parseInt(params.get("template"));

    if (templateId == 1) {
        // Personal Info
        const personalInfo = document.querySelector('#personal-info');
        resumeData.personal_info = {
            name: personalInfo.querySelector('h1').innerText,
            phone: personalInfo.querySelector('p').innerText.split('|')[0].trim().replace('Phone: ', ''),
            email: personalInfo.querySelector('p').innerText.split('|')[1].trim().replace('Email: ', ''),
            location: personalInfo.querySelector('p').innerText.split('|')[2].trim().replace('Location: ', '')
        };

        // Education Section
        resumeData.education = [];
        const eduSection = document.querySelector('#edu-section');
        const eduRows = eduSection.querySelectorAll('table tbody tr');
        for (let i = 0; i < eduRows.length; i += 2) {
            const institutionRow = eduRows[i];
            const degreeRow = eduRows[i + 1];
            resumeData.education.push({
                institution: institutionRow.querySelector('td strong').innerText,
                graduation_date: institutionRow.querySelectorAll('td')[1].innerText,
                degree: degreeRow.querySelector('td').innerText
            });
        }

        // Personal Skills
        const skillSection = document.querySelector('#skill-section');
        resumeData.personal_skills = {
            communication_languages: skillSection.querySelectorAll('ul li')[0].innerText.split(': ')[1].trim(),
            programming_languages: skillSection.querySelectorAll('ul li')[1].innerText.split(': ')[1].trim().split(', '),
            certifications: skillSection.querySelectorAll('ul li')[2].innerText.split(': ')[1].trim().split('; ')
        };

        // Professional Experience
        resumeData.professional_experience = [];
        const expSection = document.querySelector('#exp-section');
        const experienceEntries = expSection.querySelectorAll('.component');
        for (let i = 0; i < experienceEntries.length; i += 3) {
            const companyPosition = experienceEntries[i];
            const duration = experienceEntries[i + 1];
            const responsibilities = experienceEntries[i + 2];
            const responsibilityList = [];
            responsibilities.querySelectorAll('li').forEach(li => {
                responsibilityList.push(li.innerText);
            });
            resumeData.professional_experience.push({
                company: companyPosition.innerText.split(',')[0].trim(),
                position: companyPosition.innerText.split(',')[1].trim(),
                location: duration.innerText.split('|')[0].trim(),
                start_end_dates: duration.innerText.split('|')[1].trim(),
                responsibilities: responsibilityList
            });
        }
    }
    else if(templateId == 2) {
        // Personal Info
        const personalInfo = document.querySelector('#personal-info');
        resumeData.personal_info = {
            name: personalInfo.querySelector('h1').innerText,
            phone: personalInfo.querySelector('p').innerText.split('|')[0].trim().replace('Phone: ', ''),
            email: personalInfo.querySelector('p').innerText.split('|')[1].trim().replace('Email: ', ''),
            location: personalInfo.querySelector('p').innerText.split('|')[2].trim().replace('Location: ', '')
        };

        // Technical Skills Section
        const skillSection = document.querySelector('#skill-section');
        resumeData.technical_skills = [];
        skillSection.querySelectorAll('ul li').forEach(li => {
            resumeData.technical_skills.push(li.innerText.replace(/<.*?>/g, '').trim());
        });

        // Education Section
        resumeData.education = [];
        const eduSection = document.querySelector('#edu-section');
        const eduRows = eduSection.querySelectorAll('table tbody tr');
        for (let i = 0; i < eduRows.length; i += 2) {
            const institutionRow = eduRows[i];
            const degreeRow = eduRows[i + 1];
            resumeData.education.push({
                institution: institutionRow.querySelector('td strong').innerText,
                graduation_date: institutionRow.querySelectorAll('td')[1].innerText,
                degree: degreeRow.querySelector('td').innerText
            });
        }

        // Professional Experience Section
        resumeData.professional_experience = [];
        const expSection = document.querySelector('#exp-section');
        const experienceEntries = expSection.querySelectorAll('.component');
        for (let i = 0; i < experienceEntries.length; i += 3) {
            const companyPosition = experienceEntries[i];
            const duration = experienceEntries[i + 1];
            const responsibilities = experienceEntries[i + 2];
            const responsibilityList = [];
            responsibilities.querySelectorAll('li').forEach(li => {
                responsibilityList.push(li.innerText);
            });
            resumeData.professional_experience.push({
                company: companyPosition.innerText.split(',')[0].trim(),
                position: companyPosition.innerText.split(',')[1].trim(),
                location: duration.innerText.split('|')[0].trim(),
                start_end_dates: duration.innerText.split('|')[1].trim(),
                responsibilities: responsibilityList
            });
        }

        // Academic Projects Section
        resumeData.academic_projects = [];
        const projSection = document.querySelector('#proj-section');
        const projectEntries = projSection.querySelectorAll('.component');
        for (let i = 0; i < projectEntries.length; i += 3) {
            const projectTitle = projectEntries[i];
            const duration = projectEntries[i + 1];
            const responsibilities = projectEntries[i + 2];
            const responsibilityList = [];
            responsibilities.querySelectorAll('li').forEach(li => {
                responsibilityList.push(li.innerText);
            });
            resumeData.academic_projects.push({
                project: projectTitle.innerText.split(',')[0].trim(),
                role: projectTitle.innerText.split(',')[1].trim(),
                location: duration.innerText.split('|')[0].trim(),
                start_end_dates: duration.innerText.split('|')[1].trim(),
                responsibilities: responsibilityList
            });
        }

    } else if(templateId == 3){
        // Personal Info
        const personalInfo = document.querySelector('#personal-info');
        resumeData.personal_info = {
            name: personalInfo.querySelector('h1').innerText,
            phone: personalInfo.querySelector('p').innerText.split('|')[0].trim().replace('Phone: ', ''),
            email: personalInfo.querySelector('p').innerText.split('|')[1].trim().replace('Email: ', ''),
            location: personalInfo.querySelector('p').innerText.split('|')[2].trim().replace('Location: ', '')
        };

        // Education Section
        resumeData.education = [];
        const eduSection = document.querySelector('#edu-section');
        const eduRows = eduSection.querySelectorAll('table tbody tr');
        for (let i = 0; i < eduRows.length; i += 2) {
            const institutionRow = eduRows[i];
            const degreeRow = eduRows[i + 1];
            resumeData.education.push({
                institution: institutionRow.querySelector('td strong').innerText,
                graduation_date: institutionRow.querySelectorAll('td')[1].innerText,
                degree: degreeRow.querySelector('td').innerText
            });
        }

        // Personal Skills Section
        const skillSection = document.querySelector('#skill-section');
        resumeData.personal_skills = [];
        skillSection.querySelectorAll('ul li').forEach(li => {
            resumeData.personal_skills.push(li.innerText.replace(/<.*?>/g, '').trim());
        });

        // Languages Section
        const langSection = document.querySelector('#lang-section');
        resumeData.languages = [];
        langSection.querySelectorAll('ul li').forEach(li => {
            const [category, details] = li.innerText.split(':');
            resumeData.languages.push({
                category: category.trim(),
                details: details.trim()
            });
        });

        // Professional Experience Section
        resumeData.professional_experience = [];
        const expSection = document.querySelector('#exp-section');
        const experienceEntries = expSection.querySelectorAll('.component');
        for (let i = 0; i < experienceEntries.length; i += 3) {
            const companyPosition = experienceEntries[i];
            const duration = experienceEntries[i + 1];
            const responsibilities = experienceEntries[i + 2];
            const responsibilityList = [];
            responsibilities.querySelectorAll('li').forEach(li => {
                responsibilityList.push(li.innerText);
            });
            resumeData.professional_experience.push({
                company: companyPosition.innerText.split(',')[0].trim(),
                position: companyPosition.innerText.split(',')[1].trim(),
                location: duration.innerText.split('|')[0].trim(),
                start_end_dates: duration.innerText.split('|')[1].trim(),
                responsibilities: responsibilityList
            });
        }

        // Key Achievements Section
        resumeData.key_achievements = [];
        const achiSection = document.querySelector('#achi-section');
        achiSection.querySelectorAll('ul li').forEach(li => {
            resumeData.key_achievements.push(li.innerText.replace(/<.*?>/g, '').trim());
        });

    }


    localStorage.setItem('json', JSON.stringify(resumeData, null, 4));
    // Sending the JSON to the backend using fetch
    fetch(`http://localhost:${PORT}/create/resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: `${localStorage.getItem('email')}`,
            json: `${localStorage.getItem('json')}`,
            templateId: `${localStorage.getItem('templateId')}`,
            thumbnail: `${localStorage.getItem('thumbnail')}`
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => console.log('Response:', data))
        .catch(error => console.error('Error:', error));

    // May remove
    fetch(`http://localhost:${PORT}/save`, {
        method: 'POST', // HTTP POST method
        headers: {
            'Content-Type': 'application/json' // Indicate JSON format
        },
        body: JSON.stringify(resumeData, null, 4) // Convert the object to JSON string
    })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            console.log('Success:', data); // Log success message from the backend
        })
        .catch(error => {
            console.error('Error:', error); // Log errors if any
        });
}

