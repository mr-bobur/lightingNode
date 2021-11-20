const express = require("express");
const appp = express();
const axios = require("axios").create({baseUrl: "http://127.0.0.1:3000/"});

appp.listen(2400, () => {
	console.log("Server started at port 2400");
});


appp.get("/cities", (req, res) => {
	axios({
		url: "users",
		method: "get",
	})
		.then(response => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
}); 