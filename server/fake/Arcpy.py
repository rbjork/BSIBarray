class Arcpy(object):

    def __init__(self):
        self.data = []

    @staticmethod
    def getfields():
        return "FIPS    SIT_HSE_NU	SIT_DIR	SIT_STR_NA	SIT_STR_SF	SIT_FULL_S	SIT_CITY	SIT_STATE	SIT_ZIP	SIT_ZIP4\
        	SIT_POST	LAND_VALUE	IMPR_VALUE	TOT_VALUE	ASSMT_YEAR	MKT_LAND_V	MKT_IMPR_V	TOT_MKT_VA	MKT_VAL_YR\
            	REC_DATE	SALES_PRIC	SALES_CODE	YEAR_BUILT	CONST_TYPE	STD_LAND_U	LOT_SIZE	BLDG_AREA	NO_OF_STOR	\
                NO_OF_UNIT	BEDROOMS	BATHROOMS	OWNER	OWNER2	OWNADDRESS	OWNADDRES2	OWNCTYSTZP".split('\t')

    @staticmethod
    def ListFields(layer):
        fields = Arcpy.getfields()
        vals = [{"name":x, "id":i}  for i, x in enumerate(fields, 1)]
        return vals #[{"name":f} for f in fields]

    def listfields(self,layer):
        #fields = getfields()
        return "fields"
