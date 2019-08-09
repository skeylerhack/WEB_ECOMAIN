using System;
using System.Collections.Generic;
using Model.Data;
namespace Model.Interface
{
    public interface IMonitoringRepository
    {
        IEnumerable<Monitoring> ListAll();
        IEnumerable<Monitoring> ListAll(DateTime dt);
        void Add(Monitoring monitor);
        void Edit(Monitoring monitor);
        void Delete(int ID);
        IEnumerable<MonitoringParametersByDevice> GetParameterInfo(int ID);
        IEnumerable<DeviceObjForDropdown> CheckTheParametersDue();
        IEnumerable<MonitoringParametersByDevice> GetMonitoringParametersByDevice(string deviceID, int isDue,string dngay,int msloaicv);
        IEnumerable<MoningtoringViewModel> GetGiamSatTinhTrang(DateTime tungay, DateTime denngay, string mscn, string msmay);
    }
}
