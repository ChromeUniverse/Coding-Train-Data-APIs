console.log('About to fetch a rainbow');

// fetching image
fetch('rainbow.jpg')
  // getting response -> turn it into a blob
  .then(res => {
    console.log(res);
    return res.blob();
  })
  // create URL objects and inject it into the DOM
  .then(blob => {
    console.log(blob);
    document.getElementById('rainbow').src = URL.createObjectURL(blob);
  })
  .catch(error => {
    console.log('BIG OOPSIE!!!');
    console.error(error);
  });