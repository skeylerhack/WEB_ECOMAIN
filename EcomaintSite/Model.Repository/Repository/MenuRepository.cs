using Model.Data;
using Model.Interface;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
namespace Model.Repository
{
    public class MenuRepository : IMenuRepository, IDisposable
    {
        Model.Data.Model1 db;
        public MenuRepository() => db = new Model.Data.Model1();
        
        public IEnumerable<WebMenu> ListAll() => db.WebMenu.Where(x => x.Hide == false).OrderBy(x => x.Index).ToList();
        
        public IEnumerable<WebMenu> GetChildMenuID(int ID) => db.WebMenu.Where(x => x.Root == ID).ToList();

        public IEnumerable<WebMenu> GetAllChildMenuID(string menuID) =>
            db.Database.SqlQuery<WebMenu>("GetAllChildMenu @menuID", new object[]
            {
                new SqlParameter("@menuID", menuID)
            }).ToList();

        private bool disposed = false;
        protected void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
