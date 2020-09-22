using Microsoft.AspNet.Identity;
using Model.Data;
using Model.Interface;
using Model.Repository;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EcomaintSite.Controllers
{
    public class ApproveRequestsController : Controller
    {
        IUserRequestDetailRepository request;
        IPriorityRepository priority;
        public ApproveRequestsController(IUserRequestDetailRepository _request, IPriorityRepository _priority)
        {
            request = _request;
            priority = _priority;
        }

        [Authorize]
        public ActionResult Index()
        {
            ViewBag.Username = User.Identity.Name;
            ViewBag.cboPriority = new SelectList(priority.ListAll(), "ID", "Name", "-1");
            return View();
        }

        public JsonResult Approve(string data)
        {
            List<UserRequestDetail> lstRequest = JsonConvert.DeserializeObject<List<UserRequestDetail>>(data);
            try
            {
                request.ApproveRequests(lstRequest);
                request.SaveChanges();
            }
            catch (Exception ex)
            {
                return Json("failure: " + ex.Message, JsonRequestBehavior.AllowGet);
            }
            return Json("success", JsonRequestBehavior.AllowGet);

        }
        public JsonResult FilterData(string fromDate, string toDate, int option)
        {
            var model = request.ApprovedRequest(User.Identity.GetUserName(), option, SessionVariable.TypeLanguage, null, Convert.ToDateTime(fromDate, new CultureInfo("vi-vn")), Convert.ToDateTime(toDate, new CultureInfo("vi-vn")), "-1", "-1").Select(x => new
            {
                Choose = x.Choose,
                UserRequestDetailID = x.UserRequestDetailID,
                ID = x.ID,
                DeviceID = x.DeviceID,
                DateCreated = x.DateCreated.ToString("dd/MM/yyyy"),
                Description = x.Description,
                Request = x.Request,
                TypeOfMaintenanceName = x.TypeOfMaintenanceName,
                Document = x.Document,
                PriorityName = x.PriorityName,
                IsApprovedRequest = x.IsApprovedRequest
            });
            return Json(model, JsonRequestBehavior.AllowGet);
        }
    }
}