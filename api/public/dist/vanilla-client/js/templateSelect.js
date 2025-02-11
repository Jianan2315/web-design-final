const thumbnails = document.querySelectorAll(".thumbnail");
const overlay = document.getElementById("overlay");
const enlargedThumbnail = document.getElementById("enlarged-thumbnail");
var thumbnailTemplateId = 0;

// Functions
function showEnlargedThumbnail(e) {
    const imgSrc = this.querySelector("img").getAttribute("src");
    thumbnailTemplateId = this.getAttribute("data-template");
    enlargedThumbnail.innerHTML = `<img src="${imgSrc}" alt="Enlarged Thumbnail">`;
    overlay.style.display = "flex";
}

function hideEnlargedThumbnail() {
    overlay.style.display = "none";
    enlargedThumbnail.innerHTML = ""; // Clear the enlarged thumbnail content
}

// Show the enlarged thumbnail when hovering over a thumbnail
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("mouseenter", showEnlargedThumbnail);
});

// Hide the enlarged thumbnail when mouse moves away
document.addEventListener("mousemove", function(e) {
    const isOverThumbnail = Array.from(thumbnails).some(thumbnail => thumbnail.contains(e.target));
    const isOverEnlarged = enlargedThumbnail.contains(e.target);

    // Only hide the overlay if it"s currently displayed
    if (overlay.style.display === "flex" && !isOverThumbnail && !isOverEnlarged) {
        hideEnlargedThumbnail();
    }
});

// Click event to navigate to Edit Page
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", function() {
        const templateId = this.getAttribute("data-template");
        window.location.href = `edit.html?template=${templateId}`;
    });
});

// Click event for enlarged
enlargedThumbnail.addEventListener("click", function() {
    const templateId = thumbnailTemplateId;
    window.location.href = `edit.html?template=${templateId}`;
});

// Ensure overlay is hidden on page load
document.addEventListener("DOMContentLoaded", function() {
    overlay.style.display = "none";
    enlargedThumbnail.innerHTML = ""; // Clear any content just in case
});
