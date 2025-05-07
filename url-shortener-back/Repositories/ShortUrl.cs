public class InMemoryUrlRepository {
  private readonly Dictionary<string, ShortUrl> _urlStore = new();
  public void Save(ShortUrl url) => _urlStore[url.ShortCode] = url;
  public ShortUrl? GetByCode(string code)
  {
    _urlStore.TryGetValue(code, out var url);
    return url;
  }
}