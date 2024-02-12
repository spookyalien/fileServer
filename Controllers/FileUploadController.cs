using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using fileServer.Model;
using System;
using System.IO;
using Microsoft.AspNetCore.Http.Extensions;
using System.IO.Compression;
using Microsoft.AspNetCore.StaticFiles;

namespace fileServer.Controllers
{
    [Route("api/FileUpload")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {  
        public string GetMimeTypeForFileExtension(string filePath)
        {
            const string DefaultContentType = "application/octet-stream";

            var provider = new FileExtensionContentTypeProvider();

            if (!provider.TryGetContentType(filePath, out string contentType))
            {
                contentType = DefaultContentType;
            }

            return contentType;
        }

        [DisableRequestSizeLimit]
        [HttpPost] 
        [Route("Upload")]
        public async Task <IActionResult> ImportFile([FromForm] IFormFile form_file)
        {
            try {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", form_file.FileName);

                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    form_file.CopyTo(stream);
                }

                return StatusCode(StatusCodes.Status201Created);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        public int Get()
        {
            string directory_path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            return Directory.EnumerateFiles(directory_path, "*").Count();    
        }

        [HttpGet("port")]
        public int GetPort()
        {
            return this.HttpContext.Connection.RemotePort;
        }


        [HttpGet]
        [Route("Download")]
        public ActionResult GetDownload([FromQuery] string parameter)
        {
            string[] file_names = parameter.Split(',');

            if (file_names.Length <= 1) { 
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file_names[0]);
                byte[] file_bytes = System.IO.File.ReadAllBytes(path);
                return new FileContentResult(file_bytes, "application/octet-stream")
                {
                    FileDownloadName = file_names[0]
                };
            }
            string zip_name = "Export_" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".zip";
            byte[] compressed_bytes;

            using (var out_stream = new MemoryStream())
            {
                using (var archive = new ZipArchive(out_stream, ZipArchiveMode.Create, true))
                {
                    for (int i = 0; i < file_names.Length; i++) {
                        string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file_names[i]);
                        byte[] file_bytes = System.IO.File.ReadAllBytes(path);
                        var archive_file = archive.CreateEntry(file_names[i], CompressionLevel.Optimal);
                        using (var entry_stream = archive_file.Open())
                        using (var fileToCompressStream = new MemoryStream(file_bytes))
                        {
                            fileToCompressStream.CopyTo(entry_stream);
                        }
                    }
                }
                compressed_bytes = out_stream.ToArray();
            }
            return File(compressed_bytes, "application/zip", zip_name);
        }

        [HttpGet("files")]
        public string[] GetFiles()
        {
            List<string> file_names = new List<string>();
            string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            DirectoryInfo d = new DirectoryInfo(directoryPath);

            FileInfo[] Files = d.GetFiles("*"); 

            foreach(FileInfo file in Files )
            {
                file_names.Add(file.Name);
            }

            return file_names.ToArray();
        }
    }
}
