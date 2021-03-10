 //helper function
 setAttributes = (element, attributes) => {
 	for (const key in attributes){
 		element.setAttribute(key, attributes[key]);
 	}
 }


 const imageContainer = document.getElementById('image-container');
 const loader = document.getElementById('loader');

 let ready = false;
 let imagesLoaded = 0;
 let totalImages = 0;
 let photosArray = [];


 let count = 5; //load 5 images first time
 const apiKey = 'Ct531iheUm9uJm15YtxX-lKJe6vEVjOMzLeuIQ7Qk-k';
 const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if images are loaded
imageLoaded = () => {
 imagesLoaded++;
 console.log(imagesLoaded);
 if (imagesLoaded === totalImages) {
 	ready = true;
 	loader.hidden = true;
 	console.log('ready = ', ready);
 	count = 30;
 }
}

function displayPhotos(){
	imagesLoaded = 0;
	totalImages = photosArray.length;
	console.log('totalImages', totalImages);
	photosArray.forEach((photo) => {
		//Create <a> element to link to unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href:photo.links.html,
			target:'_blank',
		});
		//Create <img> for pic
		const img = document.createElement('img');
		setAttributes(img, {
			src:photo.urls.regular,
			alt:photo.alt_description,
			title:photo.alt_description,
		});
		//Event listener, when each is finished loading
		img.addEventListener('load', imageLoaded);
		//Put image inside <a> and put both inside imagecontainer
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

 async function getPhotos(){
 	try {

 		const response = await fetch(apiUrl);
 		photosArray= await response.json();
 		displayPhotos();
 	}catch (error){
 		//Catch error
 	}
 }  

//Scroll event
window.addEventListener('scroll', () => {
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
	{	
		ready = false;
		getPhotos();
		console.log('loadmore');
	}
});

 getPhotos();