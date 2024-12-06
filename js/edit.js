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
    const filePath = '../../innerHTML/'+filename;
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

    script.onload = () => {
        loadTextAsInnerHTML("template"+templateId+".txt")
            .then(text=> {
                preview.innerHTML = text;

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

        const previewSection = document.querySelector('#resume-preview');
        for (let e of ["add-edu","add-skill","add-exp","add-proj","add-achi","add-lang"]){
            if (document.getElementById(e)){
                const element = document.getElementById(e);
                element.style.display="none";
            }
        }
        // Use html2canvas to take a screenshot of the preview section
        html2canvas(previewSection)
            .then(canvas => {
                // Convert the canvas to a data URL
                const imageData = canvas.toDataURL('image/png');

                // Create a link element to download the image
                const downloadLink = document.createElement('a');
                downloadLink.href = imageData;
                downloadLink.download = 'output.png';
                downloadLink.click();
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
            .then(()=>{window.location.href = "download.html";})
            .then(()=>extractAndSaveResumeData())
            ;

    });
});

function extractAndSaveResumeData() {
    const resumeData = {};

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


    // Sending the JSON to the backend using fetch
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