// edit.js

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

// get values
document.getElementById("preview-btn").addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const location = document.getElementById("location").value;
    const university = document.getElementById("university").value;
    const graduation = document.getElementById("graduation").value;
    const major = document.getElementById("major").value;
    const communication = document.getElementById("communication").value;
    const program = document.getElementById("program").value;
    const cert = document.getElementById("cert").value;
    const company = document.getElementById("company").value;
    const title = document.getElementById("title").value;
    const orgAddress = document.getElementById("org-address").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const exp = document.getElementById("exp").value;

    const preview = document.getElementById("resume-preview");
    preview.innerHTML = `
    <!-- Header -->
    <header>
      <h1>${name}</h1>
      <p> Phone: ${phone} | Email: ${email} | Location: ${location}</p>
    </header>
    
    <!-- Education Section -->
    <section>
      <h2>Education</h2>
      <table>
        <tr>
          <td><strong>${university}</strong></td>
          <td>${graduation}</td>
        </tr>
        <tr class="degree">
          <td>${major}</td>
        </tr>
      </table>
    </section>
    
    <!-- Personal Skills Section -->
    <section>
      <h2>Personal Skills</h2>
      <ul>
        <li><strong>Communication language</strong> : ${communication} </li>
        <li><strong>Programming languages</strong> : ${program} </li>
        <li><strong>Certifications</strong> : ${cert} </li>
      </ul>
    </section>
    
    <!-- Professional Experience Section -->
    <section>
      <h2>Professional Experience</h2>
      <h3>${company}, ${title}</h3>
      <p><em>${orgAddress} | ${start} - ${end}</em></p>
      <ul>
        <li>${exp}</li>
      </ul>
    
    </section>
  `;
});

// Load selected template
window.addEventListener("load", function () {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("template");

    // predefined value for demo
    document.getElementById("name").value = "Michael Johnson";
    document.getElementById("phone").value = "(857)-737-4159";
    document.getElementById("email").value = "michael@gmail.com";
    document.getElementById("location").value = "Boston";
    document.getElementById("university").value = "Boston University";
    document.getElementById("graduation").value = "Dec 2023";
    document.getElementById("major").value = "Master of Science in Computer Science";
    document.getElementById("communication").value = "English, France, Japanese";
    document.getElementById("program").value = "Java, Python, Go, Haskell, Ruby";
    document.getElementById("cert").value = "Microsoft Certified: Azure Integration Specialist;";
    document.getElementById("company").value = "Microsoft";
    document.getElementById("title").value = "Support Engineer";
    document.getElementById("org-address").value = "San Francisco";
    document.getElementById("start").value = "Jan 2024";
    document.getElementById("end").value = "Present";
    document.getElementById("exp").value = "Resolved over 200 support tickets for Azure Cloud Integration Service.";

    // Use templateId to load different templates
    // For simplicity, we'll just display the template ID
    const preview = document.getElementById("resume-preview");
    preview.innerHTML = `<p>Selected Template ID: ${templateId}</p>`;
    preview.classList.add("template"+templateId)
    addCSS("template"+templateId+".css")
    preview.innerHTML = `
    <!-- Header -->
    <header id="personal-info">
      <h1>Michael Johnson</h1>
      <p> Phone: (999)-123-4567 | Email: jo.mi@northeastern.edu | Location: Boston</p>
    </header>
    
    <!-- Education Section -->
    <section id="edu-section">
      <h2>Education</h2>
      <div class="editIcon" id="eduIcon">
          <i class="fa-solid fa-minus" onclick="activateOverlay(this)" style="float:right;"></i>
          <i class="fa-solid fa-plus" onclick="addEducation(this)" style="float:right;margin-right: 5px;"></i>
      </div>      
      <table>
        <tr>
          <td><strong>Northeastern University</strong></td>
          <td>Dec 2026</td>
        </tr>
        <tr class="degree">
          <td>MS in Software Engineering Systems</td>
        </tr>
        <tr>
          <td><strong>Boston University</strong></td>
          <td> Dec 2019</td>
        </tr>
        <tr class="degree">
          <td>BS in Computer Science</td>
        </tr>
      </table>
    </section>
    
    <!-- Personal Skills Section -->
    <section id="skill-section">
      <h2>Personal Skills</h2>
      <div class="editIcon" id="skillIcon">
        <i class="fa-solid fa-minus" onclick="activateOverlay(this)" style="float:right;"></i>
        <i class="fa-solid fa-plus" onclick="addSkill(this)" style="float:right;margin-right: 5px;"></i>
      </div>
      <ul>
        <li><strong>Communication language</strong>: Chinese (Native), English (Proficient)</li>
        <li><strong>Programming languages</strong>: Python, SQL, HTML5, Java</li>
        <li><strong>Certifications</strong>: ITIL 4 Foundation; Microsoft Certified: Azure Database Administrator Associate; Microsoft Certified: Security, Compliance, and Identity Fundamentals</li>
      </ul>
    </section>
    
    <!-- Professional Experience Section -->
    <section id="exp-section">
      <h2>Professional Experience</h2>
      <div class="editIcon" id="expIcon">
        <i class="fa-solid fa-minus" onclick="activateOverlay(this)" style="float:right;"></i>
        <i class="fa-solid fa-plus" onclick="addExp(this)" style="float:right;margin-right: 5px;"></i>
      </div>      
      <h3>Wicresoft, Azure PaaS Support Engineer</h3>
      <p><em>Shanghai | Jul 2023 - Jul 2024</em></p>
      <ul>
        <li>Provided technical support for Azure Logic Apps integration services through individual research, team discussions, and cross-team collaboration to ensure customer satisfaction.</li>
        <li>Resolved over 300 support tickets involving Azure products such as Monitor, Sentinel, Virtual Network, Web Application Firewall, and Microsoft Entra ID.</li>
      </ul>
        
      <h3>Huawei Digital Power Technology, Software Development Engineer</h3>
      <p><em>Shenzhen | Mar 2022 - Aug 2022</em></p>
      <ul>
        <li>Participated in the productization of intelligent battery algorithms, including data acquisition, data preprocessing, feature engineering, model inference, and unit testing.</li>
        <li>Constructed test data using Python libraries such as NumPy and Pandas for unit testing to ensure algorithm consistency.</li>
      </ul>
  
      <h3>Dell, Global Operations Engineer, Intern</h3>
      <p><em>Shanghai | Jul 2021 - Sep 2021</em></p>
      <ul>
        <li>Participated in the construction of a cross-departmental data integration platform to enhance data access management and reduce the risk of data leakage.</li>
        <li>Used PowerBI to visualize business logic behind the integration platform, assisting the development team in understanding business requirements.</li>
      </ul>
    
    </section>
  `;
});

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {

    // Get the button and add an event listener
    const downloadButton = document.getElementById("download-icon");

    downloadButton.addEventListener("click", () => {
        // Get the HTML content to be converted
        let element = document.getElementById("resume-preview");
        const icons= element.querySelectorAll(".editIcon");
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
            // .then(()=>{element.classList.remove("pdf")})
            .then(()=>{window.location.href = "download.html";})
            ;
    });
});

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
        console.log(dates)
        populateModifyOptionsTable(names, "exp", dates)
    } else {
        console.log("ERROR: Unable to access icons container.")
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
        console.log("ERROR: Invalid mode type.")
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
        console.log(universityName, date)
        // return;

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

        const orgName = bothNames[0].trim()
        const date = bothNames[2].trim()
        console.log(orgName)
        console.log(date)
        // Find the related record in #exp-section
        const expSection = document.querySelector('#exp-section');
        const records = expSection.querySelectorAll('h3');

        records.forEach(record => {
            console.log("BREAKLINE")
            console.log(record.textContent)
            console.log(record.nextElementSibling.textContent)
            if (record.textContent.includes(orgName) && record.nextElementSibling.textContent.includes(date)) {
                const eles = [record,record.nextElementSibling,record.nextElementSibling.nextElementSibling];
                for (let e of eles) {
                    e.remove()
                }
            }
        });
    });
    cancelModify()
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
    `;
    form.querySelector('#add-edu-entry').addEventListener('click', function() {
        addEduEntry(this, icon);
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
    const table = icon.closest("section").querySelector("table");
    const dateString = gradDateObj.toLocaleString('default', { month: 'short', year: 'numeric' });//toDateString()
    table.innerHTML += `
        <tr>
          <td><strong>${college}</strong></td>
          <td>${dateString}</td>
        </tr>
        <tr class="degree">
          <td>${major}</td>
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
    rowBlocks.forEach(block => {
        table.appendChild(block.institutionRow);
        table.appendChild(block.degreeRow);
    });
    cancelEntry();
}

function cancelEntry() {
    const formContainer = document.getElementById("form-container")
    formContainer.classList.add("form-container-hidden")
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
    `;
    form.querySelector('#add-skill-entry').addEventListener('click', function() {
        addSkillEntry(this, icon);
    });
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
    unorderedList.innerHTML += `
        <li><strong>${name}</strong> : ${detail}</li>
    `
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
    `;
    form.querySelector('#add-exp-entry').addEventListener('click', function() {
        addExpEntry(this, icon);
    });
}

function addExpEntry(button, icon) {
    // 2. Get form input values
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
    const expSection = icon.closest("section");
    const startDate = startDateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
    const endDate = endDateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
    expSection.innerHTML += `
        <h3>${company}, ${title}</h3>
        <p><em>${orgAddress} | ${startDate} - ${endDate}</em></p>
        <ul></ul>
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
                console.log(startD); // Output: "Jan 2023" (or whatever your start date is)
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
    blocks.forEach(block => {
        expSection.appendChild(block.h);
        expSection.appendChild(block.p);
        expSection.appendChild(block.ul);
    });
    cancelEntry();
}
function addBullet(lines) {
    const values=lines.value.split("\n").map(line => line.startsWith("•")?line:`•${line}`);
    lines.value=values.join("\n");
}