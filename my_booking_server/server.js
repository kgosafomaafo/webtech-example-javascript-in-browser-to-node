import { createServer } from "node:http";

import { readFile } from "node:fs/promises";

import { writeFile } from "node:fs/promises";

const image_yes = await readFile("yes.jpg");
const image_no = await readFile("no.jpg");
const image_favicon_ico = await readFile("favicon.ico");
const image_logo = await readFile("favicon-32x32.png");
const html_helloworld =`
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>Hello World</h1>

<img src="yes.jpg"></img>
<script src="javascript.js"></script>

</body>
</html>
`;

const html_css =`
body { background: blue}
`
const html_javascript =`
alert('you asked for data');

document.body.style.background='#524848';

`

function getGetVariables(req) {
  // Parse the query string from the request URL, such as ?name=Sam
  const url = new URL(req.url, "https://"+req.headers.host);

  return Object.fromEntries(url.searchParams);
}

async function getPostVariables(req) {
  // Read the request body a piece at a time
  let body = "";

  for await (const chunk of req) {
    body += chunk;
  }

  if (!body) {
    return {};
  }

  const contentType = req.headers["content-type"] || "";

  // Parse JSON request bodies
  if (contentType.includes("application/json")) {
    return JSON.parse(body);
  }

  // Parse form submissions
  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(body));
  }

  // This example does not handle other body formats
  return {};
}

function getCookieVariables(req) {
  const cookieHeader = req.headers.cookie || "";

  return cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part !== "")
    .map((part) => {
      // Split at the first "=" so values can contain "="
      const equalsPosition = part.indexOf("=");

      const name =
        equalsPosition === -1 ? part : part.slice(0, equalsPosition);

      const value =
        equalsPosition === -1 ? "" : part.slice(equalsPosition + 1);

      return {
        name: decodeURIComponent(name),
        value: decodeURIComponent(value),
      };
    });
}

async function getVars(req) {
  const get = getGetVariables(req);
  const post = await getPostVariables(req);
  const cookie = getCookieVariables(req);

  return { get, post, cookie };
}

const server = createServer(async (req, res) => {
    console.log("your url is ",req.url);
    var myReqData = await getVars(req);
    
    var myURL = new URL(req.url,"http://"+req.headers.host);

    if (myURL.pathname === "/")
    {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html_helloworld);
    }
    else if (myURL.pathname === "/style.css")
    { 
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(html_css);
    }
    else if (myURL.pathname === "/javascript.js")
    { 
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(html_javascript);
    }
    else if (myURL.pathname === "/yes.jpg")
    { 
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(image_yes);
    }
    else if (myURL.pathname === "/no.jpg")
    { 
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(image_no);
    }
    else if (myURL.pathname === "/favicon.ico")
    { 
      res.writeHead(200, { "Content-Type": "image/x-icon" });
      res.end(image_favicon_ico);
    }
    else if (myURL.pathname === "/logo.png")
    { 
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(image_logo);
    }
    else
    {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("");
    }

    
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server listening on port 3000");
});
