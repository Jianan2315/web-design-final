window.addEventListener("load", function () {
    let resume = "";
    const thumbnail1 = document.getElementById('resume1');
    thumbnail1.addEventListener('click', function () {
        fetch('../json/resume_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching file: ${response.statusText}`);
            }
            return response.json(); // Read the file as text
        })
        .then(data=>resume=data).then(()=>console.log(typeof(resume)))
        .then(()=>{
            localStorage.setItem('data', JSON.stringify(resume)); 
            const templateId = "3"; //get by database
            window.location.href = `edit.html?template=${templateId}`;
        });
        
    });

});

