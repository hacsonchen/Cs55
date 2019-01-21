using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cs55Jobs;
using Microsoft.AspNetCore.Mvc;

namespace Cs55Api.Controllers
{
    [Route("api/[controller]")]
    public class ScheduleController : Controller
    {

        [HttpPost]
        public JsonResult AddJob()
        {
            JobsService jobsService = Request.HttpContext.RequestServices.GetService(typeof(JobsService)) as JobsService;
            try
            {
                jobsService.AddJob("test", "0 0 0 0 0", "test", DateTime.Now);

                return Json(new { state = 200 });
            }
            catch (Exception ex)
            {
                return Json(new { state = 500, message = ex.Message });
            }

        }

    }
}
