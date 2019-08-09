
using Model.Interface;
using Model.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EcomaintSite.Controllers
{
    public class UserController : Controller
    {
        IWebUserLoginRepository webUserLoginRepository;
        public UserController(IWebUserLoginRepository _webUserLoginRepository) => webUserLoginRepository = _webUserLoginRepository;
        // GET: User
        public JsonResult TrackingUserOnline()
        {
            try
            {
                //if(!webUserLoginRepository.CheckExists(User.Identity.Name))
                if (!webUserLoginRepository.CheckExists("Admin"))
                {
                    var authenticationManager = System.Web.HttpContext.Current.GetOwinContext().Authentication;
                    authenticationManager.SignOut();
                    Session.Abandon();
                    return Json("out: ", JsonRequestBehavior.AllowGet);
                }
                return Json(webUserLoginRepository.Count(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("error: " + ex.Message, JsonRequestBehavior.AllowGet);
            }           
        }
 
    }
}