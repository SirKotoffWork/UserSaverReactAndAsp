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