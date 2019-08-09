﻿define(['_MasterPageController', '_MenuPageController', '_DetailsModalController', 'datatables-bootstrap'], function (module, menu, modal) {
    var Monitoring = (function () {
        var app = angular.module('MonitoringPage', [])
        app.controller('MonitoringController', function ($scope) {
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
                        "id": "btnSubmit",
                        "url": '#',
                        "icon": "<i class='fa fa-floppy-o'></i>",
                        "lang": "btnGhi",
                        "func": "fn.Submit()"
                    },
                    {
                        "id": "btnbochon",
                        "url": '#',
                        "icon": "<i class='fa fa fa-square-o'></i>",
                        "lang": "btnbochon",
                        "func": ""
                    },
                    {
                        "id": "btnchondat",
                        "url": '#',
                        "icon": "<i class='fa fa-check-square-o'></i>",
                        "lang": "btnchondat",
                        "func": ""
                    },

                    {
                        "id": "btnchonkhongdat",
                        "url": '#',
                        "icon": "<i class='fa  fa-check-square'></i>",
                        "lang": "btnchonkhongdat",
                        "func": "fn.chonkhongdat()"
                    }

                ]
            var vars = {}
            var bindVariables = function () {
                return {
                    $busy: false,
                    $equipDatatables: 'undefined',
                    $equipDatatablesTmp: 'undefined',
                    $quantityParamsDatatables: 'undefined',
                    $qualityParamsDatatables: 'undefined',
                    $btnChooseEquip: $('#btnChooseEquip'),
                    $tbEquip: $('#tbEquip'),
                    $tbEquipBody: $('#tbEquip tbody'),
                    $txtDevice: $('#txtDevice'),
                    $tbQuantityParameterBody: $('#tbQuantityParameter tbody'),
                    $tbQualityParameterBody: $('#tbQualityParameter tbody'),
                    $tbQuantityParameter: $('#tbQuantityParameter'),
                    $tbQualityParameter: $('#tbQualityParameter'),
                };
            }
            var fnPrivate = {
                LoadGrid: function (id, action) {
                    $.post(urlConditionMonitoringParameterGet, { id: id, due: $('input[name = "optradio"]:checked').val(), todate: $('#fromDate').val(), mslcv: $('#cbbLoaiCV').val() }, function (data) {
                        if ($.fn.DataTable.isDataTable('#tbQuantityParameter')) {
                            $('#tbQuantityParameter').dataTable().fnDestroy();
                        }
                        if ($.fn.DataTable.isDataTable('#tbQualityParameter')) {
                            $('#tbQualityParameter').dataTable().fnDestroy();
                        }
                        vars.$tbQualityParameterBody.empty()
                        vars.$tbQuantityParameterBody.empty()
                        if (data.length > 0) {
                            var i = 0;
                            for (i = 0; i < data.length; i++) {
                                if (data[i].TypeOfParam === true) {
                                    vars.$tbQualityParameterBody.append('<tr><td >(' + data[i].ComponentID + ') ' + data[i].ComponentName + '- (' + data[i].MonitoringParamsName + ')</td><td class="dt-body-center" data-toggle="buttons" style="width:120px" data-pass="' + data[i].Pass + '"><label class="btn"><input class="form-control" data-id="' + data[i].ValueParamID + '" data-msbophan="' + data[i].ComponentID + '" data-msthongso="' + data[i].MonitoringParamsID + '" type="checkbox" /><i class="fa fa-square-o"></i><i class="fa fa-check-square-o"></i></label><td>' + data[i].ValueParamName + '</td><td><textarea class="form-control" id="txtGhiChu">' + data[i].Note + '</textarea></tr>')
                                }
                                else {
                                    vars.$tbQuantityParameterBody.append('<tr><td >(' + data[i].ComponentID + ') ' + data[i].ComponentName + '-' + data[i].MonitoringParamsName + ' (' + data[i].TEN_DV_DO + ')</td><td style="padding-left: 20px;">' + data[i].ValueParamName.split('!')[0] + '</td><td style="width:110px" ><input onkeyup="this.setAttribute(\'value\', this.value);" value="" class="form-control" type="text" data-range=\'' + data[i].ValueParamName.split('!')[1] + '\' style="width: 100%" data-msbophan="' + data[i].ComponentID + '" data-msthongso="' + data[i].MonitoringParamsID + '" /></td><td><textarea class="form-control" id="txtGhiChu">' + data[i].Note + '</textarea></td></tr>')
                                }
                            }
                            vars.$qualityParamsDatatables = $("#tbQualityParameter").DataTable({
                                "columnDefs": [
                                    { "visible": false, "targets": 0 },
                                    { "width": '160px', "targets": 1 },
                                    { "width": "50%", "targets": 2 },
                                    { "width": "50%", "targets": 3 }
                                ],
                                "language":
                                {
                                    "processing": "<div class='overlay custom-loader-background'><i class='fa fa-cog fa-spin custom-loader-color'></i></div>",
                                    "sSearch": "<span data-lang='lblSearch'>" + (global.TypeLanguage == 0 ? "Tìm " : "Search") + "</span> ",
                                    "info": "",
                                    "zeroRecords": "<span data-lang='lblFilterInfo'>" + (global.TypeLanguage == 0 ? "Không tìm thấy" : "No matching records found") + "</span>",
                                    "lengthMenu": "<span data-lang='lblShow'>" + (global.TypeLanguage == 0 ? "Xem " : "Show") + "</span> _MENU_ <span data-lang='lblEntries'>" + (global.TypeLanguage == 0 ? "dòng " : "entries") + "</span>",
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
                                "lengthChange": false,
                                "lengthMenu": [10],
                                "scrollY": '50vh',
                                "scrollX": true,
                                "processing": true,
                                "drawCallback": function (settings) {
                                    var api = this.api();
                                    var rows = api.rows({ page: 'current' }).nodes();
                                    var last = null;
                                    var groupadmin = [];
                                    api.column(0, { page: 'current' }).data().each(function (group, i) {
                                        if (last !== group) {
                                            $(rows).eq(i).before(
                                                '<tr data-root"' + i + '" class="group" id="' + i + '"><td colspan="3">' + group + '</td></tr>'
                                            );
                                            groupadmin.push(i);
                                            last = group;
                                        }
                                    });
                                    for (var k = 0; k < groupadmin.length; k++) {
                                        $("#" + groupadmin[k]).nextUntil("#" + groupadmin[k + 1]).addClass(' group-' + groupadmin[k]);
                                        $("#" + groupadmin[k]).nextUntil("#" + groupadmin[k + 1]).attr('data-root', groupadmin[k]);
                                        $("#" + groupadmin[k]).click(function () {
                                            var gid = $(this).attr("id");
                                            $(".group-" + gid).slideToggle(300);
                                        });
                                    }
                                }
                            });
                            vars.$quantityParamsDatatables = $("#tbQuantityParameter").DataTable({
                                "columnDefs": [
                                    { "visible": false, "targets": 0 },
                                    { "width": '50%', "targets": 1 },
                                    { "width": "50px", "targets": 2 },
                                    { "width": "50%", "targets": 3 }
                                ],
                                "language":
                                {
                                    "processing": "<div class='overlay custom-loader-background'><i class='fa fa-cog fa-spin custom-loader-color'></i></div>",
                                    "sSearch": "<span data-lang='lblSearch'>" + (global.TypeLanguage == 0 ? "Tìm " : "Search") + "</span> ",
                                    "info": "",
                                    "zeroRecords": "<span data-lang='lblFilterInfo'>" + (global.TypeLanguage == 0 ? "Không tìm thấy" : "No matching records found") + "</span>",
                                    "lengthMenu": "<span data-lang='lblShow'>" + (global.TypeLanguage == 0 ? "Xem " : "Show") + "</span> _MENU_ <span data-lang='lblEntries'>" + (global.TypeLanguage == 0 ? "dòng " : "entries") + "</span>",
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
                                "lengthChange": false,
                                "lengthMenu": [10],
                                "scrollY": '50vh',
                                "scrollX": true,
                                "processing": true,
                                "drawCallback": function (settings) {
                                    var api = this.api();
                                    var rows = api.rows({ page: 'current' }).nodes();
                                    var last = null;
                                    var groupadmin1 = [];
                                    api.column(0, { page: 'current' }).data().each(function (group, i) {
                                        if (last !== group) {
                                            $(rows).eq(i).before(
                                                '<tr data-root"' + i + '" class="group" id="' + (i + 10000) + '"><td colspan="3">' + group + '</td></tr>'
                                            );
                                            groupadmin1.push(i + 10000);
                                            last = group;
                                        }
                                    });
                                    for (var k = 0; k < groupadmin1.length; k++) {
                                        $("#" + groupadmin1[k]).nextUntil("#" + groupadmin1[k + 1]).addClass(' group-' + groupadmin1[k]);
                                        $("#" + groupadmin1[k]).nextUntil("#" + groupadmin1[k + 1]).attr('data-root', groupadmin1[k]);
                                        $("#" + groupadmin1[k]).click(function () {
                                            var gid = $(this).attr("id");
                                            $(".group-" + gid).slideToggle(300);
                                        });
                                    }
                                }
                            });
                            $($.fn.dataTable.tables(true)).css('width', '100%');
                            $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw(false);
                            Loading.fn.Hide();
                        }
                        else {
                            Loading.fn.Hide();
                            //if (action == 'button') {
                            //    $('#myModal').appendTo("body").modal('show')
                            //}
                            Alert.fn.Show(Messenger.msgKhongCoDuLieu, Alert.Type.warning)
                        }
                    });
                },
                GetConditionMonitoringByDevice: function () {
                    var keys = vars.$equipDatatables.data().count();
                    if (keys == 0) {
                        Alert.fn.Show(Messenger.msgDuLieuRong, Alert.Type.warning);
                        return;
                    }
                    keys = vars.$equipDatatables.$('tr[class$=selected]')
                    if (keys.length == 0) {
                        Alert.fn.Show(Messenger.msgChonDevice, Alert.Type.warning)
                        return;
                    }
                    Loading.fn.Show()
                    $('#myModal').appendTo("body").modal('hide')
                    window.setTimeout(function () { method.LoadGrid($('#tbEquip tr[class$=selected]').attr('data-id'), 'button'); }, 500);
                    vars.$txtDevice.val(vars.$tbEquip.find('tr[class$=selected]').attr('data-id'))
                },
                ToggleCheckboxesOnTable: function () {
                    var $checkbox = $(this).find(':checkbox');
                    $checkbox.prop('checked', !$checkbox.prop('checked'))
                    if ($checkbox.is(':checked')) {
                        $checkbox.closest('td').addClass("checked")
                        var root = $(this).parent().attr('data-root')
                        var dat = $(this).attr('data-pass')
                        $('#tbQualityParameter tr[data-root=' + root + '] td[class$=checked]').each(function (i, obj) {
                            if ($(obj).attr('data-pass') !== dat) {
                                $('#tbQualityParameter tr[data-root=' + root + '] td[class$=checked]').removeClass('checked')
                                $('#tbQualityParameter tr[data-root=' + root + '] input[type=checkbox]').prop('checked', false)
                                $checkbox.prop('checked', true)
                                $checkbox.closest('td').addClass("checked")
                                return false;
                            }
                        })
                    }
                    else {
                        $(this).parent().removeClass("checked")
                    }
                },
                DetectInputValueNumber: function () {
                    if (vars.$busy == true) return false;
                    if ($(this).val() == '') return false;
                    if (!$.isNumeric($(this).val())) {
                        vars.$busy = true;
                        $(this).focus();
                        Alert.fn.Show(Messenger.msgChiDuocNhapSo, Alert.Type.warning);
                        vars.$busy = false;
                        return false;
                    }
                    var data = JSON.parse($(this).attr('data-range'));
                    var flag = 0;
                    for (var i = 0; i < data.length; i++) {
                        if (parseFloat(data[i].GiaTriTren) >= parseFloat($(this).val()) && parseFloat($(this).val()) >= parseFloat(data[i].GiaTriDuoi)) {
                            flag = flag + 1;
                            continue;
                        }
                    }
                    if (flag == 0) {
                        vars.$busy = true; //out endless loop (recusrive)
                        $(this).focus();
                        Alert.fn.Show(Messenger.msgNhapNgoaiKhoangGT, Alert.Type.warning);
                        vars.$busy = false;
                        return false;
                    }
                },
                KiemTraChonMay: function () {
                    var tmp = $('#txtDevice').val();
                    if (tmp === '') {
                        Alert.fn.Show("máy chưa được chọn", Alert.Type.warning);
                        return false;
                    }
                }


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
                    $('input[type=radio][name=optradio]').change(function () {
                        if (this.value == 0) {
                            $('#fromDate').hide();
                            $('[data-lang=lblTungay]').hide();
                            if (method.KiemTraChonMay() !== false) {
                                method.LoadGrid();
                            }
                        }
                        else if (this.value == 1) {
                            $('#fromDate').toggle();
                            $('[data-lang=lblTungay]').toggle();
                            if (method.KiemTraChonMay() !== false) {
                                method.LoadGrid();
                            }
                        }
                    });

                    $("#cbbLoaiCV").change(function () {
                        if (method.KiemTraChonMay() !== false) {
                            method.LoadGrid();
                        }
                    });

                    $("#fromDate").on('dp.change', function () {
                        if (method.KiemTraChonMay() !== false) {
                            method.LoadGrid();
                        }
                    });
                    if ($('#link').val() === '1') {
                        $("#cbbDiaDiem").val($('#nx').val());
                        $("#txtDevice").val($('#may').val());
                        method.LoadGrid();
                    }
                    $(".select2").select2(
                        {
                            theme: "classic"
                        });
                    vars.$equipDatatables = $("#tbEquip").DataTable();
                    vars.$equipDatatablesTmp = vars.$equipDatatables.rows().data();
                    vars.$tbEquipBody.on('doubletap', 'tr', method.GetConditionMonitoringByDevice)
                    vars.$tbEquipBody.on('dblclick', 'tr', method.GetConditionMonitoringByDevice)
                    vars.$btnChooseEquip.click(method.GetConditionMonitoringByDevice)
                    vars.$qualityParamsDatatables = $("#tbQualityParameter").DataTable({
                        "language":
                        {
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
                        responsive: true,
                        "lengthChange": false,
                        "lengthMenu": [10]
                    });
                    vars.$quantityParamsDatatables = $("#tbQuantityParameter").DataTable({
                        "language":
                        {
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
                        responsive: true,
                        "lengthChange": false,
                        "lengthMenu": [10]
                    });
                    vars.$tbQualityParameterBody.on('click', 'td:first-child', method.ToggleCheckboxesOnTable);
                    vars.$tbQuantityParameterBody.on("focusout", "input[type=text]", method.DetectInputValueNumber);
                    vars.$txtDevice.on('keypress', function (e) {
                        if (e.which === 13) {
                            Loading.fn.Show()
                            window.setTimeout(function () { method.LoadGrid(vars.$txtDevice.val(), 'keypress'); }, 500);
                        }
                    });
                },
                Submit: function () {
                    if (!$.fn.DataTable.isDataTable('#tbQuantityParameter')) {
                        Alert.fn.Show(Messenger.msgDuLieuRong, Alert.Type.warning);
                        return;
                    }
                    if (vars.$qualityParamsDatatables.data().count() == 0 && vars.$quantityParamsDatatables.data().count() == 0) {
                        Alert.fn.Show(Messenger.msgDuLieuRong, Alert.Type.warning);
                        return;
                    }
                    var count = 0;
                    if (vars.$qualityParamsDatatables.$('input[type=checkbox]:checked').length == 0) {
                        count = count + 1;
                    }
                    if (vars.$quantityParamsDatatables.$('input[type=text]:not([value=""])').length == 0) {
                        count = count + 1;
                    }
                    if (count == 2) {
                        Alert.fn.Show(Messenger.msgChuaChonDuLieu, Alert.Type.warning);
                        return
                    }
                    Loading.fn.Show();
                    var lstParameter = new Array();
                    if (vars.$quantityParamsDatatables.$('input[type=text]:not([value=""])').length > 0) {
                        vars.$quantityParamsDatatables.$('input[type=text]:not([value=""])').each(function (i, obj) {
                            lstParameter[i] = new Object();
                            lstParameter[i].DeviceID = vars.$txtDevice.val();
                            lstParameter[i].MonitoringParamsID = $(obj).attr('data-msthongso');
                            lstParameter[i].ComponentID = $(obj).attr('data-msbophan');
                            lstParameter[i].TypeOfParam = 0;
                            lstParameter[i].ValueParamID = -1;
                            var data = JSON.parse($(obj).attr('data-range'));
                            var j = 0;
                            for (j = 0; j < data.length; j++) {
                                if (parseFloat(data[j].GiaTriTren) >= parseFloat($(obj).val()) && parseFloat($(obj).val()) >= parseFloat(data[j].GiaTriDuoi)) {
                                    lstParameter[i].ID = data[j].ID
                                    break;
                                }
                            }
                            lstParameter[i].Measurement = $(obj).val();
                            lstParameter[i].Note = $(obj).closest('tr').find('textarea').val()
                        });
                    }
                    var cur_length = lstParameter.length;
                    if (vars.$qualityParamsDatatables.$('input[type=checkbox]:checked').length > 0) {
                        vars.$qualityParamsDatatables.$('input[type=checkbox]:checked').each(function (i, obj) {
                            var j = i + cur_length;
                            lstParameter[j] = new Object();
                            lstParameter[j].DeviceID = vars.$txtDevice.val();
                            lstParameter[j].MonitoringParamsID = $(obj).attr('data-msthongso');
                            lstParameter[j].ComponentID = $(obj).attr('data-msbophan');
                            lstParameter[j].TypeOfParam = 1;
                            lstParameter[j].ID = 1;
                            lstParameter[j].ValueParamID = $(obj).attr('data-id')
                            lstParameter[j].Measurement = 0;
                            lstParameter[j].Note = $(obj).closest('tr').find('textarea').val()
                        });
                    }

                    $.post(urlConditionMonitoringParameterSave, { data: JSON.stringify(lstParameter), mscn: $("#cbbNhanVien").val() }, function (data) {
                        if (data == "success") {
                            $('#tbQuantityParameter').dataTable().fnDestroy();
                            $('#tbQualityParameter').dataTable().fnDestroy();
                            $('#tbQualityParameter tbody').empty()
                            $('#tbQuantityParameter tbody').empty()
                            Loading.fn.Hide();
                            Alert.fn.Show(Messenger.msgGhiThanhCong, Alert.Type.success)
                            vars.$txtDevice.val('')
                        }
                        else {
                            Loading.fn.Hide();
                            Alert.fn.Show(Messenger.msgGhiKhongThanhCong, Alert.Type.error)
                        }
                    });
                },
                chonkhongdat: function () {
                    if (!$.fn.DataTable.isDataTable('#tbQuantityParameter')) {
                        Alert.fn.Show(Messenger.msgDuLieuRong, Alert.Type.warning);
                        return;
                    }
                    if (vars.$qualityParamsDatatables.data().count() == 0 && vars.$quantityParamsDatatables.data().count() == 0) {
                        Alert.fn.Show(Messenger.msgDuLieuRong, Alert.Type.warning);
                        return;
                    }
                    //$("input[type=checkbox]").prop('checked', false);
                    //$("td[data-pass=0] input[type=checkbox]").prop('checked', true);tbQualityParameter
                    var rows = $('#tbQualityParameter').rows().nodes();
                    $('input[type="checkbox"]',rows).prop('checked', true);

                },
                chondat: function () {
                    if (!$.fn.DataTable.isDataTable('#tbQuantityParameter')) {
                        Alert.fn.Show(Messenger.msgDuLieuRong, Alert.Type.warning);
                        return;
                    }
                    if (vars.$qualityParamsDatatables.data().count() == 0 && vars.$quantityParamsDatatables.data().count() == 0) {
                        Alert.fn.Show(Messenger.msgDuLieuRong, Alert.Type.warning);
                        return;
                    }
                    $("input[type=checkbox]").prop('checked', false);
                    $("td[data-pass=1] input[type=checkbox]").prop('checked', true);
                },
                bochon: function () {
                    if (!$.fn.DataTable.isDataTable('#tbQuantityParameter')) {
                        Alert.fn.Show(Messenger.msgDuLieuRong, Alert.Type.warning);
                        return;
                    }
                    if (vars.$qualityParamsDatatables.data().count() == 0 && vars.$quantityParamsDatatables.data().count() == 0) {
                        Alert.fn.Show(Messenger.msgDuLieuRong, Alert.Type.warning);
                        return;
                    }
                    $("input[type=checkbox]").prop('checked', false);
                },


                ShowEquipForm: function () {
                    $.post(urlCheckTheParametersDue, { msnx: $("#cbbDiaDiem").val() }, function (data) {
                        if (data.length > 0) {
                            if ($.fn.DataTable.isDataTable('#tbEquip')) {
                                $('#tbEquip').dataTable().fnDestroy();
                            }
                            vars.$equipDatatables = $("#tbEquip").DataTable({
                                data: data,
                                columns: [
                                    { data: 'ID' },
                                    { data: 'Name' }
                                ],
                                columnDefs: [
                                    {
                                        'targets': 0,
                                        'max-width': '150px',
                                    }
                                ],
                                "language":
                                {
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
                                "processing": true,
                                "lengthChange": false,
                                "lengthMenu": [5],
                                createdRow: function (row, data, dataIndex) {
                                    if (data.hasOwnProperty("ID")) {
                                        $(row).attr('data-id', data.ID);
                                    }
                                },
                            });
                            $('#myModal').appendTo("body").modal('show')
                        }
                        else {
                            Alert.fn.Show(Messenger.msgKhongCoThietBi, Alert.Type.warning);
                            return false;
                        }
                    });
                }
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