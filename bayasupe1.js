document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate-button').addEventListener('click', function() {
        var description = document.getElementById('prompt').value;
        if (description) {
            fetch('https://api.stablediffusionapi.com/v1/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY'
                },
                body: JSON.stringify({ 
                    model: '',
                    prompt: description,
                    n: 3, 
                    size: '600x600'
                })
            })
            .then(response => response.json())
            .then(data => {
                var imageUrl = data.image_url; 
                document.getElementById('generated-image').src = imageUrl;
            })
            .catch(error => console.error('Error:', error));
        }
    });

    function resizeImages(size) {
        const images = document.querySelectorAll('.image-container img');
        images.forEach(image => {
            if (size === 'small') {
                image.style.width = '128px';
                image.style.height = '128px';
            } else if (size === 'medium') {
                image.style.width = '512px';
                image.style.height = '512px';
            } else if (size === 'large') {
                image.style.width = '1024px';
                image.style.height = '1024px';
            }
        });
    }

    window.resizeImages = resizeImages;

    function setupDownloadLinks() {
        for (let i = 1; i <= 3; i++) {
            let image = document.getElementById(`image${i}`);
            let link = document.getElementById(`downloadLink${i}`);
            link.addEventListener('click', function() {
                link.href = image.src;
                link.download = `downloaded_image${i}.jpg`;
            });
        }
    }

    setupDownloadLinks();
});
