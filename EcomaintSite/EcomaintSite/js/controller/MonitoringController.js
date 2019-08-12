define(['_MasterPageController', '_MenuPageController', '_DetailsModalController', 'datatables-bootstrap'], function (module, menu, modal) {
    var Monitoring = (function () {
        var app = angular.module('MonitoringPage', [])
        app.controller('MonitoringController', function ($scope, $compile) {
            var Main = module.Main
            var Languages = module.Languages
            var Alert = module.Alert
            var Loading = module.Loading
            var MainMenu = menu
            var menuID = 'mnuMornitoring'
            var currentPageName = 'MornitoringWeb'
            var buttonFloat =
                [
                    {
                        "id": "btnMain",
                        "url": "#",
                        "icon": "<i class='fa fa-angle-double-up'></i>"
                    },
                    {
                        "id": "btnThemgs",
                        "icon": "<i class='fa fa-plus'></i>",
                        "lang": "btnThem",
                        "url": urlAddGiamSatTinhTrang //set tên hàm tương ứng
                    },
                    {
                        "id": "btnSuags",
                        "icon": "<i class='fa fa-pencil'></i>",
                        "lang": "btnEdit",
                        "func": "fn.Edit"
                    }

                ]
            var vars = {}
            var bindVariables = function () {
                return {
                   
                    $tbGiamSatTinhTrang: $('#tbGiamSatTinhTrang'),
                    $tbGiamSatTinhTrangBody: $('#tbGiamSatTinhTrang tbody'),
                    $tableGiamSatTinhTrang: 'undefined',
                    $tablethongso: 'undefined',

                    $tabGiamSat: $('a[href="#tabMonitoring"]'),
                    $tabDinhTinh: $('a[href="#tabThongSoDT"]'),
                    $tabDinhLuong: $('a[href="#tabThongSoDL"]')
                };
            }
            var fnPrivate = {
                ThongSoGiamSat: function (stt, flag) {
                    var tableBody = $('#tbWorkForWO tbody');
                    $.post(urlGetWorkDetailByWorkOrder, { stt: stt }, function (data) {
                        //load thong so
                    });
                },
                LoadGiamSatTinhTrang: function () {
                    //string fromDate, string toDate, string msmay, string mscn
                    $.post(urlGetGiamSatTinhTrang, { fromDate: $('#fromDate').val(), toDate: $('#toDate').val(), msmay: "-1", mscn: "-1" },
                        function (data) {
                            if ($.fn.DataTable.isDataTable('#tbGiamSatTinhTrang')) {
                                $('#tbGiamSatTinhTrang').dataTable().fnDestroy();
                            }
                            vars.$tableGiamSatTinhTrang = vars.$tbGiamSatTinhTrang.DataTable({
                                data: data,
                                columns: [
                                    { data: 'STT' },
                                    {
                                        data: 'SO_PHIEU'
                                    },
                                    { data: 'NGAY_KT' },
                                    { data: 'GIO_KT' },
                                    { data: 'HO_TEN' },
                                    { data: 'MS_CONG_NHAN' },
                                    { data: 'MS_MAY' },
                                    { data: 'TEN_MAY' },
                                    { data: 'NHAN_XET' }
                                ],

                                "columnDefs": [
                                    {
                                        "targets": [0],
                                        "visible": false,
                                        "searchable": false
                                    },
                                    {
                                        "targets": [5],
                                        "visible": false
                                    },
                                    { 'width': '130px', 'targets': 1 },
                                    { 'width': '10%', 'targets': 2 },
                                    { 'width': '10%', 'targets': 3 },
                                    { 'width': '20%', 'targets': 4 },
                                    { 'width': '10%', 'targets': 5 },
                                    { 'width': '30%', 'targets': 6 },
                                    { 'width': '30%', 'targets': 7 }
                                ],

                                "language":
                                {
                                    "processing": "<div class='overlay custom-loader-background'><i class='fa fa-cog fa-spin custom-loader-color'></i></div>",
                                    "sSearch": "<span data-lang='lblSearch'>" + (global.TypeLanguage == 0 ? "Tìm " : "Search") + "</span> ",
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
                                    "emptyTable": "<span data-lang='lblEmpty'>" + (global.TypeLanguage == 0 ? "Không có dữ liệu" : "No data available in table") + "</span>",
                                },
                                bLengthChange: false,
                                scrollY: 350,
                                scrollX: true,
                                'createdRow': function (row, data, dataIndex) {
                                    if (data.hasOwnProperty("STT")) {
                                        $(row).attr('data-id', data.STT);
                                    }
                                    $('td', row).eq(0).addClass('details');
                                    $('td', row).eq(0).attr('ng-click', 'fn.LinkChiTietGiamSat(' + data.STT + ')');
                                    $compile($('td', row))($scope);
                                },
                                "order": [[0, 'desc']]
                            });
                            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw(false);
                            vars.$tbGiamSatTinhTrangBody.find('tr:first-child').addClass('selected');
                        });
                },
                LoadThongSoGiamSat: function (STT) {
                    //public JsonResult GetThongSo(int stt, int dat, string msmay, int loaits)
                    $.post(urlGetThongSoGiamSatTinhTrang, { stt: STT, dat: $('input[name = "optradio"]:checked').val(), msmay: "-1", loaits: 1 },
                        function (data) {
                            if ($.fn.DataTable.isDataTable('#tbthongsodinhtinh')) {
                                $('#tbthongsodinhtinh').dataTable().fnDestroy();
                            }
                            $('#tbthongsodinhtinh').DataTable({
                                data: data,
                                columns: [
                                    { data: 'STT' },
                                    { data: 'MS_MAY' },
                                    { data: 'TEN_MAY' },
                                    { data: 'MS_BO_PHAN' },
                                    { data: 'TEN_BO_PHAN' },
                                    { data: 'MS_TS_GSTT' },
                                    { data: 'TEN_TS_GSTT' },
                                    { data: 'TG_TT' },
                                    { data: 'THOI_GIAN' }
                                ],
                                "columnDefs": [
                                    {
                                        "targets": [0],
                                        "visible": false,
                                        "searchable": false
                                    },
                                    {
                                        "targets": [3],
                                        "visible": false
                                    },
                                    {
                                        "targets": [5],
                                        "visible": false
                                    },
                                    { 'width': '110px', 'targets': 1 },
                                    { 'width': '30%', 'targets': 2 },
                                    { 'width': '30%', 'targets': 4 },
                                    { 'width': '30%', 'targets': 6 },
                                    { 'width': '10%', 'targets': 7 },
                                    { 'width': '10%', 'targets': 8 }

                                ],
                                "language":
                                {
                                    "processing": "<div class='overlay custom-loader-background'><i class='fa fa-cog fa-spin custom-loader-color'></i></div>",
                                    "sSearch": "<span data-lang='lblSearch'>" + (global.TypeLanguage == 0 ? "Tìm " : "Search") + "</span> ",
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
                                    "emptyTable": "<span data-lang='lblEmpty'>" + (global.TypeLanguage == 0 ? "Không có dữ liệu" : "No data available in table") + "</span>",
                                },
                                bLengthChange: false,
                                scrollY: 350,
                                "searching": false,
                                scrollX: true,
                                'createdRow': function (row, data, dataIndex) {
                                    if (data.hasOwnProperty("STT")) {
                                        $(row).attr('data-id', data.STT);
                                        $(row).attr('data-msmay', data.MS_MAY);
                                        $(row).attr('data-msbp', data.MS_BO_PHAN);
                                        $(row).attr('data-msts', data.MS_TS_GSTT);
                                    }
                                }
                            });
                            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw(false);
                            $('#tbthongsodinhtinh').find('tr:first-child').addClass('selected');
                            method.TableThongSo_RowChanged();
                        });
                },
                TableThongSo_RowChanged: function () {
                    //var requestID = vars.$tbRequest.find('tr[class$="selected"]').attr('data-id');
                    //var detailID = vars.$tbRequestDetailBody.find('tr[class$="selected"]').attr('data-detailid');
                    //var deviceID = vars.$tbRequestDetailBody.find('tr[class$="selected"] td').attr('data-deviceid');
                    method.LoadGiaTri(11);
                    return false;
                },
                //GetGiaTri(int stt, string msmay, string msbp, string msts, int loai);
                LoadGiaTri: function (STT) {
                    var msmay = $("#tbthongsodinhtinh tbody").find('tr[class$="selected"]').attr('data-msmay');
                    var msbp = $("#tbthongsodinhtinh tbody").find('tr[class$="selected"]').attr('data-msbp');
                    var msts = $("#tbthongsodinhtinh  tbody").find('tr[class$="selected"]').attr('data-msts');
                    var tableBody = $('#tbgiatri tbody');
                    if (typeof msmay == 'undefined') {
                        tableBody.empty();
                        tableBody.append('<tr><td colspan="2">Không có dữ liệu</td></tr>');
                    }
                    else {
                        $.post(urlGetGiaTri, { stt: STT, msmay: msmay, msbp: msbp, msts: msts, loai: 1 }, function (data) {
                            var i;
                            tableBody.empty();
                            if (data.length == 0) { tableBody.append('<tr><td colspan="2">Không có dữ liệu</td></tr>'); }
                            else {
                                for (i = 0; i < data.length; i++) {
                                    tableBody.append('<tr><td>' + data[i].TEN_GIA_TRI + '</td><td >' + data[i].GHI_CHU + '</td></tr>');
                                }
                            }
                        });
                    }
                },

            }
            var method
            $scope.fn = {
                Init: function () {
                    global.CurrentNamePage = currentPageName
                    MainMenu.fn.SetActive(menuID);
                    Languages.fn.AutoChangeLanguage()
                    Main.fn.InitButtonFloat(buttonFloat)
                    method = fnPrivate
                    vars = bindVariables();
                    method.LoadGiamSatTinhTrang();
                    Main.fn.InitDateTimePickerChanged([$('#fromDate'), $('#toDate')], method.LoadGiamSatTinhTrang);
                    $('input[type=radio][name=optradio]').change(function () {
                        var STT = $('#tbGiamSatTinhTrang').find('tr[class$="selected"]').attr('data-id');
                        method.LoadThongSoGiamSat(STT);
                    });
                    $("#cbbLoaiCV").change(function () {
                        if (method.KiemTraChonMay() !== false) {
                            //method.LoadGrid();
                        }
                    });
                    if ($('#link').val() === '1') {
                        $("#cbbDiaDiem").val($('#nx').val());
                        $("#txtDevice").val($('#may').val());
                        $("#fromDate").val($('#dngay').val());
                        //method.LoadGrid();
                    }
                    $(".select2").select2(
                        {
                            theme: "classic"
                        });
                   $('#tbthongsodinhtinh').on('click', 'tr', method.TableThongSo_RowChanged);
                    vars.$txtDevice.on('keypress', function (e) {
                        if (e.which === 13) {
                            Loading.fn.Show()
                            window.setTimeout(function () { method.LoadGrid(vars.$txtDevice.val(), 'keypress'); }, 500);
                        }
                    });
                    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                        var target = $(e.target).attr("data-val") // activated tab
                        if (vars.$tableGiamSatTinhTrang.rows().count() == 0) {
                            Alert.fn.Show("Chưa chọn giám sát", Alert.Type.warning)
                            return;
                        }
                        else {
                            if (target == 1) {
                                var STT = $('#tbGiamSatTinhTrang').find('tr[class$="selected"]').attr('data-id');
                                method.LoadThongSoGiamSat(STT);
                            }
                         
                        }
                    });
                },
                LinkChiTietGiamSat: function (STT) {
                    window.setTimeout(function () { vars.$tabDinhTinh.tab('show') }, 500);
                    method.LoadThongSoGiamSat(STT);
                },
            }
        })
        app.init = function () {
            angular.bootstrap(document, ['MonitoringPage'])
        }
        return app;
    })();
    $(function () {
        Monitoring.init()
    });
})