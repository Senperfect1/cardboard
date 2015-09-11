/// <reference path="typings/cardboard/cardboard.d.ts" />

$(function () {
    var $ = jQuery,
        server = (<any>window).server,
        boardColumns: BoardColumn[] = [
            {
                name: "",
                width: "10%"
            },
            {
                name: "Todo",
                width: "40%",
                showCellCount: true
            },
            {
                name: "In Progress",
                width: "20%"
            },
            {
                name: "In Review",
                width: "20%"
            }
        ],
        shellGroupByList: BoardRowsGroupBy[] = [
            {
                name: "Owner",
                cardProperty: "owner",
                cardValues: [
                    "Federico Silva Armas",
                    "Christopher Scrosati",
                    "Christof Marti",
                    "Brad Olenick",
                    "David Anson",
                    "Mo Wang",
                    "Steve Sanderson",
                    "Tom Cox",
                    "Alvaro Dias",
                    "Breck Yunits"
                ].sort()
            },
            {
                name: "Priority",
                cardProperty: "priority"
            }
        ];

    $("#board").cardboard({
        getCardsAsync: (board: BoardClientSettings, query: string) => {
            return $.ajax(server.apiPath + "/Cards?" + query, {
                dataType: "json"
            });
        },
        getCardUrl: (card: BoardCardData): string => {
            return "http://your.tfs.server&id=" + card.id;
        },
        startupBoardId: "shellCurrent",
        boards: [
            {
                id: "shellCurrent",
                name: "Shell - Current",
                query: {
                    iteration: "5.0"
                },
                columns: boardColumns,
                groupByList: shellGroupByList
            },
            {
                id: "shellNext",
                name: "Shell - Next",
                query: {
                    iteration: "6.0"
                },
                columns: boardColumns,
                groupByList: shellGroupByList
            }]
    });
});