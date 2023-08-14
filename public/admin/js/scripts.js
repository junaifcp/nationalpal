// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById('sidebar');
const openModalButton = document.getElementById('open-modal-button');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');
const categoryForm = document.getElementById('category-form');
function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

// script.js
const imageInput = document.getElementById('imageInput');
const sizeChartInput = document.getElementById('sizeChartInput');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imageChartPreviewContainer = document.getElementById('imageChartPreviewContainer');

imageInput.addEventListener('change', handleImagePreview);
sizeChartInput.addEventListener('change', handleImageSizePreview);
let selectedImages = [];
let tooManyImages = false;
function handleImagePreview(event) {
  imagePreviewContainer.innerHTML = '';
  const files = event.target.files;
  tooManyImages = files.length > 3;

  if (tooManyImages) {
    // If too many images selected, clear the selected images array
    selectedImages = [];
  } else {
    selectedImages = Array.from(files);
  }
  if (selectedImages.length > 0) {
    for (const file of selectedImages) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('imagePreview');
        imagePreviewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  }else{
    alert("You can select maximum of three images");

  }
}
function handleImageSizePreview(event) {
  imageChartPreviewContainer.innerHTML = '';
  const files = event.target.files;
  if (files.length > 0) {
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('imageChartPreview');
        imageChartPreviewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  }else{
    alert("You can select maximum of three images");

  }
}

