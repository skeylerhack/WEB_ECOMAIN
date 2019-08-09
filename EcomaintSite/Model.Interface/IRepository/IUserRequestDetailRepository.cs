﻿using Model.Data;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Model.Interface
{
    public interface IUserRequestDetailRepository : IDisposable
    {
        IEnumerable<GetRequestInfomationObj> GetRequestInfomation(Nullable<int> ID, string username);
        IEnumerable<UserRequestDetail> GetRequestDetailsByPlan(int planID);
        IEnumerable<ApprovedRequestObj> ApprovedRequest(string user, Nullable<int> option, Nullable<int> lang, byte[] image, Nullable<System.DateTime> fromDate, Nullable<System.DateTime> toDate, string workSiteID, string typeOfDeviceID);
        void SaveRequestInfomation(UserRequestDetail requestInfo);
        void SaveChanges();
        void ApproveRequests(List<UserRequestDetail> lst);
        SelectList DanhSachNguyenNhan();
        SelectList DanhSachLoaiBaoTri();
        SelectList DanhSachUuTien();
    }
}
