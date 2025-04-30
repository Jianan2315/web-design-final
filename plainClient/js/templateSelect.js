const thumbnails = document.querySelectorAll(".thumbnail");
const overlay = document.getElementById("overlay");
const enlargedThumbnail = document.getElementById("enlarged-thumbnail");

// Functions
function showEnlargedThumbnail(e) {
    const imgSrc = this.querySelector("img").getAttribute("src");
    enlargedThumbnail.innerHTML = `<img src="${imgSrc}" alt="Enlarged Thumbnail">`;
    enlargedThumbnail.dataset.templateId = this.getAttribute("data-template");
    overlay.style.display = "flex";
}

function hideEnlargedThumbnail() {
    overlay.style.display = "none";
    enlargedThumbnail.innerHTML = ""; // Clear the enlarged thumbnail content
}

thumbnails.forEach(thumbnail => {
    // Show the enlarged thumbnail when hovering over a thumbnail
    thumbnail.addEventListener("mouseenter", showEnlargedThumbnail);
    // Click event to navigate to Edit Page
    thumbnail.addEventListener("click", function() {
        const templateId = this.getAttribute("data-template");
        window.location.href = `edit.html?template=${templateId}`;
    });
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

// Click event for enlarged
enlargedThumbnail.addEventListener("click", function() {
    const templateId = this.dataset.templateId;
    window.location.href = `edit.html?template=${templateId}`;
});

// Ensure overlay is hidden on page load
document.addEventListener("DOMContentLoaded", hideEnlargedThumbnail);
