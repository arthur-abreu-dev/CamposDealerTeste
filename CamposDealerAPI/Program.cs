using CamposDealerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CamposDealerAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:4200", "https://localhost:4200");
                                      policy.AllowAnyHeader();
                                      policy.AllowAnyMethod();
                                  });
            });

            //This section below is for connection string 
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<ProdutoDBContext>(options => options.UseSqlServer(connectionString));
            builder.Services.AddDbContext<VendaDBContext>(options => options.UseSqlServer(connectionString));
            builder.Services.AddDbContext<ClienteDBContext>(options => options.UseSqlServer(connectionString));
            builder.Services.AddDbContext<ProdutoVendaDBContext>(options => options.UseSqlServer(connectionString));

            builder.Services.AddSwaggerGen();
            builder.Services.AddMvc();


           var app = builder.Build();
            app.UseCors(MyAllowSpecificOrigins);

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}