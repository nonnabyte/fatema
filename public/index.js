document.addEventListener('DOMContentLoaded', function() {
  const photoInput = document.getElementById('photoInput');
  const preview = document.getElementById('preview');

  photoInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              preview.src = e.target.result;
              preview.style.display = 'block';
          };
          reader.readAsDataURL(file);
      }
  });

  document.getElementById('uploadForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('photo', photoInput.files[0]);

      fetch('/upload', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          alert('Photo sent to printer! Once photo is received, add it to the mirror!');
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
});