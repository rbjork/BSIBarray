__author__ = 'ronaldbjork'
import pandas as pd
import sys

def fillcolumn():
    a = {'a':10,'b':1.3}
    b = {'b':32.5,'c':3.14, 'm': 5.1}
    df1 = pd.DataFrame(a, index=[0])
    df2 = pd.DataFrame(b, index=[1])

    d = pd.DataFrame(columns=['a','b','c','d','e','m'])
    #d = d.append(df1)
    d = d.append(df2).fillna(0)
    #d['a'] = ['aa','bb','cc']
    print(d)


def filltemplate(sourcefile, templatefile):

    dft = pd.read_csv(templatefile)
    dfs = pd.read_csv(sourcefile)

    template_header = list(dft.columns.values)
    source_header = list(dfs.columns.values)

    print(template_header)
    print("**************")
    print(source_header)

    template_df = pd.DataFrame(columns=template_header)

    for index, r in dfs.iterrows():
        parcel_id = r['PARCEL_ID']
        template_df = template_df.append(parcel_id).fillna(0)
        if index > 10:
            break
        #apn = r['']
        #print(index, r.tolist())
    print(template_df)

def joincsvs(sourcefile, templatefile):
    a = pd.read_csv(templatefile)
    b = pd.read_csv(sourcefile)
    b = b.dropna(axis=1)
    merged = a.merge(b, on='title')
    merged.to_csv("output.csv", index=False)


# if __name__ == "__main__":
#     # python templatecreate.py "21007.csv" "BallardKY.csv"#
#     templatefile = sys.argv[1]
#     sourcefile = sys.argv[2]
#     print(templatefile, sourcefile)
#     filltemplate()
#     joincsvs()
