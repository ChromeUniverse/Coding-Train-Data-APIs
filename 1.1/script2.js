async function catchRainbow() {
  try {
    const response = await fetch('rainbow.jpg');
    const blob = await response.blob();
    document.getElementById('rainbow').src = URL.createObjectURL(blob);
  }
  catch (err) {
    console.log('BIG ASYNC OOPSIE!!!')
    console.error(err);
  }
}

catchRainbow();