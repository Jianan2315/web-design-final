const PORT=3072;

// Load selected template
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

    // Bind trash icon with delete function
    bindEduDelete();
    bindSkillDelete();
    bindExpDelete();

    // Bind all add buttons with add function
    bindAddFunction();

    // Add hover effect to "blocks"
    bindEduBlock();
    bindExpBlock();

    // Link update with click
    popEditForm();

});

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

function bindAddFunction(){
    const addEduButton =  document.getElementById("add-edu");
    const addSkillButton =  document.getElementById("add-skill");
    const addExpButton =  document.getElementById("add-exp");
    addEduButton.addEventListener("click", function(event) {
        hidePreview();
        addEducation(this);
    });
    addSkillButton.addEventListener("click", function(event) {
        hidePreview();
        addSkill(this);
    });
    addExpButton.addEventListener("click", function(event) {
        hidePreview();
        addExp(this);
    });
}

function bindEduDelete(){
    document.querySelectorAll(".trash-icon-edu").forEach((icon)=>{
        const block = icon.parentElement;
        if (block) {
            icon.addEventListener("click", function(event) {
                deleteItem(event, this);
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

function bindSkillDelete(){
    document.querySelectorAll(".trash-icon-skill").forEach((icon)=>{
        const block = icon.parentElement;
        if (block) {
            icon.addEventListener("click", function(event) {
                deleteItem(event, this);
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

function bindExpDelete(){
    document.querySelectorAll(".trash-icon-exp").forEach((icon)=>{
        const block = icon.parentElement;
        if (block) {
            icon.addEventListener("click", function(event) {
                deleteItem(event, this);
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

function deleteItem(e,icon) {
    const block = icon.parentElement;
    block.remove();
    cancelEntry();
}

function bindEduBlock(){
    // Add hover effect to "blocks"
    const eduSection = document.getElementById("edu-section");
    // edu
    if (eduSection){
        // console.log("bindEduBlock()");
    } else {
        console.log("Invalid eduSection");
        return;
    }

    // odd
    const oddElements=eduSection.querySelectorAll("tr:nth-child(odd)");
    oddElements.forEach(oddElement => {
        oddElement.addEventListener('mouseenter', () => {
            const nextSibling = oddElement.nextElementSibling;
            if (nextSibling && nextSibling.classList.contains('component')) {
                nextSibling.classList.add('component-hover');
            }
        });

        oddElement.addEventListener('mouseleave', () => {
            const nextSibling = oddElement.nextElementSibling;
            if (nextSibling && nextSibling.classList.contains('component')) {
                nextSibling.classList.remove('component-hover');
            }
        });
    });

    // even
    const evenElements=eduSection.querySelectorAll("tr:nth-child(even)");
    evenElements.forEach(evenElement => {
        evenElement.addEventListener('mouseenter', () => {
            const prevSibling = evenElement.previousElementSibling;
            if (prevSibling && prevSibling.classList.contains('component')) {
                prevSibling.classList.add('component-hover');
            }
        });

        evenElement.addEventListener('mouseleave', () => {
            const prevSibling = evenElement.previousElementSibling;
            if (prevSibling && prevSibling.classList.contains('component')) {
                prevSibling.classList.remove('component-hover');
            }
        });
    });

}

function bindExpBlock(){
    const expSection = document.getElementById("exp-section");

    // first
    const firstElements=expSection.querySelectorAll("h3");
    firstElements.forEach(firstElement => {
        firstElement.addEventListener('mouseenter', () => {
            const secondElement = firstElement.nextElementSibling;
            const thirdElement = secondElement.nextElementSibling;
            secondElement.classList.add('component-hover');
            thirdElement.classList.add('component-hover');
        });

        firstElement.addEventListener('mouseleave', () => {
            const secondElement = firstElement.nextElementSibling;
            const thirdElement = secondElement.nextElementSibling;
            secondElement.classList.remove('component-hover');
            thirdElement.classList.remove('component-hover');
        });
    });
    // 2nd
    const secondElements = expSection.querySelectorAll("p");
    secondElements.forEach(secondElement => {
        secondElement.addEventListener('mouseenter', () => {
            const firstElement = secondElement.previousElementSibling;
            const thirdElement = secondElement.nextElementSibling;
            firstElement.classList.add('component-hover');
            thirdElement.classList.add('component-hover');
        });

        secondElement.addEventListener('mouseleave', () => {
            const firstElement = secondElement.previousElementSibling;
            const thirdElement = secondElement.nextElementSibling;
            firstElement.classList.remove('component-hover');
            thirdElement.classList.remove('component-hover');
        });
    });
    // 3rd
    const thirdElements = expSection.querySelectorAll("ul");
    thirdElements.forEach(thirdElement => {
        thirdElement.addEventListener('mouseenter', () => {
            const secondElement = thirdElement.previousElementSibling;
            const firstElement = secondElement.previousElementSibling;
            firstElement.classList.add('component-hover');
            secondElement.classList.add('component-hover');
        });

        thirdElement.addEventListener('mouseleave', () => {
            const secondElement = thirdElement.previousElementSibling;
            const firstElement = secondElement.previousElementSibling;
            firstElement.classList.remove('component-hover');
            secondElement.classList.remove('component-hover');
        });
    });
}

function bindInfoBlock(){
    const headSection = document.getElementById("personal-info");

    // first
    const firstElement=headSection.querySelector("h1");
    firstElement.addEventListener('mouseenter', () => {
        const secondElement = firstElement.nextElementSibling;
        secondElement.classList.add('component-hover');
    });
    firstElement.addEventListener('mouseleave', () => {
        const secondElement = firstElement.nextElementSibling;
        secondElement.classList.remove('component-hover');
    });

    // 2nd
    const secondElement = headSection.querySelector("p");
    secondElement.addEventListener('mouseenter', () => {
        const firstElement = secondElement.previousElementSibling;
        firstElement.classList.add('component-hover');
    });
    secondElement.addEventListener('mouseleave', () => {
        const firstElement = secondElement.previousElementSibling;
        firstElement.classList.remove('component-hover');
    });

}

function updateInfoEntry(button, block) {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const loc = document.getElementById("info-location").value;

    const vals=[name,phone,email,loc]

    for (let val of vals) {
        if (!val) {
            alert("Please fill in all fields.");
            return;
        }
    }

    const headSection = block[0].closest("header");
    // Due to async render issue, remove() has to be placed before any (implicit) sync function.
    block.forEach(ele => {
        ele.remove();
        // ele was removed out of DOM, but still exists as a variable/object
    });
    headSection.innerHTML = `
      <h1>${name}</h1>
      <p> Phone: ${phone} | Email: ${email} | Location: ${loc}</p>
    `

    bindInfoBlock();
    popEditForm();
    cancelEntry();
}

function popEditForm() {
    const eduSection = document.getElementById("edu-section");
    const skillSection = document.getElementById("skill-section");
    const expSection = document.getElementById("exp-section");

    // personal info
    const headSection = document.getElementById("personal-info");
    const name = headSection.querySelector("h1");
    const info = headSection.querySelector("p");
    const [phone, email, location] = info.textContent.split('|').map(info => info.trim().split(":")[1].trim());
    const block = [name, info];
    block.forEach(ele => {
        ele.addEventListener('click', () => {
            const form = document.getElementById("resume-form");
            const formContainer = document.getElementById("form-container");
            hidePreview();
            formContainer.classList.remove("form-container-hidden");
            form.innerHTML = `
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value="${name.textContent}">
                    <label for="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" value="${phone}">
                    <label for="email">Email:</label>
                    <input type="text" id="email" name="email" value="${email}">
                    <label for="info-location">Location:</label>
                    <input type="text" id="info-location" name="info-location" value="${location}">
                    
                    <button type="button" id="update-info-entry">Update</button>
                    <button type="button" id="cancel-info-entry">Cancel</button>
                `;
            form.querySelector('#update-info-entry').addEventListener('click', function () {
                updateInfoEntry(this, block);
            });
            form.querySelector('#cancel-info-entry').addEventListener('click', function () {
                cancelEntry();
            });
        });
    });

    // edu
    const eduRows = eduSection.querySelectorAll("tr");
    let blocks = [];
    for (let i = 0; i < eduRows.length; i += 2) {
        // blocks.push({first:eduRows[i], second:eduRows[i+1]});
        blocks.push([eduRows[i], eduRows[i + 1]]);
    }

    blocks.forEach(block => {
        const cells = block[0].querySelectorAll("td");
        const college = cells[0].textContent.trim();
        const date = new Date(`${cells[1].textContent.trim()} 01`).toISOString().split('T')[0];
        const major = block[1].textContent.trim();
        block.forEach(ele => {
            ele.addEventListener('click', () => {
                const form = document.getElementById("resume-form");
                const formContainer = document.getElementById("form-container");
                hidePreview();
                formContainer.classList.remove("form-container-hidden");
                form.innerHTML = `
                    <label for="university">University:</label>
                    <textarea id="university" name="university">${college}</textarea>
                    <label for="graduation">(Expected) Graduation Year:</label>
                    <input type="date" id="graduation" name="graduation" value=${date}>
                    <label for="major">Major:</label>
                    <textarea id="major" name="major">${major}</textarea>
                    
                    <button type="button" id="update-edu-entry">Update</button>
                    <button type="button" id="cancel-edu-entry">Cancel</button>
                `;
                form.querySelector('#update-edu-entry').addEventListener('click', function () {
                    updateEduEntry(this, block);
                });
                form.querySelector('#cancel-edu-entry').addEventListener('click', function () {
                    cancelEntry();
                });
            });
        });

    });


    // skill
    const skillRows = skillSection.querySelectorAll("li");
    skillRows.forEach(block => {
        const strongElement = block.querySelector('strong');
        const title = strongElement.textContent.trim(); // "Communication language"
        // Extract the remaining part (after the colon)
        const details = block.textContent.replace(title + ':', '').trim(); // "Chinese (Native), English (Proficient)"
        block.addEventListener('click', () => {
            const form = document.getElementById("resume-form");
            const formContainer = document.getElementById("form-container");
            hidePreview();
            formContainer.classList.remove("form-container-hidden");
            form.innerHTML = `
                <label for="new-skill-name">Skill name:</label>
                <textarea id="new-skill-name" name="new-skill-name">${title}</textarea>
                 <label for="new-skill-detail">Skill details:</label>
                <textarea id="new-skill-detail" name="new-skill-detail">${details}</textarea>
                
                <button type="button" id="update-skill-entry">Update</button>
                <button type="button" id="cancel-skill-entry">Cancel</button>
            `;
            adjustTextarea();
            form.querySelector('#update-skill-entry').addEventListener('click', function () {
                updateSkillEntry(this, block);
            });
            form.querySelector('#cancel-skill-entry').addEventListener('click', function () {
                cancelEntry();
            });
        });


    });

    // EXP
    const firstEles = expSection.querySelectorAll("h3");
    const secondEles = expSection.querySelectorAll("p");
    const thirdEles = expSection.querySelectorAll("ul");
    blocks = [];
    for (let i = 0; i < firstEles.length; i += 1) {
        // blocks.push({first:eduRows[i], second:eduRows[i+1]});
        blocks.push([firstEles[i], secondEles[i], thirdEles[i]]);
    }

    blocks.forEach(block => {
        // Extract details
        const titleAndCompany = block[0].textContent.trim();
        const locationAndDates = block[1].textContent.trim();
        const liEles = block[2].querySelectorAll("li");
        const experienceItems = Array.from(liEles).map(li => "•"+li.textContent.trim());
        // Combine experience items into a single string
        const experienceString = experienceItems.join('\n');

        // Parse title and company
        const [company, title] = titleAndCompany.split(', ').map(str => str.trim());

        // Parse location and dates
        const [location, dateRange] = locationAndDates.split('|').map(str => str.trim());
        const [startDate, endDate] = dateRange.split(' - ').map(str => makeDate(str.trim()));

        block.forEach(ele => {
            ele.addEventListener('click', () => {
                const form = document.getElementById("resume-form");
                const formContainer = document.getElementById("form-container");
                hidePreview();
                formContainer.classList.remove("form-container-hidden");
                form.innerHTML = `
                    <label for="company">Company:</label>
                    <input type="text" id="company" name="company" value="${company}">
                    <label for="title">Position Title:</label>
                    <input type="text" id="title" name="title" value="${title}">
                    <label for="org-address">Location:</label>
                    <textarea id="org-address" name="org-address">${location}</textarea>
                    <label for="start">Start Date:</label>
                    <input type="date" id="start" name="start" value=${startDate}>
                    <label for="end">End Date:</label>
                    <input type="date" id="end" name="end" value=${endDate}>
                    <label for="exp">Experience:</label>
                    <textarea id="exp" name="exp" oninput="addBullet(this)">${experienceString}</textarea>
                    
                    <button type="button" id="update-exp-entry">Update</button>
                    <button type="button" id="cancel-exp-entry">Cancel</button>
                `;
                adjustTextarea();
                form.querySelector('#update-exp-entry').addEventListener('click', function () {

                    updateExpEntry(this, block);
                });
                form.querySelector('#cancel-exp-entry').addEventListener('click', function () {
                    cancelEntry();
                });
            });
        });

    });

}

function makeDate(inputDate){
    // inputDate = "Jul 2023";
    const [month, year] = inputDate.split(' ');

    // Convert "Jul 2023" into "2023-07-01"
    const monthNumber = new Date(`${month} 1, ${year}`).getMonth() + 1; // 1-based month
    const validDate = `${year}-${String(monthNumber).padStart(2, '0')}-01`;
    return validDate;
}

function updateExpEntry(button, block) {
    const company = document.getElementById("company").value;
    const title = document.getElementById("title").value;
    const orgAddress = document.getElementById("org-address").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const exp = document.getElementById("exp").value;
    const vals=[company,title,orgAddress,start,end,exp]

    for (let val of vals) {
        if (!val) {
            alert("Please fill in all fields.");
            return;
        }
    }
    // 3. graduation date
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    // 4.
    const expSection = block[0].closest("section");
    const startDate = startDateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
    const endDate = endDateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
    // Due to async render issue, remove() has to be placed before any (implicit) sync function.
    block.forEach(ele => {
        ele.remove();
        // console.log("ele: ",ele);
        // ele was removed out of DOM, but still exists as a variable/object
    });
    expSection.innerHTML += `
        <h3 class="component">${company}, ${title}</h3>
        <p class="component"><em>${orgAddress} | ${startDate} - ${endDate}</em></p>
        <ul class="component"><i class="fa-solid fa-trash trash-icon-exp"></i></ul>
    `

    const ulEles = expSection.querySelectorAll("ul");
    const last = ulEles[ulEles.length - 1];
    for (let e of exp.split("\n")) {
        const item = document.createElement('li');
        item.textContent = e.slice(1);
        last.appendChild(item);
    }
    // 5. Collect elements into "blocks"
    const blocks = [];
    const heads = Array.from(expSection.querySelectorAll('h3'));

    for (let h of heads) {
        const p = h.nextElementSibling;
        const ul = p.nextElementSibling;
        const em = p.querySelector('em');
        let startD = ""
        if (em) {
            // Extract the text content of the <p> element.
            const textContent = em.textContent; // Example: "Some Address | Jan 2023 - Dec 2023"

            // Use a regular expression to extract the start date (format: "Month Year").
            const match = textContent.match(/(\w{3} \d{4})/); // Matches "Month Year" format.
            if (match) {
                startD = match[1]; // The first matched group.
                // console.log(startD); // Output: "Jan 2023" (or whatever your start date is)
            } else {
                console.log('No start date found.');
            }
        }
        blocks.push({h, p, ul, startD});
    }

    // 5. Add sorting logic
    // Sort the blocks based on the start date
    blocks.sort((a, b) => {
        const dateA = new Date(a.startD.trim());
        const dateB = new Date(b.startD.trim());
        return dateB - dateA; // Sort in descending order
    });

    // 7. Append sorted rows back to the table
    expSection.innerHTML =`
        <h2>Professional Experience</h2>
        <div class="editIcon" id="expIcon">
        <i class="fa-solid fa-plus" onclick="addExp(this)" style="float:right;margin-right: 10px;"></i>
        </div>
    `;
    blocks.forEach(block => {
        expSection.appendChild(block.h);
        expSection.appendChild(block.p);
        expSection.appendChild(block.ul);
    });
    expSection.innerHTML += `<div id="add-exp" class="add-button">+</div>`;
    bindExpBlock();
    bindAddFunction();
    bindExpDelete()
    popEditForm();
    cancelEntry();
}

function updateEduEntry(button, block) {
    const form = button.parentNode;
    const college = form.querySelector("#university").value;
    const gradDate = form.querySelector("#graduation").value;
    const major = form.querySelector("#major").value;

    if (!college || !gradDate) {
        alert("Please fill in all fields.");
        return;
    }

    // 3. Parse graduation date
    const gradDateObj = new Date(gradDate);
    const dateString = gradDateObj.toLocaleString('default', {month: 'short', year: 'numeric' });

    const table = block[0].closest("section").querySelector("table tbody");
    block.forEach(ele => {
        ele.remove();
        // console.log("ele: ",ele);
        // ele was removed out of DOM, but still exists as a variable/object
    });
    table.innerHTML += `
        <tr class="component">
          <td><strong>${college}</strong></td>
          <td>${dateString}</td>
          <td class="trash-td" rowspan="2"><i class="fa-solid fa-trash trash-icon-edu"></i></td>
        </tr>
        <tr class="degree component">
          <td colspan="2">${major}</td>
        </tr>
    `;

    // 5. Collect rows into "blocks" of [institutionRow, degreeRow]
    const rowBlocks = [];
    const rows = Array.from(table.querySelectorAll('tr'));

    for (let i = 0; i < rows.length; i+=2) {
        const institutionRow = rows[i];
        const degreeRow = rows[i + 1];
        rowBlocks.push({ institutionRow, degreeRow });
    }

    // 5. Add sorting logic
    // Sort the blocks based on the date in the institutionRow's second cell
    rowBlocks.sort((a, b) => {
        const dateA = new Date(a.institutionRow.cells[1].textContent.trim());
        const dateB = new Date(b.institutionRow.cells[1].textContent.trim());
        return dateB - dateA; // Sort in descending order
    });

    // here is cause of pair hover effect issue.
    // appendChild() may mess readable order
    // first attempt: remove content first
    table.innerHTML="";
    rowBlocks.forEach(rowBlock => {
        table.appendChild(rowBlock.institutionRow);
        table.appendChild(rowBlock.degreeRow);
    });

    bindEduBlock(); // per my view, it caused by previous sort, which changed the reference so that pair goes wrong.
    bindEduDelete();
    popEditForm(); // SOLVE EVENT listener issue but encounter new one for pair hover effect. so explore bindEduBlock();
    cancelEntry();
}

function updateSkillEntry(button, block) {
    const form = button.parentNode;
    const name = form.querySelector("#new-skill-name").value;
    const detail = form.querySelector("#new-skill-detail").value;

    if (!name || !detail) {
        alert("Please fill in all fields.");
        return;
    }
    const unorderedList = block.closest("ul");
    block.remove();

    unorderedList.innerHTML += `
        <li class="component"><strong>${name}</strong>: ${detail}<i class="fa-solid fa-trash trash-icon-skill"></i></li>
    `;
    bindSkillDelete();
    popEditForm();
    cancelEntry();
}

function addEducation(icon) {
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
    form.querySelector('#add-edu-entry').addEventListener('click', function() {
        addEduEntry(this, icon);
    });
    form.querySelector('#cancel-edu-entry').addEventListener('click', function() {
        cancelEntry();
    });
}

function addEduEntry(button, icon) {
    // 2. Get form input values
    const form = button.parentNode;
    const college = form.querySelector("#university").value;
    const gradDate = form.querySelector("#graduation").value;
    const major = form.querySelector("#major").value;

    if (!college || !gradDate) {
        alert("Please fill in all fields.");
        return;
    }

    // 3. Parse graduation date
    const gradDateObj = new Date(gradDate);

    // 4. Add new row to the table
    const table = icon.closest("section").querySelector("table tbody");
    const dateString = gradDateObj.toLocaleString('default', { month: 'short', year: 'numeric' });//toDateString()
    table.innerHTML += `
        <tr class="component">
          <td><strong>${college}</strong></td>
          <td>${dateString}</td>
          <td class="trash-td" rowspan="2"><i class="fa-solid fa-trash trash-icon-edu"></i></td>
        </tr>
        <tr class="degree component">
          <td colspan="2">${major}</td>
        </tr>
    `

    // 5. Collect rows into "blocks" of [institutionRow, degreeRow]
    const rowBlocks = [];
    const rows = Array.from(table.querySelectorAll('tr'));

    for (let i = 0; i < rows.length; i+=2) {
        const institutionRow = rows[i];
        const degreeRow = rows[i + 1];
        rowBlocks.push({ institutionRow, degreeRow });
    }

    // 5. Add sorting logic
    // Sort the blocks based on the date in the institutionRow's second cell
    rowBlocks.sort((a, b) => {
        const dateA = new Date(a.institutionRow.cells[1].textContent.trim());
        const dateB = new Date(b.institutionRow.cells[1].textContent.trim());
        return dateB - dateA; // Sort in descending order
    });

    // 7. Append sorted rows back to the table
    table.innerHTML="";
    rowBlocks.forEach(block => {
        table.appendChild(block.institutionRow);
        table.appendChild(block.degreeRow);
    });
    bindEduBlock();
    bindEduDelete();
    popEditForm();
    cancelEntry();
}

function cancelEntry() {
    const formContainer = document.getElementById("form-container");
    formContainer.classList.add("form-container-hidden");
    showPreview();
}

function addSkill(icon) {
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
    form.querySelector('#add-skill-entry').addEventListener('click', function() {
        addSkillEntry(this, icon);
    });
    form.querySelector('#cancel-skill-entry').addEventListener('click', function() {
        cancelEntry();
    })
}

function addSkillEntry(button, icon) {
    const form = button.parentNode;
    const name = form.querySelector("#new-skill-name").value;
    const detail = form.querySelector("#new-skill-detail").value;

    if (!name || !detail) {
        alert("Please fill in all fields.");
        return;
    }

    const unorderedList = icon.closest("section").querySelector("ul");
    // lol: a fixed issue here: If </i> was missed here, here will add two trash icon tags. IDK the logic behind the issue.
    // it seems like auto implicit complement for html caused this issue.
    unorderedList.innerHTML += `
        <li class="component"><strong>${name}</strong>: ${detail}<i class="fa-solid fa-trash trash-icon-skill"></i></li>
    `;

    bindSkillDelete();
    popEditForm();
    cancelEntry();
}

function addExp(icon) {
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
    form.querySelector('#add-exp-entry').addEventListener('click', function() {
        addExpEntry(this, icon);
    });
    form.querySelector('#cancel-exp-entry').addEventListener('click', function() {
        cancelEntry();
    });
}

function addExpEntry(button, icon) {
    // 2. Get form input values
    const company = document.getElementById("company").value;
    const title = document.getElementById("title").value;
    const orgAddress = document.getElementById("org-address").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const exp = document.getElementById("exp").value;
    const vals=[company,title,orgAddress,start,end,exp]

    for (let val of vals) {
        if (!val) {
            alert("Please fill in all fields.");
            return;
        }
    }
    // 3. graduation date
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    // 4.
    const expSection = icon.closest("section");
    const startDate = startDateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
    const endDate = endDateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
    expSection.innerHTML += `
        <h3 class="component">${company}, ${title}</h3>
        <p class="component"><em>${orgAddress} | ${startDate} - ${endDate}</em></p>
        <ul class="component"><i class="fa-solid fa-trash trash-icon-exp"></i></ul>
    `

    const ulEles = expSection.querySelectorAll("ul");
    const last = ulEles[ulEles.length - 1];
    for (let e of exp.split("\n")) {
        const item = document.createElement('li');
        item.textContent = e.slice(1);
        last.appendChild(item);
    }
    // 5. Collect elements into "blocks"
    const blocks = [];
    const heads = Array.from(expSection.querySelectorAll('h3'));

    for (let h of heads) {
        const p = h.nextElementSibling;
        const ul = p.nextElementSibling;
        const em = p.querySelector('em');
        let startD = ""
        if (em) {
            // Extract the text content of the <p> element.
            const textContent = em.textContent; // Example: "Some Address | Jan 2023 - Dec 2023"

            // Use a regular expression to extract the start date (format: "Month Year").
            const match = textContent.match(/(\w{3} \d{4})/); // Matches "Month Year" format.
            if (match) {
                startD = match[1]; // The first matched group.
                // console.log(startD); // Output: "Jan 2023" (or whatever your start date is)
            } else {
                console.log('No start date found.');
            }
        }
        blocks.push({h, p, ul, startD});
    }

    // 5. Add sorting logic
    // Sort the blocks based on the start date
    blocks.sort((a, b) => {
        const dateA = new Date(a.startD.trim());
        const dateB = new Date(b.startD.trim());
        return dateB - dateA; // Sort in descending order
    });

    // 7. Append sorted rows back to the table
    expSection.innerHTML=`
        <h2>Professional Experience</h2>
        <div class="editIcon" id="expIcon">
        <i class="fa-solid fa-plus" onclick="addExp(this)" style="float:right;margin-right: 10px;"></i>
        </div>
    `;
    blocks.forEach(block => {
        expSection.appendChild(block.h);
        expSection.appendChild(block.p);
        expSection.appendChild(block.ul);
    });
    expSection.innerHTML += `<div id="add-exp" class="add-button">+</div>`;
    bindExpBlock();
    bindAddFunction();
    bindExpDelete();
    popEditForm();
    cancelEntry();
}
function addBullet(lines) {
    const values=lines.value.split("\n").map(line => line.startsWith("•")?line:`•${line}`);
    lines.value=values.join("\n");
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

function adjustTextarea() {
    const textareas = document.querySelectorAll('textarea');

    // Helper function to adjust height
    function adjustHeight(textarea) {
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

    // Adjust each textarea
    textareas.forEach(textarea => {
        adjustHeight(textarea); // Adjust for pre-filled content
        textarea.addEventListener('input', function () {
            adjustHeight(this); // Adjust dynamically on input
        });
    });
}
