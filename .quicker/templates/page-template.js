export default ({ title, data }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/quicker.css" />
    <title>${title}</title>
  </head>
  <body>
    ${data}
  </body>
</html>

`
