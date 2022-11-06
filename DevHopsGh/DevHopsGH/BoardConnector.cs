using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using RestSharp;

namespace DevHopsGH
{
    public class BoardConnector
    {

        public string GetWorkItemById(string id)
        {
            System.Net.HttpWebRequest request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create($"{AppConstants.getWorkItemUrl}{id}");

            request.Method = "GET";
            request.Accept = "text/plain";
            System.Net.WebResponse response = request.GetResponse();
            string responseString;
            using (var streamReader = new System.IO.StreamReader(response.GetResponseStream()))
            {
                responseString = streamReader.ReadToEnd();
            }

            return responseString;

        }

        public string UpdateStatus(string json)
        {
            // send status update
            HttpWebRequest request = (HttpWebRequest)System.Net.WebRequest.Create(AppConstants.sendUpdateUrl);
            request.ContentType = "application/json";
            request.Method = "POST";
            request.Accept = "text/plain";

            using (var streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                streamWriter.Write(json);
                streamWriter.Flush();
            }

            var response = request.GetResponse();
            var result = "";
            using (var streamReader = new StreamReader(response.GetResponseStream()))
            {
                result = streamReader.ReadToEnd();
            }

            return result;
        }


    }
}
