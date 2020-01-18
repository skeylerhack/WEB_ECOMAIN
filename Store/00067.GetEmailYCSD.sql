ALTER FUNCTION GetEmailYCSD
(
    @msnx NVARCHAR(50) ='VF01.01.01.01',
	 @Delimiter NCHAR(1) =';'
)
RETURNS varchar(500) -- or whatever length you need
AS
BEGIN
    Declare @mail varchar(500);
	DECLARE @nx VARCHAR(500);
SET @nx =(SELECT DBO.MGetNXUongCha(@msnx)) +';'+ @msnx
SELECT @mail = EMAIL FROM dbo.NHA_XUONG_EMAIL WHERE (MS_LOAI_EMAIL = 1) AND MS_N_XUONG IN (SELECT Value FROM MGetSplit(@nx,@Delimiter))
    RETURN  @mail
END

--SELECT dbo.GetEmailYCSD('VF01.01.01.01',';')


