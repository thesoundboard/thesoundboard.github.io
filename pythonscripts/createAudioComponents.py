import os

def createAudioComponent(fname, num):
    s = '      <audio id="sound'
    s += str(num)
    s += '">\n'
    s += '        <source src="soundfiles/' 
    s += fname 
    s += '" type="audio/mp3">\n' 
    s += '          Your browser doesn\'t support the audio element.\n' 
    s += '      </audio>\n'
    return s

def createAudioComponentString(path):
    s = ""
    n = 1
    for (dirpath, dirname, filenames) in os.walk(path):
        for fn in filenames:
            s += createAudioComponent(fn, n)
            n += 1
    return s

#deprecated - use getAudioDivLineNumbers
def getAudioDivLineNum(text):
    num = 1
    for line in text:
        if '<div id="audioDiv">' in line:
            return num
        num += 1
        
#deprecated - use getAudioDivLineNumbers
def getAudioDivEndLineNum(text):
    num = 1
    flag = False
    for line in text:
        if '<div id="audioDiv">' in line:
            flag = True
        if flag == True and '</div>' in line:
            return num
        num += 1

def getAudioDivLineNumbers(text):
    num = 1
    start = 0
    for line in text:
        if '<div id="audioDiv">' in line:
            start = num
        if start > 0 and '</div>' in line:
            return start, num
        num += 1
    return None #error

def deleteAudioDivContents(htmlcontents):
    start, end = getAudioDivLineNumbers(htmlcontents)
    del htmlcontents[start:end-1]

def generateHTMLForAudioComponentsFromSoundfilesFolder():
    path = os.path.dirname(os.path.abspath(__file__))
    htmlcontents = []
    with open(path + "/../index.html", 'r') as htmlfile:
        htmlcontents = htmlfile.readlines()
    deleteAudioDivContents(htmlcontents)
    htmlcontents.insert(getAudioDivLineNum(htmlcontents), createAudioComponentString(path + "/../soundfiles"))
    with open(path + "/../index.html", 'w') as newhtmlfile:
        newhtmlfile.writelines(htmlcontents)

if __name__ == "__main__":  
    generateHTMLForAudioComponentsFromSoundfilesFolder()
