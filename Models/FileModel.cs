using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace fileServer.Model
{
    // Currently unused but will be used to store relevant file info such as name, size, type, path, etc
    public class FileModel
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
        public int FileSize { get; set; }
        public string FileType { get; set; }
        //public List<IFormFile> FormFiles { get; set; }
    }
}