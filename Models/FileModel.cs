using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace fileServer.Model
{
    public class FileModel
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
        public int FileSize { get; set; }
        public string FileType { get; set; }
        //public List<IFormFile> FormFiles { get; set; }
    }
}