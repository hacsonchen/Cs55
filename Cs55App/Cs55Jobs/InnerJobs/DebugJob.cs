using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Quartz;

namespace Cs55Jobs.InnerJobs
{
    public class DebugJob : BaseJob
    {
        public override Task Execute(IJobExecutionContext context)
        {
            throw new NotImplementedException();
        }
    }
}
