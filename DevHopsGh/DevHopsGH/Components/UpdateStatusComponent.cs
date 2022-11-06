using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Grasshopper.Kernel;
using Newtonsoft.Json;
using Rhino.Geometry;

namespace DevHopsGH.Components
{
    public class UpdateStatusComponent : GH_Component
    {
        /// <summary>
        /// Initializes a new instance of the UpdateStatusComponent class.
        /// </summary>
        public UpdateStatusComponent()
          : base("UpdateStatusComponent", "Update status","Update task component",
              "DevHops", "DevHops")
        {
        }

        /// <summary>
        /// Registers all the input parameters for this component.
        /// </summary>
        protected override void RegisterInputParams(GH_Component.GH_InputParamManager pManager)
        {
            pManager.AddTextParameter("Task ID", "ID", "Kanban board id task", GH_ParamAccess.item);
            pManager.AddTextParameter("Status", "Status", "Status to be updated", GH_ParamAccess.item);
            pManager.AddBooleanParameter("Screenshot", "Screenshot", "Screenshot", GH_ParamAccess.item);
            pManager.AddTextParameter("Add comment", "comment", "comment", GH_ParamAccess.item);

        }

        /// <summary>
        /// Registers all the output parameters for this component.
        /// </summary>
        protected override void RegisterOutputParams(GH_Component.GH_OutputParamManager pManager)
        {
            pManager.AddTextParameter("Status updated", "Status updated", "Status status", GH_ParamAccess.item);

        }

        /// <summary>
        /// This is the method that actually does the work.
        /// </summary>
        /// <param name="DA">The DA object is used to retrieve from inputs and store in outputs.</param>
        protected override void SolveInstance(IGH_DataAccess DA)
        {
            string id = String.Empty;
            string status  = String.Empty;
            bool sendScreenshot  = false;
            string comment = String.Empty;

            if (!DA.GetData(0, ref id)) return;
            if (!DA.GetData(1, ref status)) return;
            if (!DA.GetData(2, ref sendScreenshot)) return;
            if (!DA.GetData(3, ref comment)) return;

            // post method, id and status
            //send status
            string filepath = @"C:\Users\jszychowska\Dropbox\devhops\images\image.jpeg";

            string imageString = String.Empty;
            
            //read folder images
            if (sendScreenshot)
            {
                using (Image image = Image.FromFile(filepath))
                {
                    using (MemoryStream m = new MemoryStream())
                    {
                        image.Save(m, image.RawFormat);
                        byte[] imageBytes = m.ToArray();

                        // Convert byte[] to Base64 String
                        string base64String = Convert.ToBase64String(imageBytes);
                        imageString = base64String;

                    }
                }
            }


            var username = Environment.UserName;
            // post image, status

            WorkItemUpdate workItemUpdate = new WorkItemUpdate();
            workItemUpdate.workitemId = id;
            workItemUpdate.timestamp = DateTime.Now.ToString();
            workItemUpdate.username = Environment.UserName;

            if (comment != String.Empty)
            {
                workItemUpdate.comment = comment;
            }

            Status myStatus;
            Enum.TryParse(status, out myStatus);
            workItemUpdate.status = myStatus;

            if (sendScreenshot) workItemUpdate.image = imageString;

            string sendUpdateJson = System.Text.Json.JsonSerializer.Serialize(workItemUpdate);
            BoardConnector boardConnector = new BoardConnector();
            boardConnector.UpdateStatus(sendUpdateJson);
        }

        /// <summary>
        /// Provides an Icon for the component.
        /// </summary>
        protected override System.Drawing.Bitmap Icon
        {
            get
            {
                var assembly = System.Reflection.Assembly.GetExecutingAssembly();
                {
                    var resourceName = assembly.GetManifestResourceNames().Single(n => n.EndsWith("Icon_transparent.png"));
                    var stream = assembly.GetManifestResourceStream(resourceName);
                    if (stream != null) return new Bitmap(stream);
                }
                return null;
            }
        }

        /// <summary>
        /// Gets the unique ID for this component. Do not change this ID after release.
        /// </summary>
        public override Guid ComponentGuid
        {
            get { return new Guid("1E122DC3-68DE-4A9F-AFB7-2F2E1B69E370"); }
        }
    }
}