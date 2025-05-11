const PORT=3072;

window.addEventListener("load", function () {
    localStorage.setItem('templateId', "1");

    if (localStorage.getItem("restore")){
        console.log("Restore content exists.");
    }

    if (!localStorage.getItem("restore")){
        localStorage.removeItem("restore");
    } else {
        console.log("Pass.");
    }

    bindDeleteFunction(); // Bind trash icon with delete function
    bindAddFunction(); // Bind all add buttons with add function
    bindUpdateFunction(); // Bind update function
});

function cancelEntry() {
    const formContainer = document.getElementById("form-container");
    formContainer.classList.add("form-container-hidden");
    showPreview();
}
function deleteItem(icon) {
    const block = icon.parentElement;
    block.remove();
    cancelEntry();
}
function bindAddFunction(){
    for (let _id of ["add-edu", "add-skill", "add-exp"]){
        const addButton = document.getElementById(_id);
        addButton.addEventListener("click", function() {
            hidePreview();
            if (_id === "add-edu"){
                addEducation(this);
            } else if (_id === "add-skill"){
                addSkill(this);
            } else{
                addExp(this);
            }
        });
    }
}
function bindDeleteFunction(){
    for (let _id of [".trash-icon-edu", ".trash-icon-skill", ".trash-icon-exp"]){
        document.querySelectorAll(_id).forEach((icon)=>{
            const block = icon.parentElement;
            if (block) {
                icon.addEventListener("click", function() {
                    deleteItem(this);
                });
                block.addEventListener('mouseenter', () => {
                    icon.classList.add('trash-icon-visible');
                });
                block.addEventListener('mouseleave', () => {
                    icon.classList.remove('trash-icon-visible');
                });
            } else {
                console.error('Error: Cannot access parent element of ', icon);
            }
        });
    }
}
function bindUpdateFunction() {
    for (let listName of ["#edu-list", "#skill-list", "#exp-list"]){
        const ulBlocks = document.querySelectorAll(listName+" .component ul");
        ulBlocks.forEach(ulBlock => {
            ulBlock.addEventListener('click', ()=> fillForm(ulBlock, listName));
        })
    }
}

function popEduForm(){
    const form = document.getElementById("resume-form");
    const formContainer = document.getElementById("form-container")
    formContainer.classList.remove("form-container-hidden")
    form.innerHTML = `
        <label for="university">University:</label>
        <textarea id="university" name="university"></textarea>
        <label for="graduation">(Expected) Graduation Year:</label>
        <input type="date" id="graduation" name="graduation">
        <label for="major">Major:</label>
        <textarea id="major" name="major"></textarea>       
        <button type="button" id="add-edu-entry">Save</button>
        <button type="button" id="cancel-edu-entry">Cancel</button>
    `;
    return form;
}
function popSkillForm(){
    const form = document.getElementById("resume-form");
    const formContainer = document.getElementById("form-container")
    formContainer.classList.remove("form-container-hidden")
    form.innerHTML = `
        <label for="new-skill-name">Skill name:</label>
        <textarea id="new-skill-name" name="new-skill-name"></textarea>
         <label for="new-skill-detail">Skill details:</label>
        <textarea id="new-skill-detail" name="new-skill-detail"></textarea>
        
        <button type="button" id="add-skill-entry">Save</button>
        <button type="button" id="cancel-skill-entry">Cancel</button>
    `;
    return form;
}
function addBullet(lines) {
    const values=lines.value.split("\n").map(line => line.startsWith("•")?line:`•${line}`);
    lines.value=values.join("\n");
}
function popExpForm(){
    const form = document.getElementById("resume-form");
    const formContainer = document.getElementById("form-container")
    formContainer.classList.remove("form-container-hidden")
    form.innerHTML = `
        <label for="company">Company:</label>
        <input type="text" id="company" name="company">
        <label for="title">Position Title:</label>
        <input type="text" id="title" name="title">
        <label for="org-address">Location:</label>
        <textarea id="org-address" name="org-address"></textarea>
        <label for="start">Start Date:</label>
        <input type="date" id="start" name="start">
        <label for="end">End Date:</label>
        <input type="date" id="end" name="end">
        <label for="exp">Experience:</label>
        <textarea id="exp" name="exp" oninput="addBullet(this)"></textarea>
        
        <button type="button" id="add-exp-entry">Save</button>
        <button type="button" id="cancel-exp-entry">Cancel</button>
    `;
    return form;
}

function parseStringToDateObject(str) {
    return new Date("1 " + str);  // Always use `new`
}
function addEduEntry(saveButton, addButton) {
    // Get form input values
    const form = saveButton.parentElement;
    const college = form.querySelector("#university").value;
    const gradDate = form.querySelector("#graduation").value;
    const major = form.querySelector("#major").value;

    if (!college || !gradDate) {
        alert("Please fill in all fields.");
        return;
    }

    // Parse graduation date
    const [year, month, day] = gradDate.split("-").map(Number);
    const gradDateObj = new Date(year, month-1, day);
    const list = addButton.previousElementSibling;
    const dateString = gradDateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
        <div class="component">
            <ul>
                <li><strong>${college}</strong><span class="float-right">${dateString}</span></li>
                <li>${major}</li>
            </ul>
            <i class="fa-solid fa-trash trash-icon-edu"></i>
        </div>`

    list.appendChild(wrapper.firstElementChild);
    const components = Array.from(list.querySelectorAll(".component"));

    //  Sort in descending order
    components.sort((a, b) => {
        const dateA = parseStringToDateObject(a.querySelector(".float-right").textContent.trim());
        const dateB = parseStringToDateObject(b.querySelector(".float-right").textContent.trim());
        return dateB - dateA;
    });

    // Re-append in sorted order
    components.forEach(c => list.appendChild(c));

    bindDeleteFunction();
    bindUpdateFunction(); // Not good but simple way. Save my mind.
    cancelEntry();
}
function addEducation(addButton) {
    const form = popEduForm();
    form.querySelector('#add-edu-entry').addEventListener('click', function() {
        addEduEntry(this, addButton);
    });
    form.querySelector('#cancel-edu-entry').addEventListener('click', function() {
        cancelEntry();
    });
}

function addSkillEntry(saveButton, addButton) {
    const form = saveButton.parentElement;
    const name = form.querySelector("#new-skill-name").value;
    const detail = form.querySelector("#new-skill-detail").value;

    if (!name || !detail) {
        alert("Please fill in all fields.");
        return;
    }

    const list = addButton.previousElementSibling;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
        <div class="component">
            <ul>
                <li><strong>${name}</strong>: <span>${detail}</span></li>
            </ul>
            <i class="fa-solid fa-trash trash-icon-skill"></i>
        </div>`

    list.appendChild(wrapper.firstElementChild);

    bindDeleteFunction();
    bindUpdateFunction();
    cancelEntry();
}
function addSkill(addButton) {
    const form = popSkillForm();
    form.querySelector('#add-skill-entry').addEventListener('click', function() {
        addSkillEntry(this, addButton);
    });
    form.querySelector('#cancel-skill-entry').addEventListener('click', function() {
        cancelEntry();
    })
}

function parseEndDate(component) {
    const dateText = component.querySelector("em").textContent;
    const match = dateText.match(/-\s*([A-Za-z]{3} \d{4})/); // Extract "Jul 2024"

    return new Date("1 " + match[1]);  // "1 Jul 2024"
}
function addExpEntry(saveButton, addButton) {
    const form = saveButton.parentElement;
    const company = form.querySelector("#company").value;
    const title = form.querySelector("#title").value;
    const orgAddress = form.querySelector("#org-address").value;
    const start = form.querySelector("#start").value;
    const end = form.querySelector("#end").value;
    const exp = form.querySelector("#exp").value;
    const vals=[company,title,orgAddress,start,end,exp]

    for (let val of vals) {
        if (!val) {
            alert("Please fill in all fields.");
            return;
        }
    }

    const [syear, smonth, sday] = start.split("-").map(Number);
    const startDateObj = new Date(syear,smonth-1, sday);
    const [eyear, emonth, eday] = end.split("-").map(Number);
    const endDateObj = new Date(eyear, emonth-1, eday);

    const list = addButton.previousElementSibling;
    const startDate = startDateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
    const endDate = endDateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
        <div class="component">
            <ul>
                <li>${company}, ${title}</li>
                <li><em>${orgAddress} | ${startDate} - ${endDate}</em></li>
                ${exp.split('\n')
        .map(line => line.trim().replace(/^•\s*/, ''))
        .filter(line => line.length > 0)
        .map(line => `<li>${line}</li>`)
        .join('\n')}
            </ul>
            <i class="fa-solid fa-trash trash-icon-exp"></i>
        </div>`

    list.appendChild(wrapper.firstElementChild);
    const components = Array.from(list.querySelectorAll(".component"));

    // Sort by end date descending
    components.sort((a, b) => parseEndDate(b) - parseEndDate(a));

    // Re-append in sorted order
    components.forEach(comp => list.appendChild(comp));

    bindDeleteFunction();
    bindUpdateFunction();
    cancelEntry();
}
function addExp(addButton) {
    const form = popExpForm();
    form.querySelector('#add-exp-entry').addEventListener('click', function() {
        addExpEntry(this, addButton);
    });
    form.querySelector('#cancel-exp-entry').addEventListener('click', function() {
        cancelEntry();
    });
}

function hidePreview() {
    const right = document.getElementById('preview-container');
    const screenWidth = window.innerWidth;
    if (screenWidth <= 1024) {
        right.style.display = 'none';
    }
}
function showPreview() {
    const right = document.getElementById('preview-container');
    const screenWidth = window.innerWidth;

    if (screenWidth <= 1024) {
        right.style.display = 'block';
    }
}

function adjustHeight(textarea) { // Helper function to adjust height
    textarea.style.height = 'auto'; // Reset height
    void textarea.offsetHeight; // Trigger reflow
    const scrollHeight = textarea.scrollHeight; // Get the actual content height

    // Get the computed line height or fallback to font size
    let lineHeight = getComputedStyle(textarea).lineHeight;
    if (lineHeight === 'normal') {
        const fontSize = parseFloat(getComputedStyle(textarea).fontSize);
        lineHeight = fontSize * 1.2; // Approximate default multiplier for "normal"
    } else {
        lineHeight = parseFloat(lineHeight); // Convert to numeric
    }

    const maxHeight = lineHeight * 6; // Max height for 6 rows
    const finalHeight = Math.min(scrollHeight, maxHeight);
    textarea.style.height = `${finalHeight}px`;
}
function adjustTextarea(form) {
    const textareas = form.querySelectorAll('textarea');

    // Adjust each textarea
    textareas.forEach(textarea => {
        adjustHeight(textarea); // Adjust for pre-filled content
        textarea.addEventListener('input', function () {
            adjustHeight(this); // Adjust dynamically on input
        });
    });
}

function updateEduEntry(saveButton, ulBlock){
    const addButton = ulBlock.closest('section').querySelector('.add-button');
    const divBlock = ulBlock.parentElement;
    divBlock.remove();
    addEduEntry(saveButton, addButton);
}
function updateSkillEntry(saveButton, ulBlock){
    const addButton = ulBlock.closest('section').querySelector('.add-button');
    const divBlock = ulBlock.parentElement;
    divBlock.remove();
    addSkillEntry(saveButton, addButton);
}
function updateExpEntry(saveButton, ulBlock){
    const addButton = ulBlock.closest('section').querySelector('.add-button');
    const divBlock = ulBlock.parentElement;
    divBlock.remove();
    addExpEntry(saveButton, addButton);
}

function parseStringToFormDate(dateString){ //Jul 2023
    return new Date("1 "+dateString).toISOString().split('T')[0];
}
function fillEducationForm(ulBlock) {
    const form = popEduForm();
    const liItems = ulBlock.querySelectorAll('li');
    form.querySelector("#university").value = liItems[0].querySelector("strong").innerText.trim();
    const dateText = liItems[0].querySelector('span').innerText.trim();
    form.querySelector("#graduation").value = parseStringToFormDate(dateText);
    form.querySelector("#major").value = liItems[1].innerText.trim();

    adjustTextarea(form);

    form.querySelector('#add-edu-entry').addEventListener('click', function() {
        updateEduEntry(this, ulBlock);
    });
    form.querySelector('#cancel-edu-entry').addEventListener('click', function() {
        cancelEntry();
    });
}
function fillSkillForm(ulBlock) {
    const form = popSkillForm();
    const liItem = ulBlock.querySelector('li');
    form.querySelector("#new-skill-name").value = liItem.querySelector("strong").innerText.trim();
    form.querySelector("#new-skill-detail").value = liItem.querySelector("span").innerText.trim();

    adjustTextarea(form);

    form.querySelector('#add-skill-entry').addEventListener('click', function() {
        updateSkillEntry(this, ulBlock);
    });
    form.querySelector('#cancel-skill-entry').addEventListener('click', function() {
        cancelEntry();
    });
}
function fillExperienceForm(ulBlock) {
    const form = popExpForm();
    const liItems = ulBlock.querySelectorAll('li');

    form.querySelector("#company").value = liItems[0].innerText.split(",")[0].trim();
    form.querySelector("#title").value = liItems[0].innerText.split(",")[1].trim();
    form.querySelector("#org-address").value = liItems[1].innerText.split("|")[0].trim();

    const start = liItems[1].innerText.split("|")[1].split("-")[0].trim();
    const end = liItems[1].innerText.split("|")[1].split("-")[1].trim();
    form.querySelector("#start").value = parseStringToFormDate(start);
    form.querySelector("#end").value = parseStringToFormDate(end);

    let bullets = [];
    for (let i = 2; i < liItems.length; i++) {
        bullets.push("• " + liItems[i].innerText.trim());
    }
    form.querySelector("#exp").value = bullets.join('\n');

    adjustTextarea(form);

    form.querySelector('#add-exp-entry').addEventListener('click', function() {
        updateExpEntry(this, ulBlock);
    });
    form.querySelector('#cancel-exp-entry').addEventListener('click', function() {
        cancelEntry();
    });
}
function fillForm(ulBlock, listName) {
    if (listName === "#edu-list"){
        ulBlock.addEventListener('click', ()=> fillEducationForm(ulBlock));
    } else if (listName === "#skill-list"){
        ulBlock.addEventListener('click', ()=> fillSkillForm(ulBlock));
    } else {
        ulBlock.addEventListener('click', ()=> fillExperienceForm(ulBlock));
    }
}

//
// Below needs further modification
//
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

        document.body.innerHTML = printElement.outerHTML; // Replace body with the container
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

    if (templateId === 1) {
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