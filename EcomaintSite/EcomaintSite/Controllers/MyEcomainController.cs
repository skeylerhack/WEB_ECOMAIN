using Microsoft.AspNet.Identity;
using Model.Combobox;
using Model.Data;
using Model.Interface;
using Model.Interface.IRepository;
using Model.Repository;
using Model.Repository.Repository;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EcomaintSite.Controllers
{
    public class MyEcomainController : Controller
    {

        private ICombobox _Combobox;
        private IMyEcomainRepository _MyEcomainRepository;
        private ICombobox Combobox()
        {
            return _Combobox ?? (_Combobox = new Combobox());
        }

        private IMyEcomainRepository MyEcomain()
        {
            return _MyEcomainRepository ?? (_MyEcomainRepository = new MyEcomainRepository());
        }
        // GET: MyEcomain
        public ActionResult Index()
        {
            var us = User.Identity.GetUserName();
            Loadcombo(us);
            return View();
        }
        private void Loadcombo(string user)
        {
            ViewBag.NhaXuong = Combobox().GetCbbDiaDiem(user, SessionVariable.TypeLanguage,1);
            //ViewBag.HeThong = Combobox().GetCbbHeThong(user, SessionVariable.TypeLanguage, 1);
            //ViewBag.LoaiMay = Combobox().GetCbbLoaiMay(user, SessionVariable.TypeLanguage, 1);
            //ViewBag.May = Combobox().GetCbbMay(user, SessionVariable.TypeLanguage, 1);
            //ViewBag.LoaiCV = Combobox().GetCbbLoaiCV(user, SessionVariable.TypeLanguage, 1);
        }
        [Authorize]
        public JsonResult GetPhieuBaoTri(string ms_nx, string ms_ht, string ms_loaimay, string ms_may)
        {
            var lst = MyEcomain().GetPhieuBaoTris(User.Identity.GetUserName(), SessionVariable.TypeLanguage, ms_nx, Convert.ToInt32(ms_ht), ms_loaimay, ms_may).Select(x => new
            {
                MS_PHIEU_BAO_TRI = x.MS_PHIEU_BAO_TRI,
                MS_MAY = x.MS_MAY,
                TEN_MAY = x.TEN_MAY,
                TEN_LOAI_BT = x.TEN_LOAI_BT,
                TEN_TINH_TRANG = x.TEN_TINH_TRANG,
                NGAY_BD_KH = x.NGAY_BD_KH.ToString("dd/MM/yyyy"),
                NGAY_KT_KH = x.NGAY_KT_KH.ToString("dd/MM/yyyy"),
                Ten_N_XUONG = x.Ten_N_XUONG
            });
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGiamSatTinhTrang(string fromDate, string toDate, string ms_nx, string ms_ht, string ms_loaimay, string ms_may, string ms_loaicv)
        {
            var lst = MyEcomain().GetGSTRs(User.Identity.GetUserName(), SessionVariable.TypeLanguage, Convert.ToDateTime(fromDate, new CultureInfo("vi-vn")).ToString("yyyy/MM/dd"), Convert.ToDateTime(toDate, new CultureInfo("vi-vn")).ToString("yyyy/MM/dd"), ms_nx, Convert.ToInt32(ms_ht), ms_loaimay, ms_may, Convert.ToInt32(ms_loaicv)).Select(x => new
            {
                MS_MAY = x.MS_MAY,
                TEN_MAY = x.TEN_MAY,
                TEN_BO_PHAN = x.TEN_BO_PHAN,
                TEN_TS_GSTT = x.TEN_TS_GSTT,
                CHU_KY_DO = x.CHU_KY_DO,
                NGAY_KT_CUOI = x.NGAY_KT_CUOI.ToString("dd/MM/yyyy"),
                TEN_GIA_TRI = x.TEN_GIA_TRI,
                NGAY_KT_KE = x.NGAY_KT_KE.ToString("dd/MM/yyyy"),
                CAC_THUC_HIEN = x.CAC_THUC_HIEN,
                THOI_GIAN = x.THOI_GIAN
            });
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GeMyecomain(string fromDate, string toDate, string ms_nx, string may, string giadoan)
        {
            var lst = MyEcomain().GetMyEcomain(User.Identity.GetUserName(), SessionVariable.TypeLanguage, Convert.ToDateTime(fromDate, new CultureInfo("vi-vn")).ToString("yyyy/MM/dd"), Convert.ToDateTime(toDate, new CultureInfo("vi-vn")).ToString("yyyy/MM/dd"), ms_nx, may, Convert.ToInt32(giadoan)).Select(x => new
            {
                MS_MAY = x.MS_MAY,
                TEN_MAY = x.TEN_MAY,
                PBT = x.PBT,
                GSTT = x.GSTT
            });
            return Json(lst, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ShowPBT(string id)
        {
            string nx = Request["nhaxuong"];
            string tngay = Request["fromday"];
            string dengnay = Request["today"];
            return RedirectToAction("show", "WorkOrder", new { msnx = nx, msmay = id, todate = tngay, fromdate = dengnay });
        }
        public ActionResult ShowGSTT(string id)
        {
            string nx = Request["nhaxuong"];
            string tungay = Request["fromday"];
            string dengnay = Request["today"];
            return RedirectToAction("Show", "Monitoring", new { msnx = nx, msmay = id,tngay = tungay ,dngay = dengnay });
        }
    }
}