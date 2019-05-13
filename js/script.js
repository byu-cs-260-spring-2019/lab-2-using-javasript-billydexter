window.onload = function()
{
	document.getElementById("weatherSubmit").addEventListener("click", function(event)
	{
		event.preventDefault();
		const value = document.getElementById("weatherInput").value;
		if (value === "")
		{
			return;
		}
		console.log(value);
		const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=1437a3c34d0fa62c1921e56adc2c3c48";
		fetch(url)
			.then(function(response)
			{
				return response.json();
			})
			.then(function(json)
			{
				console.log(json);
				var results = "";
				results+= "<h2>Weather in " + json.name + "</h2>" + "<div id = 'rightNowGroup'><h1>Right now:</h1>";
				for (var i = 0; i < json.weather.length; i++)
				{
					results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
				}
				results += "<h2>" + json.main.temp + " &deg;F</h2>" + "<p>";
				for (var i = 0; i < json.weather.length; i++)
				{
					results += json.weather[i].description;
					if (i !== json.weather.length - 1)
					{
						results += ", ";
					}
				}
				results+= "</p></div><br>";
				document.getElementById("weatherResults").innerHTML = results;
			}).
			catch (function()
			{
				document.getElementById("weatherResults").innerHTML = "<h3>That city could not be found.</h3>";
			});
		const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=1437a3c34d0fa62c1921e56adc2c3c48";
		fetch(url2)
			.then(function(response)
			{
				return response.json();
			})
			.then(function(json)
			{
				var currentDay = "";
				console.log(json);
				var forecast = "";
				for (var i = 0; i < json.list.length; i++)
				{	
					var day = moment(json.list[i].dt_txt).format('MMMM Do YYYY');
					if (currentDay === "")
					{
						currentDay = day;
						forecast += "<div id = 'dayGroup'><h1>Today's forecast</h1>";
					}
					else if (currentDay !== day)
					{
						forecast += "</div><br><div id = 'dayGroup'><h1>Forecast for " + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h1>";
						currentDay = day;
					}
					forecast += "<div id = 'singleDay'><div id = 'singleElement'><h2>" + moment(json.list[i].dt_txt).format('h:mm:ss a') + "</h2></div>";
					forecast += "<div id = 'singleElement'><p>Temperature: " + json.list[i].main.temp + " &deg;F</p></div>";
					forecast += "<div id = 'singleElement'><img src='http://openweathermap.org/img/w/" + json.list[i].weather[0].icon + ".png'/></div></div>"
				}
				forecast += "</div>";
				document.getElementById("forecastResults").innerHTML = forecast;
			}).
			catch(function ()
			{
				document.getElementById("forecastResults").innerHTML = "";
			});
			
	})
}
//<div id = 'dayGroup'>
//</div><div id = 'dayGroup'>
//</div>