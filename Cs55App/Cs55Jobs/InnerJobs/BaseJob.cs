using Quartz;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cs55Jobs.InnerJobs
{
    public abstract class BaseJob : IJob
    {
        public abstract Task Execute(IJobExecutionContext context);
    }
}
