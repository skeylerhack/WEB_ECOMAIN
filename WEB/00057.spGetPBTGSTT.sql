ALTER PROCEDURE spGetPBTGSTT
	@TNgay DATE = '2010/07/11',
	@DNgay DATE = '2020/07/30',
	@UserName NVARCHAR(255) = 'Admin',
	@MsNXuong nvarchar(50) = 'HCM',
	@MsMay NVARCHAR(30) ='-1',
	@GiaiDoan BIT = 1,
	@NNgu INT = 0
AS 
BEGIN
--@GiaiDoan = 0 Coi d�ng ngay luc do set tu ngay = @DNgay
--@GiaiDoan = 1 Coi trong giai doan
IF @GiaiDoan = 0 
BEGIN
	SET @DNgay = @TNgay
END
SELECT DISTINCT MS_MAY,TEN_MAY INTO #MAY_USER FROM [dbo].[MGetMayUserNgay](@DNgay,@UserName,@MsNXuong,-1,-1,'-1','-1','-1',@NNgu)

SELECT DISTINCT T1.MS_MAY,T2.TEN_MAY INTO #PBT FROM dbo.PHIEU_BAO_TRI T1 INNER JOIN #MAY_USER T2 ON T1.MS_MAY = T2.MS_MAY WHERE (CONVERT(DATE, NGAY_BD_KH) BETWEEN	@TNgay AND @DNgay) AND (TINH_TRANG_PBT =2)

SELECT DISTINCT T1.MS_MAY,T1.TEN_MAY INTO #GSTT FROM [dbo].[MGetHieuChuanKeGSTT](@TNgay,@DNgay,@UserName,@MsNXuong,-1,-1,'-1','-1',-1,1,@NNgu) T1


SELECT T1.MS_MAY,T1.TEN_MAY,
CASE WHEN ISNULL(T2.MS_MAY,'') = '' THEN 0 ELSE 1 END AS PBT,
CASE WHEN ISNULL(T3.MS_MAY,'') = '' THEN 0 ELSE 1 END AS GSTT
FROM (
SELECT MS_MAY,TEN_MAY FROM #GSTT
UNION SELECT MS_MAY,TEN_MAY FROM #PBT
) T1 LEFT JOIN 
#PBT T2 ON T1.MS_MAY = T2.MS_MAY LEFT JOIN 
#GSTT T3 ON T1.MS_MAY = T3.MS_MAY 
WHERE (T1.MS_MAY = @MsMay OR @MsMay ='-1')
ORDER BY T1.MS_MAY
END
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     