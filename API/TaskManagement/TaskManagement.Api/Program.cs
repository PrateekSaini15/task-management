
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskManagement.Api.Implementations;
using TaskManagement.Domain.Context;
using TaskManagement.Infrastructure.Configuration;
using TaskManagement.Service.Auth.Login;

namespace TaskManagement.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddCors(options => options.AddPolicy(name: "AllowedOrigins", builder => builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()));
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                var jwt = new JwtConfig();
                builder.Configuration.GetSection(nameof(JwtConfig)).Bind(jwt);

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = jwt.Issuer,
                    ValidAudience = jwt.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key))
                };
            });
            builder.Services.AddAuthorization();

            builder.Services.AddDbContext<TaskManagementContext>(options =>
            {
                var connectionStrings = new ConnectionStrings();
                builder.Configuration.GetSection(nameof(ConnectionStrings)).Bind(connectionStrings);
                Console.WriteLine(connectionStrings.Default);
                options.UseSqlServer(connectionStrings.Default);
            });

            builder.Services.AddSingleton<IAppConfiguration, AppConfiguration>();
            builder.Services.AddTransient<ILoginService, LoginService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowedOrigins");

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
