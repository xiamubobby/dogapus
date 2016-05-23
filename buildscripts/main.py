from zipfile import ZipFile

f = open("../electron_prebuilt/osx/electron-v0.37.6-darwin-x64.zip", encoding="UTF-8")
zf = ZipFile(f)
#electron_prebuilt = ZipFile()
#electron_prebuilt.extractall("../out/osx/")
