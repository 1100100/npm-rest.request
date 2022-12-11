# @zeelyn/http

## Project setup

```ps1
npm install @zeelyn/http
```

### Global configuration

```javascript
import http from "@zeelyn/http";
request.defaults((config) => {
            config.baseURL = "https://www.google.com";
            config.$on_before_request = (options) => {
                options.headers["Authorization"] = "Bearer " + localStorage.getItem("access_token");
            };
            config.$401 = () => {
                console.log("Request failed with status code 401");
            };
            config.$finally = () => {
                console.log("finally exec");
            };
            config.$error_network=(err)=>{
                console.error("error network", err);
            }
        });
```

### Request url

```javascript

request.get("/api/test",{})
    .then((res) => {
        console.log("ok=>", res.data);
    })
    .catch((err) => {
        console.error(err);
    });

```