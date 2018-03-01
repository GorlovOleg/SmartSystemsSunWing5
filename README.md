# 


# SmartSystemsSunWing5 .NET Client Web API, React SPA
## Project prototipe to demonstrate using .NET Core 2, Web API2, ReactJS, PrimeNG 5.0,TypeScript, ECMAScript6, SCSS.[![Build status](https://ci.appveyor.com/api/projects/status/33srpo7owl1h3y4e?svg=true)]
# ASP.NET Core React SPA

Application SmartSystems SunWing5
- Server
  - ASP.NET Core 2.0
  - Entity Framework Core w/ EF Migrations
  - JSON Web Token (JWT) authorization
  - SQL Server database
- Client
  - React 15.6
  - Webpack 2 for asset bundling and HMR (Hot Module Replacement)
  - CSS Modules
  - Fetch API for REST requests
- Testing
  - xUnit for .NET Core

### `npm install`

When first cloning the repo or adding new dependencies, run this command.  This will:

- Install Node dependencies from package.json

### `npm start`

To start the app for development, run this command.  This will:

- Run `dotnet watch run` which will build the app (if changed), watch for changes and start the web server on http://localhost:5000
- Run Webpack dev middleware with HMR via [ASP.NET JavaScriptServices](https://github.com/aspnet/JavaScriptServices)

### `npm run migrate`

After making changes to Entity Framework models in `api/Models/`, run this command to generate and run a migration on the database.  A timestamp will be used for the migration name.

PowerShell
Add-Migration InitialCreate
Update-Database

console
dotnet ef migrations add InitialCreate
dotnet ef database update
