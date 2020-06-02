let countries = "";
let urlCountry = "https://api.covid19api.com/countries";
fetch(urlCountry)
  .then((response) => response.json())
  .then((res) => {
    res.forEach((val) => {
      countries += `
      <option value="${val.Country}">${val.Country}</option>`;
    });
    document.getElementById("select").innerHTML += countries;
  });
document.getElementById("select").addEventListener("change", (e) => {
  let contry = e.target.value;
  let url = `https://api.covid19api.com/total/dayone/country/${contry}`;
  let flagUrl = `https://restcountries.eu/rest/v2/name/${contry}`;

  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      let date = new Date();
      let day = "0" + (date.getUTCDate() - 1);
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let yesterday = `${month}-${day}`;
      let api = res.filter((val) => {
        if (val.Date.includes(yesterday)) return val;
      });

      let getData = (data) => {
        if (data.length === 0) return "undefined";

        if (data.length == 1) return data;
      };
      document.querySelector("#data").innerHTML = createCard(getData(api));

      fetch(flagUrl)
        .then((response) => response.json())
        .then((res) => {
          document.getElementById(
            "flag"
          ).innerHTML = `<img class="mt-2 rounded mx-auto d-block" width="400" ; height="200"  src="${res[0].flag}" alt="">`;
        });

      function createCard(data) {
        let year = date.getFullYear();
        let timeData = `${yesterday}-${year}`;
        if (data == "undefined") {
          return "no data available ";
        }
        return `
        <div class="row">
        <div class="col-md-12 mt-4">
          <div class="card">
            <span id="flag"></span>
            <div class="card-body">
              <h5 class="card-title text-center">${data[0].Country}</h5>
              <p class="card-text">
                <b>Active: </b><span class="text-warning">${data[0].Active}</span><br />
                <b>Confirmed: </b><span class="text-info">${data[0].Confirmed} </span><br />
                <b>Deaths: </b><span class="text-danger">${data[0].Deaths}</span><br/>
                <b>Recovered: </b><span class="text-success">${data[0].Recovered}</span> 
              </p>
              <p class="card-text border-top pt-2"><b>Last Update: </b> ${timeData}</p>
            </div>
          </div>
        </div>
      </div>`;
      }
    });
});
let date = new Date();
let year = date.getFullYear();
document.querySelector("#footer").innerHTML = `Covid-19 &copy;${year}`;
