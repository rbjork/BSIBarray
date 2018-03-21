from flask import Flask, render_template
import random
from fake.Arcpy import Arcpy
from utils.templatecreate import *
import json
import os

import dbf



app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

# Used for counts for target Template attributes
parcelQuery = {'PARC_COUNT':"",
                   'SITU_COUNT':"\"SIT_FULL_S\">'' AND \"SIT_HSE_NU\">'0'",
                   'OWN_COUNT':"\"OWNER\" >''",
                   'APN_COUNT':"\"APN\" >''",
                   'USPS_COUNT':"\"SIT_ZIP4\" >''",
                   'LAND_VA_CO':"\"LAND_VALUE\" >''",
                   'FL_AREA_CO':"\"BLDG_AREA\" >''",
                   'YR_BLT_CO':"\"YEAR_BUILT\" >''",
                   'UNIT_CO':"\"NO_OF_UNIT\" >''",
                   'USE_CD_CO':"\"STD_LAND_U\" >''",
                   'OWNADDRESS':"\"OWNADDRESS\" >''",
                   'OWNCTYSTZP':"\"OWNCTYSTZP\" >''",
                   'IMP_VA_CO':"\"IMPR_VALUE\" >''",
                   'TOT_VA_CO':"\"TOT_VALUE\" >''",
                   'SALE_DATE':"\"REC_DATE\" >''",
                   'SALE_PRICE':"\"SALES_PRIC\" >'100'",
                   'LOT_SIZE':"\"LOT_SIZE\" >'0'"}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

# TEMPLATE
@app.route("/fieldmap")
def fieldmap():
    return render_template("fieldmap.html")

# ZERO
@app.route("/gettargets")
def gettargets():
    print("gettargets")
    targets = Arcpy.ListFields("temp_layer")
    return json.dumps(targets)

# ONE
@app.route("/getfips")
def getfips():
    dirs = os.listdir('./BATCH_QUE')
    fips = [d for d in dirs if len(d) == 5 and d.isdigit()]
    print("fips",fips)
    return json.dumps(fips)

# TWO
@app.route("/setfip/<string:fip>", methods=['GET'])
def setFip(fip):
    print("setFip "+fip)
    arcpy.env.workspace = fip
    return getfields(fip)

# THREE
@app.route("/getfields/<string:fip>", methods=['GET'])
def getfields(fip):
    print("getfields")

    arcpy.env.workspace = fip
    # fields = Arcpy.ListFields("temp_layer")
    # alternate
    fields = []
    with open(cwd + "/BATCH_QUE/" + fip + "/fields.tsv") as fp:
        vals = fp.read()
        fp.close()
    fields = [{"name":x, "id":i}  for i, x in enumerate(vals.split('\t'), 1)]
    return json.dumps(fields)

# FOUR
@app.route("/getcounts")
def getCounts():
    parcelResult = {}
    totalCnt = 0
    if arcpy.Exists('temp_parcel_layer'):  # NOTE: Addition 02/27/2018
        arcpy.Delete_management('temp_parcel_layer')
    arcpy.MakeFeatureLayer_management(os.path.join(finishedFolder,FIPS,'Parcels.shp'),'temp_parcel_layer')
    totalCnt = int(arcpy.GetCount_management('temp_parcel_layer').getOutput(0))
    print("totalCnt", totalCnt)
    for key, query in parcelQuery.iteritems():
        arcpy.SelectLayerByAttribute_management('temp_parcel_layer',"NEW_SELECTION", query)
        parcelResult[key] = arcpy.GetCount_management('temp_parcel_layer')
    return json.dumps(parcelResult)

# FIVE
@app.route("/exportdbf")
def exportdbf(parcelsdbf,fieldmapping,fip):
    old_table = dbf.Table(parcelsdbf)
    fields = old_table.structure()
    for old_name, new_name in fieldmapping:
        for i, f in enumerate(fields):
            if f.startswith(old_name + ' '): # note the space!
                fields[i] = f.replace(old_name, new_name)

    new_table = dbf.Table(fip + '.dbf', fields)
    with old_table as old, new_table as new:
        for record in old_table:
            new_table.append(tuple(record))
    return "{'success':'true'}"


if __name__ == "__main__":
    arcpy = Arcpy()
    cwd = os.getcwd()
    print(arcpy.listfields("temp_layer"))
    app.run(host="127.0.0.1", port=5000, threaded=True)
