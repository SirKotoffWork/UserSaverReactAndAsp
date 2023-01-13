using Microsoft.AspNetCore.Mvc;
using UserSaver.DAL.Model;
using UserSaverBLL;

namespace UserSaver.SPA.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ICrudOperations _manager;

    public UserController(ICrudOperations manager)
    {
        _manager = manager;
    }

    [HttpGet]
    public IEnumerable<User> Get()
    {
        return _manager.GetAllUser();
    }

    
    [HttpDelete]
    [Route("api/User/Delete/{id}")]
    public bool Delete(int id)
    {
        return _manager.Delete(id);
    }

    [HttpPost]
    [Route("api/User/Create")]
    public bool Create(User user)
    {
        return _manager.Create(user);
    }

    [HttpPost]
    [Route("api/User/Edit")]
    public bool Edit(User user)
    {
        return _manager.Update(user);
    }
}