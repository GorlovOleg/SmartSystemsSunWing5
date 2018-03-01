# 


# SmartSystemsSunWing5 .NET Client Web API, React SPA
## Project prototipe to demonstrate using .NET Core 2, Web API2, ReactJS, PrimeNG 5.0,TypeScript, ECMAScript6, SCSS.[![Build status](https://ci.appveyor.com/api/projects/status/33srpo7owl1h3y4e?svg=true)]
* [1](Home Page is public available top-menu for "Login/Registration"and Main Drop Menu "Reports") 
	includes Sub-menu 
	* [1][BrokerageBrokers](). 
	* [2][Brokers](). 
	(Menu is visible but access will be forbidden until user not authenticated for Reports)
* [2]Authorisation implementation Microsoft.AspNetCore.Identity:
	* [2.1][Authenticated]() users can get access to Sub-Menu invoke to populate via  Web-API service 
	or master table BrokerageBrokers or single table Brokerage 
	* [2.2][BrokerageBrokers master table]() and [table Broker]() (One-To-Menu relation) 
	Second Grid Brokers will be  Drop Down when user click  Master record Brokerage in the first grid.
* [5]MS SQL (Express) and Azure SQL Server Script Create and Populate DataBase.
* [6]Web Services: WebAPI implementation SPA DI Repositories Busines Access Layer (BAL), Data Access Layer (DAL), Presentation Layer Angular as conception without pretention  full  implementation
* [7]Done ASP.NET Core 2 Identity
