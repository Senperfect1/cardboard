using Cardboard.Server;
using Cardboard.Server.Models;
using Microsoft.TeamFoundation.Client;
using Microsoft.TeamFoundation.WorkItemTracking.Client;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace Cardboard.WebApp
{
    public class TfsCardService : ICardService
    {
        public IEnumerable<Card> GetCards(HttpRequestMessage request, string boardId)
        {
            var tfs = TeamFoundationServerFactory.GetServer("http://your.tfs.server");
            var workItemStore = tfs.GetService<WorkItemStore>();

            var queryString = request.GetQueryNameValuePairs().ToDictionary(q => q.Key, q => q.Value, StringComparer.OrdinalIgnoreCase);
            var queryParams = new Dictionary<string, string>()
            {
                { "Iteration", @"Iteration\" + queryString["iteration"].Replace("/", "\\") }
            };

            return workItemStore.Query(TfsQueries.Shell, queryParams).Cast<WorkItem>()
                .Where(workItem => this.GetFieldValueOrDefault(workItem, "Microsoft.VSTS.Common.Priority", -1) >= 0)
                .Select(workItem =>
                {
                    var card = new Card();

                    try
                    {
                        card.Id = workItem.Id.ToString();
                        card.Title = workItem.Title;
                        card.Owner = this.GetFieldValueOrDefault(workItem, "System.AssignedTo", "<UNKNOWN>");
                        card.Priority = this.GetFieldValueOrDefault(workItem, "Microsoft.VSTS.Common.Priority", -1);
                        card.Status = this.GetCardStatus(workItem);
                    }
                    catch (Exception ex)
                    {
                        card.Title = String.Format("ERROR: {0} - {1}", workItem.Id, ex.ToString());
                    }

                    return card;
                });
        }

        private T GetFieldValueOrDefault<T>(WorkItem workItem, string fieldName, T defaultValue)
        {
            T result = defaultValue;

            if (workItem.Fields.Contains(fieldName))
            {
                var field = workItem.Fields[fieldName];
                if (field != null && field.Value != null)
                {
                    result = (T)field.Value;
                }
            }

            return result;
        }

        private string GetCardStatus(WorkItem workItem)
        {
            var workStatus = GetFieldValueOrDefault(workItem, "Microsoft.Azure.WorkStatus", "Todo");

            if (!workItem.State.Equals("Active", StringComparison.OrdinalIgnoreCase))
            {
                return "Done";
            }
            else if (workStatus.Equals("In Progress", StringComparison.OrdinalIgnoreCase))
            {
                return "In Progress";
            }
            else if (workStatus.Equals("In Review", StringComparison.OrdinalIgnoreCase))
            {
                return "In Review";
            }
            else
            {
                return "Todo";
            }
        }
    }
}