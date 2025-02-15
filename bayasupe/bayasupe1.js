document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('promptForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const prompt = document.getElementById('prompt').value;

        // urlのあとに /generateつけてね
        const apiUrl = 'https://2b00-34-125-202-132.ngrok-free.app/generate'; // Colabの公開URLに置き換える

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
            const imageUrl = `https://2b00-34-125-202-132.ngrok-free.app/${data.image_url}`;

            // 生成された画像を表示
            const imgElement = document.getElementById('generatedImage');
            imgElement.src = imageUrl;
            imgElement.style.display = 'block';
        } catch (error) {
            console.error(error);
            alert('Error generating image. Please try again.');
        }
    });

    // 画像の読み込みが完了したらダウンロードリンクを設定する
    document.getElementById('generatedImage').addEventListener('load', async function () {
        try {
            // 現在の画像の URL を取得
            const imageUrl = this.src;
            // 画像を fetch で取得して Blob に変換
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch image for download.');
            }
            const blob = await response.blob();
            // Blob からオブジェクト URL を生成
            const blobUrl = URL.createObjectURL(blob);

            // HTML の id "downloadlink" のアンカー要素を取得
            const downloadLink = document.getElementById('downloadlink');
            downloadLink.href = blobUrl;                  // Blob URL を設定
            downloadLink.download = 'downloadedImage.jpg';  // ダウンロード時のファイル名を指定
            downloadLink.style.display = 'block';           // リンクを表示
        } catch (error) {
            console.error('Error while preparing download:', error);
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

    /*
    function setupDownloadLinks() {
        for (let i = 1; i <= 3; i++) {
            let image = document.getElementById(`image${i}`);
            let link = document.getElementById(`downloadLink${i}`);
            link.addEventListener('click', function () {
                link.href = image.src;
                link.download = `downloaded_image${i}.jpg`;
            });
        }
    }
    */

});
