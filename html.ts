function read(file, cb) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      cb(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", file, true);
  xmlhttp.send();
}

export default function html(done) {
  read('/main.html', function(html) {
    document.body.innerHTML += html;
    done();
  });
}