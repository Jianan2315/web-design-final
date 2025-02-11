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
        icon.addEventListener("click", function(event) {
            deleteEduItem(event, this);
        });

        const relatedRows=[]
        relatedRows[0] = icon.closest('tr');
        relatedRows[1] = relatedRows[0].nextElementSibling;
        relatedRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                icon.classList.add('trash-icon-visible');
            });

            row.addEventListener('mouseleave', () => {
                icon.classList.remove('trash-icon-visible');
            });
        });
    });
}
function getElementPath(element) {
    if (!element) return '';

    let path = [];
    while (element.parentNode) {
        let tagName = element.tagName.toLowerCase();
        let siblings = Array.from(element.parentNode.children).filter(el => el.tagName === element.tagName);

        if (siblings.length > 1) {
            // If there are multiple siblings with the same tag name, use nth-child
            let index = Array.from(element.parentNode.children).indexOf(element) + 1;
            path.unshift(`${tagName}:nth-child(${index})`);
        } else {
            // Use tag name if it's unique
            path.unshift(tagName);
        }

        element = element.parentNode;
        if (element === document.documentElement) break; // Stop at the root element
    }

    return path.join(' > ');
}

function bindSkillDelete(){
    document.querySelectorAll(".trash-icon-skill").forEach((icon)=>{
        icon.addEventListener("click", function(event) {
            deleteSkillItem(event, this);
        });
        const row = icon.closest('li');
        row.addEventListener('mouseenter', () => {
            icon.classList.add('trash-icon-visible');
        });
        row.addEventListener('mouseleave', () => {
            icon.classList.remove('trash-icon-visible');
        });

    });
}

function bindExpDelete(){
    document.querySelectorAll(".trash-icon-exp").forEach((icon)=>{
        icon.addEventListener("click", function(event) {
            deleteExpItem(event, this);
        });

        const relatedRows=[];
        relatedRows[0] = icon.closest('ul');
        relatedRows[1] = relatedRows[0].previousElementSibling;
        relatedRows[2] = relatedRows[1].previousElementSibling;
        relatedRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                icon.classList.add('trash-icon-visible');
            });

            row.addEventListener('mouseleave', () => {
                icon.classList.remove('trash-icon-visible');
            });
        });
    });
}
function deleteEduItem(e,icon) {
    e.stopPropagation();
    const relatedRows=[];
    relatedRows[0] = icon.closest('tr');
    relatedRows[1] = relatedRows[0].nextElementSibling;
    relatedRows.forEach(row => row.remove());
    cancelEntry();
}
function deleteSkillItem(e,icon) {
    e.stopPropagation();
    const relatedRow = icon.closest('li');
    relatedRow.remove();
    cancelEntry();
}
function deleteExpItem(e,icon) {
    e.stopPropagation();
    const relatedRows=[];
    relatedRows[0] = icon.closest('ul');
    relatedRows[1] = relatedRows[0].previousElementSibling;
    relatedRows[2] = relatedRows[1].previousElementSibling;
    relatedRows.forEach(row => row.remove());
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
    const form = button.parentNode;// unused
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
    const form = button.parentNode;
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
        <i class="fa-solid fa-minus" onclick="activateOverlay(this)" style="float:right;"></i>
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

// set grayscale background
function activateOverlay(icon) {
    document.body.classList.add("disabled"); // Apply grayscale and disable body
    document.getElementById("overlay").style.display = "block"; // Show overlay
    document.getElementById("modify-table").style.display = "block"; // Show table

    const section = icon.closest("section"); // Find the closest <section> ancestor
    if (icon.parentNode.id=="eduIcon"){
        const table = section.querySelector("table"); // Select the <table> within this section
        const rows = table.querySelectorAll("tr:nth-child(odd) td strong")
        const names = Array.from(rows).map(row => row.textContent);
        const dates = [];
        for (let row of rows) {
            dates.push(row.parentNode.nextElementSibling.textContent);
        }
        populateModifyOptionsTable(names, "edu",dates)
    } else if (icon.parentNode.id=="skillIcon"){
        const ul = section.querySelector("ul"); // Select the <ul> within this section
        const rows = ul.querySelectorAll("li strong")
        const names = Array.from(rows).map(row => row.textContent);
        populateModifyOptionsTable(names, "skill")
    } else if (icon.parentNode.id=="expIcon"){
        const rows = section.querySelectorAll("h3")
        const names = Array.from(rows).map(row => row.textContent);
        const dates = [];
        for (let row of rows) {
            dates.push(row.nextElementSibling.textContent.split("|")[1].split("-")[0].trim());
        }
        populateModifyOptionsTable(names, "exp", dates);
    } else {
        console.log("ERROR: Unable to access icons container.");
    }
}

// list content in table
function populateModifyOptionsTable(names, mode, dates=null) {
    // Get the target table where university names will be added
    const modifyOptionsTable = document.getElementById("modify-options");
    modifyOptionsTable.innerHTML = "";
    if (["edu","skill","exp"].includes(mode)) {
        names.forEach((name, index) => {
            const row = document.createElement("tr");
            const checkboxCell = document.createElement("td");
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `${mode}${index + 1}`;
            label.appendChild(checkbox);
            checkboxCell.appendChild(label);
            row.appendChild(checkboxCell);

            // Create the university name cell
            const contentCell = document.createElement("td");
            contentCell.colSpan = 2;
            contentCell.style.whiteSpace = "nowrap";
            if (dates) {
                contentCell.textContent = name+", "+dates[index];
            } else {
                contentCell.textContent = name;
            }
            row.appendChild(contentCell);

            // Append the row to the table
            modifyOptionsTable.appendChild(row);
        });
    } else {
        console.log("ERROR: Invalid mode type.");
        return;
    }
    if (mode == "edu") {
        modifyOptionsTable.innerHTML += `
        <tr>
            <td></td>
            <td class="btn-cell"><button onclick="deleteEduRecord()">Delete</button></td>
            <td class="btn-cell"><button onclick="cancelModify()">Cancel</button></td>
        </tr>
    `;
    } else if (mode == "skill") {
        modifyOptionsTable.innerHTML += `
        <tr>
            <td></td>
            <td class="btn-cell"><button onclick="deleteSkillRecord()">Delete</button></td>
            <td class="btn-cell"><button onclick="cancelModify()">Cancel</button></td>
        </tr>
    `;
    }
    else if (mode == "exp") {
        modifyOptionsTable.innerHTML += `
        <tr>
            <td></td>
            <td class="btn-cell"><button onclick="deleteExpRecord()">Delete</button></td>
            <td class="btn-cell"><button onclick="cancelModify()">Cancel</button></td>
        </tr>
    `;
    }
}

function deleteEduRecord(){
    // Get all checked checkboxes within the modify-options table
    const checkedItems = document.querySelectorAll('#modify-options input[type="checkbox"]:checked');

    // Iterate over each checked checkbox to find and remove related records
    checkedItems.forEach(checkbox => {
        // Get the text content from the associated row (the next sibling <td>)
        const relatedRow = checkbox.closest('tr');
        const bothNames = relatedRow.querySelector('td:nth-child(2)').textContent.trim().split(",");
        const universityName = bothNames[0].trim()
        const date = bothNames[1].trim()

        // Find the related record in #edu-section
        const eduSection = document.querySelector('#edu-section');
        const records = eduSection.querySelectorAll('tr');
        let deleteNextRow = false;

        records.forEach(record => {
            if (record.textContent.includes(universityName) && record.textContent.includes(date)) {
                // Remove the matched record (university)
                record.remove();
                // Optionally remove the next row if it contains degree info
                deleteNextRow = true;
            } else if (deleteNextRow && record.classList.contains('degree')) {
                // Remove the degree row if it's next to the matched row
                record.remove();
                deleteNextRow = false;
            }
        });

        // Remove the corresponding row from the modify-options table
        // relatedRow.remove();
    });
    cancelModify()
}

function deleteSkillRecord(){
    // Get all checked checkboxes within the modify-options table
    const checkedItems = document.querySelectorAll('#modify-options input[type="checkbox"]:checked');

    // Iterate over each checked checkbox to find and remove related records
    checkedItems.forEach(checkbox => {
        // Get the text content from the associated row (the next sibling <td>)
        const relatedRow = checkbox.closest('tr');
        const skillName = relatedRow.querySelector('td:nth-child(2)').textContent.trim();

        // Find the related record in #skill-section
        const skillSection = document.querySelector('#skill-section');
        const records = skillSection.querySelectorAll('li');

        records.forEach(record => {
            if (record.textContent.includes(skillName)) {
                record.remove();
            }
        });
    });
    cancelModify()
}

function deleteExpRecord(){
    // Get all checked checkboxes within the modify-options table
    const checkedItems = document.querySelectorAll('#modify-options input[type="checkbox"]:checked');

    // Iterate over each checked checkbox to find and remove related records
    checkedItems.forEach(checkbox => {
        // Get the text content from the associated row (the next sibling <td>)
        const relatedRow = checkbox.closest('tr');
        const bothNames = relatedRow.querySelector('td:nth-child(2)').textContent.trim().split(",");

        const orgName = bothNames[0].trim();
        const date = bothNames[2].trim();

        // Find the related record in #exp-section
        const expSection = document.querySelector('#exp-section');
        const records = expSection.querySelectorAll('h3');

        records.forEach(record => {
            if (record.textContent.includes(orgName) && record.nextElementSibling.textContent.includes(date)) {
                const eles = [record,record.nextElementSibling,record.nextElementSibling.nextElementSibling];
                for (let e of eles) {
                    e.remove();
                }
            }
        });
    });
    cancelModify();
}

function cancelModify(){
    document.body.classList.remove("disabled"); // remove grayscale and disable body
    document.getElementById("overlay").style.display = "none"; // remove overlay
    document.getElementById("modify-table").style.display = "none"; // remove table
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
    const form = button.parentNode; // button is not essential but backup
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
        <i class="fa-solid fa-minus" onclick="activateOverlay(this)" style="float:right;"></i>
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
