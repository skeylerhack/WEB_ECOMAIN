﻿IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'MornitoringWeb' AND KEYWORD =N'btnThemgs') UPDATE LANGUAGES SET VIETNAM=N'Thêm', ENGLISH=N'Add',CHINESE=N'Add', VIETNAM_OR=N'Thêm', ENGLISH_OR=N'Add' , CHINESE_OR=N'Add' WHERE FORM=N'MornitoringWeb' AND KEYWORD=N'btnThemgs' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'MornitoringWeb',N'btnThemgs',N'Thêm',N'Add',N'Add',N'Thêm',N'Add',N'Add','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'ReceiptRequestWeb' AND KEYWORD =N'btnThem') UPDATE LANGUAGES SET VIETNAM=N'Thêm', ENGLISH=N'Add',CHINESE=N'Add', VIETNAM_OR=N'Thêm', ENGLISH_OR=N'Add' , CHINESE_OR=N'Add' WHERE FORM=N'ReceiptRequestWeb' AND KEYWORD=N'btnThem' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'ReceiptRequestWeb',N'btnThem',N'Thêm',N'Add',N'Add',N'Thêm',N'Add',N'Add','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'MornitoringWeb' AND KEYWORD =N'btnSuags') UPDATE LANGUAGES SET VIETNAM=N'Sửa', ENGLISH=N'Edit',CHINESE=N'Edit', VIETNAM_OR=N'Sửa', ENGLISH_OR=N'Edit' , CHINESE_OR=N'Edit' WHERE FORM=N'MornitoringWeb' AND KEYWORD=N'btnSuags' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'MornitoringWeb',N'btnSuags',N'Sửa',N'Edit',N'Edit',N'Sửa',N'Edit',N'Edit','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'ReceiptRequestWeb' AND KEYWORD =N'btnSua') UPDATE LANGUAGES SET VIETNAM=N'Sửa', ENGLISH=N'Edit',CHINESE=N'Edit', VIETNAM_OR=N'Sửa', ENGLISH_OR=N'Edit' , CHINESE_OR=N'Edit' WHERE FORM=N'ReceiptRequestWeb' AND KEYWORD=N'btnSua' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'ReceiptRequestWeb',N'btnSua',N'Sửa',N'Edit',N'Edit',N'Sửa',N'Edit',N'Edit','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'MornitoringWeb' AND KEYWORD =N'btnXoa') UPDATE LANGUAGES SET VIETNAM=N'Xóa', ENGLISH=N'Delete',CHINESE=N'Delete', VIETNAM_OR=N'Xóa', ENGLISH_OR=N'Delete' , CHINESE_OR=N'Delete' WHERE FORM=N'MornitoringWeb' AND KEYWORD=N'btnXoa' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'MornitoringWeb',N'btnXoa',N'Xóa',N'Delete',N'Delete',N'Xóa',N'Delete',N'Delete','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'MyEcomainWeb' AND KEYWORD =N'btnClose') UPDATE LANGUAGES SET VIETNAM=N'Đóng', ENGLISH=N'Close',CHINESE=N'Close', VIETNAM_OR=N'Đóng', ENGLISH_OR=N'Close' , CHINESE_OR=N'Close' WHERE FORM=N'MyEcomainWeb' AND KEYWORD=N'btnClose' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'MyEcomainWeb',N'btnClose',N'Đóng',N'Close',N'Close',N'Đóng',N'Close',N'Close','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'MornitoringWeb' AND KEYWORD =N'btnchonkhongdat') UPDATE LANGUAGES SET VIETNAM=N'Chọn đạt', ENGLISH=N'',CHINESE=N'', VIETNAM_OR=N'Chọn đạt', ENGLISH_OR=N'' , CHINESE_OR=N'' WHERE FORM=N'MornitoringWeb' AND KEYWORD=N'btnchonkhongdat' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'MornitoringWeb',N'btnchonkhongdat',N'Chọn đạt',N'',N'',N'Chọn đạt',N'',N'','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'MornitoringWeb' AND KEYWORD =N'btnchondat') UPDATE LANGUAGES SET VIETNAM=N'Chọn không đạt', ENGLISH=N'',CHINESE=N'', VIETNAM_OR=N'Chọn không đạt', ENGLISH_OR=N'' , CHINESE_OR=N'' WHERE FORM=N'MornitoringWeb' AND KEYWORD=N'btnchondat' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'MornitoringWeb',N'btnchondat',N'Chọn không đạt',N'',N'',N'Chọn không đạt',N'',N'','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'MornitoringWeb' AND KEYWORD =N'btnbochon') UPDATE LANGUAGES SET VIETNAM=N'Bỏ chọn', ENGLISH=N'',CHINESE=N'', VIETNAM_OR=N'Bỏ chọn', ENGLISH_OR=N'' , CHINESE_OR=N'' WHERE FORM=N'MornitoringWeb' AND KEYWORD=N'btnbochon' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'MornitoringWeb',N'btnbochon',N'Bỏ chọn',N'',N'',N'Bỏ chọn',N'',N'','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'UserRequestWeb' AND KEYWORD =N'btnThembp') UPDATE LANGUAGES SET VIETNAM=N'Thêm', ENGLISH=N'Add',CHINESE=N'Add', VIETNAM_OR=N'Thêm', ENGLISH_OR=N'Add' , CHINESE_OR=N'Add' WHERE FORM=N'UserRequestWeb' AND KEYWORD=N'btnThembp' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'UserRequestWeb',N'btnThembp',N'Thêm',N'Add',N'Add',N'Thêm',N'Add',N'Add','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'UserRequestWeb' AND KEYWORD =N'btnThemhinh') UPDATE LANGUAGES SET VIETNAM=N'Thêm hình', ENGLISH=N'Add image',CHINESE=N'Add image', VIETNAM_OR=N'Thêm hình', ENGLISH_OR=N'Add image' , CHINESE_OR=N'Add image' WHERE FORM=N'UserRequestWeb' AND KEYWORD=N'btnThemhinh' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'UserRequestWeb',N'btnThemhinh',N'Thêm hình',N'Add image',N'Add image',N'Thêm hình',N'Add image',N'Add image','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'UserRequestWeb' AND KEYWORD =N'lblChooseNYC') UPDATE LANGUAGES SET VIETNAM=N'Chọn NYC', ENGLISH=N'@lblChooseNYC@',CHINESE=N'@lblChooseNYC@', VIETNAM_OR=N'Chọn NYC', ENGLISH_OR=N'@lblChooseNYC@' , CHINESE_OR=N'@lblChooseNYC@' WHERE FORM=N'UserRequestWeb' AND KEYWORD=N'lblChooseNYC' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'UserRequestWeb',N'lblChooseNYC',N'Chọn NYC',N'@lblChooseNYC@',N'@lblChooseNYC@',N'Chọn NYC',N'@lblChooseNYC@',N'@lblChooseNYC@','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'UserRequestWeb' AND KEYWORD =N'MS_CN') UPDATE LANGUAGES SET VIETNAM=N'Mã công nhân', ENGLISH=N'Id employee',CHINESE=N'Id employee', VIETNAM_OR=N'Mã công nhân', ENGLISH_OR=N'Id employee' , CHINESE_OR=N'Id employee' WHERE FORM=N'UserRequestWeb' AND KEYWORD=N'MS_CN' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'UserRequestWeb',N'MS_CN',N'Mã công nhân',N'Id employee',N'Id employee',N'Mã công nhân',N'Id employee',N'Id employee','ECOMAIN')
IF EXISTS (SELECT * FROM LANGUAGES WHERE FORM=N'MornitoringWeb' AND KEYWORD =N'btnTroVe') UPDATE LANGUAGES SET VIETNAM=N'Trờ về', ENGLISH=N'Back',CHINESE=N'Back', VIETNAM_OR=N'Trờ về', ENGLISH_OR=N'Back' , CHINESE_OR=N'Back' WHERE FORM=N'MornitoringWeb' AND KEYWORD=N'btnTroVe' ELSE INSERT INTO LANGUAGES(FORM,KEYWORD,VIETNAM,ENGLISH,CHINESE,VIETNAM_OR,ENGLISH_OR,CHINESE_OR,MS_MODULE)  VALUES(N'MornitoringWeb',N'btnTroVe',N'Trờ về',N'Back',N'Back',N'Trờ về',N'Back',N'Back','ECOMAIN')
