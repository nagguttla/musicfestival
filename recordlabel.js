function fetchMusicFestivalInfo()
{
// CORS Anywhere is a NodeJS proxy which adds CORS headers to the proxied request.
  const url = 'https://cors-anywhere.herokuapp.com/http://eacodingtest.digital.energyaustralia.com.au/api/v1/festivals';
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    let finalData = updateResponseFormat(data);
    display(finalData);
    })
  .catch(function(error) {
    console.log(error);
  });   

}

function createNode(element) {
    return document.createElement(element); // Create the type of element you pass in the parameters
  }

  function append(parent, el) {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
  }

// This function creates the view by creating the respective elements
function updateResponseFormat(data)
{
var tmp ={}
if(data != null) {
// looping through the response and creating the structure needed for display
data.forEach(function(festival){
    var bands = festival.bands;
    if(bands != null)
    {
    bands.forEach(function(band){
      if (band.recordLabel != null && band.recordLabel !== "") {
      var id = band.recordLabel;

     if(!tmp.hasOwnProperty(id)){
         tmp[id] = {
            "recordLabel": band.recordLabel,
            "band": []
         };
        } 
        var tempBand = {bandName: "", festival: ""};
        tempBand.bandName = band.name;
        tempBand.festival = festival.name;
    
      tmp[id].band.push(tempBand);
    }
      

    });
    }

 });

var results = Object.keys(tmp).map(function(idx){
    return tmp[idx];
    });
}
return results;
}

// Creating the view with the html tags
function display(data)
{
    if(data != null) {  
    return data.sort((a,b) => a.recordLabel.localeCompare(b.recordLabel)).map(function(label) {
      let li1 = createNode('li');
          span = createNode('span');
      span.innerHTML = `${label.recordLabel}`;
      append(li1, span);
      label.band.sort((a,b) => a.bandName.localeCompare(b.bandName)).map(function(band){
      let innerUl1 = createNode('ul');
      let li2 = createNode('li');
          span = createNode('span');
      span.innerHTML = `${band.bandName}`;
      append(li2, span);
      append(innerUl1, li2);
      append(li1, innerUl1);
      let innerUl2 = createNode('ul');
      let li3 = createNode('li');
          span = createNode('span');
      if(`${band.festival}` != null && `${band.festival}` !== "" && `${band.festival}` !== "undefined"){
      span.innerHTML = `${band.festival}`;
      append(li3, span);
      append(innerUl2, li3);
      append(li2, innerUl2);
      }
      let ul = document.getElementById("recordLabelsList");
      append(ul,li1);
        });
    });
    }
}