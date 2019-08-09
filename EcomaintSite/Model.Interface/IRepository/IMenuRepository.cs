
using System.Collections.Generic;
using Model.Data;
namespace Model.Interface
{
    public interface IMenuRepository
    {
        IEnumerable<WebMenu> ListAll();
        IEnumerable<WebMenu> GetChildMenuID(int ID);
        IEnumerable<WebMenu> GetAllChildMenuID(string menuID);
    }
}
