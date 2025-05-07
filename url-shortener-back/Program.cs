var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços necessários
builder.Services.AddControllers();
builder.Services.AddSingleton<InMemoryUrlRepository>();

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",     // Para desenvolvimento local
                "http://localhost:5173"     // Para desenvolvimento com Vite
                // Substitua pelo seu domínio de produção
            )
            .WithMethods("GET", "POST")
            .WithHeaders(
                "Content-Type",
                "Authorization",
                "Accept"
            )
            .SetIsOriginAllowed(origin => 
            {
                return true;
            });
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger(); 
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors(); 
app.UseAuthorization(); 
app.MapControllers();
app.UrlRoutes();

app.Run();
