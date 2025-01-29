document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('promptForm').addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const prompt = document.getElementById('prompt').value;
    
        // urlのあとに /generateつけてね
        const apiUrl = 'https://3c6a-35-198-255-38.ngrok-free.app/generate'; // Colabの公開URLに置き換える
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt,
                    num_images: 6,
                    rows: 2,
                    cols: 3
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to generate image.');
            }
    
            const data = await response.json();
            const imageUrl = `https://3c6a-35-198-255-38.ngrok-free.app/${data.image_url}`;
            
            // 生成された画像を表示
            const imgElement = document.getElementById('generatedImage');
            imgElement.src = imageUrl;
            imgElement.style.display = 'block';
        } catch (error) {
            console.error(error);
            alert('Error generating image. Please try again.');
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
