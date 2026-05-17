async function run() {
  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyD4d_YEwRLFofkqfHBoud0VVe09KZoTdrU");
    const data = await res.json();
    console.log(data.models.map(m => m.name).join("\n"));
  } catch (e) {
    console.error(e);
  }
}
run();
