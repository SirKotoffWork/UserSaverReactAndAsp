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
    
    [HttpPost]
    [Route("api/User/PartialList/{startIndex}/{endIndex}")]
    public IEnumerable<User> GetPartialUsers(int startIndex,int endIndex)
    {
        return _manager.GetAllUser(startIndex,endIndex);
    }

    [HttpPost]
    [Route("api/User/list/{startIndex}/{count}/{sortingType}")]
   public IEnumerable<User> GetAllUserByFilter(int startIndex,int count,string? sortingType) 
    {
        return _manager.GetAllUser(startIndex, count,sortingType);
    }
    

    [HttpGet]
    [Route("api/User/Count")]
    public int GetCountAllUser()
    {
        return _manager.GetCountAllUser();
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