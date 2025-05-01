const PORT=3072;

function addCSS(filename) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/templates/"+filename;  // Path to your CSS file
    document.head.appendChild(link);
}

function loadTextAsInnerHTML(filename) {
    return "";
}

// Load selected template
// per my test, this load event does NOT affect event delegation.
window.addEventListener("load", function () {
    const params = new URLSearchParams(window.location.search);
    const templateId = "1";
    localStorage.setItem('templateId', templateId);

    let preview = null;
    if (localStorage.getItem("restore")){
        console.log("Restore content exists.");
    } else {
        preview = document.getElementById("resume-preview");
        // preview.innerHTML = `<p>Selected Template ID: ${templateId}</p>`;
        // preview.classList.add("template"+templateId);
    }
    addCSS("template"+templateId+".css");

    const script = document.createElement('script');
    // Relative path for edit.html because here is just configuration.
    // In fact, script is really imported in edit.html.
    script.src = "./js/templates/"+"template"+templateId+".js";

    script.onload = () => {
        loadTextAsInnerHTML("template"+templateId+".txt")
            .then(text=> {
                if (!localStorage.getItem("restore")){
                    localStorage.removeItem("restore");
                    // let htmlcontent = text;
                    if (params.has('id')) {
                        const id = params.get('id')
                        const resume=JSON.parse(localStorage.getItem(id));
                        // localStorage.removeItem(id);
                        // htmlcontent = populateTemplate(text, resume, templateId);
                    } else {
                        console.log("Key does not exist.");
                    }
                    // preview.innerHTML = htmlcontent;
                } else {
                    console.log("Pass.");
                }

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

function populateTemplate(template, json, templateId){
    if (templateId == 1){
        return populateTemplate1(template, json);
    }
    else {
        console.log("Invalid template id: ",templateId);
    }
}


function populateTemplate1(template, data) {
    return ``;
}

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("restore")) {
        document.body.innerHTML = localStorage.getItem("restore");
    }
    // Get the button and add an event listener
    const icons = document.getElementById("head-icons")
    const downloadButton = icons.querySelector("#download-icon");
    const saveButton = icons.querySelector("#save-icon");
    const printButton = icons.querySelector("#print-icon");

    saveButton.addEventListener("click", async ()=>{
        const header = document.getElementById('personal-info');
        const infoText = header.querySelector('p').textContent;
        const emailMatch = infoText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
        localStorage.setItem('email', emailMatch[0]);

        const resumeData = extractData();
        const params = new URLSearchParams(window.location.search);
        try {
            if (params.has('id')) {
                const id = params.get('id');
                localStorage.setItem(id, JSON.stringify(resumeData));
                await saveDatabase(resumeData, id);
            } else {
                await saveDatabase(resumeData);
            }
            await saveLocal(resumeData);
            setTimeout(() => {
                location.reload();
            }, 800);// 500 sometimes fails.
        } catch (e){
            console.log("Save error: ", e);
        }
    });

    printButton.addEventListener("click", ()=>{
        const originalContent = document.body.innerHTML;
        const printElement = document.getElementById('resume-preview');
        printElement.style.width = "100%";
        printElement.style.margin = "0";
        printElement.style.padding = "0";
        const printContent = printElement.outerHTML;

        document.body.innerHTML = printContent; // Replace body with the container
        for (let e of ["add-edu","add-skill","add-exp","add-proj","add-achi","add-lang"]){
            if (document.getElementById(e)){
                const element = document.getElementById(e);
                element.style.display="none";
            }
        }
        window.print();
        document.body.innerHTML = originalContent; // Restore original content
        localStorage.setItem("restore", originalContent);
        location.reload(); // Reload the page to restore event bindings
    });

    downloadButton.addEventListener("click", () => {
        // Get the HTML content to be converted
        let element = document.getElementById("resume-preview");
        const icons= element.querySelectorAll(".editIcon");

        for (let e of ["add-edu","add-skill","add-exp","add-proj","add-achi","add-lang"]){
            if (document.getElementById(e)){
                const element = document.getElementById(e);
                element.style.display="none";
            }
        }

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
            .then(()=>{
                localStorage.clear();// Just remove data when user leaves this page.
            })
            .then(()=>{window.location.href = "download.html";})
            ;

    });
});

function saveDatabase(resumeData, resumeId=null) {
    for (let e of ["add-edu","add-skill","add-exp","add-proj","add-achi","add-lang"]){
        if (document.getElementById(e)){
            const element = document.getElementById(e);
            element.style.display="none";
        }
    }
    const previewSection = document.querySelector('#resume-preview');
    html2canvas(previewSection, {logging: false})
        .then(canvas => {
            // Convert the canvas to a data URL
            const imageData = canvas.toDataURL('image/png');
            const resumeJson = JSON.stringify(resumeData, null, 4);

            // Proceed with fetch after setting the thumbnail
            if (!resumeId) {
                return fetch(`http://localhost:${PORT}/test/create/resume`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: `${localStorage.getItem('email')}`,
                        json: resumeJson,
                        templateId: `${localStorage.getItem('templateId')}`,
                        thumbnail: imageData
                    }),
                });
            } else {
                return fetch(`http://localhost:${PORT}/test/update/resume`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: resumeId,
                        json: resumeJson,
                        thumbnail: imageData
                    }),
                });
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => console.log('Response from /create/resume:\n', data.message))
        .catch(error => console.error('Error:', error));
}

// May remove
function saveLocal(resumeData){
    fetch(`http://localhost:${PORT}/save`, {
        method: 'POST', // HTTP POST method
        headers: {
            'Content-Type': 'application/json' // Indicate JSON format
        },
        body: JSON.stringify(resumeData, null, 4) // Convert the object to JSON string
    })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            console.log('Success:', data.message); // Log success message from the backend
        })
        .catch(error => {
            console.error('Error:', error); // Log errors if any
        });
}

function extractData() {
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
        resumeData.personal_skills={};
        skillSection.querySelectorAll('ul li').forEach(skill=>{
            const [name, detail] = splitOnFirstColon(skill.innerText);
            resumeData.personal_skills[name]=detail;
        });



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

    return resumeData
}

function splitOnFirstColon(str) {
    const index = str.indexOf(':');
    if (index === -1) return [str];  // No colon found
    return [str.substring(0, index), str.substring(index + 1)];
}