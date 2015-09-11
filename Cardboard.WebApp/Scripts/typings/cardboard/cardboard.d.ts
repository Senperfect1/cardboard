///<reference path="../jquery/jquery.d.ts" />

interface JQuery {
    cardboard: (settings: BoardCollectionSettings) => JQuery;
}

/**
 * Contract for the information of a card.
 */
interface BoardCardData {
    /**
     * Unique identifier of this card.
     */
    id: string;

    /**
     * Title of this card.
     */
    title: string;

    /**
     * Owner of this card, usually matches one of the row identifiers.
     */
    owner: string;

    /**
     * Numeric priority of this card. 0 is the highests priority.
     */
    priority: number;

    /**
     * Status of this card, usually matches one of the column identifiers.
     */
    status: string;
}

/**
 * Information of a board column.
 */
interface BoardColumn {
    /**
     * Name to display in the column.
     */
    name: string;

    /**
     * Width of this column.
     */
    width: string;

    /**
     * Whether to display the number of cards each cell in this column.
     */
    showCellCount?: boolean;
}

/**
 * Information to group cards into rows of a board.
 */
interface BoardRowsGroupBy {
    /**
     * Name to refer to this group by setting.
     */
    name: string;

    /**
     * Property of card to use to group.
     */
    cardProperty: string;

    /**
     * Value of cards to use to group. All values if left empty.
     */
    cardValues?: string[]
}

/**
 * Settings for a collection of boards.
 */
interface BoardCollectionSettings extends BoardServerSettings {
    /**
     * List of board settings.
     */
    boards: BoardClientSettings[];

    /**
     * Identifier of board to load at startup.
     */
    startupBoardId?: string;
}

/**
 * Settings for server of boards.
 */
interface BoardServerSettings {
    /**
     * Gets a promise that resolves when the cards are ready to display.
     */
    getCardsAsync?: (board: BoardClientSettings, queryString: string) => JQueryPromise<BoardCardData[]>;

    /**
     * Gets the url of a card.
     */
    getCardUrl?: (card: BoardCardData, board: BoardClientSettings) => string;
}

/**
 * Settings for a card board.
 */
interface BoardClientSettings {
    /**
     * Identifier of this board.
     */
    id: string;

    /**
     * Friendly name of the board, defaults to id if undefined.
     */
    name?: string;

    /**
     * Query data to send to server (consumed by Cardboard.Server).
     */
    query?: { [key: string]: string };

    /**
     * Settings for the columns of the board.
     */
    columns: BoardColumn[];

    /**
     * Settings for the grouping of cards of the borad.
     */
    groupByList?: BoardRowsGroupBy[];

    /**
     * Whether rows should be expanded by default.
     */
    expandRows?: boolean;
}