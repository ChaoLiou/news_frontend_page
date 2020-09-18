const config = {
  officialAccountId: "6cca98d0ee21473ab1e07fc4ff7e6435_oa",
  token: "667f06ef5ce2489cb3d20da6cf8f280d_oat",
  secret: "aee67dd89f5c4085ac044461b58b89fb_oas",
  clientId: "D3919088-F73B-4F2C-9EAB-84168195BEEF",
  widgetId: "5f55f91c53b8fe00073e2905",
  openidUrl: "https://stg-api.beanfun.com/v1/openid/token/verification"
};

export const get_openid_access_token = callback => {
  BGO.check_app_exist(res => {
    callback(res);
    if (true || (res.result && res.result === "ok")) {
      BGO.init({
        token: config.token,
        official_account_id: config.officialAccountId
      });
      BGO.get_me_openid_access_token(config.clientId, config.secret, callback);
    }
  });
};

function callback(data) {
  console.log(data);
  checkUser(config.openidUrl + `?token=${data.access_token}`);
}

function checkUser(openidUrl) {
  console.log(openidUrl);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var res = this.responseText.split(",");
    }
  };
  console.log(openidUrl);
  xhttp.open("GET", openidUrl, true);
  xhttp.send();
}
