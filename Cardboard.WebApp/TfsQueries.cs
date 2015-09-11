using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cardboard.WebApp
{
    public static class TfsQueries
    {
        public static string Shell = @"
            select [System.Id], [System.WorkItemType], [System.Title], [Microsoft.VSTS.Common.Priority], [System.AssignedTo], [System.State], [System.IterationPath]
            from WorkItems
            where [System.TeamProject] = 'MY_TEAM_PROJECT'
                and [System.IterationPath] under @Iteration
            order by [System.AssignedTo]";
    }
}