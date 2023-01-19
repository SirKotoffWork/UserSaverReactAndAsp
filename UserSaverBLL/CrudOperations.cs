using System.ComponentModel;
using UserSaver.DAL.Context;
using UserSaver.DAL.Model;

namespace UserSaverBLL;

public class CrudOperations : ICrudOperations
{
    private ApplicationDbContext _db;

    public CrudOperations(ApplicationDbContext db)
    {
        this._db = db;
    }

    public bool Create(User user)
    {
        try
        {
            user.Id = Convert.ToInt32(user.Id);
            user.Years = Convert.ToInt32(user.Years);
            _db.Users.Add(user);
            _db.SaveChanges();
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return false;
        }
    }

    public bool Update(User user)
    {
        try
        {
            _db.Users.Update(user);
            _db.SaveChanges();

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return false;
        }
    }

    public IEnumerable<User> GetAllUser()
    {
        return _db.Users.ToList();
    }
    public IEnumerable<User> GetAllUser(int startIndex, int count)
    {
        var allUsers = _db.Users.ToList();
        var partialUsers = allUsers.GetRange(startIndex, count);
        return partialUsers;
    }

    public IEnumerable<User> GetAllUser(int startIndex, int count, string? sortingType, string? filterType,
        string? filterValue)
    {
        List<User> partialUsers = new();
        List<User> usersList = new();
        
        var allUsers= from s in _db.Users 
            select s; 

        if (sortingType is not "")
        {
            switch (sortingType)
            {
                case "name":
                    allUsers = allUsers.OrderBy(a => a.Name);
                    break;
                case "years":
                    allUsers = allUsers.OrderBy(a => a.Years);
                    break;
            }
            // partialUsers.AddRange(allUsers);
            // return partialUsers.GetRange(startIndex, count);
        }

        if (!String.IsNullOrEmpty(filterType) && !String.IsNullOrEmpty(filterValue))
        {
            if (filterType == "name")
            {
                allUsers = allUsers.Where(s => s.Name.ToUpper().Contains(filterValue.ToUpper()));
                 partialUsers.AddRange(allUsers);
                 return partialUsers;
            }

            if (filterType == "years")
            {
                allUsers = allUsers.Where(s => s.Years.ToString().ToUpper().Contains(filterValue.ToString().ToUpper()));
                 partialUsers.AddRange(allUsers);
                 return partialUsers;
            }
          
        }
        partialUsers.AddRange(allUsers);
        return partialUsers.GetRange(startIndex, count);
        
    }
    
    // public IEnumerable<User> GetUsersByFilter(string filterType, string filterValue)
    // {
    //     var allUsers = _db.Users.ToList();
    //     IEnumerable<User> users = new List<User>();
    //     if (!String.IsNullOrEmpty(filterType) && !String.IsNullOrEmpty(filterValue))
    //     {
    //         if (filterValue == "name")
    //         {
    //             var filterNameUser = allUsers.Where(p => p.Name == filterValue);
    //             users.Concat(filterNameUser);
    //         }
    //
    //         if (filterValue == "years")
    //         {
    //             var filterYearsUser = allUsers.Where(p => p.Years == Convert.ToInt32(filterValue));
    //             users.Concat(filterYearsUser);
    //         }
    //     }
    //
    //     return users;
    // }

    public int GetCountAllUser()
    {
        return _db.Users.ToList().Count;
    }

    public bool Delete(int id)
    {
        try
        {
            var user = _db.Users.FirstOrDefault(p => p.Id == id);
            if (user != null)
            {
                _db.Users.Remove(user);
                _db.SaveChanges();
            }

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }

        return false;
    }

    public User GetUser(int id)
    {
        try
        {
            User user = _db.Users.FirstOrDefault(p => p.Id == id) ?? throw new InvalidOperationException();
            return user;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }

        return new User();
    }
}