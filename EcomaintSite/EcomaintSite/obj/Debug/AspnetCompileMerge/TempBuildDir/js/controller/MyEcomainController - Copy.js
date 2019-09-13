define(['_MasterPageController', '_MenuPageController', '_DetailsModalController', 'datatables-bootstrap', 'bootstrap-select'], function (module, menu, modal) {
    var MyEcomain = (function () {
        var app = angular.module("MyEcomainPage", [])
        app.controller('MyEcomainController', function ($scope) {
            var Main = module.Main
            var Languages = module.Languages
            var InfoDetails = modal
            var Loading = module.Loading
            var Alert = module.Alert
            var MainMenu = menu
            var currentPageName = 'MyEcomainWeb'
            var menuID = 'mnuMyEcomain'
            //var buttonFloat = [
            //    {
            //        "id": "btnMain",
            //        "url": "#",
            //        "icon": "<i class='fa fa-angle-double-up'></i>"
            //    }
            //]
            var vars = {};
            var bindVariables = function () {
                return {
                    $tbPhieuBaoTri: $('#tbphieubaotri'),
                    $tabPhieuBaoTri: $('a[href="#tabWorkorder"]'),
                    $tabGiamSatTinhTrang: $('a[href="#tabmonitoring"]'),
                };
            }
            var fnPrivate = {
                GetPhieuBaoTri: function () {
                    var tableBody = $('#tbphieubaotri tbody');
                    $.post(urlPhieuBaoTri, { ms_nx: $("#cbbDiaDiem").val(), ms_ht: $("#cbbHeThong").val(), ms_loaimay: $("#cbbLoaiMay").val(), ms_may: $("#cbbMay").val() }, function (data) {
                        var i;
                        tableBody.empty();
                        if (data.length == 0) { tableBody.append('<tr><td colspan="8"></td></tr>'); }
                        else {
                            for (i = 0; i < data.length; i++) {
                                tableBody.append('<tr data-id ='
                                    + data[i].MS_PHIEU_BAO_TRI + '><td>'
                                    + data[i].MS_PHIEU_BAO_TRI + '</td><td >'
                                    + data[i].MS_MAY + '</td><td >'
                                    + data[i].TEN_MAY + '</td><td >'
                                    + data[i].TEN_LOAI_BT + '</td><td >'
                                    + data[i].NGAY_BD_KH + '</td><td >'
                                    + data[i].NGAY_KT_KH + '</td><td >'
                                    + data[i].Ten_N_XUONG + '</td><td >'
                                    + data[i].TEN_TINH_TRANG + '</td></tr>');
                            }
                        }
                    });
                },
                GetGiamSatTinhTrang: function (n) {
                    var tableBody = $('#tbgiamsattinhtrang tbody');
                    $.post(urlGiamSatTinhTrang, { fromDate: $("#fromDate").val(), toDate: $("#toDate").val(), ms_nx: $("#cbbDiaDiem").val(), ms_ht: $("#cbbHeThong").val(), ms_loaimay: $("#cbbLoaiMay").val(), ms_may: $("#cbbMayTS").val(), ms_loaicv: $("#cbbLoaiCV").val() }, function (data) {
                        var i;
                        tableBody.empty();
                        if (data.length == 0) { tableBody.append('<tr><td colspan="10">Chưa có dữ liệu</td></tr>'); }
                        else {
                            for (i = 0; i < data.length; i++) {
                                tableBody.append('<tr> <td width="10%">'
                                    + data[i].MS_MAY + '</td><td width="10%">'
                                    + data[i].TEN_MAY + '</td><td width="10%">'
                                    + data[i].TEN_BO_PHAN + '</td><td width="10%">'
                                    + data[i].TEN_TS_GSTT + '</td><td width="10%">'
                                    + data[i].CHU_KY_DO + '</td><td width="10%">'
                                    + data[i].NGAY_KT_CUOI + '</td><td width="10%">'
                                    + data[i].TEN_GIA_TRI + '</td><td width="10%">'
                                    + data[i].NGAY_KT_KE + '</td><td width="10%">'
                                    + data[i].CAC_THUC_HIEN + '</td><td width="10%">'
                                    + data[i].THOI_GIAN + '</td></tr>');
                            }
                            if (n === 1) {
                                $(".display").DataTable({
                                    "language": {
                                        "processing": "<div class='overlay custom-loader-background'><i class='fa fa-cog fa-spin custom-loader-color'></i></div>",
                                        "sSearch": "<span data-lang='lblSearch'></span> ",
                                        "info": "",
                                        "zeroRecords": "<span data-lang='lblFilterInfo'>" + (global.TypeLanguage == 0 ? "Không tìm thấy" : "No matching records found") + "</span>",
                                        "lengthMenu": "<span data-lang='lblShow'></span> _MENU_ <span data-lang='lblEntries'></span>",
                                        "infoEmpty": "",
                                        "infoFiltered": "",
                                        "paginate": {
                                            "first": "<<",
                                            "last": ">>",
                                            "next": ">",
                                            "previous": "<"
                                        },
                                        "emptyTable": "<span data-lang='lblEmpty'></span>",
                                    },
                                    "scrollY": 350,
                                    "scrollX": true,
                                    "processing": true,
                                    "order": [[0, 'desc']],
                                });
                            }
                        }
                    });
                },
                FotmatTabbel: function () {
                    $(".display").DataTable({
                        "language": {
                            "processing": "<div class='overlay custom-loader-background'><i class='fa fa-cog fa-spin custom-loader-color'></i></div>",
                            "sSearch": "<span data-lang='lblSearch'></span> ",
                            "info": "",
                            "zeroRecords": "<span data-lang='lblFilterInfo'>" + (global.TypeLanguage == 0 ? "Không tìm thấy" : "No matching records found") + "</span>",
                            "lengthMenu": "<span data-lang='lblShow'></span> _MENU_ <span data-lang='lblEntries'></span>",
                            "infoEmpty": "",
                            "infoFiltered": "",
                            "paginate": {
                                "first": "<<",
                                "last": ">>",
                                "next": ">",
                                "previous": "<"
                            },
                            "emptyTable": "<span data-lang='lblEmpty'></span>",
                        },
                        "scrollY": 350,
                        "scrollX": true,
                        "processing": true,
                        "order": [[0, 'desc']],
                    });
                }
            }
            var method;
            $scope.fn = {
                Init: function () {
                    global.CurrentNamePage = currentPageName
                    MainMenu.fn.SetActive(menuID);
                    Languages.fn.AutoChangeLanguage()
                    //init variables
                    vars = bindVariables();
                    method = fnPrivate;
                    method.GetPhieuBaoTri();
                    method.GetGiamSatTinhTrang(1);
                    $("#cbbDiaDiem").change(function () {
                        method.GetPhieuBaoTri();
                        method.GetGiamSatTinhTrang(0);
                    });
                    $("#cbbHeThong").change(function () {
                        method.GetPhieuBaoTri();
                        method.GetGiamSatTinhTrang(0);
                    });
                    $("#cbbLoaiMay").change(function () {
                        method.GetPhieuBaoTri();
                        method.GetGiamSatTinhTrang(0);
                    });
                    $("#cbbMay").change(function () {
                        method.GetPhieuBaoTri();
                        method.GetGiamSatTinhTrang(0);
                    });
                    $("#cbbMayTS").change(function () {
                        method.GetGiamSatTinhTrang();
                    });
                    $("#cbbLoaiCV").change(function () {
                        method.GetGiamSatTinhTrang(0);
                    });

                    Main.fn.InitDateTimePickerChanged([$('#fromDate'), $('#toDate')], method.GetGiamSatTinhTrang);

                    //tbphieubaotri tbgiamsattinhtrang
                }
            }
        })
        app.init = function () {
            angular.bootstrap(document, ['MyEcomainPage']);
        }
        return app;
    })();
    $(function () {
        MyEcomain.init()
    })
})


