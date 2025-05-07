public static class UrlRoute
{
    public static void UrlRoutes(this WebApplication app)
    {
      app.MapPost("shorten",
      (ShortenRequest request, InMemoryUrlRepository _repository) =>
      {
          string code = Generate.GenerateShortCode();
          var shortUrl = new ShortUrl
          {
              Id = Guid.NewGuid().ToString(),
              OriginalUrl = request.Url,
              ShortCode = code
          };
          _repository.Save(shortUrl);
          return Results.Ok($"http://localhost:8080/{code}");
      });
      
      app.MapGet("/{code}",
        (string code, InMemoryUrlRepository _repository) =>
        {
            var url = _repository.GetByCode(code);
            if (url == null)
                return Results.NotFound();
            return Results.Redirect(url.OriginalUrl);
        });
    }
}
