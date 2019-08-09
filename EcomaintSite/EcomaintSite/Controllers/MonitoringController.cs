
using Microsoft.AspNet.Identity;
using Model.Combobox;
using Model.Data;
using Model.Interface;
using Model.Repository;
using Model.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace EcomaintSite.Controllers
{
    public class MonitoringController : Controller
    {
        IMonitoringUnitOfWork monitoringUnitOfWork;
        IDeviceRepository deviceRepository;
        IMonitoringRepository monitoringRepository;
        IUserRepository userRepository;

        private ICombobox _Combobox;
        private ICombobox Combobox()
        {
            return _Combobox ?? (_Combobox = new Combobox());
        }

        public MonitoringController(IMonitoringUnitOfWork _monitoringUnitOfWork, IDeviceRepository _deviceRepository, IMonitoringRepository _monitoringRepository, IUserRepository _userRepository)
        {
            deviceRepository = _deviceRepository;
            monitoringRepository = _monitoringRepository;
            monitoringUnitOfWork = _monitoringUnitOfWork;
            userRepository = _userRepository;
        }
        //
        // GET: Monitoring
        [Authorize]
        public ActionResult Index()
        {
            ViewBag.link = 0;
            ViewBag.NhaXuong = Combobox().GetCbbDiaDiem(User.Identity.GetUserName(), SessionVariable.TypeLanguage, 1);
            ViewBag.LoaiCV = Combobox().GetCbbLoaiCV(User.Identity.GetUserName(), SessionVariable.TypeLanguage, 1);


            ViewBag.NhanVien = Combobox().NhanVienKT(User.Identity.GetUserName());

            return View(deviceRepository.ListAll().Select(x => new DeviceObjForDropdown
            {
                ID = x.ID,
                Name = x.Name
            }).ToList());
        }

        [Authorize]
        public ActionResult Show(string msnx, string msmay, string tngay, string dngay)
        {
            ViewBag.link = 1;
            ViewBag.nx = msnx;
            ViewBag.may = msmay;
            ViewBag.dngay = Convert.ToDateTime(dngay, new CultureInfo("vi-vn")).ToString("dd/MM/yyyy");

            ViewBag.NhaXuong = Combobox().GetCbbDiaDiem(User.Identity.GetUserName(), SessionVariable.TypeLanguage, 1);
            ViewBag.LoaiCV = Combobox().GetCbbLoaiCV(User.Identity.GetUserName(), SessionVariable.TypeLanguage, 1);
            ViewBag.NhanVien = Combobox().NhanVienKT(User.Identity.GetUserName());
            return View("~/Views/Monitoring/Index.cshtml", deviceRepository.ListAll().Select(x => new DeviceObjForDropdown
            {
                ID = x.ID,
                Name = x.Name
            }).ToList());
        }

        [Authorize]
        public JsonResult FilterData(string fromDate, string toDate, string msmay, string mscn)
        {
            try
            {
                var model = monitoringRepository.GetGiamSatTinhTrang(Convert.ToDateTime(fromDate, new System.Globalization.CultureInfo("vi-vn")), Convert.ToDateTime(toDate, new System.Globalization.CultureInfo("vi-vn")), mscn, msmay).Select(x => new
                {
                    STT = x.STT,
                    SO_PHIEU = x.SO_PHIEU,
                    NGAY_KT = x.NGAY_KT.ToString("dd/MM/yyyy"),
                    GIO_KT = x.GIO_KT.ToString("HH:mm"),
                    HO_TEN = x.HO_TEN,
                    MS_CONG_NHAN = x.MS_CONG_NHAN,
                    MS_MAY = x.MS_MAY,
                    TEN_MAY = x.TEN_MAY,
                    NHAN_XET = x.NHAN_XET
                });
                return Json(model, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("error", JsonRequestBehavior.AllowGet);
            }
        }


        [Authorize]
        public JsonResult CheckTheParametersDue(string msnx)
        {
            try
            {
                List<DeviceObjForDropdown> lst = new List<DeviceObjForDropdown>();
                return Json(deviceRepository.GetDeviceByRequest(User.Identity.GetUserName(), msnx, "-1").ToList(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("error: " + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize]
        public JsonResult GetMonitoringParameters(string id, string due, string todate, string mslcv)
        {
            try
            {
                return Json(monitoringRepository.GetMonitoringParametersByDevice(id, Convert.ToInt32(due), Convert.ToDateTime(todate, new CultureInfo("vi-vn")).ToString("yyyy/MM/dd"), Convert.ToInt32(mslcv)), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("error: " + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize]
        public JsonResult GetParameterInfo(int id)
        {
            try
            {
                return Json(monitoringRepository.GetParameterInfo(id), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("error: " + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize]
        public JsonResult Save(string data, string mscn)
        {
            try
            {
                List<MonitoringParametersByDevice> lstParameter = Newtonsoft.Json.JsonConvert.DeserializeObject<List<MonitoringParametersByDevice>>(data);
                List<MonitoringOfQuantitative> lstQuantitative = new List<MonitoringOfQuantitative>();
                List<MonitoringOfQualitative> lstQualitative = new List<MonitoringOfQualitative>();
                Monitoring obj = new Monitoring
                {
                    Comment = "",
                    Staff = null,
                    ToHour = DateTime.Now,
                    DateChecked = DateTime.Now.Date,
                    HourOfRuntime = null,
                    FromHour = DateTime.Now,
                    Username = User.Identity.GetUserName(),
                    StaffID = mscn,
                    MonitoringOfQuantitative = null
                };
                var lst = lstParameter.GroupBy(x => new { x.ComponentID, x.DeviceID, x.MonitoringParamsID }).Select(x => new MonitoringParametersByDevice
                {
                    MonitoringParamsID = x.First().MonitoringParamsID,
                    ComponentID = x.First().ComponentID,
                    DeviceID = x.First().DeviceID,
                    Pass = x.First().Pass,
                    Note = x.First().Note,
                    ValueParamID = x.First().ValueParamID,
                    Measurement = x.First().Measurement,
                    TypeOfParam = x.First().TypeOfParam,
                    ID = x.First().ID
                });

                lst.ToList().ForEach(x =>
                {
                    lstQuantitative.Add(new MonitoringOfQuantitative
                    {
                        MonitoringID = obj.ID,
                        MonitoringParamsID = x.MonitoringParamsID,
                        DeviceID = x.DeviceID,
                        ComponentID = x.ComponentID,
                        Measurement = x.Measurement,
                        ID = x.ID,
                        Note = x.Note
                    });
                });
                lstParameter.ForEach(x =>
                {
                    if (x.TypeOfParam == true)
                    {
                        lstQualitative.Add(new MonitoringOfQualitative
                        {
                            MonitoringID = obj.ID,
                            MonitoringParamsID = x.MonitoringParamsID,
                            DeviceID = x.DeviceID,
                            ComponentID = x.ComponentID,
                            ValueParamID = x.ValueParamID,
                            ID = x.ID,
                            Note = x.Note,
                        });
                    }
                });

                monitoringUnitOfWork.MonitoringRepository.Add(obj);
                monitoringUnitOfWork.MonitoringOfQuantitativeRepository.AddRange(lstQuantitative);
                monitoringUnitOfWork.MonitoringOfQualitativeRepository.AddRange(lstQualitative);
                monitoringUnitOfWork.Save();
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("error: " + ex.InnerException.Message, JsonRequestBehavior.AllowGet);
            }
        }
    }
}