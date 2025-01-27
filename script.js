document.getElementById('promptForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const prompt = document.getElementById('prompt').value;

    // urlのあとに /generateつけてね
    const apiUrl = 'https://3e35-34-142-195-154.ngrok-free.app/generate'; // Colabの公開URLに置き換える

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
        const imageUrl = `https://3e35-34-142-195-154.ngrok-free.app/${data.image_url}`;
        
        // 生成された画像を表示
        const imgElement = document.getElementById('generatedImage');
        imgElement.src = imageUrl;
        imgElement.style.display = 'block';
    } catch (error) {
        console.error(error);
        alert('Error generating image. Please try again.');
    }
});
