import os

class HandleDataImport:
    def  __init__(self, file_path):
        self.file_path = file_path
    
    def __analyiseFileType(self):
        file_name, file_extension = os.path.splitext(self.file_path)
        return file_extension
    
    def getFileType(self):
        return self.__analyiseFileType()