using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using TaskManagement.Domain.Context;
using TaskManagement.Infrastructure.Configuration;
using TaskManagement.Infrastructure.Dtos;
using TaskManagement.Infrastructure.ExtensionMethods;

namespace TaskManagement.Service.Auth.Login
{
    public class LoginService : ILoginService
    {
        private readonly IAppConfiguration _appConfiguration;
        private readonly TaskManagementContext _context;

        public LoginService(IAppConfiguration appConfiguration, TaskManagementContext context)
        {
            this._appConfiguration = appConfiguration;
            this._context = context;
        }

        public async Task<ServiceResponse<LoginResponseModel>> Login(LoginRequestModel model)
        {
            var response = new ServiceResponse<LoginResponseModel>()
            {
                Data = new(),
            };

            try
            {
                var user = await this._context.Users.SingleOrDefaultAsync(u => u.Username == model.Username);

                if (user is null)
                {
                    var error = new ErrorModel()
                    {
                        Property = nameof(model.Username).ToCamelCase(),
                        Error = "Username doesn't exists"
                    };

                    response.IsSuccess = false;
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Errors.Add(error);

                    return response;
                }

                if (user.Password != model.Password)
                {
                    var error = new ErrorModel()
                    {
                        Property = nameof(model.Password).ToCamelCase(),
                        Error = "Incorrect Password"
                    };

                    response.IsSuccess = false;
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Errors.Add(error);

                    return response;
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Name, $"{user.FirstName} {user.LastName}")
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._appConfiguration.JwtConfig.Key));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: this._appConfiguration.JwtConfig.Issuer,
                    audience: this._appConfiguration.JwtConfig.Audience,
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(double.Parse(this._appConfiguration.JwtConfig.ExpiresInMinutes)),
                    signingCredentials: creds
                );

                response.Data.Token = new JwtSecurityTokenHandler().WriteToken(token);
                response.IsSuccess = true;
                response.StatusCode = HttpStatusCode.OK;
                response.Message = "Login Successfull";

                return response;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessage = "Internal Server Error";

                return response;
            }
        }
    }
}
