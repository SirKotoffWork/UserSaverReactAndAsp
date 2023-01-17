﻿using UserSaver.DAL.Model;

namespace UserSaverBLL;

public interface ICrudOperations
{
    bool Create(User user);
    bool Update(User user);
    bool Delete(int id);
    IEnumerable<User> GetAllUser();
    IEnumerable<User> GetAllUser(int startIndex,int endIndex);
    User GetUser(int id);
}