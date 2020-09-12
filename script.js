new Vue({
  el: "#a",
  data: {
    res: "",
    codes: [
      "AF",
      "AX",
      "AL",
      "DZ",
      "AS",
      "AD",
      "AO",
      "AI",
      "AQ",
      "AG",
      "AR",
      "AM",
      "AW",
      "AU",
      "AT",
      "AZ",
      "BA",
      "BB",
      "BD",
      "BE",
      "BF",
      "BG",
      "BH",
      "BI",
      "BJ",
      "BL",
      "BM",
      "BN",
      "BO",
      "BQ",
      "BR",
      "BS",
      "BT",
      "BV",
      "BW",
      "BY",
      "BZ",
      "CA",
      "CC",
      "CD",
      "CF",
      "CG",
      "CH",
      "CI",
      "CK",
      "CL",
      "CM",
      "CN",
      "CO",
      "CR",
      "CU",
      "CV",
      "CW",
      "CX",
      "CY",
      "CZ",
      "DE",
      "DJ",
      "DK",
      "DM",
      "DO",
      "DZ",
      "EC",
      "EE",
      "EG",
      "EH",
      "ER",
      "ES",
      "ET",
      "FI",
      "FJ",
      "FK",
      "FM",
      "FO",
      "FR",
      "GA",
      "GB",
      "GD",
      "GE",
      "GF",
      "GG",
      "GH",
      "GI",
      "GL",
      "GM",
      "GN",
      "GP",
      "GQ",
      "GR",
      "GS",
      "GT",
      "GU",
      "GW",
      "GY",
      "HK",
      "HM",
      "HN",
      "HR",
      "HT",
      "HU",
      "ID",
      "IE",
      "IL",
      "IM",
      "IN",
      "IO",
      "IQ",
      "IR",
      "IS",
      "IT",
      "JE",
      "JM",
      "JO",
      "JP",
      "KE",
      "KG",
      "KH",
      "KI",
      "KM",
      "KN",
      "KP",
      "KR",
      "KW",
      "KY",
      "KZ",
      "LA",
      "LB",
      "LC",
      "LI",
      "LK",
      "LR",
      "LS",
      "LT",
      "LU",
      "LV",
      "LY",
      "MA",
      "MC",
      "MD",
      "ME",
      "MF",
      "ML",
      "MM",
      "MN",
      "MO",
      "MP",
      "MQ",
      "MR",
      "MS",
      "MT",
      "MU",
      "MV",
      "MW",
      "MX",
      "MY",
      "MZ",
      "NA",
      "NC",
      "NE",
      "NF",
      "NG",
      "NI",
      "NL",
      "NO",
      "NP",
      "NR",
      "NU",
      "NZ",
      "OM",
      "PA",
      "PE",
      "PF",
      "PG",
      "PH",
      "PK",
      "PL",
      "PM",
      "PN",
      "PR",
      "PS",
      "PT",
      "PW",
      "PY",
      "QA",
      "RE",
      "RO",
      "RS",
      "RU",
      "RW",
      "SA",
      "SB",
      "SC",
      "SD",
      "SE",
      "SG",
      "SH",
      "SI",
      "SJ",
      "SK",
      "SL",
      "SM",
      "SN",
      "SO",
      "SR",
      "SS",
      "ST",
      "SV",
      "SX",
      "SY",
      "SZ",
      "TC",
      "TD",
      "TF",
      "TG",
      "TH",
      "TJ",
      "TK",
      "TL",
      "TM",
      "TN",
      "TO",
      "TR",
      "TT",
      "TV",
      "TW",
      "TZ",
      "UA",
      "UG",
      "UM",
      "US",
      "UY",
      "UZ",
      "VA",
      "VC",
      "VE",
      "VG",
      "VI",
      "VN",
      "VU",
      "WF",
      "WS",
      "YE",
      "YT",
      "ZA",
      "ZM",
      "ZW"
    ],
    countries: [],
    dark: false,
    showDetail: "dd",
    detFlag: "",
    detTitle: "",
    det1: "",
    det2: "",
    det3: "",
    det4: "",
    det5: "",
    det6: "",
    det7: "",
    det8: "",
    det9: "",
    search: "",
    message: "Loading..."
  },
  created() {
    var self = this;
    //this.ctyName("ERI");
    for (var z = 0; z < self.codes.length; z++) {
      var cc = self.codes[z];
      axios
        .get("https://restcountries.eu/rest/v2/alpha/" + cc)
        .then(function (res) {
          // handle success
          //  console.log(res)
          var data = res.data;
          var i;
          var lang = [];
          var neighbors = [];
          var cur = [];
          for (i = 0; i < data.languages.length; i++) {
            lang.push(data.languages[i].name);
          }
          for (var y = 0; y < data.currencies.length; y++) {
            cur.push(data.currencies[y].name);
          }
          for (var g = 0; g < data.borders.length; g++) {
            self.ctyName(data.borders[g]).then((data) => neighbors.push(data));
          }
          self.countries.push({
            name: data.name,
            nativeName: data.nativeName,
            region: data.region,
            subregion: data.subregion,
            pop: data.population,
            cap: data.capital,
            lang: lang,
            tld: data.topLevelDomain[0],
            flagUrl: data.flag,
            neighbors: neighbors,
            cur: cur
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  },
  watch: {
    countries() {
      if (this.countries.length > 0) {
        this.message = "";
      }
    },
    search(){
      if (this.searchFil.length > 0) {
        this.message = "";
      } else {
        this.message = "No results found."
      }
    }
  },
  methods: {
    async ctyName(cc) {
      var call = await axios("https://restcountries.eu/rest/v2/alpha/" + cc);
      return call.data.name;
    },
    showDetailModal(cty) {
      this.showDetail = true;
      for (var z = 0; z < this.countries.length; z++) {
        var data = this.countries[z];
        if (data.name === cty) {
          this.detFlag = data.flagUrl;
          this.detTitle = data.name;
          this.det1 = data.nativeName;
          this.det2 = data.pop;
          this.det3 = data.region;
          this.det4 = data.subregion;
          this.det5 = data.cap;
          this.det6 = data.tld;
          var curStr = "";
          for (var p = 0; p < data.cur.length; p++) {
            curStr = curStr + " " + data.cur[p];
            if (p !== data.cur.length - 1) {
              curStr += ",";
            }
          }
          this.det7 = curStr;
          var langStr = "";
          for (var x = 0; x < data.lang.length; x++) {
            langStr = langStr + " " + data.lang[x];
            if (x !== data.lang.length - 1) {
              langStr += ",";
            }
          }
          this.det8 = langStr;
          this.det9 = data.neighbors;
        }
      }
    }
  },
  computed: {
    searchFil() {
      // this.message = "";
      var s = this.countries.filter((obj) => {
        return obj.name.toLowerCase().includes(this.search.toLowerCase());
      });
      /*if (s.length === 0){
         this.message = "No results found";
      }  else {*/
      return s;
    }
  }
});