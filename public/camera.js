const video = document.getElementById('camera');
      const canvas = document.getElementById('canvas');
      const captureButton = document.getElementById('capture');
      const constraints = { video: { width: 640, height: 480 } };

      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          video.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });

      captureButton.addEventListener('click', () => {
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append('image', blob, 'image.jpg');
          fetch('/employee', { method: 'POST', body: formData })
            .then(() => {
              console.log('Image uploaded successfully');
              window.location.href = 'http://localhost:3000/employee/create';
            })
            .catch((error) => {
              console.error('Error uploading image:', error);
            });
        }, 'image/jpeg', 0.9);

        
      });