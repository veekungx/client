const mailTemplate = (obj) => `
<html>
  <body>
    <h1>${obj.var1}</h1>
  </body>
</html>
`

console.log(mailTemplate({ var1: "Thi" }))