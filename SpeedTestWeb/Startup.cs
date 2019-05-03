using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;

namespace SpeedTestWeb
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDirectoryBrowser();
    }

    public void WriteClientConfig(string clientPath)
    {
      var clientConfigPath = Path.Combine(clientPath, "configuration.json");
      string config = JsonConvert.SerializeObject(new { speedTestApiBase = Configuration["SpeedTestApiBase"] });
      System.IO.File.WriteAllText(clientConfigPath, config);
    }

    public void Configure(IApplicationBuilder application, IHostingEnvironment environment)
    {
      if (environment.IsDevelopment())
      {
        application.UseDeveloperExceptionPage();
      }

      application.UseDefaultFiles();

      var clientPath = Path.Combine(Directory.GetCurrentDirectory(), "Client");
      WriteClientConfig(clientPath);

      application.UseStaticFiles(new StaticFileOptions
      {
        FileProvider = new PhysicalFileProvider(clientPath),
        RequestPath = ""
      });

      application.UseDirectoryBrowser(new DirectoryBrowserOptions
      {
        FileProvider = new PhysicalFileProvider(clientPath),
        RequestPath = ""
      });
    }
  }
}
