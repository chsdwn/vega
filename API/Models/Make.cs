using System.Collections.Generic;
using API.Models;

public class Make
{
  public int Id { get; set; }
  public string Name { get; set; }
  public IEnumerable<Model> Models { get; set; }
}